// Interactions for the course-management shots whose crop is a computed
// rectangle rather than a single element: CM-1/CM-3 (navbar + top-of-header
// strips) and CM-5 (submissions filtered by user + exercise). Ported from
// capture-cm1 (part of capture-en.mjs) / capture-cm3-fix.mjs / capture-cm5-fix.mjs.
import { markRect, capHeight } from './_util.mjs';

async function markCm1(page) {
  const headerBox = await page.locator('#main-container .card').first().boundingBox();
  await markRect(page, { x: 550, y: 0, width: 1600 - 550, height: headerBox.y + 110 }, 'cm1-strip');
}

async function markCm3(page) {
  const headerBox = await page.locator('#main-container .card').first().boundingBox();
  await markRect(page, { x: 0, y: 0, width: 1600, height: headerBox.y + 200 }, 'cm3-strip');
}

// Combine the first row's user + exercise names into one search string
// (clicking both funnel icons separately re-queries in between and can
// desync the two filters; typing the combined text in one go is what
// actually worked).
async function filterCm5(page) {
  const firstRow = page.locator('#main-container .card table tbody tr').first();
  const exerciseName = (await firstRow.locator('td').nth(3).innerText()).trim();
  await firstRow.locator('d-filter-button').nth(0).click();
  await page.waitForTimeout(700);
  const input = page.locator('input.search-filter');
  const current = await input.inputValue();
  await input.fill(`${current} ${exerciseName}`);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(900);
  await capHeight(page, '#main-container .card', 500);
}

export async function prepare(page, { shot }) {
  switch (shot.id) {
    case 'CM-1':
      await markCm1(page);
      break;
    case 'CM-3':
      await markCm3(page);
      break;
    case 'CM-5':
      await filterCm5(page);
      break;
    default:
      throw new Error(`course-management hook: no case for ${shot.id}`);
  }
}
