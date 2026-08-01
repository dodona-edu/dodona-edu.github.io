// Shared helpers for the faq/annotations hook chain (shots 1-17 in shots/faq.yaml).
//
// capture.mjs does a full `goto()` (real page load) before every single shot, even
// consecutive ones on the "same" page -- so no client-side state (an open form, typed
// text, a hovered gutter) survives between shots. Only server-side state does. That
// means the annotation thread this sequence builds up (question -> reply -> saved
// comment -> reused comment -> ...) has to be re-derived from the database on every
// hook invocation rather than assumed from a previous hook's leftover DOM. The
// `ensure*` functions below do that: each checks whether its bit of server state
// already exists and, if not, drives the real UI to create it (so it is exercised the
// same way a student/teacher would, not seeded through the console). They are meant
// to be idempotent so a single shot can be re-captured in isolation with `--id`.
//
// None of this has been run against a live dev server (out of scope for this batch --
// see the task notes). Treat the selectors and waits as best-effort, the same way the
// manifest marks its own crop selectors "(~)".

import { readFileSync } from 'node:fs';
import { BASE, reinject } from '../lib.mjs';

const DODONA_REPO = process.env.DODONA_REPO ?? '/Users/bart/Code/Rails/dodona';
const STATE_FILE = `${DODONA_REPO}/tmp/screenshots/faq-state.json`;

export function readFaqState() {
  try {
    return JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  } catch (e) {
    throw new Error(
      `Could not read ${STATE_FILE} (${e.message}). Run ` +
      'state/faq-annotated-submission.setup.rb with bin/rails runner in the dodona ' +
      'checkout first -- it writes the submission id this hook needs. Override the ' +
      'dodona checkout path with the DODONA_REPO env var if it is not at ' +
      `${DODONA_REPO}.`
    );
  }
}

// Navigate to the ISBN submission's Code tab created by faq-annotated-submission.setup.rb.
// The yaml `url` for these shots points at a stable placeholder (the course page)
// because the real submission id is only known once that setup script has run.
export async function gotoAnnotatedSubmission(page, locale) {
  const { sub } = readFaqState();
  await page.goto(`${BASE}/${locale}/submissions/${sub}/#code`, { waitUntil: 'load' });
  await reinject(page);
  await page.waitForTimeout(1800);
  return sub;
}

// Hide code rows after line `n` (inclusive of n stays visible) so a crop of
// .code-listing-container only shows the first n lines instead of the whole ~19-line
// submission. Rows are <tr id="line-N">; this walks all of them rather than assuming
// a fixed header-row offset.
export async function hideCodeLinesAfter(page, n) {
  await page.evaluate((n) => {
    document.querySelectorAll('.code-listing-container tr[id^="line-"]').forEach((tr) => {
      const lineNr = parseInt(tr.id.slice('line-'.length), 10);
      if (!Number.isNaN(lineNr) && lineNr > n) tr.style.setProperty('display', 'none', 'important');
    });
  }, n);
}

// Inverse of the above: hide everything before line `n`, so a crop starts partway
// through the listing (e.g. shot 3's "lines ~12-16 + thread").
export async function hideCodeLinesBefore(page, n) {
  await page.evaluate((n) => {
    document.querySelectorAll('.code-listing-container tr[id^="line-"]').forEach((tr) => {
      const lineNr = parseInt(tr.id.slice('line-'.length), 10);
      if (!Number.isNaN(lineNr) && lineNr < n) tr.style.setProperty('display', 'none', 'important');
    });
  }, n);
}

export const STRINGS = {
  en: {
    askGlobalQuestion: 'Ask a question about your code',
    addGlobalComment: 'Add global comment',
    askQuestionBubble: 'Ask question',
    addCommentBubble: 'Add comment',
    askQuestionSubmit: 'Ask question',
    commentSubmit: 'Comment',
    markAsAnswered: 'Mark as answered',
    saveCommentCheckboxLabel: 'Save comment',
    saveCommentMenuItem: 'Save comment',
    editCommentMenuItem: 'Edit comment',
    searchPlaceholder: 'Search saved comment',
    reply: 'Reply',
    question1: "Why doesn't this work?",
    question2: 'Is there a shorter way to write this?',
    reply1Text: "You have used Python 2 notation. In Python 3 the 'print' function requires parentheses.",
    savedAnnotation1Title: 'Python 2 print',
    comment2Text: 'You should use a loop here',
    savedAnnotation2Title: 'Loop required',
  },
  nl: {
    askGlobalQuestion: 'Stel een vraag over je code',
    addGlobalComment: 'Globale opmerking toevoegen',
    askQuestionBubble: 'Stel een vraag',
    addCommentBubble: 'Voeg opmerking toe',
    askQuestionSubmit: 'Vraag stellen',
    commentSubmit: 'Toevoegen',
    markAsAnswered: 'Als beantwoord markeren',
    saveCommentCheckboxLabel: 'Sla opmerking op',
    saveCommentMenuItem: 'Opmerking opslaan',
    editCommentMenuItem: 'Opmerking bewerken',
    searchPlaceholder: 'Zoek opgeslagen opmerking',
    reply: 'Reageer',
    question1: 'Waarom werkt dit niet?',
    question2: 'Kan dit ook korter geschreven worden?',
    reply1Text: "Je hebt Python 2-notatie gebruikt. In Python 3 heeft de functie 'print' haakjes nodig: 'print()'.",
    savedAnnotation1Title: 'Python 2 print',
    comment2Text: 'Je zou hier beter een loop gebruiken',
    savedAnnotation2Title: 'Loop gebruiken',
  },
};

