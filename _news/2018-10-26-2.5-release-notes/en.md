---
title: "Dodona 2.5"
description: "Release notes Dodona 2.5"
slug: "dodona-2.5"
date: "2018-10-26"
lang: en
---

The arrival of the 2.5 millionth submission on Dodona is celebrated with the release of Dodona version 2.5 bringing label management to config files, improved search functionality, a new page to keep track of user progress through the learning path of a course and faster loading of course pages.

We welcome two new secondary schools to the Dodona family: MSKA Roeselare and Don Bosco College Kortrijk (both using Smartschool login) that are mentored by prof. dr. Veerle Fack.

From now on, new Dodona features will be released as soon as they are ready and tested instead of grouped into larger updates. These smaller intermediate releases will allow deploying without any service interruptions, bring new features to you faster, reduce the risk of something going wrong and enable quick rollbacks in case of problems. Please keep forwarding your feedback, comments and suggestions, either as Dodona Github issues or using the [Dodona contact form](https://dodona.ugent.be/contact/).

## Manage labels using config files

As you might have seen in your exercise repositories, the exercise configuration files gained a new labels entry that allows you to specify a list of labels (strings) for a specific exercise (config.json) or all exercises under the directory (dirconfig.json). This allows specification of exercise labels in the exercise repositories without using the web interface, which allows scripting the assignment of labels to exercises. Feel free to keep experimenting with labels and give us your feedback.

## Improved search functionality  

Additional metadata was added to both courses and exercises to increase the usefulness of the search feature. Courses can now optionally specify the institution to which they belong and exercises now also contain their programming language, repository name and location within the repository. This information was added automatically for all existing courses and exercises, so no action from you is required.

When searching for labels, programming languages or repositories, Dodona now tries to autocomplete your query and displays the matched item as a token. Search itself also got smarter by searching for individual words in a query instead of only matching the entire string. The example below shows how exercises can be added to a course series when searching all exercises for the “python” programming language that are labelled with “loops” and that match the term “number” (in this case matches with the names of the exercises in any of the supported languages).

![search](/assets/img/news/dodona-2.5/search.png)

## User progress pages  

Clicking on the name of a user in the member list of a course now takes you to a new page where you can inspect the progress of that user in your course. For now, this page shows the status for each of the exercises and series, but in the future we plan to add more statistics and graphs.

By the way, users are now listed using their full name instead of their username across the entire Dodona platform.

## Faster loading of course pages

Course pages were sometimes slow to load and for courses with many series, getting to the bottom series required scrolling and waiting multiple times. This has now been fixed with a new loading behaviour where only basic series information is loaded initially with more details only being added when a series becomes visible in your browser. Swapping out the basic version for a more detailed version happens so fast that you need expert scroll skills (or a really slow connection) to see it in action.

![skeleton](/assets/img/news/dodona-2.5/skeleton.png)

## Dodona school mentoring program  

Dodona has generic authentication support for Smartschool and Office 365 accounts that are commonly used in secondary education in Flanders. However, during the current pilot phase we block access by default and give controlled access to schools that have a mentor from the Dodona community who wants to provide help and feedback to the schools for getting started with Dodona.

When a school enters the mentoring program, all student and teacher accounts from the school (Smartschool or Office 365) are given access to Dodona. Some teachers from the school are given “staff” rights on Dodona that allows them to start preparing: creating courses with a learning path of exercise series and/or creating new exercise repositories. As the school plans to start working on Dodona with their students, a specific login button for the school is added to the Dodona login page.

If you want to become a Dodona school mentor yourself, please ask the school to send us (and you) the following information by email to [dodona@ugent.be](mailto:dodona@ugent.be):

*   name of the school (as it will appear on the login page)
*   high-resolution logo of the school (as it will appear on the login page)
*   authentication method: Smartschool or Office 365
*   names of teachers that request “staff” role on Dodona
*   name of school mentor from the Dodona community

What we expect from you as a mentor is that you provide first-line assistance to the school in getting started with Dodona. We anticipate that most schools will start by making courses using existing exercises that are shared on the Dodona platform, and will only develop their own collection of new exercises (or even new judges) as they become more experienced. This mentoring program is definitely also open for secondary school teachers that want to mentor their colleagues.

## Dodona TeachMeet (19/09/2018)

![teachmeet](/assets/img/news/dodona-2.5/teachmeet.jpg)

## Full list of changes

For a full list of changes we refer to [our GitHub release](https://github.com/dodona-edu/dodona/releases/tag/2.5), but we list the most important things below.

*   load series via skeleton in course
*   rate limit submissions
*   make programming language a full model
*   change homepage dynamically when favoriting and unfavoriting courses 
*   use the name of the user instead of the username in most places
*   allow the Python Tutor to be used for private exercises
*   allow docker container to be overridden in exercise configuration
*   use the user's name and email address in commits by Dodona
*   limit the number of PIDs an evaluation container can use (prevents fork bombs)
*   add a user page scoped in the course (showing user progress within the course)
*   allow setting labels via exercise config files
*   allow search by repository
*   add institution to course
*   allow searching for users by full name
*   limit write speeds during evaluation to 1 Mbps
*   allow searching in multiple categories at the same time (e.g. status and exercise name in submissions)
*   allow course admins to mass rejudge submissions
