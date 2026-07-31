// Shot 18: my-profile. Already captured (see en/nl/faq/api-tokens/my-profile-*.png) by
// the proven scratch script; this hook reproduces the same interaction for a future
// re-run through capture.mjs. Opens the user menu dropdown; yaml crops the union of
// the toggle button and the open menu.
export async function prepare(page) {
  await page.locator('#user-menu-toggle').click();
  await page.waitForTimeout(500);
}
