// GS-1: switch the sample-solutions tab to the locale's Python solution
// before cropping. Ported from capture-gs1-fix.mjs / capture-nl-part4.mjs.
export async function prepare(page, { locale }) {
  const tab = locale === 'nl' ? 'solution.nl.py' : 'solution.en.py';
  await page.locator(`a[data-bs-toggle="tab"]:has-text("${tab}")`).click();
  await page.waitForTimeout(500);
}
