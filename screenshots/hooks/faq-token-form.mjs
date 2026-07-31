// Shared prep for shots 19 (create-new-token) and 20 (token-generated). Already
// captured (see en/nl/faq/api-tokens/{create-new-token,token-generated}-*.png) by the
// proven scratch script (capture-faq18-21.mjs); reproduced here for a future re-run
// through capture.mjs.
export async function prepareTokenForm(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.announcement, .alert-dismissible, .tooltip, .toasts, .toast')
      .forEach((el) => el.style.setProperty('display', 'none', 'important'));
  });

  // Hide the dev-only "Seeded token (= student)" row -- realistic to have an existing
  // token, but the wording is a dev artifact.
  await page.evaluate(() => {
    document.querySelectorAll('.card-row-title').forEach((el) => {
      if (/Seeded token/i.test(el.textContent ?? '')) {
        el.closest('[id^="api-token-"]')?.setAttribute('style', 'display:none');
      }
    });
  });

  // Delete any stray non-seeded token left over from a previous (e.g. other-locale)
  // pass, so it doesn't leak into this pass's "before" screenshot. This is also what
  // covers "token cleanup between passes" -- there's no separate Rails-runner state
  // scenario for it, it's self-cleaning here.
  await page.evaluate(() => {
    document.querySelectorAll('[id^="api-token-"]').forEach((row) => {
      const title = row.querySelector('.card-row-title')?.textContent ?? '';
      if (!/Seeded token/i.test(title)) {
        row.querySelector('form.button_to button[type="submit"]')?.click();
      }
    });
  });
  await page.waitForTimeout(800);

  await page.evaluate(() => {
    const card = document.querySelector('#api_token_description')?.closest('.card');
    if (card) card.setAttribute('data-shot', 'api-tokens-card');
  });

  await page.locator('#api_token_description').fill('pycharm');
  await page.waitForTimeout(300);
}
