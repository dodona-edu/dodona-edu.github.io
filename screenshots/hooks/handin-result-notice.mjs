// Hook for the "New result!" notice in the hand-in card (guides/students/exercises).
//
// The notice only appears when a submission finishes judging while the student is
// looking at another submission, which the dev server cannot reproduce on demand: the
// judge either fails at once or takes an unpredictable time. So the hook does the part
// a student does (open an earlier submission from the history dropdown), then fills in
// the notice the same way exercise.ts does: it sets the `submission` property on the
// <d-result-notice> element in the card. The rendering, labels and "View result" action
// are the real component's.
//
// Shot fields: resultNotice: { id, status } -- the submission the notice announces
// (use the student's real latest submission, so "View result" opens it).

export async function prepare(page, { shot }) {
  await page.locator('.handin-card .card-eyebrow .dropdown-toggle').click();
  await page.waitForTimeout(500);
  // Rows are newest first; the last one is the oldest submission.
  await page.locator('d-submission-history .submission-history-row').last().click();
  await page.waitForTimeout(2500);

  await page.evaluate((submission) => {
    document.querySelector('d-result-notice').submission = submission;
  }, shot.resultNotice);
  await page.waitForTimeout(600);
}
