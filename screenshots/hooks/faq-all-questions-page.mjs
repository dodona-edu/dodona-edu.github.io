// Shot 14: all-questions-page. Opens the side drawer (hamburger) so the "Questions"
// nav item is visible alongside the questions card. Seeded lorem questions from
// courses 1-4 will also be in the table -- per the coordinator decision, hide them
// with CSS rather than destroying seed data (only course 29's rows should show).
import { reinject } from '../lib.mjs';

export async function prepare(page, { locale }) {
  await page.locator('.drawer-toggle[data-bs-target="#drawer"]').click();
  await page.waitForTimeout(400);
  await reinject(page, { keepNavbar: true });

  // `:has-text()` is a Playwright locator extension, not real CSS, so this filter
  // has to run as a DOM walk rather than an injected stylesheet.
  await page.evaluate(() => {
    document.querySelectorAll('.question-table tbody tr').forEach((tr) => {
      if (!/Programming 1|Programmeren 1/.test(tr.textContent ?? '')) {
        tr.style.setProperty('display', 'none', 'important');
      }
    });
  });
}
