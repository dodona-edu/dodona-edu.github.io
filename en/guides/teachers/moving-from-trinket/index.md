---
title: "Moving a course from Trinket"
description: "Tutorial: moving a Trinket course to Dodona"
order: 12
---

# Moving a course from Trinket

Trinket has shut down. If you exported your course before it did, you have a zip file with your material in it. This guide takes you from that zip to a working Dodona course.

It assumes you have never used Dodona and have never used git.

## Before you start

Start by working out what you actually have.

**An export contains what Trinket stored, not what your pages linked to.** Your lesson pages are in the zip, along with the code of every trinket and the images you uploaded. What is missing is anything a page only pointed at: documents you added through Trinket's viewer, such as PDFs and slide decks, files on Google Drive, images loaded from another site, embedded video.

Open a few lesson pages in a text editor and look for links, so you know what is missing before you start rebuilding. Everything on that list has to be gathered separately and carried across by hand, from wherever you still have it. Later on it goes into your own repository, next to the pages that use it.

::: warning Links to Trinket itself no longer work

trinket.io now answers every address with a shutdown notice, so anything that was hosted there is only still available if you kept your own copy. Links to other services, such as Google Drive or Google Slides, are unaffected.

:::

This is also a good moment to decide what you want to keep. A course that grew over several years usually contains material you would not write the same way today. You do not have to carry all of it across.

## What is in the export

The zip is laid out like this. The example comes from a Python course:

```
course.json
0-introduction/
  00-welcome.md
  01-getting-started.md
1-loops/
  00-loops-slides.md
  01-loops-predict.md
  02-loops-make.md
trinkets/
  manifest.json
  python3/
    12-Loops-Predict_a1b2c3d4e5/
      main.py
assets/
  60f1a2b3c4d5e6f7/
    diagram.png
```

`course.json` is the table of contents. It lists your lessons in order, and for each lesson the materials it contains:

```json
{
  "name": "Introduction to programming",
  "lessons": [
    {
      "name": "1. Loops",
      "slug": "1-loops",
      "materials": [
        { "name": "1-Loops-Slides", "slug": "1-loops-slides", "type": "page" },
        { "name": "1.1-Loops-Predict", "slug": "1-1-loops-predict", "type": "assignment" }
      ]
    }
  ]
}
```

The `type` of each material is the useful part:

* `page` is a lesson page: text only, and all of it is in the matching `.md` file.
* `assignment` is a page with a trinket attached. The text is in the `.md` file, and the code students started from is in `trinkets/`. Each assignment also carries a `trinket` object, whose `shortCode` is how you tell which folder belongs to it: the folder name ends in that same code.

Those two are the only material types Trinket had. A video, a slide deck or a quiz was never a type of its own: it was a `page` with that thing embedded in its text, which is why they do not show up separately here.

That `trinket` object also holds the assignment's dates: when work was due, when submissions closed, and when the page became visible. Trinket set those per assignment, while Dodona sets a deadline per series, so assignments that shared a date make an obvious series here.

One directory per lesson holds the `.md` files, numbered in the order they appeared. Under `trinkets/`, each assignment has its own directory with the starter code inside. The folder in between is named after the kind of trinket: `python3` in this example, but `python` (which accepted both Python 2 and 3), `html`, `java`, `blocks`, `console`, `pygame`, `glowscript`, `glowscript-blocks`, `music` and `R` are all possible. `assets/` holds the images you uploaded, and is absent when a course used none.

::: info Unpublished pages come along too

Depending on when you took the export, `course.json` carries an `isDraft` flag on each lesson and material, marking the pages you never published. Older exports do not have it.

