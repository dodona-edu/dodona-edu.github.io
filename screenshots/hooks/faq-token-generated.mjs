// Shot 20: token-generated. Same as shot 19, then actually submits to create the
// token (a real dev-server token, fine to show; it's cleaned up as a stray token by
// the next pass's faq-token-form.mjs run -- or manually via the trash icon once both
// locale passes are done, per the manifest's undo note).
import { prepareTokenForm } from './faq-token-form.mjs';

export async function prepare(page) {
  await prepareTokenForm(page);
  await page.locator('#new-token-form button[type="submit"]').click();
  await page.waitForTimeout(1200);
  await page.mouse.move(0, 0);
  await page.evaluate(() => {
    document.querySelectorAll('.announcement, .alert-dismissible, .tooltip, .toasts, .toast')
      .forEach((el) => el.style.setProperty('display', 'none', 'important'));
  });
  await page.waitForTimeout(800);
}
