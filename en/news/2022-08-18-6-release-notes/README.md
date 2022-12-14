---
title: "Dodona 6"
description: "Release notes Dodona 6"
permalink: '/news/:year/:month/:day/:slug'
date: "2022-08-18"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

> Throughout the year, Dodona works with smaller releases. This post will be updated for all new releases in 2022-2023

## Dodona 6.0 - 2022-08-18

Users with a personal Google (Gmail) or Microsoft (Hotmail, Outlook, ...) account can now create an account on Dodona! Previously, accounts needed to belong to an institutional Office 365 or Google Workspace subscription, but this restriction has been lifted.

To prevent students from using their private account (instead of their school account) to subscribe to official school courses, course administrators must explicitly allow private accounts in their courses if they wish to.

The privacy policy has been updated to reflect this change, but contains no changes for existing users.

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3900).

## Dodona 6.1 - 2022-09-19

Dodona 6.1 contains a beta version of reusing annotations while manually evaluating submissions. For now, this feature is only available for a select subset of users.

In addition, over the past few weeks, we made many changes to improve the sign in flow:
- Better handling in case a Dodona account already exists with a certain email adress
- Use more readable usernames where possible
- Renamed private account to personal account
- Use smartschool identifiers instead of usernames internally
- Disable smartschool co-accounts
- Several fixes for errors

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/4007).

## Dodona 6.2 - 2022-11-25

Dodona 6.2 contains few user-facing features. It's main addition is a better detection of similar institutions for the Dodona administrators.

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/4192).

## Dodona 6.3 - 2022-12-13

Dodona 6.3  brings two big new UI changes!

### Exercise filters
Teachers can add their own exercises to Dodona for everyone to use. This way, we have collected over 11k exercises. The downside of this is that it became hard to find high quality exercises. Instead of limiting who could create exercises, Dodona 6.3 adds a few powerful filters.

First of all, the long list of exercises is split into multiple tabs:
- a tab containing all exercises from repositories you added yourself or where you received special access
- a tab containing all exercises from you or your colleagues
- a tab containing "featured exercises", these are exercises of which we think they are of high quality
- a tab containing all exercises

In addition, we added a popularity indicator and filter to the table. The idea is that highly popular exercises have a higher chance of being of good quality. This way, we hope to strike a balance between surfacing quality content and allowing everyone to experiment with their own exercises.

![image](https://user-images.githubusercontent.com/481872/207433739-0fa48ea1-db06-4982-99ab-2c76538fc66f.png)

### Home page rework
In addition, Dodona 6.3 contains a first step in a bigger project to make the home page more useful by surfacing actionable information that might otherwise stay hidden.

The first step is the addition of "action cards" to the top of the home page. The first card is always "jump back in". Depending on your recent activity, this card will guide you back to an unfinished exercise, the next exercise in the series you last worked in or even the next series.

Next to "jump back in", we show your progress towards up to two upcoming deadlines. Both the color and a progress bar indicate the current status.

![image](https://user-images.githubusercontent.com/481872/207435965-5c147754-fd39-4c20-bdac-784b0e1ac8f6.png)

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/4234).
