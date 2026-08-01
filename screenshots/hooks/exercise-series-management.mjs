// ESM-1 needs the series/new form's card tagged (no stable id on the card
// itself, only on the kind selector it contains).
export async function prepare(page) {
  await page.evaluate(() => {
    const el = document.getElementById('series_kind_selector');
    const card = el ? el.closest('.card') : null;
    if (card) card.setAttribute('data-shot', 'esm1-form');
  });
}
