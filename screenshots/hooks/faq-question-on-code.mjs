// Shot 3: question-on-code. Teacher (zeus, displayed as "Your teacher") sees Sofie's
// unanswered question. Do NOT click/focus the reply field -- that flips the question
// to "in progress" and the manifest wants the plain unanswered state.
import { gotoAnnotatedSubmission, hideCodeLinesBefore } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  await gotoAnnotatedSubmission(page, locale);
  // Crop lines ~12-16 + the question thread instead of the whole ~19-line listing.
  await hideCodeLinesBefore(page, 12);
}
