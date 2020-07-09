---
title: "Dodona 3.0"
description: "Release notes Dodona 3.0"
permalink: '/news/:year/:month/:day/:slug'
date: "2019-09-26"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

Happy birthday Dodona! Exactly three years ago we released the very first version of the platform. Of course we do not celebrate this birthday party without a gift for all our users: Dodona version 3.0 with demo mode, visual representation of progress of all course users, support for the R programming language and — as icing on the cake — Dodona is now open source. In addition, a lot of changes took place behind the scenes to make the platform even more robust. For example, we again use the latest versions of Ruby and Ruby on Rails.

![Dodona in numbers](./3-years.png)

## Open source  
 
Under the [dodona-edu](https://github.com/dodona-edu) organisation on GitHub, multiple repositories containing source code for different components of the Dodona platform were published: the [web applicatie](https://github.com/dodona-edu/dodona), the [API](https://github.com/dodona-edu/dodona-api-typescript), the [user manual](https://github.com/dodona-edu/dodona-edu.github.io), the configuration of [_docker images_](https://github.com/dodona-edu/docker-images) for executing submitted solutions, numerous _judges_ for assessing submitted solutions in various programming languages, and a specific tool for plagiarism detection in source code ([dolos](https://github.com/dodona-edu/dolos)). Don't hesitate to send in your pull requests!  

Thanks to [Rien Maertens](https://github.com/rien) we can also provide a [script](https://github.com/dodona-edu/github-migrate) for anyone who needs to migrate code repositories with all their issues, pull requests, releases, ... from GitHub Enterprise to [github.com](https://github.com/).  

## Demo mode

Use demo mode for in-class demonstrations of learning analytics or source code from Dodona without revealing student identities. In demo mode, all personally identifiable information fields (usernames, e-mail addresses, ...) are replaced by randomly generated pseudonyms. To make identification harder, new pseudonyms are generated on a daily basis.  

![demo mode](./demo.png)

## Support for the R programming language

From now on, Dodona also provides a judges for automatic evaluation of submitted solutions in the R programming language. Those who would like to create exercises for this programming language can already find the source code of the judge and its accompanying documentation in this [GitHub repository](https://github.com/dodona-edu/judge-r). The judge is available open source, so you don't have to hesitate to create issues and you need help or want to see additional functionality that is currently missing.  

## Visual representation of course user progress

After the positive reception to the visual representation of the progress for exercises in a series, we have also added the same visualization to the overview of course users. There we visualize the number of exercises a user has started and the number of correctly solved exercises. The maximum number corresponds to the total number of exercises in the course.  

![user progress](./user-progress.png)

## Full list of changes  

For a full list of changes, we refer to [our GitHub release](https://github.com/dodona-edu/dodona/releases/tag/3.0).

*   make demo mode available to course administrators
*   add support for the R programming language
*   visual representation of progress in overview of all course users
*   display icon to course administrators if visual progress for exercises in series is disabled for course users
*   clarify links in overview of all solutions submitted in a course
*   fix width when dragging an dropping table rows
*   convert all icons to [Material Design Icons](https://material.io/resources/icons/)
*   add overview of solutions submitted for a specific judge
*   faster filtering on educational institution in overview of course users
*   send automatic email upon creation of repository with incorrect configuration files
*   add button for directly unsubscribing course adminstrators
*   fix internal server error when requesting the 0th page from overview
*   reduce number of queries when displaying course users
*   allow course administrators to toggle visibility of exercises in a series
*   heatmaps display entire period in which solutions were submitted in course
*   listen to OS-level setting if user did not explicitly select dark/light mode yet
*   only show registered course users in status overview of series
*   guarantee stable order of exercises in series
*   fix rendering of unified diff for legacy Python exercises
*   allow judges to set access levels for individual feedback tabs
*   course scoped links to selected exercises on series edit page
*   always stay on current page when removing series from a course