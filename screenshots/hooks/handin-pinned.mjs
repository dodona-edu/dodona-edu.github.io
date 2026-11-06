// Hook for the pinned hand-in card (guides/students/exercises).
//
// Runs the generic student interactions first (clickText 'Clear editor', the iframe
// profiler fix), then clicks the pin button in the card header and types a short
// solution, so the pinned card shows code next to the description.
//
// The card stores the pinned choice in localStorage (`handin_pinned`), and capture.mjs
// reuses one page for every shot. The hook removes the key right after pinning: the card
// stays pinned for this capture, and the next shots load unpinned again.

import { prepare as interact } from './students-interact.mjs';

const CODE = 'print(input())\n';

export async function prepare(page, ctx) {
  await interact(page, ctx);
  await page.locator('.handin-card [data-handin-action="pin"]').click();
  await page.locator('d-handin-card[pinned]').waitFor({ state: 'attached' });
  await page.evaluate(() => localStorage.removeItem('handin_pinned'));
  await page.locator('.handin-card .cm-content').first().click();
  await page.keyboard.type(CODE, { delay: 5 });
  // Leave the editor so the shot shows no focus ring or cursor line, and let the
  // column transition settle.
  await page.evaluate(() => document.activeElement?.blur());
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
}
