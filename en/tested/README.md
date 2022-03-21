---
title: TESTed judge
description: "TESTed judge"
---

# TESTed: one judge to rule them all

TESTed is an *educational software testing framework* (a *judge*),
which allows testing submissions for programming exercises based on a programming-language-independent test suite.
This means that the requirements for submissions only need to be specified once,
while you can still automatically test submissions in different programming languages.
TESTed can be used as a standalone tool, but is also integrated into Dodona.

## When do you use TESTed?

In which circumstances can you use TESTed to create programming exercises?
First, TESTed must support the programming language you want to use.
Currently, the following languages are supported:

* Bash
* C (gcc)
* Haskell (ghc)
* Java
* JavaScript (NodeJS)
* Kotlin
* Python

Because the programming exercises are programming-language-independent,
TESTed is best suited for the following kinds of exercises:

- Exercises on concepts that are found in (almost) all programming languages.
- Exercises where the focus lies on algorithms or other high-level concepts, not on the programming language itself.

TESTed is less suitable for exercises that focus on programming-language-specific concepts.
For example, an exercise on C pointers won't work well with TESTed.

## Getting started with TESTed.

The section after this one is a tutorial to create an exercise using TESTed within Dodona.
If you want to use TESTed outside of Dodona, we recommend following the [tutorial in the repository](https://github.com/dodona-edu/universal-judge).

A number of references are also available:

- [The configuration options](./references/exercise-config)
- [Format of full test suites](./references/json)
- [Format of simplified test suites](./references/dsl) (experimental)

If you want to work on TESTed itself, the following is useful:

- The [installation instructions](https://github.com/dodona-edu/universal-judge) in the repository to run TESTed locally.
- [Guide on adding a programming language](./guides/new-programming-language).

## Creating an exercise for TESTed

::: tip
In this tutorial, we assume you'll use TESTed within Dodona.
If that is not the case, we refer you to the [tutorial in the repository](https://github.com/dodona-edu/universal-judge).
:::

To follow this tutorial, you'll need the following on your system:

- `git` - to get the exercises on Dodona. You can find more information in [chapter 1 of the book *Pro Git*](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), which explains how to install Git for various operating systems (Mac, Windows, Linux).
- a text editor (like Notepad++) to create and edit text files

In this tutorial, we explain how to create a simple exercises with TESTed and make the exercise available in Dodona.
The exercise we're creating is called "write".
The problem statement is:

> Write a function `write` that writes its argument to stdout.
> The argument of the function will always be a string.

A correct submission for this exercise in a number of programming languages is:

:::: tabs
::: tab Bash
```bash
function write {
    echo "$1"
}
```
:::
::: tab C
```c
#include <stdio.h>

void write(char* what) {
    printf("%s", what);
}
```
:::
::: tab Haskell
```haskell
write = putStrLn
```
:::
::: tab Java
```java
class Submission {
    public static void write(String what) {
        System.out.println(what);
    }
}
```
:::
::: tab JavaScript
```javascript
function write(what) {
  console.log(what);
}
```
:::
::: tab Kotlin
```kotlin
fun write(what: String) {
    println(what)
}
```
:::
::: tab Python
```python
def write(argument):
    print(argument)
```
:::
::::

These are the submissions we want to test with TESTed.

### 1. Git repository

Dodona uses Git repositories to manage exercises.
Follow the guide [_Creating a new exercise repon_](../../guides/teachers/new-exercise-repo).
Once you have followed this guide and created the repository, you can return to this tutorial.

### 2. Folder structure

We need to create the correct folder structure in the repository you just created.
Create the following folders:

```
├── write/          # Folder for the new exercise
|   ├── evaluation/
|   └── description/
```

This is the Dodona folder structure; more information can be found in the [reference](../../references/exercise-directory-structure).

### 3. Configuration options

To signal to Dodona we are creating an exercise, we must add a configuration file.
This file contains some options and metadata used by Dodona.

Create a new file `config.json` in the folder `write`, with the following content:

```json
{
  "description": {
    "names": {
      "en": "Write",
      "nl": "Schrijf"
    }
  },
  "evaluation": {
    "plan_name": "testsuite.json"
  },
  "programming_language": "python",
  "access": "private"
}
```

Four things happen here:

1. We give a name to the exercise, in Dutch and in English.
2. We give the location of the test suite (`testsuite.json`).
   This is always relative to the folder `write/evaluation`.
3. We set the default programming language to Python. While TESTed supports multiple programming languages, Dodona does not support this at the moment.
4. We indicate it is a private exercise.

### 4. Writing the problem statement

The problem statement instructs students on how to solve the exercise.
This is again a Dodona thing; there is nothing TESTed-specific.
More information is thus again found in the [relevant manual](../../references/exercise-description).

To make things easier, we'll use problem statement from above and add an example.
Create a file `write/description/description.en.md` with the following content:

````markdown
Write a function `write` that writes its argument to stdout.

The argument of the function will always be a string.

### Example in Python

```pycon
>>> write("5"); 
"5"
>>> write("ok");
"ok"
```
````

As a check, the file structure should now look like this:

```
├── write/
|   ├── config.json
|   ├── evaluation/
|   ├── description/
|   |   └── description.en.md
```

### 5. Specifying the test suite

This is one of the most important parts of creating an exercise: specifying the test suite.
This test suite contains all test cases that will be executed on the submission to check if the submission is correct.

To keep this tutorial short, we only use one test case here, but a real test suite would contain more test cases.

Create a new file `evaluation/testsuite.json`:

```json
{
 "tabs": [
  {
   "name": "Write",
   "runs": [
    {
     "contexts": [
      {
       "testcases": [
        {
         "input": {
          "type": "function",
          "name": "write",
          "arguments": [
           {
            "type": "text",
            "data": "input-1"
           }
          ]
         },
         "output": {
          "stdout": {
           "type": "text",
           "data": "input-1"
          }
         }
        }
       ]
      }
     ]
    }
   ]
  }
 ]
}
```

This test suite defines a few things:

1. We have one tab, with the name _Write_.
2. We define one test case in that tab.
3. The test case calls the function `write` with one argument, the string `input-1`.
   Conceptually, this is equivalent to `write("input-1")`.
4. We expect `input-1` on stdout.

The file structure now looks like this:

```
├── write/
|   ├── config.json
|   ├── evaluation/
|   |   └── testplan.json
|   ├── description/
|   |   └── description.en.md
```

### 6. Add exercise to Dodona

Now we must commit the changes with `git`:

```bash
$ git add .
$ git commit -m "My first exercise"
```

Next, we must push the changes to our repository.

```bash
$ git push
```

The exercise is now done.
You should be able to use the exercise on Dodona.
