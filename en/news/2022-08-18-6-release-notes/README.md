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
- Use smartschool identifiers instead of usernames
- Disable smartschool co-accounts
- Several fixes for errors

All details about this Dodona version can be found in the [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/4007).
