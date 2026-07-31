// Small helpers shared by a few hooks in this directory (not part of the
// public lib.mjs surface, kept local since they're only needed for the
// "no single element has the crop's exact rectangle" cases).

// Tag a synthetic, invisible marker at a fixed pixel rect so crop.selector
// can pick it up. Playwright's element screenshot clips to the target's
// bounding box regardless of what's "inside" it, so a transparent marker
// sized to the desired rect is a valid stand-in for an arbitrary clip.
export async function markRect(page, rect, id) {
  await page.evaluate(({ rect, id }) => {
    let el = document.querySelector(`[data-shot="${id}"]`);
    if (!el) {
      el = document.createElement('div');
      el.setAttribute('data-shot', id);
      document.body.appendChild(el);
    }
    Object.assign(el.style, {
      position: 'fixed',
      left: `${rect.x}px`,
      top: `${rect.y}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      background: 'transparent',
      border: 'none',
      margin: '0',
      padding: '0',
      pointerEvents: 'none',
      zIndex: '-1',
    });
  }, { rect, id });
}

// Cap an element's rendered height so its bounding box (and therefore a
// selector-based crop) stops at maxHeight, matching the "top N px only"
// crops from the original capture scripts.
export async function capHeight(page, selector, maxHeight) {
  await page.evaluate(({ selector, maxHeight }) => {
    const el = document.querySelector(selector);
    if (el) {
      el.style.maxHeight = `${maxHeight}px`;
      el.style.overflow = 'hidden';
    }
  }, { selector, maxHeight });
}
