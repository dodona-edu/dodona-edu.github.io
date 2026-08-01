// Hook for the ASSESS-1..5 shots (guides/teachers/assessments). The exam series these
// shots target is created fresh by state/assessments-exam-series.setup.rb and destroyed
// again by its teardown at the end of the capture chunk, so its id isn't a stable
// fixture the way series 51-54/140/141/52 are -- it can't be hardcoded into shots.yaml.
//
// Same mechanism as `dynamicSubmission` in students-interact.mjs: the setup script
// writes the id it created to the shared JSON state file; this hook reads it and
// navigates to the real per-shot URL. shots.yaml only carries a cheap, always-valid
// placeholder URL (the course page) plus a `{seriesId}` token in any crop selector that
// needs the id, which this hook substitutes in place on the shot object (capture.mjs
// reads shot.crop.selector *after* the hook runs, so mutating it here is enough -- no
// different from the `tag()` helper other hooks use for the same purpose).

import { readFileSync } from 'node:fs';
import { reinject } from '../lib.mjs';

const STATE_FILE = '/tmp/dodona-docs-capture-state.json';

function readSeriesId() {
  const all = JSON.parse(readFileSync(STATE_FILE, 'utf8'));
  const entry = all['assessments-exam-series'];
  if (!entry?.series_id) {
    throw new Error(
      `no assessments-exam-series id in ${STATE_FILE} -- run ` +
      'state/assessments-exam-series.setup.rb with bin/rails runner in the dodona ' +
      'checkout first.'
    );
  }
  return entry.series_id;
}

// Real per-shot URL, keyed by shot id. ASSESS-2/ASSESS-5 aren't listed: their
// placeholder (the course page) already *is* the real URL, so no extra navigation is
// needed for them -- only their crop.selector carries the {seriesId} token.
const REAL_URL = {
  'ASSESS-1': (locale, id) => `/${locale}/series/${id}/edit`,
  'ASSESS-3': (locale, id) => `/${locale}/series/${id}/assessment_overview`,
  'ASSESS-4': (locale, id) => `/${locale}/series/${id}/exam_logs`,
};

export async function prepare(page, { locale, shot }) {
  const id = readSeriesId();

  const buildUrl = REAL_URL[shot.id];
  if (buildUrl) {
    const origin = new URL(page.url()).origin;
    await page.goto(`${origin}${buildUrl(locale, id)}`, { waitUntil: 'load' });
    await reinject(page);
    await page.waitForTimeout(1800);
  }

  if (shot.crop?.selector?.includes('{seriesId}')) {
    shot.crop.selector = shot.crop.selector.replaceAll('{seriesId}', String(id));
  }
}
