The result of this guide (the complete exercise) can also be found in our [example repository](https://github.com/dodona-edu/example-exercises/tree/master/tested/function/).

## 1. Structure

Each exercise in Dodona corresponds to a specific folder in the exercise repository.
This folder follows a [fixed structure](/en/references/exercise-directory-structure), which we will now create.

First, create a new folder for the exercise, which we will name `minimum`.
Then, inside this new folder, create three additional folders:

- `description`: folder containing the assignment
- `evaluation`: folder with information on how a solution should be assessed
- `solution`: folder containing a sample solution

The folder structure for this exercise should look like this:

```
exercises/
└── minimum/
   ├── evaluation/
   ├── description/
   └── solution/
```

## 2. Configuration

Dodona requires a [configuration file](/en/references/exercise-config) for each exercise.
This file contains metadata used by Dodona.

Create the file `config.json` inside the `minimum` folder with the following content:

```json
{
  "description": {
    "names": {
      "en": "Minimum",
      "nl": "Minimum"
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

- `description.names`: The **names** of the exercise as shown in Dodona in Dutch (_nl_) and English (_en_). In this case, the names are identical.
- `evaluation.handler`: We use TESTed as the judge.
- `evaluation.test_suite`: The test suite is named `suite.yaml`.
- `programming_language`: The **programming language** of the exercise. Here, we choose Python.
- `access`: The **access level** is _private_. We choose a private exercise because this is just a guide, but we encourage making your exercises public (_public_) so that other teachers can use them (just as you have access to thousands of public exercises on Dodona).

After creating this file, your repository structure should look like this:

```
exercises/
└── minimum/
   ├── evaluation/
   ├── description/
   ├── solution/
   └── config.json
```

## 3. Assignment and Sample Solution

The next step is to define the assignment.
This is what students will see when they attempt the exercise, guiding them on what they need to do.

Create a file `description.en.md` inside the `description` folder of the exercise, with the following content:

````markdown
Write a function `minimum` that accepts two numbers as arguments.
This function should return the smaller of the two.

### Example

```console?lang=python&prompt=>>>
>>> minimum(5, 6)
5
```
````

If you also want to provide a Dutch version of the assignment, create another file named `description.nl.md`.
The assignment is written in Markdown, a fairly simple formatting language. More information about Markdown can be found [here](/en/references/exercise-description).

We will also add a sample solution.
This is not required, but it is often useful to have.
Students cannot see this solution (unless your repository is public, of course).

Create a file `solution.py` inside the `solution` folder with the following content:

```python
def minimum(a, b):
    if a < b:
        return a
    else:
        return b
```

After creating these two files, your repository should now look like this:

```
exercises/
└── minimum/
   ├── evaluation/
   ├── description/
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   └── config.json
```

## 4. Creating a Test Suite

We want this exercise to be automatically graded.
To achieve this, we need to write a test suite that tells Dodona which tests should be run.
If all test cases pass, Dodona considers the student's submitted solution to be correct.

In this case, we will keep the test plan brief, with only a few test cases.
In a real exercise, you would likely want to include more test cases.

Create a file `suite.yaml` inside the `evaluation` folder of the exercise, with the following content:

```yaml
- tab: "minimum"
  testcases:
    - expression: "minimum(5, 6)"
      return: 5
    - expression: "minimum(1.2, 1.96)"
      return: 1.2
    - expression: "minimum(1000000000, -5)"
      return: -5
    - expression: "minimum(-5, -6)"
      return: -6
    - expression: "minimum(6, 6)"
      return: 6
```

In this test suite, several things happen:

- The test cases are grouped under a tab named "minimum".
- There are 5 test cases.
- Each test case defines an expression: the function call that should be executed.
  We use Python syntax for this. In this case, we call the function that students need to implement with different arguments.
- We also define the expected return value for each test case.

Finally, the complete file structure should look like this:

```
exercises/
└── minimum/
   ├── evaluation/
   |  └── suite.yaml
   ├── description/
   |  └── description.en.md
   ├── solution/
   |  └── solution.py
   └── config.json
```