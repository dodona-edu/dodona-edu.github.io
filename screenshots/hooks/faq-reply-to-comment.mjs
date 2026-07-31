// Shot 17: reply-to-comment. Sofie views the teacher's "Loop required" comment
// (shots 5/6) and the "Reply..." field beneath it. Read-only view, no submission.
import { gotoAnnotatedSubmission, hideCodeLinesAfter } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  await gotoAnnotatedSubmission(page, locale);
  await hideCodeLinesAfter(page, 10);
}
