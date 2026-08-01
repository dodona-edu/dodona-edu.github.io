// Interaction hook for the student sandbox shots (SB-2, SB-3). See the SB
// section of shots.yaml and README.md for the shadow-DOM/readiness traps.
//
// SB-1 and SB-4 need no interaction (a plain navigate-and-crop covers them)
// so this hook only branches on SB-2/SB-3.
//
// Papyros' Run/Debug buttons are md-filled-button/md-outlined-button
// elements nested a few shadow roots deep (p-code-runner > p-button-lint).
// Playwright's own locators pierce open shadow roots natively, so a plain
// CSS/text locator reaches them -- no manual shadow-root walk needed (that
// trick is only for document.querySelector-based code, e.g. style injection).
//
// Readiness: Papyros flips its Run button to "ready" as soon as it starts
// launching, while Pyodide is still downloading in the worker (verified
// live -- the button is clickable and queues the run correctly, it just
// hasn't executed anything yet). The real signal is the `backend-ready`
// attribute p-code-runner reflects once papyros.runner.backendReady
// resolves (@dodona/papyros >= 4.8.0, see Runner.js#launch). Wait on that,
// not on the button appearing.

const RUN_LABEL = { en: 'Run', nl: 'Uitvoeren' };
const DEBUG_LABEL = { en: 'Debug', nl: 'Debuggen' };

// A short program with input(): demonstrates the input field and produces
// real, checkable output.
const RUN_CODE = 'name = input("What is your name? ")\nprint(f"Hello, {name}! Welcome to Dodona.")\n';

// A short, flat (no indentation) program: typing indentation via
// keyboard.type() fights CodeMirror's own auto-indent (verified live --
// typing an indented for-loop by hand double-indents/dedents and throws an
// IndentationError). Three assignments give the frame picker several real
// steps with growing state, which is more useful for a debugger shot than a
// one-liner.
const DEBUG_CODE = 'price = 12\nquantity = 3\ntotal = price * quantity\nprint(total)\n';

async function openOffcanvasAndWaitReady(page) {
  await page.locator('#scratchpad-offcanvas-show-btn').click();
  // First run downloads Pyodide (~10-20s on a cold cache); give it room.
  await page
    .locator('#scratchpad-offcanvas p-code-runner[backend-ready]')
    .waitFor({ state: 'attached', timeout: 90000 });
}

async function replaceCode(page, code) {
  const cm = page.locator('#scratchpad-offcanvas .cm-content').first();
  await cm.click();
  await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.press('Backspace');
  await page.keyboard.type(code, { delay: 5 });
}

export async function prepare(page, { locale, shot }) {
  if (shot.id !== 'SB-2' && shot.id !== 'SB-3') return;

  await openOffcanvasAndWaitReady(page);
  const offcanvas = page.locator('#scratchpad-offcanvas');

  if (shot.id === 'SB-2') {
    await replaceCode(page, RUN_CODE);
    await offcanvas.getByText(RUN_LABEL[locale], { exact: true }).first().click();
    await page.waitForTimeout(1200);

    // The program blocks on input(); answer it through the real shadow <input>
    // inside md-outlined-text-field (Playwright pierces it, but .fill() needs
    // the actual <input>, not the custom-element host).
    const realInput = offcanvas.locator('md-outlined-text-field input').first();
    await realInput.fill('Ada');
    await page.keyboard.press('Enter');

    // Wait for the real, produced output -- not just the run finishing --
    // so the shot never ships a blank/placeholder output panel.
    await offcanvas
      .locator('p-output .content pre', { hasText: 'Ada' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(500);
    return;
  }

  // SB-3
  await replaceCode(page, DEBUG_CODE);
  await offcanvas.getByText(DEBUG_LABEL[locale], { exact: true }).first().click();

  // Debugging activates once the trace is back from the worker; the frame
  // picker only renders then.
  await offcanvas.locator('tc-frame-picker').waitFor({ state: 'attached', timeout: 15000 });
  await page.waitForTimeout(500);

  // Frame 0 is a static help card (no variables yet) -- jump to the last
  // step ("»") so the shot shows real frames/variables and a highlighted
  // current line, not the placeholder state.
  await offcanvas.locator('tc-frame-picker .btn-group button').nth(4).click();
  await page.waitForTimeout(500);
}
