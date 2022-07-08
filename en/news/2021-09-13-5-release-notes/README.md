---
title: "Dodona 5"
description: "Release notes Dodona 5"
permalink: '/news/:year/:month/:day/:slug'
date: "2021-09-13"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

> Throughout the year, Dodona works with smaller releases. This post will be updated for all new releases in 2021-2022

## Dodona 5.0 - 2021-09-13

After the huge 4.8 release, Dodona 5.0 is even bigger with several major new features.

### Design refresh

The most visible change is a refresh of the home page design. The aim was to make the appearance more friendly and less formal. This was done by using softer colors, rounder borders.

![Design refresh](./design-refresh.png)

### Grading is now publicly available

Our grading module that was already available as a preview is now publicly available. Compared to the preview, we improved the initial wizard to create an evaluation and made several smaller tweaks to improve the usability. More information can be found in [our manual](/en/guides/teachers/grading/).

### New learning analytics

Teachers can now better follow students' behaviour using the new graphs for each series.

![Learning analytics](./learning-analytics.png)

### Add course deadlines to your personal calendar
It is now possible for students to add a course to your personal calendar application such as Google Calendar. This way, the series deadlines will show up as events.

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3102).


## Dodona 5.1 - 2021-10-11

Dodona 5.1 adds a new way to display table-based output in the feedback table. The diff will be calculated by taking into account the columnar properties of the csv format and the result is displayed as a table. The upcoming SQL judge will make great use of this new feature.
![csv diff](./csv-diff.png)

Students sometimes ask a question when they're stuck on an exercise, but then manage to find a solution on their own and forget to retract the question. To prevent teachers wasting time on answering such questions, we now display an info icon when the student submitted additional solutions after asking the question.
![image](./info-question.png)

Finally, Dodona 5.1 lays the foundation for supporting identity providers using OpenID Connect.

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3155).


## Dodona 5.2 - 2021-10-25

Dodona 5.2 makes it possible for officials of the Flemish government to sign in. The sign in page was redesigned to allow for sign in buttons from non-educational institutions.

In addition, a programming language indicator icon was added next to the exercise name on all exercise pages.

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3186).


## Dodona 5.3 - 2022-02-04

It has been a while since our last release so the detailed list of updates is a bit longer than usual. The main new feature in Dodona 5.3 is the addition of a new graph type for series. A new heatmap option was added showing when submissions were made for each exercise.

![heatmap](./heatmap.png)

The start and end time can be chosen by the user and the graph automatically picks the right bin size. The time selection and binning was also added to the existing line charts.

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3345).

## Dodona 5.4 - 2022-04-19

Dodona 5.4 adds support for signing in using SURF. This allows all school in the Netherlands to easily sign in using the account of their school. In addition, we added a list of all submissions to the results view of a submission. This also makes it easier to link to individual submissions.

![feedback](./feedback-en.png)

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3545).

## Dodona 5.5 - 2022-04-25

Dodona 5.5 contains an experimental new feature to run Python code in your browser! Every Python exercise now contains a "run your code" button at the bottom right of the page. If you click it, a Python scratchpad appears with the code from the Dodona editor already loaded. If you then click the "Run" button, the code is executed and the output appears below. More advanced features like processing input and importing packages are also supported.

![Python scratchpad](./python-scratchpad.png)

The scratchpad is powered by our [Papyros](https://github.com/dodona-edu/papyros) project. It makes use of cutting edge browser features so it might not run smoothly in all browsers. Any feedback is very welcome!

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3552).


## Dodona 5.6 - 2022-07-04

Dodona 5.6 is bigger than usual because we try to keeps things stable during the exam period.

The biggest visible change is a refresh of the design (based on Material Design 3) and colors. The biggest changes were made to the buttons, which should be more consistent now. In addition, we said goodbye to our orange highlight color. The contrast of orange text on white backgrounds didn't have a high enough contrast to pass accessibility tests. Links (and buttons) are now dark blue and we added pink as a new highlight color. Finally, dark mode was recreated from scratch and now follows a more predictable pattern. These rewrites also pave the way for a color blind theme and a really dark mode in the future.

A second big change is a complete rewrite of the filter and search capabilities. Under the hood, we now use web components to structure the code. Some filters are now more explicitly shown using dropdowns.

Finally, we rewrote our sign in logic. The benefit here is that we can be more transparent about what happens if we encounter a new sign in with an email address that's already used for a different account. In addition, Office365 users will now have to confirm which account they want to use before signing in. This will prevent accidental sign ins with the wrong account.

![filter](./filter.png)

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3763).
