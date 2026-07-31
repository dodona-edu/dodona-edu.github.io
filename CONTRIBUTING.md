# Contributing to the Dodona documentation

This document describes how the documentation is organised and the conventions every
page follows. Follow it for new content and move existing content towards it when you
touch a page.

## Content model

The site has three sections, each with its own job:

- **Guides** (`guides/`): task-oriented walkthroughs, organised per audience
  (`students/`, `teachers/`, `exercises/` for exercise authors, `general/`). A guide is
  **self-contained**: a reader should be able to follow it start to finish without
  jumping to other pages. It may therefore restate things that are also answered in the
  FAQ.
- **FAQ** (`faq/`): quick-lookup entries with question-style headings ("How do I …?",
  "Why can't I …?"). Written for readers arriving with a specific question or problem,
  and for support answers to deep-link to.
- **References** (`references/`): specifications and technical references (exercise
  config, description format, TESTed, judges). Organised by what is being specified,
  not by task.

Rules that keep this model healthy:

- **Overlap between sections is fine; overlap within a section is not.** A guide
  restating a FAQ answer is by design. Two guides (or a guide-shaped tutorial inside
  `references/`) covering the same task is a bug: consolidate and link.
- **Every fact has one canonical source.** When the same content must appear on
  multiple pages, don't copy it — share it:
  - Shared prose blocks live in a partial (a file starting with `_`, e.g.
    `_common.md`) and are embedded with `<!--@include: ./_common.md-->`.
  - Shared screenshots live in one location and are referenced from every page that
    needs them. Never commit the same image file into two directories.
- **Cross-link both ways.** A guide section and the FAQ entry covering the same topic
  link to each other, so an update to one is hard to miss in the other.

## Audiences

Write each page for exactly one audience: **student**, **teacher**, **exercise
author**, or **judge/platform developer**. If a topic serves two audiences, it gets
two pages (or a FAQ entry per audience, marked with a
`<Badge type="tip" text="teacher" />`).

## Bilingual policy

- `en/` and `nl/` are mirror trees. Every page under `faq/` and `guides/` exists in
  both languages, with the same structure, and is **shipped together** — text and
  screenshots. Never land an English change without its Dutch counterpart (or vice
  versa).
- Deep technical references aimed at developers may be English-only. In that case the
  `nl/` mirror is a short stub that links to the English page (existing examples:
  `nl/references/tested/json`, `nl/references/tested/new-programming-language`).
- Smartschool is only used in Flanders: Dutch pages mention it, English pages
  generally don't.

## Images and screenshots

- Co-locate images with the page that uses them and reference them relatively:
  `![alt text](./my-image.png)`. Only truly shared icons live in `images/`;
  root-served assets in `public/`.
- Naming: kebab-case. Screenshots that show localised UI get a language suffix
  (`create-course-en.png`, `create-course-nl.png`); locale-independent images get no
  suffix.
- **Alt text is mandatory** and describes what the image shows; never use the
  filename.
- Screenshots are captured from a clean instance in light mode, cropped to the
  relevant element. When the UI changes, re-shoot the English and Dutch versions in
  the same pass.

## Links and anchors

- Internal links are site-relative with locale prefix (`/en/guides/...`) or
  page-relative (`./sibling/`). Anchors must match VitePress's slugs: lowercase, and
  special characters (including `'`, `?`, `/`) become hyphens — "a student's" slugs
  to `a-student-s`.
- CI runs `yarn check-links` (see `scripts/check-links.mjs`), which validates every
  internal page link, anchor, and relative asset reference in both locales. Run it
  locally before pushing.
- The FAQ landing pages (`faq/index.md`) maintain per-question deep links by hand;
  the link checker guards them. When you rename a heading, update the hub links in
  both languages.

## Page structure

- A topic is a directory with an `index.md`; frontmatter has at least `title`, plus
  `order` when position matters. See the section sidebars in `.vitepress/sidebar.ts`.
- Match the tone of sibling pages: instructional second person, UI labels in
  backticks matching the live application's strings, `:::tip` / `:::warning` callouts
  for asides.
- UI strings in prose must match the running application exactly (check
  `config/locales/` in the dodona repository when unsure).

## Local preview

```sh
yarn install
yarn dev          # serve locally, check /en/ and /nl/
yarn check-links  # validate internal links and anchors
yarn build        # what CI runs
```
