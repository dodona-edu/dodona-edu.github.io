---
title: Activities
---

# FAQ: Activities

[[toc]]

## What is a draft activity?
Every newly added activity is considered a draft activity until they are published.

The idea is that an activity stays in draft mode until its creator greenlights it manually using the Dodona UI.

## What is the effect of a draft activity?
The concept of draft activities serves several goals.

### Prevent clutter
Draft activities are only visible for repository owners and course admins for courses with the activity. This prevents that multiple copies of our example exercises are present in the global database for everyone to see.

### Reduce false-positive error messages
The Dodona admins are notified of severe errors (`internal error`) during the execution of a submission. When a teacher is creating a new exercise and experimenting with adding tests, these errors are quite common. Because of this, the Dodona admins often ignore these messages, causing real issues to be unnoticed. When an exercise is still in draft mode, we will no longer notify the Dodona admins.

### Improve discoverability
When you add a new exercise to Dodona, it is not always easy to find that exercise and try it yourself. We will now list all draft exercises of a user on the home page, making these easier to find.