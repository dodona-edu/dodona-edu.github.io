// Shot 5: add-comment. Teacher selects lines 2-4 so the selection highlight and the
// pink per-selection "Add comment" bubble both show, next to the toolbar's "Add
// global comment" button.
//
// Continuation from shot 4: submits the pending reply from shot 4 for real first
// (answering Question 1, creating SavedAnnotation 1) -- this has to be redone here
// rather than assumed, because capture.mjs reloads the page before this hook runs.
import { gotoAnnotatedSubmission, hideCodeLinesAfter, ensureQuestion1Answered, selectLines } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  await gotoAnnotatedSubmission(page, locale);
  await ensureQuestion1Answered(page, locale);
  await hideCodeLinesAfter(page, 8);
  await selectLines(page, 2, 4);
}
