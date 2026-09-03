---
title: "Moving a course from Trinket"
description: "Tutorial: moving a Trinket course to Dodona"
order: 12
---

# Moving a course from Trinket

Trinket has shut down, so if you taught with it, what you have left is an export of your course in a zip file. This guide takes you from that zip to a working Dodona course.

It assumes you have never used Dodona and have never used git. It does assume you still have your export, because there is no longer a Trinket to go back to.

::: tip We can do this for you

You do not have to do this alone. [Contact us](https://dodona.be/en/contact) and we will convert your course for you. We have done this before and we have tooling for it.

:::

## Before you start

Before you touch Dodona, work out what you actually have.

**An export contains what Trinket stored, not what your pages linked to.** Your lesson pages are in the zip and so is the code of every trinket. Anything a page merely pointed at is not: slides shown through a viewer, files on Google Drive, images hotlinked from another site, embedded video.

Open a few lesson pages in a text editor and look for links. Anything that lives outside the zip is material you have to collect somewhere else, and some of it disappears along with Trinket.

::: warning Do this first

If any of your pages link to files that were hosted on Trinket itself, download them now. Once those addresses stop working, that content is gone unless you kept your own copy.

:::

This is also a good moment to decide what you want to keep. A course that grew over several years usually contains material you would not write the same way today. You do not have to carry all of it across.

## What is in the export

The zip has three parts.

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

* `page` is a lesson page: text only, and the whole thing is in the matching `.md` file.
* `assignment` is a page with a trinket attached. The text is in the `.md` file, and the code students started from is in `trinkets/`.

One directory per lesson holds the `.md` files, numbered in the order they appeared. Under `trinkets/`, each assignment has its own directory with the starter code inside, usually as `main.py`.

Read through the `.md` files before you plan anything. Trinket courses often keep the explanation in the slides and leave the pages quite short, so what looks like a small course in the export can be a large one in practice.

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

Dodona grades automatically: it runs the student's program and compares what it prints to what you said it should print. That one fact drives most of your decisions.

Make it an **exercise** when you can write down exactly what a correct submission produces. Make it a **reading activity** when the task is to read, predict or explain, because there is nothing to run and nothing to compare.

Tasks that ask students to invent something sit between the two. "Print a message of your own" or "write your own joke" cannot be graded automatically, because every correct answer looks different. You have two ways out:

* **Pin the result.** Rewrite the task so everyone produces the same output: instead of "print your own message", give the message. The skill being practised stays the same, and the exercise can now be graded.
* **Grade it yourself.** Use the [Markdown judge](/en/references/judges/#markdown), where students submit text rather than a program and you read and score it by hand.

If one task in Trinket ran across several pages, decide page by page. A page that asks students to hand something in is its own activity. A page that only builds up to that task belongs with it.

## Setting up a repository

Your activities live in a git repository that Dodona reads. Set that up once, before you write anything.

[Creating exercises: installation](/en/guides/exercises/creating-exercises/setup/) walks through the whole thing: creating a GitHub account, starting from our template repository, giving the user `dodona-server` access to your repository, adding the repository to Dodona, and setting up a webhook so Dodona picks up your changes automatically.

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

To convert an **assignment**, do the same for the text, then use the trinket's starter code as the boilerplate, write a test suite that describes the expected output, and add a solution of your own.

These pages cover the rest:

* [Creating exercises: the exercise](/en/guides/exercises/creating-exercises/exercise/) for a first complete exercise.
* [An exercise with input and output](/en/guides/exercises/examples/input-output/), which is the shape most converted Trinket assignments take.
* [A reading activity](/en/guides/exercises/examples/content/) for pages without a task.
* [Test suites](/en/guides/exercises/testsuites/) for describing what a correct answer produces.
* [The `config.json` reference](/en/references/exercise-config/) for the settings of a single activity.

## Building the course

With activities in your repository, build the course itself on Dodona:

1. [Create the course](../creating-a-course/).
2. [Create a series per lesson and add your activities to it](../exercise-series-management/), in the order the export listed them.
3. [Set the series options](../series-settings/) such as visibility and deadlines.

Material you wrote for yourself rather than for students, like lesson plans or answer keys, can stay in the course: put it in its own series and leave that series hidden. Only people who can manage the course will see it.

## What works differently than in Trinket

A few habits from Trinket do not survive the move. None of them is a problem once you know about it.

* **Grading only looks at the output.** A rule like "solve this with a single print statement" cannot be checked automatically, because a solution that breaks the rule still prints the right thing. Write the rule in the description, and check it yourself when you look at submissions.
* **Prompts belong inside `input()`.** If you ask the question with a separate print statement, it becomes part of the output the tests compare, and correct submissions start failing. Put the text inside the `input()` call instead.
* **One activity, one submission.** A task with an easier and a harder variant becomes two activities, so students hand in each one separately.
* **Students cannot answer inside the code.** If a task asked them to add comments explaining what code does, make it a reading activity with the answer behind a [spoiler](/en/references/exercise-description/#spoilers), or a Markdown judge exercise if you want to read and score their answers.

## Before you share it with students

Three things to check.

New activities start as [draft](/en/faq/activities/#what-is-a-draft-activity), which means students cannot see them yet. They stay that way until you say otherwise, so you can work in peace.

Solve every exercise yourself and submit your own solution. This is the fastest way to catch a test suite that expects the wrong thing, and it takes a minute per exercise.

Finally, check the visibility of each series. Anything you are not ready to show, including the series holding your own notes, stays hidden until you publish it.

When all of that looks right, publish the series and share the course with your students.
