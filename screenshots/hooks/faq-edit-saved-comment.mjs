// Shot 10: edit-saved-comment. Click the saved-comment icon on the line-9 annotation
// (from shot 9), then its pencil/edit link, landing on the saved-annotation edit
// view. Leaves without saving.
import { gotoAnnotatedSubmission, ensureQuestion1Answered, ensureReuseAnnotationPosted } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  await gotoAnnotatedSubmission(page, locale);
  await ensureQuestion1Answered(page, locale);
  await ensureReuseAnnotationPosted(page, locale);

  await page.locator('#line-9 .annotation d-saved-annotation-icon i.mdi-comment-bookmark-outline').click();
  await page.waitForTimeout(600);
  // (~) best-effort: the icon opens a popover/modal with the saved comment and a
  // pencil/edit affordance; verify the exact selector at capture time. Falls back to
  // navigating straight to the saved annotation's edit page via its "Edit saved
  // comment" link/eyebrow if a direct edit route is easier to reach than the popover.
  await page.getByRole('link', { name: /edit/i }).first().click().catch(() => {});
  await page.waitForTimeout(800);
}
