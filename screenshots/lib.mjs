// Shared capture helpers for the docs screenshots. See README.md in this directory.
import { createRequire } from 'node:module';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { homedir } from 'node:os';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

export const BASE = process.env.DODONA_BASE ?? 'http://dodona.localhost:3000';

// Prefer an explicit executable; otherwise pick the newest cached headless shell.
export function chromiumExecutable() {
  if (process.env.CHROMIUM_EXECUTABLE) return process.env.CHROMIUM_EXECUTABLE;
  const cache = join(homedir(), 'Library/Caches/ms-playwright');
  if (existsSync(cache)) {
    const shells = readdirSync(cache).filter((d) => d.startsWith('chromium_headless_shell-')).sort();
    for (const shell of shells.reverse()) {
      const exe = join(cache, shell, 'chrome-headless-shell-mac-arm64/chrome-headless-shell');
      if (existsSync(exe)) return exe;
    }
  }
  throw new Error('No cached Chromium headless shell found; set CHROMIUM_EXECUTABLE or run: npx playwright-core install chromium-headless-shell');
}

export async function launch({ width = 1600, height = 1200 } = {}) {
  const browser = await chromium.launch({ headless: true, executablePath: chromiumExecutable() });
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
  const page = await ctx.newPage();
  return { browser, ctx, page };
}

export function pngDims(path) {
  const buf = readFileSync(path);
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
}

const CLEAN_CSS_HIDE_NAV = `
  .dodona-navbar{display:none !important}
  .profiler-results,[class*="profiler"]{display:none !important}
  #bullet-footer,#bullet{display:none !important}
`;
const CLEAN_CSS_KEEP_NAV = `
  .dodona-navbar{position:static !important}
  .profiler-results,[class*="profiler"]{display:none !important}
  #bullet-footer,#bullet{display:none !important}
`;

export async function signIn(page, id = 1) {
  await page.goto(`${BASE}/dev_sign_in/${id}`, { waitUntil: 'load' });
}

export async function removeArchiveBanner(page) {
  await page.evaluate(() => { document.querySelectorAll('main .alert-info')[0]?.remove(); });
}

export async function goto(page, path, { keepNavbar = false, wait = 1800, removeArchive = true } = {}) {
  const url = path.startsWith('http') ? path : `${BASE}${path}`;
  await page.goto(url, { waitUntil: 'load' });
  if (keepNavbar) {
    await page.evaluate(() => localStorage.setItem('environment-pill-dismissed', String(Date.now() + 31536000000)));
    await page.reload({ waitUntil: 'load' });
  }
  await page.addStyleTag({ content: keepNavbar ? CLEAN_CSS_KEEP_NAV : CLEAN_CSS_HIDE_NAV });
  if (removeArchive) await removeArchiveBanner(page);
  await page.waitForTimeout(wait);
}

export async function reinject(page, { keepNavbar = false, removeArchive = true } = {}) {
  await page.addStyleTag({ content: keepNavbar ? CLEAN_CSS_KEEP_NAV : CLEAN_CSS_HIDE_NAV });
  if (removeArchive) await removeArchiveBanner(page);
}

// Hide a selector across all open shadow roots (draft banners, profiler bits).
export async function hideInShadow(page, selector) {
  await page.evaluate((selector) => {
    (function walk(root) {
      for (const el of root.querySelectorAll(selector)) el.style.setProperty('display', 'none', 'important');
      for (const el of root.querySelectorAll('*')) if (el.shadowRoot) walk(el.shadowRoot);
    })(document);
  }, selector);
}

// Screenshot a locator/selector at 2x, verifying pixel width == 2x CSS width.
export async function shootEl(page, selector, outPath) {
  const loc = typeof selector === 'string' ? page.locator(selector).first() : selector;
  await loc.waitFor({ state: 'attached', timeout: 10000 });
  const box = await loc.boundingBox();
  if (!box) throw new Error(`no bounding box for ${selector}`);
  await loc.screenshot({ path: outPath, scale: 'device' });
  const dims = pngDims(outPath);
  const ok = Math.abs(dims.width - Math.round(box.width * 2)) <= 4;
  return { selector: String(selector), cssWidth: box.width, cssHeight: box.height, pngWidth: dims.width, pngHeight: dims.height, ok };
}

// Screenshot a manual clip rect (CSS px) at 2x.
export async function shootClip(page, clip, outPath) {
  await page.screenshot({ path: outPath, clip, scale: 'device' });
  const dims = pngDims(outPath);
  const ok = Math.abs(dims.width - Math.round(clip.width * 2)) <= 4;
  return { clip, pngWidth: dims.width, pngHeight: dims.height, ok };
}

// Union bounding box of several selectors, with padding, then clip-screenshot.
export async function shootUnion(page, selectors, outPath, { pad = 8 } = {}) {
  const boxes = [];
  for (const sel of selectors) {
    const loc = typeof sel === 'string' ? page.locator(sel).first() : sel;
    const box = await loc.boundingBox();
    if (box) boxes.push(box);
  }
  if (boxes.length === 0) throw new Error('no boxes found for union: ' + selectors.join(','));
  const x0 = Math.max(0, Math.min(...boxes.map((b) => b.x)) - pad);
  const y0 = Math.max(0, Math.min(...boxes.map((b) => b.y)) - pad);
  const x1 = Math.max(...boxes.map((b) => b.x + b.width)) + pad;
  const y1 = Math.max(...boxes.map((b) => b.y + b.height)) + pad;
  return shootClip(page, { x: x0, y: y0, width: x1 - x0, height: y1 - y0 }, outPath);
}

export async function tag(page, selector, attr = 'data-shot', value = 'x') {
  await page.evaluate(({ selector, attr, value }) => {
    document.querySelector(selector)?.setAttribute(attr, value);
  }, { selector, attr, value });
}
