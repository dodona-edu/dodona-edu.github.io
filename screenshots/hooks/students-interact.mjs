// Generic interaction hook for the students-area shots. See ../shots/students.yaml
// for how each shot opts into these behaviours, and README.md for the hook contract
// (`prepare(page, { locale, shot, reinject, tag })`).
//
// Everything here is driven by fields on the shot's yaml entry so one file can back
// every "more than navigate-and-crop" shot in the manifest instead of one file per shot:
//
//   signOut: true                 sign out (clear cookies), reload, re-inject the crop CSS.
//                                 Used for the Stage A (signed-out) shots -- capture.mjs
//                                 always signs in as `shot.user ?? 1` before a hook runs,
//                                 so a signed-out shot has to undo that itself.
//   openLanguageMenu: true        click the navbar language toggle ("en ▾" / "nl ▾").
//   openUserMenu: true            click the navbar user chip ("Sofie ▾" / "Noor ▾" / ...).
//   clickTab: 'Submissions'       click a hand-in/submission-page tab by its visible label.
//   clickText: 'Clear editor'     click any element by its exact visible text (not just tabs).
//   clickSelector: '.foo'         click the first element matching a CSS selector (e.g. the
//                                 legacy hand-in card's Feedback tab only reveals/activates
//                                 itself once a submission's `a.load-submission` row is
//                                 clicked from the Submissions tab -- there is no other trigger
//                                 for it server-side, verified against exercise.ts).
//   hoverLine: 6                  hover the Nth line (1-based) in the code listing, to reveal
//                                 the per-line "ask a question" bubble.
//   iframeProfilerFix: true       rewrite the activity-description iframe's src to add
//                                 &pp=disable, so the mini-profiler badge doesn't leak in.
//   dynamicSubmission: '<scenario>'
//                                 the shot's real target is a submission created by a state
//                                 setup script at capture time (id not known until then). The
//                                 matching state/<scenario>.setup.rb writes the created id to
//                                 the shared JSON file below; this navigates there before doing
//                                 anything else. The shot's `url` in the yaml is a cheap
//                                 placeholder (e.g. the submissions index) since it's only used
//                                 for the initial goto().
//   highlight: [{ text } | { textRegex } | { selector }, ...]
//                                 outline (bake in, cookbook-style) every match. `scope` narrows
//                                 the search to a CSS selector first.
//   highlight: [{ rowText, selector, scope }]
//                                 find a <tr> (within `scope`, default the whole page) whose
//                                 text includes rowText, then outline `selector` within that row.
//   tagClosest: [{ name, text, ancestor, outline }]
//                                 find an element whose own text includes `text`, outline it
//                                 (unless outline: false), and stamp `data-shot="<name>"` on its
//                                 closest(ancestor ?? 'div') so the shot's `crop.selector` can
//                                 target `[data-shot="<name>"]` -- for callouts/cards that have
//                                 no stable class of their own in the manifest.
//
// Selectors below are best-effort, built only from the text/classes the manifest itself names
// (cookbook rule: selectors come from the manifest, not from poking a live DOM) -- expect some
// of these to need a tweak once run against the real dev instance.

import { readFileSync } from 'node:fs';

const STATE_FILE = '/tmp/dodona-docs-capture-state.json';

function readSharedState(scenario) {
  const all = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  const entry = all[scenario];
  if (!entry) throw new Error(`no shared state for scenario "${scenario}" in ${STATE_FILE} -- did you run its setup.rb?`);
  return entry;
}

function outline(el) {
  el.style.outline = '3px solid #d32f2f';
  el.style.outlineOffset = '2px';
}

// Click the first VISIBLE element whose own leading text is exactly this label (badge counts
// or other trailing content in the same element are ignored). Some pages (e.g. the submission
// results page's tab bar) render a second, hidden copy of the same label -- verified live --
// so a plain `.first()` on getByText can land on the hidden one and hang forever waiting for
// it to become actionable; and an exact getByText match fails on the real, visible tab when a
// badge's text ("2") is a sibling text node inside the same button, making the button's own
// full text "Code2" rather than "Code". Comparing only the first text node sidesteps both.
export async function clickFirstVisible(page, text) {
  const handle = await page.evaluateHandle((label) => {
    const isVisible = (el) => !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    const firstOwnText = (el) => {
      for (const node of el.childNodes) {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) return node.textContent.trim();
      }
      return el.textContent.trim();
    };
    const candidates = [...document.querySelectorAll('button, a')];
    return candidates.find((el) => isVisible(el) && firstOwnText(el) === label) ?? null;
  }, text);
  const el = handle.asElement();
  if (!el) throw new Error(`no visible element with leading text "${text}"`);
  await el.click();
}

