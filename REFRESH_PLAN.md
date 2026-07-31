# Docs refresh plan

Working document for the docs.dodona.be refresh (July 2026). Based on a full audit of all
54 en/nl page pairs, cross-checked against the Dodona Rails app and the TESTed source.
Not published; delete when the refresh is done.

## Audit summary

- **FAQ section**: the FAQ pages themselves are done (6/6 use question-style headings).
  The unfinished half of the migration is on the guides side: guide pages still contain
  feature-explanation content that duplicates FAQ answers (asking questions, accounts,
  course copying) with no canonical home.
- **Guides**: no real landing pages for students/teachers (empty stubs); the
  getting-started pages act as hub + tutorial + duplicate of sibling pages at once.
  Several pages mix tutorial and settings-reference formats. Terminology has drifted from
  the live app in multiple places.
- **Technical docs**: guides/references boundary is broken (a second full tutorial lives
  inside `references/tested/index.md`; the testsuites guide and the DSL reference overlap
  ~75% and have diverged). Verified accuracy bugs against the TESTed schema and source.
- **Screenshots**: EN and NL were refreshed in alternating passes, so freshness flips per
  page per language. Worst clusters: `en/guides/students/courses` (2020 pre-redesign UI),
  ufora (2020, both languages), most NL guide mirrors (2020), FAQ ide-plugins/api-tokens
  (2023).
- **Coverage gaps**: several major shipped features have zero docs (exam mode, AI draft
  answers, coding scratchpad, composite exercises, course sections, statistics).
- **Systemic**: no link checking (4+ verified dead anchors), three competing image naming
  conventions, screenshots physically duplicated across directories, hand-maintained hub
  link lists that rot silently.

## Phase 0 — Correctness quick wins (no restructuring)

Small, independently shippable fixes. Do first; nothing here depends on later decisions.

### Broken links / anchors (verified against VitePress slugify)
- [x] `en/faq/index.md:44` → `#how-can-i-comment-on-a-student-s-submission` (apostrophe → hyphen)
- [x] `en/faq/index.md:46` → `#why-can-t-i-find-my-saved-comments`
- [x] `nl/faq/index.md:29` → `./activities/#wat-is-een-concept` (heading renamed)
- [x] `nl/faq/index.md:39` → `#hoe-kan-ik-vragen-stellen-over-mijn-code`
- [x] `en/guides/students/courses/index.md:70` → `#submission-status` (typo `#submissionstatus`)
- [x] `en/guides/teachers/course-management` → `exercise-series-management/#retest-submissions` (not `-solutions`)
- [x] `en/guides/teachers/exercise-series-management` → `#export-exercise-series-submissions` (not `-solutions`)
- [x] `en/guides/students/exercises` → two capitalised FAQ anchors (`#how-do-i-install-the-PyCharm-plugin`, `#…VS-Code-extension`) must be lowercase
- [x] `en/guides/teachers/getting-started/index.md:78` links to `creating-exercises/` which renders as an empty page (`skipIndex` stub) — point at `creating-exercises/introduction/`
- [x] App-side: `config/locales/views/evaluations/en.yml:99` deep-links the EN grading page with a Dutch anchor `#het-evaluatieoverzicht` (fix in Rails repo)

### Wrong images / content bugs
- [x] `nl/faq/annotations/index.md:95` uses `save-comment-edit.png` instead of `save-comment.png` (orphans the correct file)
- [ ] `nl/guides/students/exercises` line ~20: wrong image — NOT fixable by edit: no Dutch
  recent-exercises screenshot exists at all; needs a new capture (added to Phase 4)
- [x] `nl/guides/students/exercises` line ~100: `Correct` status description is a copy-paste of `Running` ("wordt momenteel beoordeeld")
- [x] `en/faq/annotations`: two Dec-2025 images have filename-as-alt-text, no `./` prefix, and are not localised in NL (`edit_saved_comment.png`, `saved_comment_link.png`)
- [x] NL missing Markdown-support note under "reply to a question" (`nl/faq/annotations`, EN line 75 equivalent)
- [x] `nl/faq/accounts/index.md:31`: link text says `/nl/contact` but href goes to `/en/contact`

