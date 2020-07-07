---
title: "Dodona 2.6"
description: "Release notes Dodona 2.6"
permalink: '/news/:year/:month/:day/:slug'
date: "2018-11-21"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

Release 2.6 contains an improved diff view on the feedback page, improved caching resulting in faster page loads, a blog with posts related to Dodona (where future release notes will be published), support for course admins to reorder the series in a course, and support for judges to include tabs that are only visible for course admins (not for students).

## Improved diff view

If a solution is submitted for a given exercise, it is automatically evaluated by the **judge** linked to the exercise. The judge can report detailed feedback as a result of this evaluation process. When reporting on an individual test, the judge has the option to link a value generated from the submitted solution to an expected value. To highlight possible differences between the expected and generated values, Dodona shows a textual comparison on the feedback page in a so-called _diff view_. This diff view has been improved in the latest release, to enable users to make a clear distinction between the generated value and the expected value. The diff view now also contains line numbers next to the generated and expected values, improving the experience in comparing both results.

![split diff](./diff-split.png)

A new button has been added on top of the feedback page, allowing users to toggle between “split” mode (expected and generated values are displayed side-by-side) and “unified” mode (lines of expected and generated values are interleaved). The feedback shown above in “split” mode looks as follows when displayed in “unified” mode.

![unified diff](./diff-unified.png)


This new representation is mostly helpful with multiline values.

## Improved caching

Dodona caches computed values to speed-up page loads. The caching mechanism has been improved to give Dodone more fine-grained control over the values that require caching and when cached values need to be recomputed. This reduces load times for some of the pages.

## Dodona blog

Navigate to the Dodona blog by clicking “News” in the menu to the left of each Dodona page. If you’re these release notes, you already found your way to the blog posts. From now on you can follow Dodona updates in the blog: release notes, new research and education federations using Dodona, events related to Dodona, … In short, anything of interest to the Dodona community.

## Reorder series in learning path of a course

By far the #1 feature request among course admins now has been implemented. An overview of the series in a course has been appended at the bottom of the course edit page. This overview supports drag-and-drop to change the order of the series.

![series order](./series-order.png)

## Hidden tabs

Judges can organize their feedback in multiple tabs. Tabs can now be made visible for course admins only, not for students. Group “hidden” tests in “hidden” tabs to hide them from users. Judges can decide if and how these “hidden” tests are taken into account (e.g. in the global assessment of the submission or in the short top-level description of the feedback). This may prevent that students can game failing tests (write specific snippets of code whose only goal is to make certain tests pass).

Existing judges and exercises must be adjusted to incorporate the use of hidden tabs. Specific questions related to the use of hidden tabs can be address to the authors of judges and exercises.

## Full list of changes
For a full list of changes we refer to [our GitHub release](https://github.com/dodona-edu/dodona/releases/tag/2.6), but we list the most important things below.

*   rework diffing
*   rework caching
*   write less empty values in config files
*   add tooltip to series status
*   add version blog
*   visual improvements to feedback table
*   allow hidden tabs in feedback
*   allow course admins to reorder series in learning path of a course
*   gradually increase polling intervals for status of unprocessed submissions
*   bug fixes and small improvements
