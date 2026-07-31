// Interactions for the user-management shots that need more than a plain
// crop: filtering the members table (UM-3), hovering a progress tooltip
// (UM-4), finding an admin+student row pair (UM-5), and a left-margin strip
// of the table (UM-6). Ported from capture-en.mjs / capture-nl-um4.mjs
// (the versions that produced the final PNGs).
import { markRect } from './_util.mjs';

const MEMBERS_CARD = '#main-container .card';

async function filterMembers(page) {
  await page.waitForSelector('button[id^="dropdownMenu-course_labels-"]:not([disabled])', { timeout: 15000 });
  await page.locator('button[id^="dropdownMenu-course_labels-"]').first().click();
  await page.waitForTimeout(300);
  await page.locator('.dropdown-menu.show label:has-text("5a")').first().click();
  await page.waitForTimeout(500);
  await page.keyboard.press('Escape');

  await page.waitForSelector('button[id^="dropdownMenu-institution_id-"]:not([disabled])', { timeout: 15000 });
  await page.locator('button[id^="dropdownMenu-institution_id-"]').first().click();
  await page.waitForTimeout(300);
  await page.locator('.dropdown-menu.show label:has-text("Universiteit Gent")').first().click();
  await page.waitForTimeout(600);
  await page.keyboard.press('Escape');
}

// Hover the progress bar of a row with real (non-zero) progress so its
// tooltip renders, then mark the bar+tooltip union as the crop target.
async function hoverProgressTooltip(page, locale) {
  const rows = page.locator(`${MEMBERS_CARD} table tbody tr`);
  const count = await rows.count();
  const richProgress = locale === 'nl'
    ? /[1-9]\d* activiteiten? gestart.*[1-9]/i
    : /Started [1-9]\d* activit(y|ies)\. Completed [1-9]/i;

  let bar = null;
  for (let i = 0; i < count; i++) {
    const candidate = rows.nth(i).locator('.progress-chart').first();
    if (await candidate.count() === 0) continue;
    const label = await rows.nth(i).locator('[aria-label]').first().getAttribute('aria-label').catch(() => null);
    if (label && richProgress.test(label)) { bar = candidate; break; }
  }
  if (!bar) {
    // fallback: first row with any non-zero-width progress bar
    for (let i = 0; i < count; i++) {
      const candidate = rows.nth(i).locator('.progress-chart').first();
      if (await candidate.count() === 0) continue;
      const box = await candidate.boundingBox();
      if (box && box.width > 0) { bar = candidate; break; }
    }
  }
  if (!bar) throw new Error('UM-4: no row with a visible progress tooltip found');

  await bar.hover();
  await page.waitForTimeout(500);
  const tooltip = page.locator('.tooltip.show, .tooltip').last();
  await tooltip.waitFor({ state: 'visible', timeout: 3000 });
  const barBox = await bar.boundingBox();
  const ttBox = await tooltip.boundingBox();
  const x0 = Math.min(barBox.x, ttBox.x) - 12;
  const y0 = Math.min(barBox.y, ttBox.y) - 10;
  const x1 = Math.max(barBox.x + barBox.width, ttBox.x + ttBox.width) + 12;
  const y1 = Math.max(barBox.y + barBox.height, ttBox.y + ttBox.height) + 10;
  await markRect(page, { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }, 'um4-tooltip');
}

// Tag the first row (an admin row, has the course-mdi-icon margin icon) and
// the first plain student row (no margin icon) so crop.union can pair them.
async function tagAdminAndStudentRow(page) {
  const rows = page.locator(`${MEMBERS_CARD} table tbody tr`);
  const count = await rows.count();
  await rows.nth(0).evaluate((el) => el.setAttribute('data-shot', 'um5-admin'));
  for (let i = 0; i < count; i++) {
    const iconCount = await rows.nth(i).locator('td').first().locator('i.course-mdi-icon').count();
    if (iconCount === 0) {
      await rows.nth(i).evaluate((el) => el.setAttribute('data-shot', 'um5-student'));
      return;
    }
  }
  throw new Error('UM-5: no plain student row found on the first page of the members table');
}

// Mark the left half of the table's top rows (admin-icon margin column).
async function markAdminIconStrip(page) {
  const box = await page.locator(`${MEMBERS_CARD} table`).first().boundingBox();
  await markRect(page, { x: box.x, y: box.y, width: Math.min(box.width, 550), height: 220 }, 'um6-strip');
}

export async function prepare(page, { locale, shot }) {
  switch (shot.id) {
    case 'UM-3':
      await filterMembers(page);
      break;
    case 'UM-4':
      await hoverProgressTooltip(page, locale);
      break;
    case 'UM-5':
      await tagAdminAndStudentRow(page);
      break;
    case 'UM-6':
      await markAdminIconStrip(page);
      break;
    case 'UM-7':
      await page.waitForFunction(() => !document.body.innerText.includes('Loading...'), { timeout: 15000 }).catch(() => {});
      await page.waitForTimeout(1000);
      break;
    default:
      throw new Error(`user-management hook: no case for ${shot.id}`);
  }
}
