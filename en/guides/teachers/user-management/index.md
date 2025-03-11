---
title: "User Management"
description: "Tutorial: User Management"
order: 4
---

# User Management

On this page, you will find all the information about user management on Dodona.

As a course manager, you get access to the list of all registered users in your course.
You can access this overview by clicking on the user icon in the navigation bar at the top of the course page.
Here, you will see all users who have ever registered for the course or submitted a registration request.
You can view their course overview page, view their solutions, adjust their registration status, and change their management rights.
Management rights determine what a user can do within a course.
For more information, see the guide on [course management](../course-management/).

## User Overview

As a teacher, navigate to the user overview of your course by going to your course and then clicking on `Registered users` in the course description.
You can also click on the user icon in the navigation bar.

![admin menu users](./staff.course_users.png)

In the user overview, the username, name, email address, and [progress](#progress) of all course users are listed.
For each teacher and administrator, an icon corresponding to the management rights assigned to the user is displayed next to their name.

![users](./staff.users.png)

### Search for Users

Use the search bar at the top of the user overview to search for specific users based on a username, name, email address, or user label.
Multiple filters can be active simultaneously.

![filtered list](./staff.users_filtered.png)

### Progress

The progress of a user is indicated by a progress bar.
The green part represents the proportion of exercises in the course for which the user has submitted a **correct** solution.
The red part represents the proportion of exercises for which the user has submitted solutions but has not yet solved **correctly**.
The gray part represents the exercises that the user has not yet **started**.

![statistics](./staff.user_progress_statistics.png)

### Designating Course Managers

Each course has at least 1 course manager.
As a course manager, you can promote other registered users to course manager.
You can do this by clicking on the icon with a cap next to that user:

![edit permissions](./staff.users_edit_permissions.png)

You can recognize the course managers by the icon in the left margin.

![admin in user overview](./staff.course_users_admin.png)

::: tip Important

A course manager who unsubscribes from a course loses their course manager status.
You can also always demote yourself to a student.

To ensure that a course always has at least one course manager, the last course manager cannot unsubscribe and cannot demote themselves to a student.

After creating a course, a teacher can unsubscribe if they have designated at least 1 other course manager.
They can also be demoted by other course managers to a course user without management rights for the course.
:::

### Handling Registration Requests

Depending on the set [registration procedure](../creating-a-course/#course-properties) of a course, you will see multiple tabs in the user list.
Each tab offers different actions to adjust the registration status of the corresponding user.

* `Registered`: all course users who are currently registered.
  By clicking on the blue _garbage bin_ icon, you unsubscribe the user from the course.

* `Waiting List`: all course users for whom there is still an open registration request awaiting handling by a course manager.
  By clicking on green button with the _checkmark_ icon, you approve the registration request. You can reject it by clicking on red button with the _garbage bin_ icon.
  This tab is only visible if the course uses moderated registration.

* `Unsubscribed`: all course users who were once registered but have since unsubscribed.
  You can re-register this user for the course by clicking on blue icon of a _user with a plus sign_.

## Tracking Students

To track the progress of an individual student, there is an overview page per student.
You can view this page by clicking on a student's name in the user overview of a course.
On this page, you will get an overview of a user's progress within the course.
In addition to some statistics, you can also view the status for each exercise and series within the course for this student.

![course overview](./staff.user_course_overview.png)
