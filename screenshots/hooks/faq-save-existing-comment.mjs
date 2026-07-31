// Shot 6: save-existing-comment. Teacher opens the kebab menu on an already-posted
// (but not yet saved) comment on lines 2-10, showing the "Save comment" menu item --
// which only renders while the comment isn't linked to a SavedAnnotation yet, so this
// has to run before ensureLoopCommentSaved().
import { gotoAnnotatedSubmission, ensureQuestion1Answered, ensureLoopCommentPosted, STRINGS } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  const s = STRINGS[locale];
  await gotoAnnotatedSubmission(page, locale);
  await ensureQuestion1Answered(page, locale);
  await ensureLoopCommentPosted(page, locale);

  const row = page.locator('.annotation.user', { hasText: s.comment2Text }).first();
  await row.scrollIntoViewIfNeeded();
  await row.locator('button.dropdown-toggle[id^="annotation-options-toggle-"]').click();
  await page.waitForTimeout(300);
}
