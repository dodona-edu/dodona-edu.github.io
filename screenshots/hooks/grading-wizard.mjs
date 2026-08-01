// Walks the "new evaluation" wizard on series 52 far enough to reach the
// step each shot needs, then tags/caps it for the crop. Ported from
// capture-en-wizard.mjs, capture-en-g5g6.mjs and capture-en-g6fix.mjs (the
// scripts whose output is the final G-2..G-6 PNGs).
//
// Each shot re-walks the wizard from scratch (rather than assuming an
// earlier shot already advanced it) so `--id G-6` works on its own; the
// state/grading-wizard-series52 scenario keeps series 52 evaluation-free
// between runs. The wizard panel ids (info-panel, users-panel, choice-panel,
// items-panel) are stable across locales; button/radio text is not.
import { capHeight } from './_util.mjs';

const TEXT = {
  en: { yes: 'Yes', addScoreItems: 'Add score items', rows: ['Correctness', 'Style', 'Comments'] },
  nl: { yes: 'Ja', addScoreItems: 'Voeg scoreonderdelen toe', rows: ['Correctheid', 'Stijl', 'Commentaar'] },
};

async function submitDeadline(page) {
  await page.locator('button[form="new_evaluation"]').first().click();
  await page.waitForTimeout(1500);
}

async function finishUsersStep(page) {
  await page.locator('#users-step-finish-button').click();
  await page.waitForTimeout(1200);
}

async function chooseYes(page, t) {
  await page.locator('#choice-panel [role="radio"]').filter({ hasText: t.yes }).click();
  await page.waitForTimeout(1500);
}

// Tag the first exercise block that still offers "Add score items" (works
// for either exercise on series 52; the manifest doesn't require a specific
// one for G-5/G-6).
async function tagScoreItemsBlock(page, t) {
  await page.evaluate((text) => {
    const btn = [...document.querySelectorAll('button, a')].find((el) => el.textContent.includes(text));
    const card = btn ? (btn.closest('.card') || btn.closest('fieldset') || btn.parentElement) : null;
    if (card) card.setAttribute('data-shot', 'g5-block');
  }, t.addScoreItems);
}

async function openAndFillScoreItems(page, t) {
  await page.locator(`[data-shot="g5-block"] button:has-text("${t.addScoreItems}"), [data-shot="g5-block"] a:has-text("${t.addScoreItems}")`).first().click();
  await page.waitForTimeout(1000);
  for (let i = 0; i < t.rows.length; i++) {
    const nameInput = page.locator(`[data-shot="g5-block"] input[data-col="name"][data-row="${i}"]`);
    if (await nameInput.count() === 0) break;
    await nameInput.fill(t.rows[i]);
    await page.locator(`[data-shot="g5-block"] input[data-col="maximum"][data-row="${i}"]`).fill(i === 2 ? '2' : '4');
    await page.waitForTimeout(300);
  }
  await page.keyboard.press('Tab');
  await page.waitForTimeout(400);
}

export async function prepare(page, { locale, shot }) {
  const t = TEXT[locale] ?? TEXT.en;

  if (['G-3', 'G-4', 'G-5', 'G-6'].includes(shot.id)) await submitDeadline(page);

  if (shot.id === 'G-3') {
    await capHeight(page, '#users-panel', 900);
    return;
  }

  if (['G-4', 'G-5', 'G-6'].includes(shot.id)) await finishUsersStep(page);
  if (shot.id === 'G-4') return;

  await chooseYes(page, t);
  await tagScoreItemsBlock(page, t);
  if (shot.id === 'G-5') return;

  if (shot.id === 'G-6') await openAndFillScoreItems(page, t);
}
