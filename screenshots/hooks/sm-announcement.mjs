// SM-announcement: the capture CSS (lib.mjs CLEAN_CSS_*) hides #active-announcement
// for every other shot, so it never bleeds into unrelated crops. This is the one shot
// that needs it back. A later stylesheet with the same !important id selector would
// still lose the cascade if goto()/reinject() runs again after us, so force it back
// with an inline style instead -- inline !important beats stylesheet !important
// regardless of order.
export async function prepare(page, { reinject }) {
  await reinject(page);
  await page.evaluate(() => {
    document.getElementById('active-announcement')?.style.setProperty('display', 'block', 'important');
  });
  await page.waitForTimeout(300);
}
