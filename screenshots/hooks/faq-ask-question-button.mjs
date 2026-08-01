// Shot 1: ask-question-button. Student view, before any question exists: hover a
// code line's gutter so the pink "Ask question" bubble is showing, keep the crop to
// the first ~8 lines (the ISBN exercise runs to ~19).
import { gotoAnnotatedSubmission, hideCodeLinesAfter } from './faq-lib.mjs';

export async function prepare(page, { locale }) {
  await gotoAnnotatedSubmission(page, locale);
  await hideCodeLinesAfter(page, 8);
  await page.locator('#line-6 .rouge-gutter').hover();
  await page.waitForTimeout(400);
}
