// Shot 4: save-comment-while-writing. Teacher opens the reply form on Question 1,
// types the reply, ticks "Save comment", and gives it a title -- but does NOT submit
// (the shot is the mid-write moment). Because capture.mjs reloads the page before
// every shot, this draft can't be picked up by a later hook; shots 5+ instead call
// ensureQuestion1Answered() themselves to (re)create the submitted reply from scratch
// when they need it.
import { gotoAnnotatedSubmission, hideCodeLinesBefore, STRINGS } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  const s = STRINGS[locale];
  await gotoAnnotatedSubmission(page, locale);
  await hideCodeLinesBefore(page, 12);

  const alreadyAnswered = await page.locator('#line-16 .annotation.user').count();
  if (alreadyAnswered > 0) {
    // Question 1 is already answered (re-running this shot after shot 5+ ran) --
    // there's no unanswered draft moment left to show. Fall back to showing the
    // reply form open on a fresh edit of the existing reply so the crop still makes
    // sense, rather than failing outright.
    await page.locator('#line-16 .annotation.user .btn.dropdown-toggle').first().click();
    await page.waitForTimeout(300);
    return;
  }

  await page.locator('#line-16 .fake-input input.form-control').click();
  await page.waitForTimeout(400);
  await page.locator('#annotation-text').fill(s.reply1Text);
  await page.locator('#check-save-annotation').check();
  await page.locator('#saved-annotation-title').fill(s.savedAnnotation1Title);
  await page.waitForTimeout(300);
}
