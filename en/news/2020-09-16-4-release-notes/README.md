---
title: "Dodona 4"
description: "Release notes Dodona 4"
permalink: '/news/:year/:month/:day/:slug'
date: "2020-09-16"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

> From Dodona 4.0 onwards, we'll work with smaller, faster releases. This post will be updated for all new releases in 2020-2021

## Dodona 4.0 - 2020-09-16

Dodona 4.0 is a big release and contains a lot of changes under the hood. Next to those, there are several important user-facing features.

### LTI support
We added support for LTI to make it easier to integrate Dodona in existing learning environments. This is used for our collaboration with [i-Learn](https://www.i-learn.vlaanderen/en) and for integration with the UGent learning environment Ufora. For more information about the Ufora integration, see [this guide](/en/guides/teachers/ufora).

### Ask questions
In a previous version of Dodona, we added the possibility for teachers to add comments to their students' code. In this release, we turn the tables and add the ability for students to ask questions to teachers. This can be done from the code overview of a submission where a question can be asked on their entire solution or a specific line of code.

Teachers can enable or disable questions on a course level. In addition, they get a notification when a new question arrives. For now, answering a question can be done by adding a new comment to the same solution and marking the question as answered.

### New sign in page
Because the number of schools that use Dodona keeps growing, our sign in page was ready for an update. Schools don't get a dedicated sign in button anymore, but can use the filterable list on the sign in page instead.

### Emoji support
Due to limitations on how data was stored in the database, Dodonda didn't support emoji. This problem is now fixed 👍.

All details about this Dodona version can be found in [our GitHub release notes](https://github.com/dodona-edu/dodona/releases/tag/4.0).

## Dodona 4.1 - 2021-03-11

Dodona 4.1 adds an overview page containing all questions of all courses where you are a course admin. You can find a link to that page in the collapsible sidebar on the left side of every page.

All details about this Dodona version can be found in [our GitHub release notes](https://github.com/dodona-edu/dodona/releases/tag/4.1).

## Dodona 4.2 - 2021-03-17

Dodona 4.2 contains some changes which make it easier for us, administrators, to manage the increasing number of schools using Dodona. For example, the default name of a new school will be automatically set using the host name of the sign in provider.

All details about this Dodona version can be found in [our GitHub release notes](https://github.com/dodona-edu/dodona/releases/tag/4.2).

## Dodona 4.3 - 2021-04-26

Dodona 4.3 contains a new way to request teacher privileges. Instead of using the generic contact form, there is now [a dedicated form](https://dodona.ugent.be/en/rights_requests/new/) which allows you to request privileges and set the correct school name at the same time. Your request will be processed as soon as possible and you will receive an email after approval.

In addition, we added statistics about Dodona (number of submissions, users, exercises and school) to the [about page](https://dodona.ugent.be/en/about).

All details about this Dodona version can be found in [our GitHub release notes](https://github.com/dodona-edu/dodona/releases/tag/4.3).
