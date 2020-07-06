---
title: "Dodona 3.5"
description: "Release notes Dodona 3.5"
permalink: '/news/:year/:month/:day/:slug'
date: "2020-04-21"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

> Dodona 3.5 mainly introduces changes under the hood.

## Exercise status

The status of an exercise for a student is now stored in the database instead of being calculated at each request. This makes it possible to use this status on additional place on Dodona without slowing down the page. An example of this is the display of deadlines on the home page. Next to the deadline date, we now also show if everything was solved in time.

## Full list of changes

Next to these changes under the hood, the [info page for exercises](/en/news/2020/02/27/dodona-3.3/#exercise-information-page) and the [manual annotations](/en/news/2020/03/16/dodona-3.4/#manual-code-annotations) were improved significantly. Please check [our GitHub release](https://github.com/dodona-edu/dodona/releases/tag/3.5) for a full list of changes.
