---
title: "Dodona 2.8"
description: "Release notes Dodona 2.8"
permalink: '/news/:year/:month/:day/:slug'
date: "2019-03-05"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

> Release 2.8 uses the file system instead of a database for storing submitted code and generated feedback, enables filtering of users included in the scoresheet of a series, and displays course-level statistics.

## Store submission data on file system

Storing submission data on the file system instead of in the database is merely a technical intervention that does not alter the way Dodona is used. However, it opens avenues for more flexible submission scenarios that extend or replace the current single text file submission. Some options: file editor with multiple tabs (e.g. HTML, CSS and JavaScript tabs for web development assignments), file upload (e.g. .jar files for Java) or embedded editor (e.g. for Scratch 3.0).

## Filter users in a series scoresheet

The scoresheet of a course series by default contains all course members. From now on, this list of users can be reduced by searching for specific users by name and/or by label. The scoresheet menu also contains an option to only show users that have submitted at least one solution for an exercise in the series.

![status overview](./statusoverzicht.png)

## Display course-level statistics
 
Course admins can inspect course-level statistics by clicking the statistics button in the navigation bar. The statistics page displays basic course statistics and a punchcard that groups submission timestamps by hour of day and week. More statistics will be added in future releases.

![course stats](./course-stats.png)

## Full list of changes

For a full list of changes we refer to [our GitHub release](https://github.com/dodona-edu/dodona/releases/tag/2.8), but we list the most important things below.

*   enforce maximal memory limit for evaluating submissions
*   store submission data on file system
*   add punchcard with submission timestamps to course-level analytics
*   list courses that use an exercise on exercise edit page
*   allow course admins to download all submissions for a series
*   improve caching behaviour
*   add institution to user profile
*   filter users included in series scoresheet
