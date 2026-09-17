// Hook for AI-1 (faq/annotations, "How do AI draft answers work?"). The shot's
// `url` already points straight at the real, stable submission
// (/{locale}/submissions/557/#code -- see state/question-with-draft.setup.rb for why
// no dynamic-id handoff is needed here, unlike hooks/assessments.mjs), so this hook
// only has to drive the reply-form interaction capture.mjs's plain goto() can't:
// open the reply form by clicking the fake input under the question thread. It
// prefills with the draft only while no teacher reply exists yet (d-thread's
// firstResponse() gate -- see thread.ts) -- our seeded Question is the sole message
// in its thread, so that always holds.

export async function prepare(page) {
  await page.locator('d-thread .fake-input input.form-control').first().click();
  await page.waitForTimeout(1000); // llmResponseState.get() fetches /llm_responses/:id.json before the draft prefills
}
