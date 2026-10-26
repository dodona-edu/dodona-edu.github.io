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
// Localised, so the nl shot shows Dutch code next to the Dutch UI.
const RUN_CODE = {
  en: 'name = input("What is your name? ")\nprint(f"Hello, {name}! Welcome to Dodona.")\n',
  nl: 'naam = input("Wat is je naam? ")\nprint(f"Hallo, {naam}! Welkom op Dodona.")\n',
};

// A short, flat (no indentation) program: typing indentation via
// keyboard.type() fights CodeMirror's own auto-indent (verified live --
// typing an indented for-loop by hand double-indents/dedents and throws an
// IndentationError). Three assignments give the debugger several real
// steps with growing state, which is more useful for a debugger shot than a
// one-liner.
const DEBUG_CODE = {
  en: 'price = 12\nquantity = 3\ntotal = price * quantity\nprint(total)\n',
  nl: 'prijs = 12\naantal = 3\ntotaal = prijs * aantal\nprint(totaal)\n',
};

async function openSandboxAndWaitReady(page) {
  await page.locator('#scratchpad-show-btn').click();
  // First run downloads Pyodide (~10-20s on a cold cache); give it room.
  await page
    .locator('#scratchpad p-code-runner[backend-ready]')
    .waitFor({ state: 'attached', timeout: 90000 });
  // The To sandbox button sits at the bottom of the page, so clicking it
  // leaves the page scrolled down to the hand-in card. The sandbox column is
  // sticky; scrolling back up puts the start of the description next to it.
  await page.evaluate(() => window.scrollTo(0, 0));
}

async function replaceCode(page, code) {
  const cm = page.locator('#scratchpad .cm-content').first();
  await cm.click();
  await page.keyboard.press('ControlOrMeta+A');
  await page.keyboard.press('Backspace');
  await page.keyboard.type(code, { delay: 5 });
}

export async function prepare(page, { locale, shot }) {
  if (shot.id !== 'SB-2' && shot.id !== 'SB-3') return;

  await openSandboxAndWaitReady(page);
  // Since dodona#9435 the sandbox is a column of the activity page (a
  // section#scratchpad inside d-scratchpad) instead of an offcanvas.
  const sandbox = page.locator('#scratchpad');

  if (shot.id === 'SB-2') {
    await replaceCode(page, RUN_CODE[locale]);
    await sandbox.getByText(RUN_LABEL[locale], { exact: true }).first().click();
    await page.waitForTimeout(1200);

    // The program blocks on input(); answer it through the real shadow <input>
    // inside md-outlined-text-field (Playwright pierces it, but .fill() needs
    // the actual <input>, not the custom-element host).
    const realInput = sandbox.locator('md-outlined-text-field input').first();
    await realInput.fill('Ada');
    await page.keyboard.press('Enter');

    // Wait for the real, produced output -- not just the run finishing --
    // so the shot never ships a blank/placeholder output panel.
    await sandbox
      .locator('p-output .content pre', { hasText: 'Ada' })
      .waitFor({ state: 'visible', timeout: 15000 });
    await page.waitForTimeout(500);
    return;
  }

  // SB-3
  await replaceCode(page, DEBUG_CODE[locale]);
  await sandbox.getByText(DEBUG_LABEL[locale], { exact: true }).first().click();

  // Debugging activates once the trace is back from the worker; the stepper
  // only renders then. The visible stepper is the row of md-icon-buttons
  // (first, previous, next, last) in p-debugger > tc-trace. The sandbox also
  // holds a tc-frame-picker, but it renders at zero size, so don't target it.
  const stepper = sandbox.locator('p-debugger tc-trace .stepper md-icon-button');
  await stepper.last().waitFor({ state: 'visible', timeout: 15000 });
  await page.waitForTimeout(500);

  // Step 1 is a static help card (no variables yet) -- jump to the last step
  // so the shot shows real variables, the printed output and a highlighted
  // current line, not the placeholder state.
  await stepper.last().click();
  await page.waitForTimeout(800);
}
