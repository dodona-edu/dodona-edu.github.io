---
title: Exercise with input-output
sidebarTitle: "Input-output"
order: 1
---

# Exercise with Input and Output

In this guide, we will create an exercise that uses input and output.

A commonly used example of such an exercise is asking for the user's name and then displaying a message that includes the name.
This guide will provide a complete walkthrough for using this exercise in Dodona.

We assume that you already have a working exercise repository.
If that is not the case, please first follow the guide [_Creating Exercises_](/en/guides/exercises/creating-exercises/introduction/).

The result of this guide (the complete exercise) can also be found in our [repository of examples](https://github.com/dodona-edu/example-exercises/tree/master/tested/input-output/).

## 1. Structure

Each exercise in Dodona corresponds to a specific directory in the exercise repository.
That directory follows a [fixed structure](/en/references/exercise-directory-structure), which we will now create.

First, create a new directory for the exercise, which we will call `hello-world`.
Then, inside this new directory, create three more directories:
- `description`: contains the assignment
- `evaluation`: contains information on how a solution should be assessed
- `solution`: contains an example solution

After this step, your repository should look like this:

```
repository/
└── hello-world/
   ├── evaluation/
   ├── description/
   └── solution/
```

## 2. Configuration

Dodona also requires each exercise to have a [configuration file](/en/references/exercise-config).
This file contains metadata used by Dodona.

Create a file called `config.json` in the `hello-world` directory with the following content:

```json
{
  "description": {
    "names": {
      "en": "Hello World",
      "nl": "Hello World"
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

- `description.names`: The **name** of the exercise as shown in Dodona in Dutch (_nl_) and English (_en_). In this case, the names are the same.
- `evaluation.handler`: We use TESTed as the judge.
- `evaluation.test_suite`: The test suite is named `suite.yaml`.
- `programming_language`: The **programming language** of the exercise. Here, we choose Python.
- `access`: The **access level** is set to _private_. We choose a private exercise since this is just a guide, but we encourage making your exercises public. That way, other teachers can use them (just as you have access to thousands of public exercises on Dodona).

After creating this file, your repository should look like this:

```
repository/
└── hello-world/
   ├── evaluation/
   ├── description/
   ├── solution/
   └── config.json
```

## 3. Assignment and Example Solution

The next step is the assignment for the exercise.
This is what students will see when they attempt to solve the exercise, and it tells them what to do.

Create a file called `description.en.md` in the `description` directory of the exercise with the following content:

````markdown
Write a Python program that asks the name of the user and then greets the user with the sentence `Hallo, [NAME]!`,
where `[NAME]` is the name of the user.

The program should read the name from stdin and write the greeting to stdout.

### Example

```console
$ python program.py
Jan
Hallo, Jan!
```
````

If you also want a Dutch version of the assignment, create a second file named `description.nl.md`.
The assignment itself is written in Markdown, a relatively simple formatting language. More information about Markdown can be found [here](/en/references/exercise-description).

Now, let’s also add an example solution.
This is not required, but it is often helpful.
Students cannot see this example solution (unless your repository is public).

Create a file called `solution.py` in the `solution` directory with the following content:

```python
name = input()
print(f"Hallo, {name}!")
```

After adding these two files, your repository should look like this:

```
repository/
└── hello-world/
   ├── evaluation/
   ├── description/
   |  └── description.en.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 4. Creating a Test Suite

We want this exercise to be automatically tested.
For this, we need to write a test suite that tells Dodona which tests should be run.
If all test cases pass, the student's submitted solution is considered correct.

This exercise has some obvious test cases, such as trying different names.
We can also test names with numbers or special characters.
Another interesting case is testing names with single and double quotes.

To keep it concise, we will limit the test suite to six tests.
Create a file called `suite.yaml` in the `evaluation` directory with the following content:

```yaml
- tab: "Tests"
  testcases:
  - stdin: "Jan"
    stdout: "Hallo, Jan!"
  - stdin: "Piet"
    stdout: "Hallo, Piet!"
  - stdin: "5236-hello!"
    stdout: "Hallo, 5236-hello!!"
  - stdin: "'world'"
    stdout: "Hallo, 'world'!"
  - stdin: '"world"'
    stdout: 'Hallo, "world"!'
  - stdin: "    "
    stdout: "Hallo,     !"
```

A test suite is written in YAML and must follow a specific structure.
In the example above, we create a single tab named "Tests" and define six test cases within it:
- Tests 1 and 2 use two different names.
- Test 3 includes numbers and punctuation.
- Test 4 contains single quotes.
- Test 5 contains double quotes.
- Test 6 consists only of spaces.

::: info Multi-line Input
In this example, each test uses a single line of input.
Sometimes, multiple lines of input are needed.
This can be done as follows:

```yaml
- stdin: |-
    This is line one
    Here is another line
    One final line
```
Here, we use YAML's syntax for multi-line strings.
Alternatively, we can explicitly include newlines:

```yaml
- stdin: "This is line one\nHere is another line\nOne final line"
```

A useful resource on multi-line strings in YAML is <https://yaml-multiline.info/>.
In most cases, the above methods will be sufficient.
:::

Each new test case begins with a hyphen, which in YAML signifies a new object (you can see that our tab is also an object).
We create a tab object containing a list of test case objects.

After this step, your repository should look like this:

```
repository/
└── hello-world/
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

You can find an example of how to do this [here](/en/guides/exercises/creating-exercises/exercise/#_5-saving-changes).

