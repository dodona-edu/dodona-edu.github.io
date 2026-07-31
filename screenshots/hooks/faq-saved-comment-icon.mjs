// Shot 9: saved-comment-icon. Posts a third annotation on line 9 by reusing
// SavedAnnotation 2 through the search dropdown, then crops that single annotation
// row so the saved-comment bookmark icon in its header is visible.
import { gotoAnnotatedSubmission, hideCodeLinesAfter, ensureQuestion1Answered, ensureReuseAnnotationPosted } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  await gotoAnnotatedSubmission(page, locale);
  await ensureQuestion1Answered(page, locale);
  await ensureReuseAnnotationPosted(page, locale);
  await hideCodeLinesAfter(page, 10);

  // Tag the posted annotation's row so the yaml can crop it precisely.
  await page.evaluate(() => {
    const row = document.querySelector('#line-9 .annotation');
    if (row) row.setAttribute('data-shot', 'saved-comment-icon');
  });
}
