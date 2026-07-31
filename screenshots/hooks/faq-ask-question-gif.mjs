// Shot 2: ask-question-en.gif / ask-question-nl.gif. NOT expressible as a single
// crop -- capture.mjs always writes exactly one PNG per shot per locale (outputPath()
// hardcodes the `.png` extension), and there is no video/gif capture path in
// playwright-core (see the dev-and-media cookbook, section 4: "Playwright cannot
// record video").
//
// So this hook does two things:
//   1. Drives the real "ask a question" flow end to end (hover -> open form -> type
//      -> submit), which is required anyway: it creates Question 1, the fact every
//      later teacher-side shot in this chain depends on. It dumps a screenshot after
//      each step into screenshots/.frames/<id>-<locale>/ for a human to stitch into a
//      gif afterwards (see the `post:` field on this shot in shots/faq.yaml for the
//      exact ffmpeg command -- gitignore that .frames/ dir, it is scratch output).
//   2. Leaves the page on the final "posted question thread" state, which
//      shots/faq.yaml crops as an ordinary PNG via the normal union crop. That PNG is
//      a fallback/preview (same naming as the other shots, `-en.png`/`-nl.png`, not
//      the shipped `.gif`) -- useful to sanity-check the end state, not the deliverable.
//
// Marked `manual: false` in the yaml per the task's instructions: the runner *can*
// support this (it produces a valid image for the id, plus the frame dump as a side
// effect), it just can't produce the .gif itself.
import { mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { gotoAnnotatedSubmission, STRINGS } from './faq-lib.mjs';
import { reinject } from '../lib.mjs';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..', '..');

export async function prepare(page, { locale, shot }) {
  const s = STRINGS[locale];
  const frameDir = join(ROOT, 'screenshots', '.frames', `${shot.id}-${locale}`);
  mkdirSync(frameDir, { recursive: true });

  await gotoAnnotatedSubmission(page, locale);

  const already = await page.locator('#line-16 .annotation.question').count();
  if (already > 0) {
    // Question 1 already exists (re-running this shot in isolation) -- nothing to
    // animate, just leave the thread visible for the fallback crop.
    return;
  }

  // Frame 0: hover the gutter, bubble visible, nothing open yet.
  await page.locator('#line-16 .rouge-gutter').hover();
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(frameDir, '0-bubble.png'), scale: 'device' });

  // Frame 1: bubble clicked, empty question form open.
  await page.locator('#line-16 .annotation-button .btn-fab-small-flex').click();
  await page.waitForTimeout(400);
  await page.screenshot({ path: join(frameDir, '1-form.png'), scale: 'device' });

  // Frame 2: question typed, not yet submitted.
  await page.locator('#annotation-text').fill(s.question1);
  await page.waitForTimeout(300);
  await page.screenshot({ path: join(frameDir, '2-typed.png'), scale: 'device' });

  // Frame 3: submitted for real. This creates Question 1 -- required by shots 3-17.
  await page.locator('d-annotation-form .btn.btn-filled').click();
  await page.waitForTimeout(1000);
  await reinject(page);
  await page.screenshot({ path: join(frameDir, '3-posted.png'), scale: 'device' });
}
