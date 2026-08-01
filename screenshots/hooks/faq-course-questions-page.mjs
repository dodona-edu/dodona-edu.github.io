// Shot 12: course-questions-page. Needs a second, unanswered, global question from
// Sofie on a *different* submission (S1351, the seeded Counter solution) so the
// course questions page shows one unanswered + one answered entry. This shot's own
// `user` is zeus (1), so the hook signs in as Sofie first to post the question, then
// signs back in as zeus before navigating to the questions page -- capture.mjs's own
// user-tracking isn't aware of this swap, but the cookie state is what matters and it
// ends up correct.
import { BASE, signIn, goto, reinject } from '../lib.mjs';
import { STRINGS } from './faq-lib.mjs';

const COUNTER_SUBMISSION_ID = 1351;

export async function prepare(page, { locale }) {
  const s = STRINGS[locale];

  await signIn(page, 5); // Sofie
  await goto(page, `/${locale}/submissions/${COUNTER_SUBMISSION_ID}/#code`, { wait: 1500 });
  const already = await page.locator('.annotation.question', { hasText: s.question2 }).count();
  if (already === 0) {
    await page.locator('.code-listing-container .feedback-table-options button.btn-outline', { hasText: s.askGlobalQuestion }).click();
    await page.waitForTimeout(400);
    await page.locator('#annotation-text').fill(s.question2);
    await page.locator('d-annotation-form .btn.btn-filled').click();
    await page.waitForTimeout(1000);
  }

  await signIn(page, 1); // back to zeus for this shot's own view
  await goto(page, `/${locale}/courses/29/questions/`, { wait: 1800 });
  await reinject(page);
}
