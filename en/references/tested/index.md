---
title: TESTed judge
description: "TESTed judge"
---

# TESTed: one judge to rule them all

::: tip
This is the extended documentation for the TESTed judge. A guide aimed at teachers who are creating an exercise for the first time is available in [this guide](/en/guides/exercises/).
:::

TESTed is an *educational software testing framework* (also known as a *judge*)
to test submissions for programming exercises using a programming-language-independent test suite.
It allows specifying software requirements (i.e. the tests) for an exercise once,
while submissions in different programming languages can be tested automatically.
TESTed can be used as a standalone command line tool,
but it's also integrated as a judge into the online learning platform [Dodona](https://dodona.be).

## When to use TESTed?

The first requirement to using TESTed is that TESTed must support your target programming language(s).
Currently, the following languages are supported:

* Bash
* C (gcc)
* Haskell (ghc)
* Java
* JavaScript (NodeJS)
* Kotlin
* Python
* C# (.NET)

Because programming exercises underpinned by TESTed are independent of any programming language,
TESTed is best suited for the following kinds of exercises:

- Exercises on generic concepts that are found in (almost) all programming languages.
- Exercises that focus on algorithms or high-level programming concepts, not on specific syntax or constructs of programming languages.

TESTed is thus less suitable for exercises that focus on syntax or concepts for a specific programming language.
For example, exercises on C pointers won't work well with TESTed.

## Getting started

The next section gives a short tutorial on designing programming exercises with TESTed for use in the online learning platform Dodona.
If you want to use TESTed outside of Dodona, we recommend following [this tutorial](https://github.com/dodona-edu/universal-judge) instead.

A number of technical specifications are also available:

- [Configuration options](/en/references/tested/exercise-config)
- [Reference for DSL test suites](/en/references/tested/dsl) (recommended)
- [Reference for advanced test suites](/en/references/tested/json) (not recommended for general use)
- [Data types for programming languages](/en/references/tested/types)

Useful guides if you want to work on TESTed itself:

- The [installation instructions](https://github.com/dodona-edu/universal-judge) to run TESTed locally.
- A [guide on adding a programming language](/en/references/tested/new-programming-language).

## Designing exercises for Dodona

::: tip
In this short tutorial, we assume you'll use TESTed within Dodona.
If you want to use TESTed as a standalone tool,
we refer you to the [tutorial in the repository](https://github.com/dodona-edu/universal-judge).
:::

### System requirements

To follow this tutorial, you'll need the following on your system:

- `git` - to push exercises to Dodona. You can find more information in [chapter 1 of the book *Pro Git*](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), which explains how to install Git for various operating systems (Mac, Windows, Linux).
- a text editor (like Notepad++) to create and edit text files

We'll explain how to create a simple programming exercise that uses TESTed to provide automated feedback,
and how to make the exercise available on Dodona.
The exercise is called "echo" and has the following problem statement:

> Define a function `echo` that outputs its string argument to stdout.

Here are some correct submissions for this exercise in a couple of different programming languages:

::: code-group

```bash [Bash]
function echo {
    echo "$1"
}
```

```c [C]
#include <stdio.h>

void echo(char* what) {
    printf("%s", what);
}
```

```haskell [Haskell]
echo = putStrLn
```

```java [Java]
class Submission {
    public static void echo(String what) {
        System.out.println(what);
    }
}
```

```javascript [JavaScript]
function echo(what) {
  console.log(what);
}
```

```kotlin [Kotlin]
fun echo(what: String) {
    println(what)
}
```

```python [Python]
def echo(argument):
    print(argument)
```

```csharp [C#]
using System;

class Submission
{
    public static void Echo(string content)
    {
        Console.WriteLine(content);
    }
}
```

:::

We can use those solutions as the submissions we want to test with TESTed.

### 1. Git repository

Dodona uses Git repositories to manage exercises.
Follow the guide [_Creating a new exercise repo_](/en/guides/exercises/new-exercise-repo)
and return to this tutorial as soon as your repository has been set up.

### 2. Folder structure

Now we need to create the correct directory structure for Dodona exercises in the repository you just created.
Create the following directories:

```
├── echo/          # Directory for the new exercise
|   ├── evaluation/
|   └── description/
```

This is the Dodona directory structure for exercises.
More information can be found in [_Exercise directory structure_](/en/references/exercise-directory-structure).

### 3. Configuration options

To inform Dodona we are creating an exercise, we must add a configuration file to the `echo` directory.
This configuration file contains some options and metadata used by Dodona.

Create a new file `config.json` in the `echo` directory, with the following content:

```json
{
  "description": {
    "names": {
      "en": "Echo",
      "nl": "Echo"
    }
  },
  "evaluation": {
    "test_suite": "tests.yaml"
  },
  "programming_language": "python",
  "access": "private"
}
```

This configuration file specifies, in order:

1. An exercise name in Dutch and in English.
2. The path name of the test suite (`tests.yaml`) relative to the `echo/evaluation` directory.
3. Python as the default programming language.
   While TESTed supports multiple programming languages,
   Dodona currently supports only a single programming language per exercise.
4. Private access to the exercise.
   We use this default since this is a tutorial, but we encourage making exercises publicly available on Dodona.

See [_Exercise configuration_](/en/references/exercise-config) for more details on the configuration options for Dodona exercises.
The [options specific to TESTed](/en/references/tested/exercise-config) can also be interesting.

### 4. Problem statement

The problem statement instructs students on how to solve the exercise.
We'll use the problem statement from above and add an example.
Create a file `echo/description/description.en.md` with the following content:

````markdown
Define a function `echo` that outputs its string argument to stdout.

### Example in Python

```pycon
>>> echo("5");
"5"
>>> echo("OK");
"OK"
```
````

As a check, the file structure should now look like this:

```
├── echo/
|   ├── config.json
|   ├── evaluation/
|   ├── description/
|   |   └── description.en.md
```

This is again something that is specific for Dodona and has nothing to do with TESTed.
See [_Exercise descriptions_](/en/references/exercise-description) for more information on how to describe problem statements for Dodona exercises.

### 5. Test suite

Specifying a test suite is the part of creating a Dodona exercise that is specific to a particular judge,
so we must adhere to the TESTed specification for test suites.
A test suite contains all test cases that will be executed on the submission to check if the submission is correct.

For brevity, we will only include a single test case in our test suite.
But a real test suite would contain many more test cases.
Create a new file `evaluation/tests.yaml`:

```yaml
- tab: "Echo"
  testcases:
     - expression: "echo('input-1')"
       stdout: "input-1"
```

This test suite specifies that:

1. All feedback is included in a single tab called _Echo_.
2. The tab contains feedback on a single test case.
3. The test case calls the function `echo` with a string argument `"input-1"`.
4. The expected behavior of the test case is that the text `input-1` is generated on stdout.


The file structure now looks like this:

```
├── echo/
|   ├── config.json
|   ├── evaluation/
|   |   └── tests.yaml
|   ├── description/
|   |   └── description.en.md
```

### 6. Add to Dodona

Now we commit the new exercise with the following `git` commands:


```bash
$ git add .
$ git commit -m "My first exercise"
```

Then we must push the changes in the repository to Dodona:

```bash
$ git push
```

The exercise is now fully configured and available on Dodona as a private exercise,
ready to be included in the learning path of your courses.
