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

**An export contains what Trinket stored, not what your pages linked to.** Your lesson pages are in the zip, and so is the code of every trinket. Anything a page merely pointed at is not: files shown through a viewer, documents on Google Drive, images loaded from another site, embedded video.

Open a few lesson pages in a text editor and look for links, so you know what is missing before you start rebuilding.

::: warning Links to Trinket itself no longer work

trinket.io now answers every address with a shutdown notice, so anything that was hosted there is only still available if you kept your own copy. Links to other services, such as Google Drive or Google Slides, are unaffected.

:::

This is also a good moment to decide what you want to keep. A course that grew over several years usually contains material you would not write the same way today. You do not have to carry all of it across.

## What is in the export

The zip has three parts. This example comes from a Python course:

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
* `assignment` is a page with a trinket attached. The text is in the `.md` file, and the code students started from is in `trinkets/`.

One directory per lesson holds the `.md` files, numbered in the order they appeared. Under `trinkets/`, each assignment has its own directory with the starter code inside, usually as `main.py`.

Read through the `.md` files before you plan anything. How much of the teaching sits in the pages themselves differs a lot between courses, and that decides how much you have to rewrite.

## How Trinket maps to Dodona

| In Trinket | On Dodona |
| --- | --- |
| A course | A [course](../creating-a-course/) |
| A lesson | A [series](../exercise-series-management/) inside that course |
| A material of type `page` | A [reading activity](/en/guides/exercises/examples/content/) |
| A material of type `assignment` | An [exercise](/en/guides/exercises/creating-exercises/introduction/), or a reading activity when there is nothing to grade |
| The starter code of a trinket | The boilerplate of the exercise |

There is one thing that does not carry across: a trinket embedded in the middle of a page, which students could run and edit where it stood. On Dodona, students write and run code inside an exercise, which they then submit and get feedback on.

In practice that means two things. If the point is for students to run code and change it, make it an exercise. If the point is to show code while you explain something, put it in a code block in a reading activity and follow that with an exercise where they use it.

## Deciding what becomes an exercise

Dodona grades by running a student's program and comparing the result with what you specified. So for each material, ask whether you can say in advance what a correct solution does.

Make it an **exercise** when you can. Make it a **reading activity** when the task is to read, predict or explain, since there is nothing to run.

Tasks that ask students to invent something need a decision first. "Print a message of your own" cannot be graded automatically, because every correct answer looks different. The usual solution is to give the message in the description, so every correct solution produces the same output. Students practise exactly the same thing, and the exercise can now be graded.

If one task in Trinket ran across several pages, decide page by page. A page that asks students to hand something in is its own activity. A page that only builds up to that task belongs with it.

## Setting up a repository

Your activities live in a git repository that Dodona reads. Set that up once, before you write anything.

This is a real difference from Trinket, and worth understanding before you start. Your content is not stored inside Dodona: it lives in a repository you own, and Dodona reads from it. You can copy it, move it elsewhere, or hand it to a colleague, and it does not disappear if the platform does. That is exactly the situation you are in now with Trinket.

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
      evaluation/
        suite.yaml
      solution/
        solution.py
```

::: tip Folders are not series

The folder structure is only there to keep you organised. Which activities end up in which series is something you decide later on Dodona, not something the directory names control.

:::

To convert a **page**, move its text into `description/description.en.md`. The [description reference](/en/references/exercise-description/) covers images, code blocks, tables and callouts.

To convert an **assignment**, do the same for the text, then use the trinket's starter code as the boilerplate, write a test suite that describes what a correct solution does, and add a solution of your own.

These pages cover the rest:

* [Creating exercises: the exercise](/en/guides/exercises/creating-exercises/exercise/) for a first complete exercise.
* [An exercise with input and output](/en/guides/exercises/examples/input-output/), which is the shape most converted Trinket assignments take.
* [A reading activity](/en/guides/exercises/examples/content/) for pages without a task.
* [Test suites](/en/guides/exercises/testsuites/) for describing what a correct answer does.
* [The `config.json` reference](/en/references/exercise-config/) for the settings of a single activity.

## Building the course

With activities in your repository, build the course itself on Dodona:

1. [Create the course](../creating-a-course/).
2. [Create a series per lesson and add your activities to it](../exercise-series-management/), in the order the export listed them.
3. [Set the series options](../series-settings/) such as visibility and deadlines.

Material you wrote for yourself rather than for students, like lesson plans or answer keys, can stay in the course: put it in its own series and leave that series hidden. Only people who can manage the course will see it.

## What works differently than in Trinket

Two things are worth knowing before you write your test suites.

**Tests run your students' programs, they do not read them.** Dodona can check what a program prints, what a function returns, which exception it raises, what exit code it ends with, and the files it writes. What it cannot check is how the code was written. A rule such as "solve this with a single print statement" will not be enforced by the tests, because a solution that ignores the rule still behaves correctly. Put the rule in the description, and check it yourself when you read submissions.

**Students hand in one solution per activity.** A task that offered an easier and a harder version becomes two activities rather than one.

::: tip Prompts and expected output

When a program asks a question with `input("What is your name? ")`, that prompt does not show up in the output the tests compare. Ask the same question with a separate `print` and it does. Both work, as long as your test suite matches what the program actually prints. Keeping the prompt inside `input()` is usually the simpler of the two.

:::

## Before you share it with students

New activities start as [draft](/en/faq/activities/#what-is-a-draft-activity), so students cannot see them yet. That gives you room for a final authoring pass before anything is published.

Solve every exercise yourself and submit your own solution. This is the fastest way to catch a test suite that expects the wrong thing, and it takes about a minute per exercise.

Then check the visibility of each series, including the one holding your own notes.

After that it is an ordinary Dodona course. [User management](../user-management/) covers students registering and joining, [grading](../grading/) covers feedback and scores, and [statistics](../statistics/) shows you how your students are doing. The [teacher guides](../) cover the rest.