// `text` specs may be locale-dependent app copy (button/message strings); allow
// `text: { en: '...', nl: '...' }` alongside a plain string. Plain strings are
// used verbatim in both locales -- only reach for the object form when the
// rendered copy actually differs per locale (verified against config/locales).
function localiseText(text, locale) {
  return typeof text === 'object' && text !== null ? text[locale] : text;
}

export async function prepare(page, { locale, shot, reinject }) {
  if (shot.signOut) {
    await page.context().clearCookies();
    await page.reload({ waitUntil: 'load' });
    await reinject(page, { keepNavbar: shot.keepNavbar ?? false });
    await page.waitForTimeout(500);
  }

  if (shot.dynamicSubmission) {
    const { submission_id: id } = readSharedState(shot.dynamicSubmission);
    const origin = new URL(page.url()).origin;
    await page.goto(`${origin}/${locale}/submissions/${id}/`, { waitUntil: 'load' });
    await reinject(page, { keepNavbar: shot.keepNavbar ?? false });
    await page.waitForTimeout(1200);
  }

  if (shot.openLanguageMenu) {
    // Verified against app/views/layouts/_navbar.html.erb: the toggle has no
    // locale-dependent text (icon + bare "en"/"nl" + caret), so match by id.
    await page.locator('#navbar-language-toggle').click();
    await page.waitForTimeout(300);
  }

  if (shot.openUserMenu) {
    // Ditto: app/views/layouts/_navbar.html.erb#user-menu-toggle.
    await page.locator('#user-menu-toggle').click();
    await page.waitForTimeout(300);
  }

  if (shot.clickTab) {
    await clickFirstVisible(page, shot.clickTab);
    await page.waitForTimeout(500);
  }

  if (shot.clickText) {
    await clickFirstVisible(page, localiseText(shot.clickText, locale));
    await page.waitForTimeout(400);
  }

  if (shot.clickSelector) {
    await page.locator(shot.clickSelector).first().click();
    await page.waitForTimeout(shot.clickSelectorWait ?? 800);
  }

  if (shot.hoverLine) {
    const line = page.locator('.code-listing-container tr, .code-listing-container .line').nth(shot.hoverLine - 1);
    await line.hover();
    await page.waitForTimeout(300);
  }

  if (shot.iframeProfilerFix) {
    await page.evaluate(() => {
      const frame = document.querySelector('iframe');
      if (!frame) return;
      const url = new URL(frame.src);
      url.searchParams.set('pp', 'disable');
      frame.src = url.toString();
    });
    await page.waitForTimeout(800);
  }

  for (const spec of shot.tagClosest ?? []) {
    const text = localiseText(spec.text, locale);
    await page.evaluate(({ name, text, ancestor, doOutline }) => {
      const leaf = [...document.querySelectorAll('body *')]
        .find((n) => n.children.length === 0 && n.textContent.trim().includes(text));
      if (!leaf) return;
      if (doOutline !== false) {
        leaf.style.outline = '3px solid #d32f2f';
        leaf.style.outlineOffset = '2px';
      }
      const target = leaf.closest(ancestor ?? 'div') ?? leaf;
      target.setAttribute('data-shot', name);
    }, { name: spec.name, text, ancestor: spec.ancestor, doOutline: spec.outline });
  }

  for (const spec of shot.highlight ?? []) {
    if (spec.rowText) {
      const rowText = localiseText(spec.rowText, locale);
      await page.evaluate(({ rowText, selector, scope }) => {
        const root = scope ? document.querySelector(scope) : document;
        const row = root && [...root.querySelectorAll('tr')].find((r) => r.textContent.includes(rowText));
        const el = row?.querySelector(selector);
        if (el) { el.style.outline = '3px solid #d32f2f'; el.style.outlineOffset = '2px'; }
      }, { rowText, selector: spec.selector, scope: spec.scope });
      continue;
    }
    const scope = spec.scope ? page.locator(spec.scope) : page;
    let loc;
    if (spec.selector) loc = scope.locator(spec.selector);
    else if (spec.textRegex) loc = scope.getByText(new RegExp(localiseText(spec.textRegex, locale)));
    else loc = scope.getByText(localiseText(spec.text, locale), { exact: spec.exact ?? false });
    await loc.first().evaluate(outline);
  }
}
