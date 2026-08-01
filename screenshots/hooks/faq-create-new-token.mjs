// Shot 19: create-new-token. "pycharm" typed into the description field, not yet
// submitted. See faq-token-form.mjs for the shared cleanup/tagging.
import { prepareTokenForm } from './faq-token-form.mjs';

export async function prepare(page) {
  await prepareTokenForm(page);
}
