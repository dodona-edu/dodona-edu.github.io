// Validates internal links in en/ and nl/ markdown files: target pages exist,
// #anchors match a heading on the target page, and relative asset references
// (images, downloads) resolve to files. VitePress itself only checks page
// links, not anchors — this fills that gap.
//
// Usage: node scripts/check-links.mjs

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, resolve, sep } from 'node:path';

const ROOT = resolve(dirname(new URL(import.meta.url).pathname), '..');
const SECTIONS = ['en', 'nl'];

// Slugifier from @mdit-vue/shared, the one VitePress uses. Special characters
// (including ' ? /) become hyphens, they are not removed.
const rControl = /[\u0000-\u001f]/g;
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?\/]+/g;
const rCombining = /[\u0300-\u036F]/g;
const slugify = (str) =>
  str
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase();

function walk(dir) {
  const files = [];
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry);
    if (statSync(path).isDirectory()) files.push(...walk(path));
    else if (entry.endsWith('.md')) files.push(path);
  }
  return files;
}

function stripFrontmatter(text) {
  return text.replace(/^---\n[\s\S]*?\n---\n/, '');
}

function stripFencedCode(text) {
  return text.replace(/^[ \t]*(```|~~~)[\s\S]*?^[ \t]*\1[^\n]*$/gm, '');
}

function stripCodeBlocks(text) {
  return stripFencedCode(text).replace(/`[^`\n]*`/g, '');
}

// Inline <!--@include: path--> directives so included headings count for the
// including page and included links resolve from the included file's location.
function expandIncludes(path, seen = new Set()) {
  if (seen.has(path)) return { text: '', chunks: [] };
  seen.add(path);
  const text = stripFrontmatter(readFileSync(path, 'utf8'));
  const chunks = [];
  let plain = '';
  let last = 0;
  const re = /<!--\s*@include:\s*([^\s>]+?)\s*-->/g;
  for (const match of text.matchAll(re)) {
    plain += text.slice(last, match.index);
    last = match.index + match[0].length;
    const target = resolve(dirname(path), match[1]);
    if (existsSync(target)) {
      const inner = expandIncludes(target, seen);
      chunks.push({ dir: dirname(target), text: inner.text }, ...inner.chunks);
    } else {
      chunks.push({ dir: dirname(path), text: '', missingInclude: match[1] });
    }
  }
  plain += text.slice(last);
  return { text: plain, chunks };
}

// slug -> markdown-it-anchor style dedup: repeated slugs get -1, -2, ...
function headingSlugs(fullText) {
  const slugs = new Set();
  const counts = new Map();
  for (const line of stripFencedCode(fullText).split('\n')) {
    const match = /^#{1,6}\s+(.*)$/.exec(line);
    if (!match) continue;
    let heading = match[1].trim();
    let slug;
    const custom = /\{#([^}]+)\}\s*$/.exec(heading);
    if (custom) {
      slug = custom[1];
    } else {
      // Keep the text of code spans; drop only the markup characters.
      // Literal underscores stay: VitePress slugifies them to hyphens.
      slug = slugify(heading.replace(/<[^>]+>/g, '').replace(/[*`]/g, ''));
    }
    const count = counts.get(slug) ?? 0;
    counts.set(slug, count + 1);
    slugs.add(count === 0 ? slug : `${slug}-${count}`);
  }
  return slugs;
}

function extractLinks(text) {
  const links = [];
  const stripped = stripCodeBlocks(text);
  for (const match of stripped.matchAll(/!?\[[^\]]*\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    links.push(match[1]);
  }
  for (const match of stripped.matchAll(/(?:href|src)=["']([^"']+)["']/g)) {
    links.push(match[1]);
  }
  return links;
}

// Resolve a link target (without anchor) from a source directory to a page
// (.md file) or asset on disk. Returns { page } , { asset } or null.
function resolveTarget(target, fromDir) {
  // markdown-it-imsize size suffix: ./img.png =500x
  target = target.replace(/\s+=[0-9x]+$/, '');
  let path;
  if (target.startsWith('/')) {
    path = join(ROOT, target);
    // Root-served assets live in public/
    if (!existsSync(path) && existsSync(join(ROOT, 'public', target))) {
      path = join(ROOT, 'public', target);
    }
  } else {
    path = resolve(fromDir, target);
  }
  path = decodeURI(path).replace(/[?#].*$/, '');
  if (/\.(md|html)$/.test(path)) {
    const md = path.replace(/\.html$/, '.md');
    return existsSync(md) ? { page: md } : null;
  }
  if (/\.[a-z0-9]{2,5}$/i.test(path)) {
    return existsSync(path) ? { asset: path } : null;
  }
  // Directory-style link
  const index = join(path.replace(/\/$/, ''), 'index.md');
  if (existsSync(index)) return { page: index };
  const md = path.replace(/\/$/, '') + '.md';
  if (existsSync(md)) return { page: md };
  return null;
}

const pages = SECTIONS.flatMap((section) => walk(join(ROOT, section)));
const pageSlugs = new Map();
const pageChunks = new Map();

for (const page of pages) {
  const { text, chunks } = expandIncludes(page);
  const fullText = text + '\n' + chunks.map((c) => c.text).join('\n');
  pageSlugs.set(page, headingSlugs(fullText));
  pageChunks.set(page, [{ dir: dirname(page), text }, ...chunks]);
}

const errors = [];

for (const page of pages) {
  const shortName = page.slice(ROOT.length + 1);
  // _partials are checked through the pages that include them
  if (page.split(sep).pop().startsWith('_')) continue;
  for (const chunk of pageChunks.get(page)) {
    if (chunk.missingInclude) {
      errors.push(`${shortName}: missing include ${chunk.missingInclude}`);
      continue;
    }
    for (const link of extractLinks(chunk.text)) {
      if (/^(https?:|mailto:|tel:)/.test(link)) continue;
      const [target, anchor] = link.split('#');
      let resolved;
      if (target === '') {
        resolved = { page };
      } else {
        resolved = resolveTarget(target, chunk.dir);
        if (!resolved) {
          errors.push(`${shortName}: broken link ${link}`);
          continue;
        }
      }
      if (anchor && resolved.page) {
        const slugs = pageSlugs.get(resolved.page);
        if (slugs && !slugs.has(anchor)) {
          errors.push(`${shortName}: missing anchor ${link}`);
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`${errors.length} broken link(s):\n`);
  for (const error of errors) console.error(`  ${error}`);
  process.exit(1);
} else {
  console.log(`All internal links OK across ${pages.length} pages.`);
}
