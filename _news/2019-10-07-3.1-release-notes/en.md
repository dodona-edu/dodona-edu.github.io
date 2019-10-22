---
title: "Dodona 3.1"
description: "Release notes Dodona 3.1"
slug: "dodona-3.1"
date: "2019-10-07"
lang: en
---

The release of Dodona 3.1 makes Dodona more secure and faster.

## Security

Until now, exercises could change the entire layout of Dodona and execute _scripts_. These _scripts_ were able to do anything the user looking at the page could do on Dodona, e.g. submit solutions. For teachers this meant that these _scripts_ could be used to extract data about students. To be clear, this has never happened. However, since an ever increasing number of people can add exercises to Dodona, it became time to fix this.

We fixed it by placing exercise descriptions in an _iframe_. This ensures that your browser will not allow the contents of the _iframe_ to do things outside of the _iframe_ (i.e. in the rest of Dodona). Additionally, we made sure that the contents of the feedback table of submitted solutions and the descriptions of courses and series are cleaned up before they are shown to users.

## Speed

For really large feedback tables it could take a while before the feedback table was shown after the submission was evaluated (sometimes up to 40 seconds!). By performing some smart tricks and where necessary showing the feedback in a simpler way we made sure that it never takes more than a second to load a feedback table.

We also made it more visual when the feedback table is loaded. We now show a loading icon that is replaced when the feedback table has finished loading.

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