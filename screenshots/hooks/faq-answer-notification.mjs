// Shot 16: answer-notification. Sofie's homepage, navbar visible (yaml sets
// keepNavbar), bell dropdown opened. Relies on some Annotation having been created on
// her submission earlier in the chain (any of shots 4-9) -- creating one destroys the
// notification for any earlier one and creates a fresh "new comment on your code"
// notification (Annotation#create_notification, app/models/annotation.rb:100-106), so
// whichever ran last is what shows here; the message text is the same regardless.
import { reinject } from '../lib.mjs';

export async function prepare(page) {
  await page.locator('#navbar-notifications-toggle').click();
  await page.waitForTimeout(500);
  await reinject(page, { keepNavbar: true });
}
