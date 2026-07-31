// Shot 21: course-copy. Opens the kebab menu on course 9's header card. Already
// captured; reproduced here for a future re-run through capture.mjs.
//
// NOTE: the coordinator decision for the FAQ manifest says to rename course 9 to
// "Uitgelichte cursus" for the NL pass (undo afterwards) -- the already-placed
// nl/faq/featured-courses/course-copy-nl.png was produced by the proven scratch
// script, which does NOT do this rename, so it likely still shows the English name
// "Featured course". Flagged in the task report; a state scenario
// (faq-course9-rename) is included below for whoever re-shoots it.
export async function prepare(page) {
  await page.locator('.card .btn.btn-icon.dropdown-toggle').first().click();
  await page.waitForTimeout(600);
}
