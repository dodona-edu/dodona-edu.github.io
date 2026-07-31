// Shot 13: course-card-questions. Zeus's homepage; the "My courses" year dropdown
// has to be switched to 2025-2026 for the Programming 1 card to render at all (the
// `?year=` URL param does not do this, confirmed in the manifest's dev-instance
// facts). Tags the Programming 1 card so the yaml can crop just that one.
export async function prepare(page) {
  // (~) best-effort: exact dropdown selector unconfirmed: try a labelled button
  // first, fall back to any element whose visible text is an academic-year range.
  const yearToggle = page.getByRole('button', { name: /academic year|202\d-202\d/i }).first();
  if (await yearToggle.count() > 0) {
    await yearToggle.click();
    await page.waitForTimeout(300);
    await page.getByText('2025-2026', { exact: false }).first().click();
    await page.waitForTimeout(800);
  }

  await page.evaluate(() => {
    const icon = document.querySelector('.course-card .card-row-leading i.mdi-account-question');
    const card = icon?.closest('.course-card');
    if (card) card.setAttribute('data-shot', 'course-card-questions');
  });
}
