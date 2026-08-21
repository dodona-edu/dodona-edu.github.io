---
title: "Understanding Feedback"
description: "Reference: submission statuses and the structure of judge feedback"
order: 5
---

# Understanding Feedback
As soon as possible after submission, a solution is automatically evaluated by a judge associated with the exercise. The judge provides detailed **feedback** on the correctness of the submission, which you can use to correct or further refine your solution. You see this feedback right in the hand-in panel after submitting a solution, and it is also shown on the feedback page of a submission, which you reach through the [submission overviews](../exercises/#navigating-to-a-submission). This page explains what the different submission statuses mean and how the detailed feedback of the judge is structured. How to navigate to exercises and submit solutions is covered in [Solving Exercises](../exercises/).

![Submission results page for a correct Curling solution](./submission-page-en.png)

## The Feedback Page

At the top of the feedback page, a line reads `Submission #N for <exercise> in <course>`, linking to the exercise and course pages (the course part is omitted if the solution was not submitted within the context of a course). Below that:

- An **icon** and the **status** assigned to the solution by Dodona or the judge, together with the **time** the solution was submitted, displayed in a user-friendly manner (for example, *about 2 hours ago*; hover over it to see the detailed time). The meaning of each status is explained [below](#submission-statuses).

- A **history** list on the right, showing your other submissions for the same exercise (submission time, number, and status), so you can jump between them.

## Submission Statuses

Meaning of the possible statuses that can be assigned to a solution:

| Status                  | Icon                                                                    | Meaning                                                                                                           |
|-------------------------|-------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------|
| `Queued…`               | ![Queued](../../../../images/submission-status-icons/queued-running.png) | Solution is in the queue                                                                                          |
| `Running...`            | ![Running](../../../../images/submission-status-icons/queued-running.png) | Solution is currently being evaluated by the judge                                                                |
| `Correct`               | ![Correct](../../../../images/submission-status-icons/correct.png)      | All tests have succeeded.                                                                                         |
| `Wrong`                 | ![Wrong](../../../../images/submission-status-icons/wrong.png)          | Logical error encountered during the execution of at least one test                                               |
| `Runtime Error`         | ![Runtime error](../../../../images/submission-status-icons/runtime-error.png) | Unexpected error encountered during the execution of at least one test                                    |
| `Timeout`               | ![Time limit exceeded](../../../../images/submission-status-icons/time-limit-exceeded.png) | Time limit for the exercise was exceeded during testing; may indicate poor performance or an infinite loop. |
| `Memory limit exceeded` | ![Memory limit exceeded](../../../../images/submission-status-icons/memory-limit-exceeded.png) | Memory limit for the exercise was exceeded during the execution of at least one test               |
| `Output limit exceeded` | ![Output limit exceeded](../../../../images/submission-status-icons/output-limit-exceeded.png) | The solution produced more output than the exercise allows                                          |
| `Compilation Error`     | ![Compilation error](../../../../images/submission-status-icons/compilation-error.png) | Solution contains grammatical errors                                                                       |
| `Internal Error`        | ![Internal error](../../../../images/submission-status-icons/internal-error.png) | Judge crashed during the evaluation of the solution; the cause of the error lies with the judge, not the solution |

The lower a status is listed in the table above, the more severe the type of error it corresponds to.

::: tip
Your submission status for an exercise *within a course* (correct, deadline missed, ...) is a different concept: it is based on your last submission before the deadline of the exercise series. It is explained in [Courses on Dodona](../courses/#submission-status).
:::

## Feedback Tabs

Below the status, there is more detailed feedback that the judge may have split across multiple *tabs*. Tabs are named after the judge's own test groups (there is no fixed "Correctness" tab). Next to the name of a tab, there may be a *badge* on the right side with a number. The number indicates how many errors the judge found while executing the tests reported under that tab.

![Wrong solution feedback with a red badge and a character-level diff](./feedback-diff-en.png)

The last tab is always named `Code` and contains the source code of the solution. In certain places in the source code, the judge may have added comments (e.g., about coding style) that may also explain why a particular status was assigned to the solution.

![Code tab with a Warning and an Error annotation inline](./code-annotations-en.png)

::: tip Tip

In the `Code` tab, you cannot modify the source code of the solution. To do that, click `Edit submission` in the upper right corner of the feedback page (in the hand-in panel on the exercise page, this button is called `Edit this submission`). The source code of the solution you are currently viewing will then be loaded into the editor. There you can edit the source code and possibly resubmit it.
:::

## Tests, Test Cases, and Contexts

For each tab, the judge reports on individual **tests** to which the source code was subjected. Related tests are grouped into a **test case**, and interdependent test cases are grouped into a **context**.

![Feedback with two correct context cards](../exercises/handin-feedback-en.png)

Visually, all test cases of a context are grouped in an expandable card.
The header of the card will contain `Correct` or `Wrong` depending on the judge's assessment of the entire context.
If some, but not all contexts are correct, the correct contexts will be collapsed by default, and the incorrect contexts will be expanded by default.

Within a context, the test cases of the context are displayed one below the other. The description of a test case is displayed within a rectangle with a light gray background color that spans the full width. In the upper left corner of that rectangle, there is a colored symbol indicating whether the judge considers the entire test case to be successful (green checkmark) or unsuccessful (red cross).

If the judge reports on individual tests within a test case, they are listed below the rectangle with the light gray background containing the test case description. To visually distinguish it from the test case display, each test is displayed with a small margin on the left and right. The display of a test consists of the following optional components, which are displayed one below the other:

-   A description of the executed test. This description is displayed within a rectangle with the same light gray background color as the test case description.

-   A textual comparison between an expected value and a value generated based on the solution. If at least one of the values consists of multiple lines, the corresponding lines are aligned opposite each other. Identical corresponding lines are displayed with a transparent background color. If corresponding lines differ, they are displayed with a light-colored background color (green for the expected value and red for the generated value). Individual characters that differ within corresponding lines are displayed with a darker background color (green for the expected value and red for the generated value).

-   General feedback about the executed test. For this feedback, the judge has complete freedom regarding the formatting, allowing for both textual and graphical feedback.

    ![A wrong test with a diff and a judge-drawn graphic below it](./visual-feedback-en.png)
