// Shot 7: reuse-saved-comment. Teacher opens a new comment form on line 5 and types
// "p" into the saved-comment search field, so the dropdown lists both saved comments
// with bold match highlighting. Cancelled afterwards (does not post) -- shot 8 reopens
// its own form rather than relying on this one surviving a reload.
import { gotoAnnotatedSubmission, hideCodeLinesAfter, ensureQuestion1Answered, ensureLoopCommentSaved, STRINGS } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  await gotoAnnotatedSubmission(page, locale);
  await ensureQuestion1Answered(page, locale);
  await ensureLoopCommentSaved(page, locale); // creates SavedAnnotation 1 (via the reply) and 2
  await hideCodeLinesAfter(page, 8);

  await page.locator('#line-5 .rouge-gutter').hover();
  await page.waitForTimeout(300);
  await page.locator('#line-5 .annotation-button .btn-fab-small-flex').click();
  await page.waitForTimeout(400);
  await page.locator('d-saved-annotation-input input.search-filter').fill('p');
  await page.waitForTimeout(400);
}
