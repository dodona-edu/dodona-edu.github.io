---
title: Activities
---

# FAQ: Activities

[[toc]]

## What is a draft activity?
A draft activity is an activity where the draft flag (boolean) is set to true. This boolean is tracked in both the [exercise config file](/en/references/exercise-config) as well as the database. For all new exercises, the draft state is automatically set to true (similar to the key that is added to the internals). For existing exercises, the draft flag is set to false in the database, but this value isn't added to the config file.

The idea is that an activity stays in draft mode until its creator greenlights it manually using the Dodona UI or the config file.

## What is the effect of a draft activity?
The concept of draft activities serves several goals.

### Prevent clutter
Draft activities are only visible for repository owners and course admins for courses with the activity. This prevents that multiple copies of our example exercises are present in the global database for everyone to see.

### Reduce false-positive error messages
The Dodona admins are notified of severe errors (`internal error`) during the execution of a submission. When a teacher is creating a new exercise and experimenting with adding tests, these errors are quite common. Because of this, the Dodona admins often ignore these messages, causing real issues to be unnoticed. When an exercise is still in draft mode, we will no longer notify the Dodona admins.

### Improve discoverability
When you add a new exercise to Dodona, it is not always easy to find that exercise and try it yourself. We will now list all draft exercises of a user on the home page, making these easier to find.