# Screenshot capture system

Everything needed to (re)generate the documentation screenshots from a local Dodona dev
instance, so a UI change costs one command per affected page instead of a research
expedition. Built during the 2026-07 docs refresh.

## Prerequisites

- A running Dodona dev server on `http://dodona.localhost:3000` with the **seeded**
  development database (`bin/rails db:seed`). The manifests reference seeded objects by
  id (course 11 "Visualisation Test", course 29 "Programming 1", users 1/5/6, …); if the
  seeds change materially, the manifests need a review.
- `yarn install` in this repo (provides `playwright-core` and `yaml`).
- A cached Chromium headless shell (`npx playwright-core install chromium-headless-shell`
  once, or an existing `~/Library/Caches/ms-playwright` cache). Override with
  `CHROMIUM_EXECUTABLE=...` if needed.

## Usage

```sh
node screenshots/capture.mjs --list                          # what exists
node screenshots/capture.mjs --page guides/teachers/grading  # one page
node screenshots/capture.mjs --page faq --locale nl          # --page is a prefix filter
node screenshots/capture.mjs --id my-profile --out-dir /tmp/shots   # dry run
```

The runner prints the **state scenarios** the selected shots need. Apply each
`state/<name>.setup.rb` with `bin/rails runner` in the dodona checkout, re-run with
`--assume-state`, and afterwards run the matching `teardown.rb`. The runner never
mutates the database itself.

Captures are written straight to the repo image paths (or `--out-dir` for a dry run) at
2x device scale; the runner asserts every PNG is exactly twice its element's CSS width.
Review the diff (`git diff --stat`, view the images) before committing, and run
`yarn check-links`.

## Layout

- `shots.yaml` — the manifest: one entry per image with output location, URL, sign-in
  user, crop, required state, and a must-show checklist (what the shot has to prove;
  check it when reviewing). It is a multi-document YAML file: each `---` section
  scopes its own `defaults:` (sections currently mirror the guide audiences, but the
  grouping is free — `page:` is what filters select on).
- `state/<name>.setup.rb` + `state/<name>.teardown.rb` — paired, idempotent
  `bin/rails runner` scripts for the data each shot depends on.
- `hooks/<name>.mjs` — per-shot interaction scripts (hover a gutter, open a dropdown,
  walk a wizard) for shots that need more than navigate-and-crop. A hook exports
  `prepare(page, { locale })`.
- `lib.mjs` / `capture.mjs` — the shared 2x capture helpers and the manifest runner.

## Conventions and traps (short version of the capture cookbook)

- Sign in via `/dev_sign_in/<id>` (1 = zeus/admin, 5 = student, 6 = novice).
- The activity/description language follows the **course** language, not the URL locale:
  the NL pass of course-bound shots needs the course flipped to Dutch (a state scenario).
- Element crops include the element's own padding; even it out with per-shot `css` when
  a crop comes out lopsided.
- Lit components hydrate after `load` — the default 1.8s wait exists for a reason.
- Localised shots are `<name>-en.png` / `<name>-nl.png` next to their page;
  locale-independent ones use an explicit `path:` (shot once).
- Screenshots showing seeded people/courses: neutralise names where the manifest says so
  (e.g. the teacher shows as "Your teacher"/"Je leraar"), and never point captures at
  external services (the Dolos shot is manual for that reason).

Full background: the `dev-and-media.md` cookbook in the dodona-comms Claude plugin.

## Manual captures still owed

Three image sets cannot be captured from the dev server and need a human:

- **Dolos report** (`images/dolos.png`, shared by both locales): the "Detect
  plagiarism" flow submits a real export and opens a report on the external
  dolos.ugent.be service, so capture it from an instance where that is appropriate,
  then crop the report view.
- **Ufora / D2L** (`en|nl/guides/teachers/ufora/`, three images per locale, 2020
  vintage): external Brightspace UI; re-verify the whole flow while re-shooting —
  the content tooling has changed since the shots were taken.
- **IDE plugins** (`faq/ide-plugins/`, 10 desktop-app images): the UI is
  locale-independent, so capture ONE set and store it once (`images/ide-plugins/`),
  referenced from both locales. One consistent OS and light IDE theme, latest
  PyCharm (New UI) and VS Code, a throwaway account's token, no personal paths in
  window chrome, no hand-drawn markers — crop tight instead:
  1. `pc-settings` — the menu entry opening PyCharm's Settings (reconcile the docs
     prose with the platform you shoot).
  2. `pc-install` — Settings > Plugins > Marketplace, "Dodona" result with Install.
  3. `pc-new-exercise` — right-click project > New > Dodona Exercise (neutral
     project name).
  4. `pc-link` — generated solution file, line-1 exercise URL (must be
     `https://dodona.be/...`).
  5. `pc-check-mark` — the blue Submit to Dodona toolbar button with tooltip.
  6. `pc-correct` — the accepted-solution balloon with More details.
  7. `vs-market` — VS Code Extensions view, Dodona extension row.
  8. `vs-token` — the Dodona: Api Token setting, empty input.
  9. `vs-submit` — command palette matching Submit to Dodona.
  10. `vs-correct` — the "Solution was correct!" toast with View results.

  Per image, check the current plugin's label text still matches the docs prose and
  fix the prose in the same PR when it doesn't.