### Broken/incorrect code samples (people copy these)
- [x] `en+nl/guides/exercises/examples/class`: model solution is broken Python — `self.count = start_value` shadows the `count()` method; `counter.count()` raises TypeError
- [x] `en+nl/guides/exercises/examples/input-output`: description + solution say `Hallo, …!`, all six test cases expect `Hello, …!` (partial NL→EN translation)
- [x] `en/references/exercise-config`: flagship example uses deprecated `"handler": "python"` / `"image": "dodona-python"`; switch to TESTed
- [x] `en/references/tested/dsl` line ~471: example uses nonexistent `return_raw` key (schema has no such key; use `!expression`)
- [x] `en/references/tested/dsl` line ~126: example under `expression/statement` uses `return:` key
- [x] `en/references/tested/exercise-config` complete example: `"linter": {per-language map}` contradicts the spec (it's a bool; per-language goes via `options.language.<lang>.linter`)
- [x] `judges/python-judge`: `$doctest: +NOSHOW` → `#doctest:`; untranslated Dutch `getal <e>` in fp-rounding option; `output block size` used but undocumented

### Terminology drift vs live app (verify against locales at fix time)
- [x] ~~"Browse all courses on Dodona"~~ AUDIT CLAIM WRONG — string still exists
  (`components/home/en.yml` more_courses_component); docs left unchanged
- [x] "My Solutions" → "My submissions" (students/exercises)
- [x] ~~"Ask a question about your code" / "Add global comment"~~ AUDIT CLAIM WRONG —
  both strings still live (global question/comment buttons differ from the line-level
  "Add comment"); docs left unchanged
- [x] "Manage Series" → "Manage series"; "Release Feedback" → "Release feedback"
  (+ "Create Series" → "Create series", "Retest solutions" → "Retest submissions")
- [x] ~~EN teachers/getting-started dropped Smartschool~~ INTENTIONAL (per Bart):
  Smartschool is Flanders-only, so English pages omit it deliberately; change reverted.
  Phase 1 consistency question: `en/faq/accounts` (5 mentions) and
  `en/guides/students/login-and-settings` DO name Smartschool in English — decide
  whether those should drop it too or whether "secondary school" context justifies it
- [x] `en/faq/ide-plugins:47` typo "browser version" → "browser window" (NL mirrors the same error)
- [x] `examples/content`: `reading-activities//` double slash ×3
- [x] `_common.md` + `examples/class`: prose says create `description.en.md`, tree shows `description.nl.md`
- [x] `references/exercise-description`: prose `invert-dark` vs code samples `dark-invert`
- [x] `judges/creating-a-judge:46`: live TODO comment referencing a dead wiki
- [x] `references/tested/dsl:16`: commented-out link to tutorials that now exist; `:19` mentions JSON Schema without linking it
- [x] `"handler": "TESTed"` vs `"handler": "tested"` casing across pages — pick one

### Orphan files
- [x] `en/guides/teachers/exercise-series-management/staff.series_new_submit.png`, `staff.series_edit.png`
- [x] `nl/guides/teachers/exercise-series-management/staff.series_new_submit.png`
- [x] `nl/guides/students/exercises/student.exercise_course_submissions_page.png`
- [x] After image fix: check `nl/faq/annotations/save-comment.png` is used

### Guardrail
- [x] Add link + anchor checking to CI (dead internal links and hand-written anchors are the main rot vector; VitePress slugify handles `'`/`?`// as hyphen, not deletion)
  → `scripts/check-links.mjs` + `yarn check-links` + CI step; validates pages, anchors
  (incl. `@include` expansion and duplicate-slug suffixes) and relative asset refs

### Additional fixes found while executing Phase 0 (all done)
- [x] `[path].paths.ts`: redirect `guides/the-coders-apprentice` pointed at deleted
  `guides/general/featured-courses` → now `faq/featured-courses`; caused silent
  ERR_MODULE_NOT_FOUND during every build (VitePress still exits 0)
- [x] `en+nl/references/judges/index.md`: `#TESTed` anchor → `#tested` (slugs are lowercase)
- [x] `en/guides/teachers/grading/index.md:140`: same apostrophe anchor bug as faq hub
- [x] `nl/references/tested/dsl/index.md:165`: anchor to renamed heading
  (`#eigen-checkfuncties-orakels` → `#eigen-orakelfunctie-custom-check`)
- [x] `nl/references/tested/exercise-config`: stale `"plan_name": "plan.json"` → `"test_suite"`
- [x] `en/guides/teachers/course-management`: button name "Retest solutions" → "Retest submissions"
- [x] node_modules was Linux-arm64 (container leftover); `yarn install --force` fixed local builds

## Phase 1 — Information architecture (decisions + written conventions)

STATUS: drafted, pending review. `CONTRIBUTING.md` (this branch) embodies the decisions
below; the docs skill mirror is dodona-claude-comms-plugin PR #5. Remaining open point:
whether `en/faq/accounts` and `en/guides/students/login-and-settings` should also drop
Smartschool from the English text (see terminology notes in Phase 0).

The "something we can build on". Produces a short CONTRIBUTING/conventions doc in the
repo and the target site map. Decisions needed:

1. **Content model — decided (see CONTRIBUTING.md).** The earlier FAQ migration was one option,
   not a commitment. Design principle from Bart: **guides are meant to be self-contained**
   — overlap between guides and FAQ is intentional and fine. The enemy is therefore not
   duplication but *divergence* (copies drifting apart: Smartschool in one list and not
   the other, retired visibility model in one copy, double screenshot re-shoots).
   Working proposal ("A-refined"): keep guides / FAQ / references, and de-duplicate at
   the *source* level while keeping rendered pages complete:
   - shared prose blocks via `<!--@include:-->` partials (mechanism already proven by
     `examples/_common.md`) for things like "What is Dodona?", sign-in provider lists,
     status tables
   - shared screenshots stored once and referenced from every page that needs them —
     never physically copied into multiple directories
   - guide sections and their FAQ counterparts cross-link both ways
   - duplication *within* a layer (two guide pages or two tutorials covering the same
     task, e.g. new-exercise-repo vs setup, or the second tutorial inside
     references/tested) is still consolidated — self-containment justifies restating
     across layers, not competing pages in the same layer
2. **Audiences.** student / teacher / exercise author / judge & platform developer.
   References index reorganised into those buckets (currently a stale "In English / In
   Dutch" split).
3. **Section landing pages.** Turn the empty `students/index.md`, `teachers/index.md`
   stubs into real landing pages (what's here, in what order); slim the getting-started
   pages down to actual first steps.
4. **en/nl policy.** Guides + FAQ: fully bilingual, always shipped together (text AND
   screenshots). Deep technical references (`tested/json`, `tested/new-programming-language`,
   maybe more): English-only with an NL stub is acceptable — make it an explicit rule.
5. **Image conventions.** One naming scheme (proposal: kebab-case, `-en`/`-nl` suffix for
   localised shots, no suffix for locale-independent ones); alt text mandatory; `./`
   relative refs; no screenshot duplicated across directories — canonical location +
   markdown include/link instead. Light-mode captures standard (document the theme picker
   but don't double every screenshot).
6. **FAQ hub maintenance.** `faq/index.md` duplicates every question link by hand.
   Either generate it, or drop the per-question deep links and link pages only.
7. **Persist the conventions in the `/dodona-comms:docs` skill** so they aren't lost:
   once decided, update the skill (source: `github.com/dodona-edu/dodona-claude-comms-plugin`,
   no local checkout yet — clone to ~/Code) with the content model (guides self-contained,
   FAQ quick-lookup, one canonical *source* per fact via includes), the image conventions,
   and the shared-screenshot rule. The skill is where future docs sessions start, so the
   conventions doc and the skill must say the same thing.

## Phase 2 — Restructure existing content (no new topics yet)

STATUS: done. Notable outcomes:
real landing pages for students/teachers; new pages `guides/teachers/series-settings`,
`guides/teachers/series-export-and-retest`, `guides/students/feedback`;
`_what-is-dodona.md` include partial (sidebar.ts now skips `_` partials);
`new-exercise-repo` merged into setup (+redirects, no chains); tested/index
de-tutorialized but keeps a restored "TESTed in a nutshell" echo showcase;
testsuites=cookbook / dsl=spec dedup done additively. New flags for later phases:
NL feedback deep-dive prose still describes the pre-redesign context UI (Phase 6);
DSL reference tab-attribute list lacks `language` + has hand-written attribute counts
(Phase 3); no Dutch course-overview capture exists for teachers/getting-started
(Phase 4).

- teachers/getting-started may keep its end-to-end walkthrough (self-contained is fine),
  but: stop the physical screenshot duplication (share the files), reconcile the facts
  that have drifted (Smartschool, casing), and add the missing cross-links. Landing-page
  duties move to a real teachers/index.md.
- Merge `guides/exercises/new-exercise-repo` into `creating-exercises/setup` (GitHub /
  GitLab / self-hosted as tabs); redirect. (Same-layer duplication, still consolidated.)
- Delete the tutorial half of `references/tested/index.md` (lines ~60–293); keep "what is
  TESTed / when to use it" and point at the guides tutorial. Kills the contradictory
  Notepad++/local-git onboarding path.
- Split guide vs reference for test suites: `guides/exercises/testsuites` becomes the
  task-oriented cookbook; `references/tested/dsl` becomes the single DSL source of truth.
  Move the schema/VS Code extension links to the reference, recipes to the guide,
  dedupe the Python-conventions list.
- Split `exercise-series-management` (216 lines): series management tutorial vs series
  settings reference vs export/retest task guides.
- Split `students/exercises`: navigate-and-submit tutorial vs submission-status reference.
  The asking-questions section stays in the guide (self-contained) but gets sourced from /
  cross-linked with the FAQ annotations content so the two copies can't drift.
- Consolidate the triplicated "What is Dodona?" blurb.
- Fix sidebar ordering: repo setup before test-suite deep dive; give `tested/index.md` an
  `order:`; reconcile the 4 EN/NL `order:` mismatches; renumber the teacher order-7 gap.
- Rewrite `references/index.md` around audiences; add a judge-developer entry point
  linking `judges/creating-a-judge` + `tested/new-programming-language`.
- ~~Decide fate of `faq/featured-courses` inline course catalogue~~ DECIDED (Bart,
  2026-07-31): keep the hand-maintained list, hardcoded course IDs and all. Accepted
  maintenance cost; revisit only if it visibly rots.

## Phase 3 — Accuracy pass on technical references

STATUS: done, all verified against TESTed origin/master 0c5c0a4c (2026-07-31) and the
Rails app. Outcomes beyond the list below: `hidden` and `hideExpected` were deliberately
NOT documented — both are schema-advertised but silently ignored by the parser
(universal-judge#667); inherited `config.file` options don't reach `output_files:`
channels (universal-judge#668); testcase-level `config` was documented but is rejected
by the schema (removed); the tab-level `language` example (guide + reference) was
invalid — `language` is root-only, both fixed. The check-links script now handles
underscores in headings like VitePress does. Follow-up for Phase 5/6: the files
example guide teaches the deprecated `file:` spelling — modernize to `output_files`
when its content is next touched; the JSON reference's link_files section documents a
legacy form (`input_files`/`use_strict_workdir` rewrite flagged, still parses via
fallbacks).

- Full schema-diff of `references/tested/dsl` against `tested/dsl/schema.json`: missing
  `file` channel, `definitions`, `hidden`, root/tab `files`,
  `normalizeTrailingNewlines`, `hideExpected`, `config.file`; fix
  "three attributes"/"two attributes" miscounts. Verify the files-guide `file:` inside
  `testcases:` against the runtime parser (schema seems to forbid it).
  NOT the `unit`/`case`/`script` synonym vocabulary: added to TESTed by mistake, will
  be removed (Bart, 2026-07-31) — never document it.
- One canonical supported-language list (source: TESTed `LANGUAGES` dict, 11 entries);
  fix the four pages that disagree (missing TypeScript/C#/C++; `runhaskell` undocumented).
  Add missing options: `parallel`, `optimized`, `compiler_optimizations`.
- `options.mode`: docs commit 2026-07-07 removed it as "outdated", but
  `mode: ExecutionMode = PRECOMPILATION` still exists in `tested/configs.py` at
  origin/master 0c5c0a4c (2026-07-31). Now tracked upstream in universal-judge#666
  (together with the dead `options.optimized` knob); universal-judge#665 tracks the
  C# Byte/SByte declaration swap found while adding the types columns.
- `references/tested/new-programming-language` (603 lines, verified broken: dead
  `config.py` path, 7-entry LANGUAGES dict vs 11): either full maintenance pass or
  replace with a short pointer at the source tree.
- `references/tested/json` (1,280 lines, frozen 2024): add "last verified against TESTed
  vX" note; align evaluator→oracle vocabulary.
- Re-verify `user-management` prose against current user list UI (Institution column,
  Member Labels filter, "Edit all labels", "Download user list" all undocumented);
  replace colour-based button descriptions with labels.

## Phase 4 — Screenshot refresh

Systematic re-shoot from the dev instance (dodona-comms capture pipeline), both languages
in the same pass, new naming convention. Priority order:

1. `en/guides/students/courses` (2020 pre-redesign UI, highest-traffic student page)
2. Shared icon sets `images/course_exercise_status_icons/`, `images/submission_icons/`
   (2020; `staff_registration_icons/` was deleted in Phase 3 — no longer referenced)
3. `ufora` (2020, both languages — also re-verify the D2L flow end-to-end; remove the
   six-year-old "in a later phase" roadmap sentence)
4. All 2020 NL mirrors (students/exercises, login-and-settings, getting-started,
   course-management, user-management)
5. FAQ `ide-plugins` (2023, third-party UI changed) + `api-tokens` (2023)
6. Mixed-vintage directories (exercise-series-management, grading NL)
7. Re-shoot `student.exercise_start.png` (has rack-mini-profiler dev badge visible)
8. Capture a Dutch recent-exercises screenshot for `nl/guides/students/exercises` — the
   page currently illustrates that section with the wrong image because no Dutch capture
   exists (`student.recent_exercises.png` is en-only)
9. `nl/guides/teachers/user-management/user_progress_statistics.png` is still the 2020
   capture (EN was re-shot in 2025); no current Dutch capture exists

## Phase 5 — New content for coverage gaps

Priority order from the app gap analysis:

1. **Exam mode end-to-end** (exam series kind, sessions, activity password, invigilator
   overview, stop/reopen, release results, exam logs + CSV export) — zero docs today
2. **AI draft answers** to student questions (+ per-course `draft_answers_enabled`
   toggle; privacy questions teachers will ask)
3. **Coding scratchpad / Papyros + Python tutor** (student-facing, zero docs)
4. **Composite exercises** (new activity type; authoring reference + example tutorial)
5. **Course sections + course sidebar** (update students/courses + course-management)
6. **Course statistics & visualizations** (heatmap, punchcard, violin, timeseries…)
7. **Series kind conversion** (+ exam kind in exercise-series-management)
8. Grading guide refresh vs 60 commits of evaluations changes; students/exercises vs
   157 commits of activities changes
9. Smaller topics: rights requests, notifications + announcements, favourite/archived
   courses, theme picker, iCal feed, export wizard options, CSV label upload, Dolos
   workflow (currently 2 sentences), scoresheets, read states for reading activities
10. FAQ `activities` page (2 questions, stale since 2024-01) — expand or fold in

## Phase 6 — NL parity closure

Mostly absorbed into earlier phases (bilingual rule), but explicitly:
- `nl/guides/teachers/getting-started`: substantially diverged — still documents the
  retired three-way series-visibility model, missing the EN link blocks; rewrite from EN
- `nl/guides/teachers/user-management`: stalest page in either language (2024-01)
- Teacher guides with 20–40 line divergence: exercise-series-management, grading
- Decide + apply the en/nl reference-stub rule (Phase 1 decision 4)
- NL "testplan" → "test suite" terminology alignment
