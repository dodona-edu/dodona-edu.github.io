// Manifest-driven screenshot runner. See README.md in this directory.
//
//   node screenshots/capture.mjs --list [--page guides/teachers]
//   node screenshots/capture.mjs --page guides/teachers/grading [--locale en]
//   node screenshots/capture.mjs --id my-profile --out-dir /tmp/shots   # dry run, don't touch the repo images
//
// State scenarios are NOT executed automatically: the runner prints the setup
// commands for the selected shots and refuses to run unless --assume-state is
// given (you ran them yourself) . This keeps a capture run from silently
// mutating a dev database.

import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { parseAllDocuments } from 'yaml';
import { launch, signIn, goto, reinject, shootEl, shootUnion, shootClip, tag, hideInShadow, BASE } from './lib.mjs';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const SHOTS_FILE = join(ROOT, 'screenshots', 'shots.yaml');

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const flag = (name) => args.includes(`--${name}`);

// shots.yaml is a multi-document file; each document scopes its own defaults.
let shots = [];
for (const doc of parseAllDocuments(readFileSync(SHOTS_FILE, 'utf8'))) {
  const section = doc.toJS();
  for (const shot of section.shots) shots.push({ ...section.defaults, ...shot });
}
const dupes = shots.map((s) => s.id).filter((id, i, all) => all.indexOf(id) !== i);
if (dupes.length > 0) throw new Error(`duplicate shot ids: ${[...new Set(dupes)].join(', ')}`);

if (opt('id')) shots = shots.filter((s) => s.id === opt('id'));
// --page is a prefix filter: "guides/teachers" selects every teacher page.
// Entries without page: (explicit path:) match on their path instead.
if (opt('page')) shots = shots.filter((s) => (s.page ?? s.path ?? '').startsWith(opt('page')));
const locales = opt('locale') ? [opt('locale')] : ['en', 'nl'];

if (flag('list')) {
  for (const s of shots) {
    console.log(`${s.id}\t${s.page}\t[${(s.state ?? []).join(', ')}]`);
  }
  process.exit(0);
}

if (shots.length === 0) {
  console.error('No shots match the given filters.');
  process.exit(1);
}

// Collect and show required state scenarios.
const scenarios = [...new Set(shots.flatMap((s) => s.state ?? []))];
if (scenarios.length > 0) {
  console.log('Required state scenarios (run setup before, teardown after):');
  for (const sc of scenarios) {
    console.log(`  screenshots/state/${sc}.setup.rb  /  ${sc}.teardown.rb`);
  }
  if (!flag('assume-state')) {
    console.error('\nApply them with bin/rails runner in the dodona checkout, then re-run with --assume-state.');
    process.exit(1);
  }
}

function outputPath(shot, locale) {
  if (shot.path) return join(ROOT, shot.path); // locale-independent explicit path
  return join(ROOT, locale, shot.page, `${shot.file}-${locale}.png`);
}

const outDir = opt('out-dir');
const results = [];
const { browser, page } = await launch(shots[0].viewport ?? {});

let currentUser = null;
for (const locale of locales) {
  for (const shot of shots) {
    if (shot.manual) {
      if (locale === locales[0]) console.log(`[skip] ${shot.id}: manual capture (see its comment in the manifest)`);
      continue;
    }
    if (shot.path && locale === 'nl') continue; // locale-independent: shoot once
    if (shot.locales && !shot.locales.includes(locale)) continue;
    const dest = outDir ? join(outDir, `${shot.id}-${locale}.png`) : outputPath(shot, locale);
    mkdirSync(dirname(dest), { recursive: true });
    try {
      if (shot.viewport) await page.setViewportSize(shot.viewport);
      if ((shot.user ?? 1) !== currentUser) {
        await signIn(page, shot.user ?? 1);
        currentUser = shot.user ?? 1;
      }
      await goto(page, shot.url.replaceAll('{locale}', locale), {
        keepNavbar: shot.keepNavbar ?? false,
        wait: shot.wait ?? 1800,
      });
      if (shot.hideInShadow) await hideInShadow(page, shot.hideInShadow);
      if (shot.css) await page.addStyleTag({ content: shot.css });
      if (shot.hook) {
        const hook = await import(join(ROOT, 'screenshots', shot.hook));
        await hook.prepare(page, { locale, shot, reinject, tag });
      }
      let res;
      if (shot.crop.selector) res = await shootEl(page, shot.crop.selector, dest);
      else if (shot.crop.union) res = await shootUnion(page, shot.crop.union, dest, { pad: shot.crop.pad ?? 8 });
      else if (shot.crop.clip) res = await shootClip(page, shot.crop.clip, dest);
      else throw new Error(`shot ${shot.id}: crop needs selector, union, or clip`);
      results.push({ id: shot.id, locale, dest, ...res });
      console.log(`[${res.ok ? 'ok' : 'SIZE-MISMATCH'}] ${shot.id} (${locale}) ${res.pngWidth}x${res.pngHeight} -> ${dest}`);
      if (shot.must_show) console.log(`       must show: ${shot.must_show.join('; ')}`);
    } catch (error) {
      results.push({ id: shot.id, locale, ok: false, error: error.message });
      console.error(`[FAIL] ${shot.id} (${locale}): ${error.message}`);
    }
  }
}

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} ok.`);
if (scenarios.length > 0) console.log('Remember to run the teardown scripts.');
if (failed.length > 0) process.exit(1);
