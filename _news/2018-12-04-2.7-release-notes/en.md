---
title: "Dodona 2.7"
description: "Release notes Dodona 2.7"
slug: "dodona-2.7"
date: "2018-12-04"
lang: en
---

Release 2.7 contains a punchard with a visual representation when users have submitted their solutions and provides functionality to add labels to course members.
{: .fs-6 .fw-300 }

## Punchcard

A punchchard has been added to the user profile page and the course member profile page. This gives a visual representation when the user has submitted his solutions to Dodona. The punchcard on the user profile page takes into account all submitted solutions of the user. The course member profile page only takes into account the solutions the user has submitted within the course. Users can see their own profile pages and course admins can see the profile pages of all course members.

![punchcard](/assets/img/news/dodona-2.7/punchcard.png)

## Course member labels

Course admins can assign labels to course members. This allows to create groups of course members with a course. Labels assigned to course members are only visible within the course. Course admins can never see course member labels assigned in other courses.

There are two ways to assign labels to course members. The course member profile page contains a button that allows to edit the labels of that user. On the course member overview page, you'll also find an option "Edit all labels" in the action menu, which allows you to bulk edit the labels of all course users.

![labels](/assets/img/news/dodona-2.7/labels-en.png)

Labels assigned to course members can be used when searching submitted solutions in a course of when searching users in a course.

## New research and education institutes

With this release we welcome to new secondary schools using Dodona: Sint-Jozefscollege (Aalst, Belgium) and [Atheneum De Ring](https://deringleuven.be/) (Leuven, Belgium).  

## Full list of changes

For a full list of changes we refer to [our GitHub release](https://github.com/dodona-edu/dodona/releases/tag/2.7), but we list the most important things below.

*   add meta tags for embedding Dodona contain in other websites
*   add login button for [Sint-Jozefscollege](http://sjcaalst.be/) (Aalst, Belgium) to sign in page
*   add Twitter link to the footer
*   enable adding labels to course members
*   fix bug where submission weren't refreshed upon evaluation
*   add login button for Atheneum De Ring (Leuven, Belgium)  to sign in page
*   restrict access to delayed job web to admins
*   stop basic auth support
*   add buttons to hide correct tests (contexts)
*   add punchard to user profile page and course member profile page
*   always send at least one email upon errors in processing exercises
*   support both content types for Github webhooks 
*   sanitize pagination parameter
*   optimize multiline flow of submitted solutions overview for narrow screens
*   add typescript compilation to webpacker
