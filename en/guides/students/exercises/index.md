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
  ![Course exercise selection](./student.course_exercise_selection.png)
- Exercises that do not belong to a course can be found by visiting the [activity overview](https://dodona.be/en/activities/), which contains a list of all exercises.

::: tip Tip
On your homepage, you can find a list of the five most recent exercises you submitted solutions for across all courses. This way, you can quickly select an exercise you recently worked on by clicking on the exercise name.

![Recent exercises](./student.recent_exercises.png)

:::

At the top of each exercise page, there is a panel with the name and description of the exercise. The display of these components depends on the selected language. If a translation of the name and description is provided in the selected language when creating the exercise, these components will also be displayed in that language.

![Exercise start page](./student.exercise_start.png)

::: tip

When performing an action on an exercise, the name of the exercise appears next to `Dodona` on the left side of the navigation bar, possibly preceded by the course name and the name of the exercise series from which you selected the exercise. By clicking on the exercise name in the navigation bar, you will navigate to the exercise page. By clicking on the exercise series name in the navigation bar, you will navigate to the exercise series on the course page. By clicking on the course name in the navigation bar, you will navigate to the course page.

![Exercise breadcrumbs](./student.exercise_crumbs.png)
:::

## Submitting a Solution

On an exercise page, below the panel with the exercise description, there is a second panel where you can submit a solution for the exercise. Click on the `Hand in` tab if it is not already selected, and place the source code of your solution in the *code editor*. Then click the submit button in the upper right corner of the panel to submit your solution. **You can submit as many times as you want. Only the result of your last submission will be considered**. Automatic feedback will be provided by the judge for each submission, which you can use to correct or further refine your solution.

![Restore code button](./student.exercise_before_submit.png)

::: tip Use an IDE

Although you can program directly in the editor on Dodona, we do not recommend solving all exercises there. Instead, we advise using an [Integrated Development Environment](https://en.wikipedia.org/wiki/Integrated_development_environment) (IDE). IDEs provide more support during the writing, execution, testing, and debugging of source code. This way, you learn to apply your programming skills generically to solve problems other than just the exercises on Dodona.

Additionally, there is a plugin available for JetBrains IDEs such as [IntelliJ](https://www.jetbrains.com/idea/), [PyCharm](https://www.jetbrains.com/pycharm/), and [WebStorm](https://www.jetbrains.com/webstorm/specials/webstorm/webstorm.html). There is also an extension available for [**Visual Studio Code**](https://code.visualstudio.com/). Programmers using these IDEs can submit their solutions directly to Dodona using these tools. Without the tool, you would need to copy and paste the code into the submission text box on Dodona and click the orange circle. Instructions can be found [here for PyCharm](/en/faq/ide-plugins/#how-do-i-install-the-pycharm-plugin) and [here for VS Code](/en/faq/ide-plugins/#how-do-i-install-the-vs-code-extension).
:::

After submitting a solution, the `Submissions` tab is automatically selected. This tab contains an overview of all the solutions you have submitted for the exercise within the course. These solutions are listed in reverse chronological order (most recent at the top), so the solution you just submitted will be at the very top. The overview includes the submission time, status, and a brief summary of the [feedback](../feedback/) for each solution. Before each solution, there is also an [icon](../feedback/#submission-statuses) corresponding to the solution's status.

After submission, your solution is placed in a queue. While a solution is in the queue, it has the status `Queued...`. As soon as the platform is ready to evaluate a solution, the first submitted solution from the queue is executed and evaluated by the system. During evaluation, a solution has the status `Running...`. This usually takes only a few seconds.

Once the judge has finished evaluating your solution, it receives its final status, and the feedback page with detailed [feedback](../feedback/) about the solution is automatically displayed in a new tab called `Feedback`.

![Feedback tab](./student.exercise_feedback_correct_tab.png)

## Navigating to a Submission

You can navigate to your submitted solutions on Dodona in several ways. For each method, the submissions will be grouped differently by Dodona. Here are the three main methods:

- You can view all your submissions for a single exercise by clicking on the `Submissions` tab on the relevant exercise page.

![Submissions tab](./student.exercise_submissions_tab.png)

- You can view all the solutions you have ever submitted by clicking on `My submissions` in the user menu in the navigation bar.

![Link to all submissions](./student.all_submissions_link.png)

A submissions overview contains the submission number, submission time, status, and a brief summary of the feedback for each solution. Before each solution, there is also an [icon](../feedback/#submission-statuses) corresponding to the solution's status. The solutions are always listed in reverse chronological order (most recent at the top).

![All submissions page](./student.all_submissions.png)

You can select a solution by clicking on the arrow to the right of the solution in a solutions overview. This will navigate you to the feedback page with detailed feedback about the solution. The same page is displayed when you click on the submission number.

![Submissions to exercise feedback](./student.submissions_to_exercise_feedback.png)

## Reading Your Results

The feedback page contains detailed **feedback** about a solution you submitted for an exercise. At the top, it shows the **status** the judge assigned to your solution (for example `Correct` or `Wrong`) and a brief summary of the result. Below that, the judge reports in detail on all tests your solution was subjected to, and the `Code` tab shows your source code with any comments the judge added.

The meaning of each status and the way the detailed feedback is structured are explained in [Understanding Feedback](../feedback/).

## Asking Questions
::: tip Note
This feature is only available if your teacher has enabled it.
:::

![Ask questions button](./student.ask_questions.png)
After you have submitted your solution, you can ask a question in three ways. At the top of the submitted code, you can ask a general question by clicking on `Ask a question about your code`. In addition, you can click on the pink circle to the left of the line number to ask a question about a specific line of code. You can also select a piece of code and then ask questions about it using the same button.


![Ask question animation](./student.ask_question.gif)

Type the question you want to ask the teacher in the text box. You can use Markdown to add extra formatting to your text. Finally, click on `Ask question`.

::: tip Markdown support

You can add extra formatting with Markdown by:

- asterisks (\*) around words to make it italic. \*italic text\* will be displayed as *italic text*.
- double asterisks (\**) around words to make it bold. \*\*bold text\*\* will be displayed as **bold text**.
- backticks (\`) around a piece of code. \`Variables\` will be displayed as `Variables`.

Here you can view [all the possibilities of Markdown](/en/references/exercise-description/#markdown).
:::

![img.png](./student.react.png)

You can also respond to an existing question from yourself or to a comment from a teacher. To do this, click on `Reply` below the question or comment. Type your response in the text box and click on `Reply`.