Dodona works the same way: every activity starts as a [draft](/en/faq/activities/#what-is-a-draft-activity) and stays invisible to students until you publish it. An unfinished page can come across as it is, and you publish it once you have finished it.

:::

Read through the `.md` files before you plan anything. How much of the teaching sits in the pages themselves differs a lot between courses, and that decides how much you have to rewrite.

## How Trinket maps to Dodona

| In Trinket | On Dodona |
| --- | --- |
| A course | A [course](../creating-a-course/) |
| A lesson | A [series](../exercise-series-management/) inside that course |
| A material of type `page` | A [reading activity](/en/guides/exercises/examples/content/) |
| A material of type `assignment` | An [exercise](/en/guides/exercises/creating-exercises/introduction/), or a reading activity when there is nothing to grade |
| The starter code of a trinket | The [boilerplate](/en/references/exercise-directory-structure/#exercise-only-configuration) of the exercise |
| A trinket embedded in a page | A code playground in a reading activity, described below |
| The due date on an assignment | The [deadline](../series-settings/#deadline) on the series it goes into |

### Runnable code inside a page

A trinket embedded in the middle of a page, which students could run and edit where it stood, has a counterpart on Dodona: a code playground. It is a runnable, editable block inside a reading activity, and students can run it without submitting anything.

You write one by putting the code in a `<pre>` inside a `<dw-code-playground>` element:

```html
<dw-code-playground>
<pre>
name = input("What is your name? ")
print("Hello, " + name + "!")
</pre>
</dw-code-playground>
```

The block runs in the student's browser and can read input, so a program that asks a question works as expected.

::: warning Code playgrounds are an early preview

This is a proof of concept. Both the way playgrounds look and the way you write them are likely to change, so expect to revisit pages that use them. They currently run Python only.

:::

A playground is for exploring, not for assessment: nothing is submitted, and nothing is graded. Exercises have their own place to experiment, so you are not choosing between the two: every Python exercise has a [sandbox](/en/guides/students/scratchpad/) behind the `To sandbox` button, where students can run, test and debug their code before handing it in. Use an exercise wherever students should get feedback on what they wrote.

## Deciding what becomes an exercise

Dodona grades by running a student's program and comparing the result with what you specified. So for each material, ask whether you can say in advance what a correct solution does.

Make it an **exercise** when you can. Make it a **reading activity** when the task is to read, predict or explain, since there is nothing to run.

Tasks that ask students to invent something need a decision first. "Print a message of your own" cannot be graded automatically, because every correct answer looks different. The usual solution is to give the message in the description, so every correct solution produces the same output. Students practise exactly the same thing, and the exercise can now be graded.

If one task in Trinket ran across several pages, decide page by page. A page that asks students to hand something in is its own activity. A page that only builds up to that task belongs with it.

## Setting up a repository

Your activities live in a git repository that Dodona reads. Set that up once, before you write anything.

Dodona works differently from Trinket here. Your material is not stored inside the platform: it lives in a repository you own, and Dodona only reads from it. You can copy it, move it elsewhere, or hand it to a colleague, and it stays yours whatever happens to the platform. There is also no export step to think about later, because the repository already is your copy.

[Creating exercises: installation](/en/guides/exercises/creating-exercises/setup/) walks through the setup: creating a GitHub account, starting from our template repository, giving the user `dodona-server` access to your repository, adding the repository to Dodona, and setting up a webhook so Dodona picks up your changes automatically.

You do not need to learn git for this. That guide shows you how to do everything from your browser.

## Writing the activities

Inside the repository, every activity is a directory with a `config.json` file:

```
my-course/
  dirconfig.json
  01-loops/
    01-what-is-a-loop/
      config.json
      description/
        description.en.md
    02-count-to-ten/
      config.json
      description/
        description.en.md
        boilerplate/
          boilerplate
      evaluation/
        suite.yaml
      solution/
        solution.py
```

::: tip Folders are not series

The folder structure is only there to keep you organised. Which activities end up in which series is something you decide later on Dodona, not something the directory names control.

:::

To convert a **page**, move its text into `description/description.en.md`. The [description reference](/en/references/exercise-description/) covers images, code blocks, tables and callouts.

To convert an **assignment**, start with the text, then add the three things that turn it into a graded exercise:

* **The starter code** goes in `description/boilerplate/boilerplate`, so students open the exercise with the same code the trinket gave them.
* **A test suite** in `evaluation/` describes what a correct solution does. Trinket had no equivalent: assignments were handed in and then read by you, so there is no grading logic in the export to carry over and you write these from scratch. It is also what the rest of Dodona is built on: students find out whether they are right the moment they submit, they can correct themselves without waiting for you, and you can see who is stuck and where. An exercise without a test suite is just a page with an editor attached.
* **A model solution** in `solution/` proves the test suite is right. Submit it yourself once. If your own solution does not pass, the test suite is wrong, and you want to know that before thirty students do.

If you used Trinket's optional self-check tests, that `tests.py` is in the export like any other code file. Dodona cannot run it as it stands, but it records what you already decided was worth checking, which is a head start on the real suite.

[Test suites](/en/guides/exercises/testsuites/) explains the format, and [an exercise with input and output](/en/guides/exercises/examples/input-output/) is the closest match to a typical Trinket assignment: a program that reads input and prints a result.

::: tip Prompts and expected output

When a program asks a question with `input("What is your name? ")`, that prompt does not show up in the output the tests compare. Ask the same question with a separate `print` and it does. Both work, as long as your test suite matches what the program actually prints. Keeping the prompt inside `input()` is usually the simpler of the two.

:::

These pages cover the rest:

* [Creating exercises: the exercise](/en/guides/exercises/creating-exercises/exercise/) for a first complete exercise, end to end.
* [A reading activity](/en/guides/exercises/examples/content/) for pages without a task.
* [The `config.json` reference](/en/references/exercise-config/) for the settings of a single activity.
* [The exercise directory structure](/en/references/exercise-directory-structure/) for where each file belongs.

## Building the course

With activities in your repository, build the course itself on Dodona:

1. [Create the course](../creating-a-course/).
2. [Create a series per lesson and add your activities to it](../exercise-series-management/), in the order the export listed them.
3. [Set the series options](../series-settings/) such as visibility and deadlines.

Material you wrote for yourself rather than for students, like lesson plans or answer keys, can stay in the course: put it in its own series and leave that series hidden. Only people who can manage the course will see it.

## Before you share it with students

New activities start as [draft](/en/faq/activities/#what-is-a-draft-activity), so students cannot see them yet. That gives you room for a final authoring pass, and lets you try your activities out on the platform yourself, before anything is published.

Solve every exercise yourself and submit your own solution. This is the fastest way to catch a test suite that expects the wrong thing, and it takes about a minute per exercise.

Then check the visibility of each series, including the one holding your own notes.

After that it is an ordinary Dodona course. [User management](../user-management/) covers students registering and joining, [grading](../grading/) covers feedback and scores, and [statistics](../statistics/) shows you how your students are doing. The [teacher guides](../) cover the rest.

## Letting an AI assistant do the first pass

Everything above is manual work: a description and a test suite for every single activity. On a course of any size, the first pass is worth shortening.

We have had good results letting a coding assistant do the first pass. Point it at your export, at this guide and the reference pages it links to, and at [universal-judge](https://github.com/dodona-edu/universal-judge), the repository behind TESTed, which documents the test suite format in full. Then ask it to produce the directory structure, the descriptions and a first test suite per exercise.

What comes back is a first draft, not a finished course. Read every description, and submit your own solution to every exercise. A test suite can look reasonable and still expect slightly the wrong thing, which you will not see by reading it.
