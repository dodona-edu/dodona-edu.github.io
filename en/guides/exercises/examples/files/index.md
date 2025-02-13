---
title: Exercises with files
sidebarTitle: "Files"
order: 5
---

# Exercise with Files

In this guide, we will create an exercise that uses files.
This includes using files both as input (where the student's code reads a file) and as output (where the student's code creates and writes to a file).
In this example, we use the [command line](/en/guides/exercises/examples/command-line), but the file handling part is the same for other types of exercises, such as functions or classes.

As an example, we will implement a program that creates a sorted copy of a file.
We will fully develop this exercise for use with Dodona.

This guide assumes that you already have a working exercise repository.
If that is not the case, first follow the guide [_Creating Exercises_](/en/guides/exercises/creating-exercises/introduction/).

The result of this guide (the complete exercise) can also be found in our [example repository](https://github.com/dodona-edu/example-exercises/tree/master/tested/files/).

## 1. Structure

Each exercise in Dodona corresponds to a specific folder in the exercise repository.
That folder follows a [fixed structure](/en/references/exercise-directory-structure), which we will now create.

First, create a new folder for the exercise, which we will call `sort`.
Then, within this new folder, create three more folders:
- `description`: folder containing the assignment
- `evaluation`: folder with information on how to assess a solution
- `solution`: folder containing an example solution
- `workdir`: folder with files available to the solution

After this, your repository should look like this:

```
repository/
└── sort/
   ├── evaluation/
   ├── description/
   ├── solution/
   └── workdir/
```

## 2. Configuration

Dodona also requires each exercise to have a [configuration file](/en/references/exercise-config).
This file contains metadata used by Dodona.

Create the file `config.json` in the `sort` folder with the following content:

```json
{
  "description": {
    "names": {
      "en": "Sort",
      "nl": "Sorteren"
    }
  },
  "evaluation": {
    "handler": "tested",
    "test_suite": "suite.yaml"
  },
  "programming_language": "python",
  "access": "private"
}
```

This file specifies a few things:

- `description.names`: The **names** of the exercise as shown in Dodona in Dutch (_nl_) and English (_en_). In this case, the names are the same.
- `evaluation.handler`: We use TESTed as the judge.
- `evaluation.test_suite`: The test suite is named `suite.yaml`.
- `programming_language`: The **programming language** of the exercise: here you choose the programming language in which students will submit their solutions. In this case, it is Python.
- `access`: The **access level** is set to _private_. We choose a private exercise because this is just a guide, but we encourage you to make your exercises public (_public_) so that other teachers can use them (just as you have access to thousands of public exercises on Dodona).

After creating this file, your repository will look like this:

```
repository/
└── sort/
   ├── evaluation/
   ├── description/
   ├── solution/
   ├── workdir/
   └── config.json
```

## 3. Assignment and Example Solution

The next step is the assignment for the exercise.
This is what students will see when they attempt to solve the exercise, and it tells them what they need to do.

Create a file `description.en.md` in the `description` folder of the exercise with the following content:

````markdown
Write a Python program that accepts two arguments:

1. The name of a given file (the source file).
2. The name of a new file (the destination file).

The program should read the content of the source file, sort it, and write the sorted content to the destination file.
If the destination file does not exist, it should be created; otherwise, it should be overwritten.

### Example

```console
$ ./sort unordered.txt sorted.txt
$ cat unordered.txt
2
3
1
$ cat sorted.txt
1
2
3
```
````

If you also want to create a Dutch version of the assignment, use the name `description.nl.md` for the second file.
The assignment itself is written in Markdown, a relatively simple formatting language. More information on Markdown can be found [here](/en/references/exercise-description).

We will also add an example solution. This is not mandatory, but it is often useful. Students cannot see this example solution (unless your repository is public, of course).

Create a file `solution.py` in the `solution` folder with the following content:

```python
import sys

source_file_path = sys.argv[1]
destination_file_path = sys.argv[2]

with open(source_file_path, 'r') as source_file:
    content = source_file.readlines()

content.sort()

with open(destination_file_path, 'w') as destination_file:
    destination_file.writelines(content)
```

After creating these two files, your repository should look like this:

```
repository/
└── sort/
   ├── evaluation/
   ├── description/
   |  └── description.en.md
   ├── solution/
   |  └── solution.py
   ├── workdir/
   └── config.json
```

## 4. Creating a Test Suite

We want this exercise to be automatically tested.
For this, we need to write a test suite that tells Dodona which tests to run.
If all test cases pass, Dodona considers the student's submission correct.

In this case, we will create a test suite with only one test case.
In a real exercise, you would probably want to have more test cases, depending on the complexity of the exercise.
Some examples of additional cases to test could be: an empty file, a file with duplicate lines, Unicode characters, etc.

Create a file `suite.yaml` in the `evaluation` folder with the following content:

```yaml
- tab: "Sorting"
  testcases:
  - arguments: ["unordered.txt", "sorted.txt"]
    file:
      content: "solution.txt"
      location: "sorted.txt"
    files:
    - name: "unordered.txt"
      url: "media/unordered.txt"
```

A test suite is written in YAML and must follow a specific structure.
In the example above, we create one tab named "Sorting" and define a single test.

This test consists of three main parts:
- `arguments`: Specifies the arguments passed to the program, with the first argument as the source file and the second as the target file.
- `file`: Ensures that the file "sorted.txt" exists and that its contents match "solution.txt".
- `files`: Replaces "unordered.txt" in the arguments with a link to that file on Dodona. This is optional but makes it easier for students to solve the exercise.

::: warning
Currently, the source file must be placed both in `workdir` (for evaluation) and in `description/media` (for display on Dodona).
We hope to resolve this in the future. See [here](/en/guides/exercises/testsuites/) for more information.
:::

Now we need the source file and the expected solution file.
The source file should go into `workdir`, named `unordered.txt`:

```txt
2
3
1
```

Place this file in `description/media` as well.

The solution file should go into `evaluation`, named `solution.txt`:

```txt
1
2
3
```

Now, the repository structure will be:

```
repository/
└── sort/
   ├── evaluation/
   |  ├── solution.txt
   |  └── suite.yaml
   ├── description/
   |  ├── media/
   |  |  └── unordered.txt
   |  └── description.en.md
   ├── solution/
   |  └── solution.py
   ├── workdir/
   |  └── unordered.txt
   └── config.json
```

## 5. Saving Changes

Don't forget to _commit_ your changes, or they will be lost!

An example of how to do this can be found [here](/en/guides/exercises/creating-exercises/exercise/#_5-saving-changes).

