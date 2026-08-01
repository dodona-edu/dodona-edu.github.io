---
title: "Course management"
description: "Tutorial: course management"
order: 3
---

# Course Management
On this page, you will find all the information about course management on Dodona.

A course is structured as a learning path with exercises that are bundled into exercise series. The sequence of exercise series implies a possible order in which the exercises can be solved. Users can register themselves for a course. There is always at least one user who is the course administrator, for example, the user who created the course. For information on how to create a new course, you can go [here](../creating-a-course/).

## Administrative Rights

Course administrators have special rights within a course. They can modify the course as they wish and track the progress of the students enrolled in the course. The user who creates the course is automatically appointed as the course administrator. They can, in turn, appoint other additional course administrators from among the users enrolled in the course.

## Edit Course

To edit the properties of an existing course, navigate to the course page and click on the edit icon at the top.

![Course navigation bar with the pencil edit icon, above the course header card](./course-edit-button-en.png)

You will be taken to a page where you can adjust the name, teacher, description, language, programming language, visibility, and registration procedure. For more details about the specific properties, you can go to [this page](../creating-a-course/#course-properties).

After making changes, click the finish button in the upper right corner of the panel to save the new course properties. Alternatively, you can also click `Update` at the bottom of the panel. Then you will automatically navigate back to the course page where the new course properties will immediately take effect.

![Course header card with the title, teacher, Teaching and Moderated pills, and the stats row](./course-after-edit-en.png)

## Building a Course

As a course administrator, you can outline a learning path for the course. The learning path is displayed on the course page under the heading `Learning path`. You can add exercise series to the learning path, to which you can link exercises, and group those series into [sections](../exercise-series-management/#group-series-into-sections) to structure larger courses. For more explanation about what you can do, see [managing exercise series](../exercise-series-management/).

## Managing Course Users

To get an overview of the users in a course, click on the user icon in the navigation bar at the top of the course page. For more information about the actions you can perform there, you can consult the guide on [user management](../user-management/).

## Navigating to Submissions

As a course administrator, you can track everything that happens within your course. To get an overview of all solutions submitted by the students, click on `Submitted solutions` at the top of the course page or on the icon in the navigation bar.
![Course navigation bar with the submissions icon, above the header card showing the "Submitted solutions" stat](./course-submissions-link-en.png)

The overview contains a lot of information per submission, such as the name of the user and the name of the exercise, including filters for these values. The status, timestamp, and a link to the submission are also present.
![Submissions overview with search bar, Status and Member Labels filters, and filter funnel icons next to the user and exercise names](./course-submissions-filter-en.png)

If you click on the filter icon for the name of a student or exercise, the list of submissions will be filtered to show only solutions for that specific user or exercise.

![Submissions overview filtered to a single student and exercise](./course-submissions-filtered-en.png)

You can also access these submissions in other ways:

* An overview of the submissions for a **specific exercise** can be found by clicking on the arrow to the right of an exercise on the course page.
* An overview of the submissions for a **specific user** can be found by clicking on `Solutions` on the [course page of that user](../user-management/#tracking-students).

In the submissions overview, you will find a button `Retest submissions` at the top right. This button allows you to [retest](../series-export-and-retest/#retest-submissions) all solutions in the overview.

You can also filter for the `Most recent submissions per user` by clicking on the three dots to the right of the filter bar. Here you'll also find the option to `automatically reload submissions` every 5 seconds, which can be useful when you want to follow the progress of your students in real-time.

### Detecting Plagiarism with Dolos

On the submissions overview for a specific exercise, you will find a `Detect plagiarism` button next to `Retest submissions`.

![Retest submissions and Detect plagiarism buttons above the submissions overview filtered to a single exercise](./submissions-detect-plagiarism-en.png)

Clicking this button collects the most recent submission of each student for the exercise and sends them to [Dolos](https://dolos.ugent.be/), our plagiarism detection tool for source code. Dolos runs as a separate service: the report opens in a new tab, and on Dodona the button changes into `Open plagiarism report` so you can return to the report later. Dolos supports most commonly used programming languages; for exercises in a language it does not support, the button is disabled.

The report gives you a high-level view of how similar the submitted solutions are: it lists the pairs of submissions with the highest similarity and visualises clusters of similar solutions in a graph. This makes it easy to spot suspiciously similar submissions, but the interpretation remains up to you: high similarity is a signal to investigate, not proof of plagiarism. You can learn more about Dolos and how to read its reports on [dolos.ugent.be](https://dolos.ugent.be/).

![Dolos plagiarism report](/images/dolos.png)

::: tip Dolos in evaluations
The `Detect plagiarism` button is also available on the overview page of an [evaluation](../grading/#evaluation-progress), so you can check for plagiarism before you start grading a task, test, or exam.
:::
