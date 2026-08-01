// Shot 14: all-questions-page. Shoots the questions card WITHOUT the navigation
// drawer: the drawer's panel overlays the list's left column (a real stacking-context
// quirk on this page), so opening it hides the user/course cells. The prose describes
// the drawer navigation in words; the shot shows the page itself.
// Seeded lorem questions from courses 1-4 will also be in the table -- per the
// coordinator decision, hide them with CSS rather than destroying seed data (only
// course 29's rows should show).
export async function prepare(page, { locale, tag }) {
  // `:has-text()` is a Playwright locator extension, not real CSS, so this filter
  // has to run as a DOM walk rather than an injected stylesheet.
  await page.evaluate(() => {
    document.querySelectorAll('.question-table tbody tr, tbody tr').forEach((tr) => {
      const text = tr.textContent ?? '';
      if ((/ago|geleden/.test(text)) && !/Programming 1|Programmeren 1/.test(text)) {
        tr.style.setProperty('display', 'none', 'important');
      }
    });
    // Tag the content card holding the filter bar for a stable crop.
    const label = [...document.querySelectorAll('*')].find((el) =>
      /^(Only show my students|Toon enkel mijn studenten)$/.test(el.textContent?.trim() ?? '') && el.children.length === 0);
    label?.closest('.card')?.setAttribute('data-shot', 'questions');
  });
  await page.waitForTimeout(300);
}
