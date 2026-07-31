// Generic hook for "series/course card kebab menu open" shots (CC-1, ESM-2,
// SE-1). Reads shot.menu_toggle: the dropdown-toggle button to click.
export async function prepare(page, { shot }) {
  const toggle = page.locator(shot.menu_toggle).first();
  await toggle.scrollIntoViewIfNeeded();
  await toggle.click();
  await page.waitForTimeout(300);
}
