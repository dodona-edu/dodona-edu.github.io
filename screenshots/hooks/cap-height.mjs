// Generic hook for shots that need the top N px of an otherwise-taller card
// (the original capture scripts' "capTopCapped" pattern). Reads two shot
// yaml fields: cap_selector (defaults to shot.crop.selector) and cap_height.
import { capHeight } from './_util.mjs';

export async function prepare(page, { shot }) {
  const selector = shot.cap_selector ?? shot.crop?.selector;
  if (!selector || !shot.cap_height) throw new Error(`${shot.id}: cap-height hook needs cap_selector/crop.selector and cap_height`);
  await capHeight(page, selector, shot.cap_height);
}