// Step 1 of the chain: post Question 1 on line 16 as Sofie. Idempotent -- if a
// question thread already exists on that line, does nothing. Returns without
// switching users; caller must already be signed in as Sofie (user 5).
export async function ensureQuestion1Posted(page, locale) {
  const s = STRINGS[locale];
  const existing = await page.locator('#line-16 .annotation.question').count();
  if (existing > 0) return;
  await page.locator('#line-16 .rouge-gutter').hover();
  await page.waitForTimeout(300);
  await page.locator('#line-16 .annotation-button .btn-fab-small-flex').click();
  await page.waitForTimeout(400);
  await page.locator('#annotation-text').fill(s.question1);
  await page.locator('d-annotation-form .btn.btn-filled').click();
  await page.waitForTimeout(1000);
}

// Step 2: reply to Question 1 (as the signed-in teacher), ticking "Save comment" with
// title savedAnnotation1Title. This both answers the question and creates
// SavedAnnotation 1. Idempotent on "does a response already exist".
export async function ensureQuestion1Answered(page, locale) {
  const s = STRINGS[locale];
  const responseCount = await page.locator('#line-16 .annotation.user').count();
  if (responseCount > 0) return;
  await page.locator('#line-16 .fake-input input.form-control').click();
  await page.waitForTimeout(400);
  await page.locator('#annotation-text').fill(s.reply1Text);
  await page.locator('#check-save-annotation').check();
  await page.locator('#saved-annotation-title').fill(s.savedAnnotation1Title);
  await page.locator('d-annotation-form .btn.btn-filled').click();
  await page.waitForTimeout(1000);
}

// Step 3: post the (initially unsaved) "loop required" comment on lines 2-10.
// Idempotent on text match.
export async function ensureLoopCommentPosted(page, locale) {
  const s = STRINGS[locale];
  const already = await page.getByText(s.comment2Text, { exact: true }).count();
  if (already > 0) return;
  await selectLines(page, 2, 10);
  await page.locator('.annotation-button:has-text("' + s.addCommentBubble + '")').click()
    .catch(async () => page.getByRole('button', { name: s.addCommentBubble }).click());
  await page.waitForTimeout(400);
  await page.locator('#annotation-text').fill(s.comment2Text);
  await page.locator('d-annotation-form .btn.btn-filled').click();
  await page.waitForTimeout(1000);
}

// Step 4: save that comment as SavedAnnotation 2 via its kebab menu. Idempotent on
// the bookmark icon already being present next to the comment.
export async function ensureLoopCommentSaved(page, locale) {
  const s = STRINGS[locale];
  await ensureLoopCommentPosted(page, locale);
  const row = page.locator('.annotation.user', { hasText: s.comment2Text }).first();
  const alreadySaved = await row.locator('d-saved-annotation-icon i.mdi-comment-bookmark-outline').count();
  if (alreadySaved > 0) return;
  await row.locator('button.dropdown-toggle[id^="annotation-options-toggle-"]').click();
  await page.waitForTimeout(300);
  await row.locator('d-new-saved-annotation.dropdown-item').click();
  await page.waitForTimeout(400);
  // The save dialog's title field: best-effort selector, matches the annotation-form
  // title input id pattern used when saving in place.
  await page.locator('#saved-annotation-title, input[name="saved_annotation[title]"]').first().fill(s.savedAnnotation2Title);
  await page.locator('.btn.btn-filled:has-text("' + s.saveCommentMenuItem + '")').click()
    .catch(() => page.keyboard.press('Enter'));
  await page.waitForTimeout(800);
}

// Step 5: post the third annotation, on line 9, by reusing SavedAnnotation 2 through
// the search dropdown. Idempotent on line 9 already carrying a saved-comment icon.
export async function ensureReuseAnnotationPosted(page, locale) {
  const s = STRINGS[locale];
  await ensureLoopCommentSaved(page, locale);
  const already = await page.locator('#line-9 .annotation d-saved-annotation-icon i.mdi-comment-bookmark-outline').count();
  if (already > 0) return;
  await page.locator('#line-9 .rouge-gutter').hover();
  await page.waitForTimeout(300);
  await page.locator('#line-9 .annotation-button .btn-fab-small-flex').click();
  await page.waitForTimeout(400);
  await page.locator('d-saved-annotation-input input.search-filter').fill(s.savedAnnotation2Title.slice(0, 1).toLowerCase());
  await page.waitForTimeout(400);
  await page.locator('ul.dropdown-menu[role=listbox] a.dropdown-item', { hasText: s.savedAnnotation2Title }).first().click();
  await page.waitForTimeout(300);
  await page.locator('d-annotation-form .btn.btn-filled').click();
  await page.waitForTimeout(1000);
}

// Drag-select a range of code lines via the gutter, the way a student/teacher would
// before clicking the per-selection "Add comment" bubble. Best-effort: Dodona's
// selection is driven by pointerdown/pointerup on the gutter cells.
export async function selectLines(page, from, to) {
  const start = page.locator(`#line-${from} .rouge-gutter`);
  const end = page.locator(`#line-${to} .rouge-gutter`);
  const startBox = await start.boundingBox();
  const endBox = await end.boundingBox();
  await page.mouse.move(startBox.x + startBox.width / 2, startBox.y + startBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(endBox.x + endBox.width / 2, endBox.y + endBox.height / 2, { steps: 5 });
  await page.mouse.up();
  await page.waitForTimeout(300);
}
