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
// Selectors are best-effort from the manifest's prose ("pink circle to the left of the line
// number", "Type the question... click Ask question") -- nothing here was checked against a
// live DOM; expect to adjust once run against the real dev instance.
export async function prepare(page, { shot }) {
  await page.getByText('Code', { exact: true }).first().click();
  await page.waitForTimeout(500);

  const line = page.locator('.code-listing-container tr, .code-listing-container .line').nth((shot.hoverLine ?? 16) - 1);
  await line.hover();
  await page.waitForTimeout(300);
  if (shot.frame === 1) return; // pink bubble on the hovered line

  const bubble = line.locator('[class*="question" i], [class*="ask" i]').first();
  await bubble.click();
  await page.waitForTimeout(400);
  if (shot.frame === 2) {
    const editor = page.locator('.code-listing-container textarea, .code-listing-container [contenteditable="true"]').first();
    await editor.fill(shot.questionText ?? 'Why do we need this line?');
    await page.waitForTimeout(300);
    return;
  }

  // frame 3: the Question row already exists (students-question-posted-{en,nl}); just give
  // the thread a moment to render after the Code-tab reload above.
  await page.waitForTimeout(300);
}
