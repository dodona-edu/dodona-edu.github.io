---
title: "Dodona 3.3"
description: "Release notes Dodona 3.3"
permalink: '/news/:year/:month/:day/:slug'
date: "2020-02-27"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

> Dodona 3.3 brings a new exercise information page for teachers.

## Exercise information page

As a teacher, you now have access to an information page for each exercise. This page displays the applied settings such as the memory limit and who created the exercise. In addition, the creator of the exercise can also add additional information and the solution to the exercise.

![Info page of an exercise](./info-page.jpeg)

## Feedback only visible for teachers

Sometimes, a judge outputs some feedback messages that are only visible to teachers. Up until now, it was impossible for teachers to know which messages were only available to them and which were also available to students. In this release, a gray marker and icon were added to messages that are only available for teachers.

![teacher only message](./teacher-message.png)

## Full list of changes

Aside from these changes, we have also worked on a number of smaller issues. Please check [our GitHub release](https://github.com/dodona-edu/dodona/releases/tag/3.3) for a full list of changes, but below we already list the most important issues.

* Add line numbers to the display of external text files
* Automatically hide warning and info messages when there are errors in de source code
* Make the export action asynchronous and add notifications
* Add API access to the score sheet
