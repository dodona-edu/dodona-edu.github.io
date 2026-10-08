---
title: "Solving Exercises"
description: "Tutorial: solving exercises"
order: 4
---

# Solving Exercises
All the information you need to navigate to exercises or solutions, submit solutions, and ask questions about your code as a student. What the feedback on a submission means is explained in detail in [Understanding Feedback](../feedback/).

## Navigating to an Exercise

Exercises on Dodona can either be part of a course or standalone.

- Exercises that belong to a course can be found by visiting the course page.
  ![Series card with the exercise table outlined](./course-exercise-selection-en.png)
- Exercises that do not belong to a course can be found by visiting the [activity overview](https://dodona.be/en/activities/), which contains a list of all exercises.

::: tip Tip
On your homepage, you can find a list of the five most recent exercises you submitted solutions for across all courses. This way, you can quickly select an exercise you recently worked on by clicking on the exercise name.

![Recent exercises card on the homepage](./recent-exercises-en.png)

:::

At the top of each exercise page, you see the name of the exercise, with the name of its exercise series above it. Below the name follows the description of the exercise. The display of these components depends on the selected language. If a translation of the name and description is provided in the selected language when creating the exercise, these components will also be displayed in that language.

![Exercise page with the exercise series in the left column, the name and description of the exercise in the middle, and the On this page list on the right](./exercise-page-en.png)

On larger screens, the exercise page has a column on each side of the description:

- On the left, you see the exercise series with your progress: a progress bar, how many activities of the series you have solved, the deadline, and every activity of the series with its status. Click an activity to open it, or click its status to open your latest submission. Below the list, `Next series` takes you to the next exercise series of the course. On a phone, this list is folded into a strip above the name of the exercise: tap the strip to open it.
- On the right, `On this page` lists the headings of the description. Click a heading to jump to it; while you scroll, the list marks the part you are reading. The last item, `Hand in`, takes you straight to the hand-in panel and shows the status of your latest submission.

Below the description, two cards link to the previous and the next activity of the exercise series.

::: tip

When performing an action on an exercise, the name of the exercise appears next to `Dodona` on the left side of the navigation bar, possibly preceded by the course name and the name of the exercise series from which you selected the exercise. By clicking on the exercise name in the navigation bar, you will navigate to the exercise page. By clicking on the exercise series name in the navigation bar, you will navigate to the exercise series on the course page. By clicking on the course name in the navigation bar, you will navigate to the course page.

![Exercise breadcrumbs, all three levels highlighted in the navigation bar](./exercise-breadcrumb-en.png)
:::

## Submitting a Solution

Below the exercise description, you will find the *hand-in panel*. Its header shows the name of the exercise and, in the top-right corner, a button with your number of submissions for this exercise (for example `1 submission`). The *code editor* is always visible in this panel: place the source code of your solution in the editor and click the `Submit` button at the bottom right to submit it. As the bar at the bottom of the panel reminds you: **you can submit as many times as you like, and only your latest submission will be taken into account**. Automatic feedback will be provided by the judge for each submission, which you can use to correct or further refine your solution.

![Hand-in panel with an empty editor and the highlighted Submit button](./handin-editor-en.png)

If you cannot submit a solution, the hand-in panel tells you why at the top, and offers the next step when there is one. For example, if you are not registered for the course yet, it says `Register for <course> to hand in solutions.` with a button to register; when you are not signed in, it asks you to sign in first.

For Python exercises, the `To sandbox` button next to the submit button opens [the Python sandbox](../scratchpad/), where you can run and debug your code in the browser before submitting it.

::: tip Using the keyboard
The editor does not grab your keyboard when the page opens: click in it (or reach it with <kbd>Tab</kbd>) to start typing. Inside the editor, <kbd>Tab</kbd> indents your code. To move on to the rest of the page with the keyboard, press <kbd>Esc</kbd> and then <kbd>Tab</kbd>. When you reach the editor with the keyboard, it shows this as a reminder: `Esc, then Tab, leaves the editor`.
:::

::: tip Deadlines
When the deadline of the exercise series is less than five minutes away, an alert appears above the editor with the exact deadline. Once the deadline has passed, the alert warns you that you can still submit, but that your submissions may no longer be taken into account.
:::

::: tip Use an IDE

Although you can program directly in the editor on Dodona, we do not recommend solving all exercises there. Instead, we advise using an [Integrated Development Environment](https://en.wikipedia.org/wiki/Integrated_development_environment) (IDE). IDEs provide more support during the writing, execution, testing, and debugging of source code. This way, you learn to apply your programming skills generically to solve problems other than just the exercises on Dodona.

Additionally, there is a plugin available for JetBrains IDEs such as [IntelliJ](https://www.jetbrains.com/idea/), [PyCharm](https://www.jetbrains.com/pycharm/), and [WebStorm](https://www.jetbrains.com/webstorm/specials/webstorm/webstorm.html). There is also an extension available for [**Visual Studio Code**](https://code.visualstudio.com/). Programmers using these IDEs can submit their solutions directly to Dodona using these tools. Without the tool, you would need to copy and paste the code into the editor on Dodona and click the submit button. Instructions can be found [here for PyCharm](/en/faq/ide-plugins/#how-do-i-install-the-pycharm-plugin) and [here for VS Code](/en/faq/ide-plugins/#how-do-i-install-the-vs-code-extension).
:::

After you click `Submit`, your solution is placed in a queue and evaluated by the judge; the submit button shows the progress (`Handing in…`, `Evaluating…`). This usually takes only a few seconds. As soon as the judge has finished, the detailed [feedback](../feedback/) appears in the hand-in panel itself, in place of the editor. A bar at the top of the panel shows the status of the submission (for example `Correct` or `Wrong`) with a short summary and the time of submission.

![Hand-in panel showing the feedback for a correct submission, with the status bar and the Edit this submission button](./handin-feedback-en.png)

Judging continues while you look at something else. If you open an earlier submission from the submission history, or click `Edit & resubmit`, while your latest solution is still being judged, the panel keeps showing what you opened. A `New result!` message then appears at the top of the hand-in panel with the status of your new submission; click `View result` in that message to open its feedback. The message disappears once you open the result or hand in a new solution.

From the feedback you can go straight back to improving your code: click `Edit this submission` (or `Edit & resubmit` at the bottom of the panel) to load the code of the submission you are viewing back into the editor. If you had unsubmitted changes in the editor, the `Back to editor` button returns to the editor exactly as you left it.

When you return to an exercise you have submitted for before, the editor automatically contains the code of your latest submission. An info message above the editor, `We have preloaded your latest submission into the editor.`, tells you this happened. Prefer to start over? The button next to that message restores the exercise's initial code (`Restore the initial code`) or, if the exercise has none, empties the editor (`Clear editor`).

![Info message above the editor saying the latest submission was preloaded, with the Clear editor button](./handin-preloaded-en.png)

## Navigating to a Submission

You can navigate to your submitted solutions on Dodona in several ways. For each method, the submissions will be grouped differently by Dodona. Here are the two main methods:

- You can view all your submissions for a single exercise in the *submission history* of that exercise: click the button with your number of submissions (for example `2 submissions`) in the top-right corner of the hand-in panel. The submissions are listed in reverse chronological order (most recent at the top), with for each submission its number, status, a brief summary of the [feedback](../feedback/), and the submission time. Before each submission, there is also an [icon](../feedback/#submission-statuses) corresponding to its status. Click a submission to view its feedback in the hand-in panel.

![Open submission history with a list of submissions and their statuses](./submission-history-en.png)

- You can view all the solutions you have ever submitted by clicking on `My submissions` in the user menu in the navigation bar.

![Open user menu with My submissions highlighted](./user-menu-my-submissions-en.png)

A submissions overview contains the submission number, submission time, status, and a brief summary of the feedback for each solution. Before each solution, there is also an [icon](../feedback/#submission-statuses) corresponding to the solution's status. The solutions are always listed in reverse chronological order (most recent at the top).

![All submissions overview with search field, status filter, and a table of solutions](./my-submissions-en.png)

You can select a solution by clicking on the arrow to the right of the solution in a solutions overview. This will navigate you to the feedback page with detailed feedback about the solution. The same page is displayed when you click on the submission number.

![All submissions overview with the chevron of the first row highlighted](./my-submissions-open-en.png)

## Reading Your Results

Whether you view the feedback in the hand-in panel or on the feedback page of a submission, it always contains the same detailed **feedback** about your solution. At the top, it shows the **status** the judge assigned to your solution (for example `Correct` or `Wrong`) and a brief summary of the result. Below that, the judge reports in detail on all tests your solution was subjected to, and the `Code` tab shows your source code with any comments the judge added.

The meaning of each status and the way the detailed feedback is structured are explained in [Understanding Feedback](../feedback/).

## Asking Questions
::: tip Note
This feature is only available if your teacher has enabled it.
:::

![Code tab with the "Ask a question about your code" button and a pink per-line bubble](./ask-question-button-en.png)
After you have submitted your solution, you can ask a question in three ways. At the top of the submitted code, you can ask a general question by clicking on `Ask a question about your code`. In addition, you can click on the pink circle to the left of the line number to ask a question about a specific line of code. You can also select a piece of code and then ask questions about it using the same button.


![Ask question animation](./ask-question-en.gif)

Type the question you want to ask the teacher in the text box. You can use Markdown to add extra formatting to your text. Finally, click on `Ask question`.

::: tip Markdown support

You can add extra formatting with Markdown by:

- asterisks (\*) around words to make it italic. \*italic text\* will be displayed as *italic text*.
- double asterisks (\**) around words to make it bold. \*\*bold text\*\* will be displayed as **bold text**.
- backticks (\`) around a piece of code. \`Variables\` will be displayed as `Variables`.

Here you can view [all the possibilities of Markdown](/en/references/exercise-description/#markdown).
:::

![A teacher's comment on a line of code, with the Reply field below it](./question-reply-en.png)

You can also respond to an existing question from yourself or to a comment from a teacher. To do this, click on `Reply` below the question or comment. Type your response in the text box and click on `Reply`.
