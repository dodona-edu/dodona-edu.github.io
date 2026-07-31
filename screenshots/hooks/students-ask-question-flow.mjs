// D15b: the 3 still frames for the ask-question gif (student.ask_question.gif ->
// ask-question-{en,nl}.gif). capture.mjs only writes PNGs, so each frame is captured as a
// normal shot (`frame: 1 | 2 | 3` on the yaml entry) and a separate, later step outside
// capture.mjs stitches frame1..frame3 into the gif (ffmpeg crossfade + palette-gen, per
// capture-decisions.md "Students" #2 / manifest Stage-0 decision 2). Mark the resulting gif
// as a stitched preview in the PR, replaceable later with a real screen recording.
//
// Frame 3 (the posted question thread) needs the students-question-posted-{en,nl} state
// scenario applied first -- it does NOT post the question itself, it only lets the
// already-created Question render (submitting it live here would defeat the point of
// expressing that state as a setup script instead of a UI interaction).
//
// Selectors verified against a live dev instance (2026-07-31 capture run).
import { clickFirstVisible, localiseText } from './students-interact.mjs';

export async function prepare(page, { locale, shot }) {
  // .first() on a plain getByText('Code') can land on a second, hidden "Code" label the
  // submission page renders (verified live) and hang forever -- see clickFirstVisible.
  await clickFirstVisible(page, 'Code');
  await page.waitForTimeout(500);

  const line = page.locator('.code-listing-container tr, .code-listing-container .line').nth((shot.hoverLine ?? 16) - 1);
  await line.hover();
  await page.waitForTimeout(300);
  if (shot.frame === 1) return; // pink bubble on the hovered line

  if (shot.frame === 3) {
    // The Question row already exists (students-question-posted-{en,nl}) and renders inline
    // on the Code tab without any click -- clicking the "Ask question" bubble here would open
    // a SECOND, empty compose box instead (verified live: that's a fresh-question editor, not
    // the posted thread), so frame 3 must skip the bubble entirely.
    await page.waitForTimeout(300);
    return;
  }

  // Verified live: the per-line bubble is a d-create-annotation-button custom element in the
  // gutter cell with a plain `button[aria-label="..."]` inside (btn-fab-small-flex). The
  // label is `t('js.annotations.add_question')`, which is locale-dependent ("Ask question" /
  // "Stel een vraag") -- a bare English selector times out on the NL pass since that button
  // never appears at all under that name (verified live: 0 matches on /nl/).
  const askQuestionLabel = { en: 'Ask question', nl: 'Stel een vraag' }[locale] ?? 'Ask question';
  const bubble = line.locator(`button[aria-label="${askQuestionLabel}"]`).first();
  await bubble.click();
  await page.waitForTimeout(400);
  if (shot.frame === 2) {
    const editor = page.locator('.code-listing-container textarea, .code-listing-container [contenteditable="true"]').first();
    await editor.fill(localiseText(shot.questionText, locale) ?? 'Why do we need this line?');
    await page.waitForTimeout(300);
  }
}
