// Shot 8: saved-comments-search. Same comment form as shot 7, opened fresh (the
// previous shot's form doesn't survive capture.mjs's reload), search field left
// empty so the "Click here to manage all saved comments" link underneath is visible.
// Cancels afterwards.
import { gotoAnnotatedSubmission, hideCodeLinesAfter, ensureQuestion1Answered, ensureLoopCommentSaved } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  await gotoAnnotatedSubmission(page, locale);
  await ensureQuestion1Answered(page, locale);
  await ensureLoopCommentSaved(page, locale);
  await hideCodeLinesAfter(page, 8);

  await page.locator('#line-5 .rouge-gutter').hover();
  await page.waitForTimeout(300);
  await page.locator('#line-5 .annotation-button .btn-fab-small-flex').click();
  await page.waitForTimeout(400);
  // Search field left empty on purpose -- this is what surfaces the manage-link line.
}
