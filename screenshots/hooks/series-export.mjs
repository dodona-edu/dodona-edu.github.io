// Walks the submissions-export wizard (series 54) to the step each shot
// needs. Ported from capture-en-part2.mjs / capture-nl-se.mjs. The wizard's
// panel ids (choose-panel, choose-options-panel, downloading-panel) and
// button ids (check-all, next_step, start-download) are stable across
// locales, so no locale-specific text is needed here.
export async function prepare(page, { shot }) {
  await page.locator('#check-all').click();
  await page.waitForTimeout(200);
  await Promise.all([
    page.waitForLoadState('load'),
    page.locator('#next_step').click(),
  ]);
  await page.waitForTimeout(1000);

  if (shot.id === 'SE-3') return;

  if (shot.id === 'SE-4') {
    const startBtn = page.locator('#start-download');
    await startBtn.scrollIntoViewIfNeeded();
    await startBtn.click();
    await page.waitForTimeout(2500);
    return;
  }

  throw new Error(`series-export hook: no case for ${shot.id}`);
}
