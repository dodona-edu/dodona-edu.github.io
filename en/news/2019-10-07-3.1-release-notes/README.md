---
title: "Dodona 3.1"
description: "Release notes Dodona 3.1"
permalink: '/news/:year/:month/:day/:slug'
date: "2019-10-07"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

> The release of Dodona 3.1 makes Dodona more secure and faster.

## Security

Until now, exercises could change the entire layout of Dodona and execute _scripts_. These _scripts_ were able to do anything the user looking at the page could do on Dodona (e.g., submit solutions) which is a potential security risk. While we fully trust our exercise creators and don't have any evidence that this feature was misused, it is better to prevent any future problems.

We fixed it by placing exercise descriptions in an _iframe_. This ensures that your browser will not allow the contents of the _iframe_ to do things outside of the _iframe_ (i.e. in the rest of Dodona). Additionally, we made sure that the contents of the feedback table of submitted solutions and the descriptions of courses and series are stripped of any malicious code before they are shown to users.

## Speed

For really large feedback tables it could take a while before the feedback table was shown after the submission was evaluated (sometimes up to 40 seconds!). By performing some smart tricks and falling back to a simpler output format for large results, we managed to significantly reduce the loading time. Now, it should never take more than a second to load a feedback table.

We also added a loading indicator to indicate that the feedback table is busy loading.

## Full list of changes

Aside from these two big items we of course also improved a number of small things. For a full list of changes we refer to [our GitHub release](https://github.com/dodona-edu/dodona/releases/tag/3.1), but we list the most important things beneath.

* Clean up the feedback table contents before they're shown to a user
* Show exercise descriptions inside of an iframe
* Merge the scoresheet on the course level and the series level
* Make sure striped tables look good in dark mode
* Make sure users can subscribe to hidden courses that are open for everyone to subscribe
* Only use evaluated submissions to determine the status of an exercise or a series
* Some more small fixes for dark mode
* Restore the icon for queued or running submissions
* Update to Ruby 2.6.5
