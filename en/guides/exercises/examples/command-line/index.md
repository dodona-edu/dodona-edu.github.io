---
title: Exercise on command line
sidebarTitle: Command line
order: 4
---

# Command-Line Exercise

In this guide, we will create an exercise that uses command-line arguments.

We will implement a program that receives a series of numbers as command-line arguments.
The program should then print the sum of these numbers to _stdout_.

This guide assumes you already have a working exercise repository.
If that is not the case, first follow the guide [_Creating Exercises_](/en/guides/exercises/creating-exercises/introduction/).

The result of this guide (the complete exercise) can also be found in our [example repository](https://github.com/dodona-edu/example-exercises/tree/master/tested/command-line/).

## 1. Structure

Each exercise in Dodona corresponds to a specific folder in the exercise repository.
That folder follows a [fixed structure](/en/references/exercise-directory-structure), which we will now create.

First, create a new folder for the exercise, which we will call `sum`.
Then, within this new folder, create three more folders:
- `description`: folder containing the assignment
- `evaluation`: folder with information on how a solution should be assessed
- `solution`: folder containing an example solution

After this, your repository should look like this:

```
repository/
└── sum/
   ├── evaluation/
   ├── description/
   └── solution/
```

## 2. Configuration

Dodona requires each exercise to have a [configuration file](/en/references/exercise-config).
This file contains metadata used by Dodona.

Create the file `config.json` in the `sum` folder with the following content:

```json
{
  "description": {
    "names": {
      "en": "Sum of numbers",
      "nl": "Som van getallen"
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

This file specifies several things:

- `description.names`: The **names** of the exercise as shown in Dodona, in Dutch (_nl_) and English (_en_).
- `evaluation.handler`: We use TESTed as the judge.
- `evaluation.test_suite`: The test suite is named `suite.yaml`.
- `programming_language`: The **programming language** of the exercise: here, you choose the language in which solutions should be written. In this case, it's Python.
- `access`: The **access level** is set to _private_. We choose a private exercise because this is just a guide, but we encourage you to make your exercises public (_public_) so that other teachers can use them (just as you have access to thousands of public exercises on Dodona).

After creating this file, your repository should look like this:

```
repository/
└── sum/
   ├── evaluation/
   ├── description/
   ├── solution/
   └── config.json
```

## 3. Assignment and Example Solution

The next step is the assignment for the exercise.
This is what students will see when they want to solve the exercise, and it tells them what they need to do.

Create a file `description.en.md` in the `description` folder of the exercise, with the following content:

````markdown
Write a program `sum`, which prints the sum of some numbers to `stdout`.
These numbers will be given as program arguments to the program.

If one of the numbers is not an integer, the error message `invalid arguments` should be written to `stderr`.
In this case, the exit code of the program should be `1`.

### Example

```console
$ ./sum -1 -23 72 84 -38 -61 49 45
127
$ ./sum
0
$ ./sum spam eggs beacon
invalid arguments
```
````

If you also want to create a Dutch version of the assignment, name the second file `description.nl.md`.
The assignment itself is written in Markdown, a relatively simple formatting language. More information about Markdown can be found [here](/en/references/exercise-description).

We also add an example solution.
This is not required, but it is often useful to have.
Students cannot see this example solution (unless your repository is public, of course).

Create a file `solution.py` in the `solution` folder with the following content:

```python
import sys

sum_numbers = 0

for number in sys.argv[1:]:
    try:
        sum_numbers += int(number)
    except ValueError:
        sys.stderr.write("invalid arguments")
        sys.exit(1)

print(sum_numbers)
```

After creating these two files, your repository should look like this:

```
repository/
└── sum/
   ├── evaluation/
   ├── description/
   |  └── description.en.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 4. Creating a Test Suite

We want this exercise to be automatically tested.
To do this, we need to write a test suite, which tells Dodona what tests should be performed.
If all test cases pass, the student's submitted solution is considered correct by Dodona.

To keep this brief, we limit our test suite to a few tests.
Create a file `suite.yaml` in the `evaluation` folder with the following content:

```yaml
- tab: "sum"
  testcases:
  - arguments: ["-1", "-23", "72", "84", "-38", "-61", "49", "45"]
    stdout: "127"
  - arguments: []
    stdout: "0"
  - arguments: ["spam", "eggs", "bacon"]
    stderr: "invalid arguments"
    exit_code: 1
```

After this, the repository should look like this:

```
repository/
└── sum/
   ├── evaluation/
   |  └── suite.yaml
   ├── description/
   |  └── description.en.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 5. Saving Changes

Don't forget to _commit_ your changes, or they will be lost!

An example of how to do this can be found [here](/en/guides/exercises/creating-exercises/exercise/#_5-saving-changes).
