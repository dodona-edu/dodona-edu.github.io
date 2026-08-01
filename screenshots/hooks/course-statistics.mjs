// Interactions for the statistics guide shots (guides/teachers/statistics).
// ST-1/ST-2: the punchcard/heatmap matrices are computed by a background job
// (UpdatePunchcardMatrixJob/UpdateHeatmapMatrixJob) that the controller
// enqueues on first request; the frontend polls every second until the
// matrix is ready, then appends an <svg>. Poll the container the same way
// instead of trusting the fixed post-goto wait.
// ST-3..ST-6: click the matching `.graph-toggle[data-type=...]` button for
// SERIES_ID and wait for its stats-container to get an <svg> (or the "not
// enough data" message, which would mean the wrong series was picked).
//
// Series 52 ("Conditions"/"Voorwaarden" after the course11-naming scenario)
// is the series used for all four graphs: it has 3 exercises with varied
// submission statuses and a multi-day submission spread, and its graphs
// render correctly. Series 51 was tried first (most submissions of the
// four) but its tab pane never activates on click -- browser-verified: after
// clicking its graph-toggle the pane's class stays "tab-pane" instead of
// gaining "active show", so the stats-container stays at 0x0 and no <svg>
// ever appends. That looks like an app bug scoped to series 51, not a hook
// timing issue (series 52-54 all activate correctly). Skip series 51 for
// these shots.
const SERIES_ID = 52;

async function waitForGraph(page, containerSelector, { timeout = 20000 } = {}) {
  await page.waitForFunction(
    (sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      if (el.querySelector('svg')) return true;
      return /not enough data|niet genoeg data/i.test(el.innerText || '');
    },
    containerSelector,
    { timeout },
  );
  const svgCount = await page.locator(`${containerSelector} svg`).count();
  if (svgCount === 0) {
    const text = await page.locator(containerSelector).innerText().catch(() => '');
    throw new Error(`course-statistics hook: ${containerSelector} resolved without an svg (text: ${JSON.stringify(text.slice(0, 120))})`);
  }
  // let the SVG's enter transition (violin/timeseries fade-in) settle
  await page.waitForTimeout(400);
}

async function clickToggle(page, type) {
  await page.locator(`#series-card-${SERIES_ID} .graph-toggle[data-type="${type}"]`).click();
  await waitForGraph(page, `#stats-container-${SERIES_ID}`);
  // boundingBox() is viewport-relative, and click()'s auto-scroll can leave
  // the (tall) series card straddling the viewport bottom edge, which flips
  // shootClip into fullPage mode -- where the same coordinates are then
  // read as full-page (document) coordinates, clipping the wrong region
  // entirely (browser-verified: box.y + box.height landed 2px over the
  // 1200px viewport and the crop silently grabbed the top of the page
  // instead of the series card). Force the card to the top of the viewport
  // so it always fits comfortably within the viewport height.
  await page.locator(`#series-card-${SERIES_ID}`).evaluate((el) => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await page.waitForTimeout(200);
}

export async function prepare(page, { shot }) {
  switch (shot.id) {
    case 'ST-1':
      await waitForGraph(page, '#punchcard-container');
      break;
    case 'ST-2':
      await waitForGraph(page, '#heatmap-container');
      break;
    case 'ST-3':
      await clickToggle(page, 'violin');
      break;
    case 'ST-4':
      await clickToggle(page, 'stacked');
      break;
    case 'ST-5':
      await clickToggle(page, 'timeseries');
      break;
    case 'ST-6':
      await clickToggle(page, 'ctimeseries');
      break;
    default:
      throw new Error(`course-statistics hook: no case for ${shot.id}`);
  }
}
