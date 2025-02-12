---
title: Exercises with classes
sidebarTitle: Classes
order: 3
---

# Exercise with Classes

In this guide, we will create an exercise that makes use of classes.

We will implement a `Counter` class that allows us to keep track of a count.

This guide assumes that you already have a working exercise repository.  
If that is not the case, first follow the guide [_Creating Exercises_](/en/guides/exercises/creating-exercises/introduction/).

The final result of this guide (the complete exercise) can also be found in our [example repository](https://github.com/dodona-edu/example-exercises/tree/master/tested/class/).

## 1. Structure

Every exercise in Dodona corresponds to a specific directory in the exercise repository.  
That directory follows a [fixed structure](/en/references/exercise-directory-structure), which we will now create.

First, create a new directory for the exercise, which we will call `counter`.  
Then, inside this new directory, create three additional subdirectories:

- `description`: contains the exercise assignment
- `evaluation`: contains information on how a solution should be assessed
- `solution`: contains a sample solution

After this step, your repository should look like this:

```
repository/
└── counter/
   ├── evaluation/
   ├── description/
   └── solution/
```

## 2. Configuration

Dodona requires every exercise to have a [configuration file](/en/references/exercise-config).  
This file contains metadata that Dodona uses.

Create a file `config.json` inside the `counter` directory with the following content:

```json
{
  "description": {
    "names": {
      "en": "Counter",
      "nl": "Teller"
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

- `description.names`: The **name** of the exercise as displayed in Dodona in both Dutch (_nl_) and English (_en_).
- `evaluation.handler`: We use TESTed as the judge.
- `evaluation.test_suite`: The test suite is named `suite.yaml`.
- `programming_language`: The **programming language** for the exercise. Here, we choose Python.
- `access`: The **access level** is set to _private_. We choose a private exercise because this is just a guide, but we encourage making exercises public (_public_) so that other educators can use them (just as you can access thousands of public exercises on Dodona).

After creating this file, your repository should look like this:

```
repository/
└── counter/
   ├── evaluation/
   ├── description/
   ├── solution/
   └── config.json
```

## 3. Exercise assignment and sample solution

The next step is writing the exercise assignment.  
This is what students will see when they try to solve the exercise, explaining what they need to do.

Create a file `description.en.md` inside the `description` directory with the following content:

````markdown
Write a class `Counter`, which can be used to count.

When an instance of the class is created, the start value of the counter is passed to the constructor.
The default start value is 0.

The class should also support the following methods:

- A method `count()` which increases the count by one.
  The method must return its own instance.
- A method `report()` which writes the current count to `stdout`.

### Example

```console?lang=python&prompt=>>>
>>> counter = Counter(5)
>>> counter.report()
5
>>> counter.count()
>>> counter.report()
6
>>> counter.count().count().count().count().report()
10
```
````

If you also want a Dutch version, create a file named `description.nl.md` for the Dutch assignment.  
The assignment itself is written in Markdown, a fairly simple formatting language.  
More information on Markdown can be found [here](/en/references/exercise-description).

We will also add a sample solution.  
This is not required, but it is often useful to have.  
Students cannot see this sample solution (unless your repository is public).

Create a file `solution.py` inside the `solution` directory with the following content:

```python
class Counter:
    def __init__(self, start_value=0):
        self.count = start_value
    
    def count(self):
        self.count += 1
        return self
    
    def report(self):
        print(self.count)

```

After creating these two files, your repository should look like this:

```
repository/
└── counter/
   ├── evaluation/
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 4. Creating a test suite

We want this exercise to be automatically graded.  
To achieve this, we need to write a test suite, which tells Dodona what tests should be performed.  
If all test cases pass, Dodona considers the student’s submission to be correct.

To keep this brief, we will limit our test suite to a few tests.  
Create a file `suite.yaml` inside the `evaluation` directory with the following content:

```yaml
- tab: "Counter"
  contexts:
    - testcases:
        - statement: "counter = Counter(5)"
        - statement: "counter.report()"
          stdout: "5"
        - statement: "counter.count()"
        - statement: "counter.report()"
          stdout: "6"
        - statement: "counter.count().count().count().count().report()"
          stdout: "10"
```

In this test suite, we create one tab with a set of test cases.  
These are the same tests as in the example from the exercise assignment.

After adding the test suite, your repository should look like this:

```
repository/
└── counter/
   ├── evaluation/
   |  └── suite.yaml
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 5. Saving your changes

Don't forget to _commit_ your changes; otherwise, they may be lost!

An example of how to do this can be found [here](/en/guides/exercises/creating-exercises/exercise/#_5-saving-changes).