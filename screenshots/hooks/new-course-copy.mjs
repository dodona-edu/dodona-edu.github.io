// CC-2: the new course page with "Existing course" chosen. Picks the copy
// option in the type step, waits for the course list of the course step, and
// caps that step's height so the crop shows the search, the filters and the
// first rows.
import { capHeight } from './_util.mjs';

export async function prepare(page, { shot }) {
  await page.locator('#copy-course').first().click({ force: true });
  await page.locator('#course-step table tbody input[type="radio"]').first().waitFor({ state: 'visible', timeout: 10000 });
  await page.waitForTimeout(500);
  await capHeight(page, '#course-step', shot.cap_height ?? 560);
}
