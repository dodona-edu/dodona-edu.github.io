// G-9 (grade overview tab) and G-10 (grading feedback page) on evaluation 1.
// Ported from capture-en-part4.mjs.
import { capHeight } from './_util.mjs';

export async function prepare(page, { locale, shot }) {
  if (shot.id === 'G-9') {
    await page.locator('a[href="#grading-details"]').click();
    await page.waitForTimeout(700);
    await capHeight(page, '.card.mt-3', 1100);
    return;
  }
  if (shot.id === 'G-10') {
    const text = locale === 'nl' ? 'Evalueren' : 'Evaluate';
    await page.locator(`a:has-text("${text}")`).first().click();
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
    return;
  }
  throw new Error(`grading-eval1 hook: no case for ${shot.id}`);
}
