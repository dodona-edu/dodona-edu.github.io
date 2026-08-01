// Hook for AI-1/AI-2 (faq/annotations, "How do AI draft answers work?"). The shots'
// `url` already points straight at the real, stable submission
// (/{locale}/submissions/1206/#code -- see state/question-with-draft.setup.rb for why
// no dynamic-id handoff is needed here, unlike hooks/assessments.mjs), so this hook
// only has to drive the reply-form interaction capture.mjs's plain goto() can't:
//
//   AI-1: open the reply form by clicking the fake input under the question thread.
//         It prefills with the draft only while no teacher reply exists yet
//         (d-thread's firstResponse() gate -- see thread.ts) -- our seeded Question
//         is the sole message in its thread, so that always holds.
//   AI-2: same, then click the thumbs-up rating button to preview the rated state.
//         DraftResponseRating#toggleRating is a pure client-side flip (see
//         state/LlmResponse.ts) -- it only PATCHes the server once the reply is
//         actually submitted, which this hook never does, so there is no
//         server-side rating to undo afterwards.

export async function prepare(page, { shot }) {
  await page.locator('d-thread .fake-input input.form-control').first().click();
  await page.waitForTimeout(1000); // llmResponseState.get() fetches /llm_responses/:id.json before the draft prefills

  if (shot.id === 'AI-2') {
    const goodButton = page.locator('d-draft-response-rating button[data-rating="good"]').first();
    await goodButton.click();
    // The rating buttons have a Bootstrap tooltip on data-bs-trigger="hover focus";
    // onRateClick() hides it, but the pointer is still sitting on the button (where
    // .click() left it), so it re-shows on its own after the hide animation -- move
    // away first, or the "Good answer" tooltip bakes into the crop over the question.
    await page.mouse.move(0, 0);
    await page.waitForTimeout(600); // d-draft-response-comment mounts + autofocuses on rerender
  }
}
