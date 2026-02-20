---
title: Test suites
order: 3
---

# Test Suites for Exercises

To verify whether a submitted solution is correct, Dodona uses test suites.
This test suite contains a series of test cases that ensure you are reasonably certain whether a solution is correct or not.

In this guide, we briefly discuss the structure, followed by the various possibilities.
Here we use TESTed: the recommended way to create exercises for **Python**, **JavaScript**, **Typescript**, **Java**, **Kotlin**, **C**, **C#**, **C++**, **Haskell**, and **Bash**.
If you want to do something that TESTed cannot do or you want to use a different programming language, first look at the [overview of all judges](/en/references/judges).

This guide contains more advanced concepts.
There are also complete examples for simpler scenarios:

- [Exercise with input-output](/en/guides/exercises/examples/input-output): an exercise where input is read and a result is written
- [Exercise with functions](/en/guides/exercises/examples/function): here a function must be written that returns a value
- [Exercise with classes](/en/guides/exercises/examples/class): here a class must be written
- [Exercise with arguments](/en/guides/exercises/examples/command-line): here a program must be written that accepts arguments

This guide also contains only a few common cases.
The [reference guide](/en/references/tested/dsl) explains the complete format for test suites.

## Structure

A test suite consists of a hierarchy of three levels:

1. `tab`: **Tabs**, which are also displayed as separate tabs on Dodona.
2. `contexts`: **Contexts**, which represent an independent unit of test cases.
3. `testcases`: **Test cases**, which contain one test and its results.

An example of a test suite with all levels is:

```yaml
- tab: "Tab 1"
  contexts:
    - testcases:
        - expression: 'echo("hello")'
          return: "hello"
    - testcases:
        - expression: 'echo("world")'
          return: "world"
- tab: "Tab 2"
  contexts:
    - testcases:
        - expression: 'echo("4")'
          return: "4"
    - testcases:
        - expression: 'echo("2")'
          return: "2"
```

In this test suite, there are two similar tabs.
Each tab contains two contexts, each with one test case.
Each test case calls the `echo` function with a different parameter and also determines the expected return value (_return_).
Each test case is in its own context because each function call is independent of the others.

A context with one test case is common.
Therefore, it is possible to omit the contexts:

```yaml
- tab: "Tab 1"
  testcases:
    - expression: 'echo("hello")'
      return: "hello"
    - expression: 'echo("world")'
      return: "world"
- tab: "Tab 2"
  testcases:
    - expression: 'echo("4")'
      return: "4"
    - expression: 'echo("2")'
      return: "2"
```

## Format

A test suite is written in YAML.
This is an intuitive format supported by many text editors.
A good overview can be found on [this page](https://quickref.me/yaml.html).
Your favorite search engine will undoubtedly find many more.

If your text editor supports JSON Schema, you can add it to get validation and autocompletion in the test suites: use this [JSON Schema](https://github.com/dodona-edu/universal-judge/blob/master/tested/dsl/schema.json).
If you use VS Code, you can also use our [extension](https://marketplace.visualstudio.com/items?itemName=DodonaLearningTechnologies.dodona-exercise-assistant).
This will automatically configure JSON Schema.

## Function Calls and Return Values

Function calls in a test suite are noted with a string representation using Python syntax.
A test case with several function calls is:

```yaml
- expression: 'min(5, min(4, min(3, min(2, 1))))'
  return: 1
```

A return value is interpreted as a YAML value.
A string is a string, a number becomes a number, and so on.

If you need advanced return values, there are two options:

- A string with the tag `!expression` means that the string can use Python syntax.
- An object with the tag `!oracle` is considered a [custom oracle function](#custom-oracle-function).

An example of an advanced return value (here a set of numbers) is:

```yaml
- expression: 'unique(1, 1, 2, 3)'
  return: !expression "set([1, 2, 3])"
```

A return value with a YAML value:

```yaml
- expression: 'unique(1, 1, 2, 3)'
  return: 5.5
```

So, there are two possibilities for having a string as a return value:

```yaml
- expression: 'echo("hello")'
  return: "hello"  # A regular string
- expression: 'echo("hello")'
  return: !expression "'hello'"  # A string in Python syntax
```

## Variables (assignments)

You can also use assignments (assigning a value to a variable). An example is:

```yaml
- statement: 'a = 5'
- statement: 'b = calculate(a, 56)'
- expression: 'calculate(b, 10)'
  return: 10
```

Here, the value 5 is first assigned to a variable `a`.
Then, the return value of a function call that uses the variable `a` is stored in `b`.
Finally, `b` is used in a new function call, whose return value is checked.

Note that all test cases that use variables must be in the same context.

## Python Syntax

Although Python syntax is used, the conventions in a test suite sometimes differ from regular Python.
A test suite uses Python syntax but is not Python. The conventions used are:

- Function calls whose names start with a capital letter are considered _constructors_, for example, `Constructor(56)`.
- Identifiers written entirely in uppercase are considered global constants, for example, `VERY_LONG_NAME`.
- Casting values is done in the usual Python way. Casting a number to `int64` is, for example, `int64(56)`. However, there is no support for Python constructors. A set must be noted as `set([1, 2, 3, 5])`, not as `set(1, 2, 3, 5)`.

Additionally, large parts of the syntax are not supported, as TESTed only has limited support for expressions and statements. The following are supported:

- Simple values, such as `5`, `-9.3`, or `"Hello world"`.
- Complex values, such as `[5, 6, 7]`, `{5, "Hello"}`, or `{"key": "value"}`.
- Function calls, including _named parameters_, such as `the_function(5, named=6)`.
- Constructors (via our convention).
- Declaring and assigning variables (_assignments_), such as `some_variable = 5`.
- Referring to variables, such as `the_function(some_variable)`.

Notable omissions include all kinds of function or class definitions, as well as all operators (such as plus, minus, divided, multiplied).

## Data Types

For an overview table of the supported data types and their translation into the different programming languages, we refer to the [reference guide](/en/references/tested/types).

## Custom Oracle Function

Sometimes the built-in checks are not sufficient, such as for non-deterministic functions.
For example, suppose students need to write a function that outputs the current date.
If we want to write that in a test suite, it would be:

```yaml
- tab: "Today"
  testcases:
    - expression: 'today()'
      return: "??????"  # What should go here?
```

The solution is to write a custom oracle function.
This function will receive the return value and determine whether it is correct or not.
In the test suite, this would be:

```yaml
- tab: "Today"
  testcases:
    - expression: 'today()'
      return: !oracle
        # The type of oracle, here always "custom_check"
        oracle: "custom_check"
        # The expected value
        value: "'27-08-2023'"
        # The name of the file
        file: "test.py"
        # The name of the oracle function
        name: "evaluate_test"
        # A list of additional arguments for the oracle function
        arguments: [5, 6]
```

We specify that there is a file `test.py`, in which a function `evaluate_test` (the oracle function) exists.
This oracle function is always written in Python, regardless of the programming language in which the exercise can be solved.
The oracle function adheres to a specific signature, such as:

```python
# We import some helper classes from TESTed.
from evaluation_utils import EvaluationResult, Message
from datetime import datetime

# The oracle function always has at least one argument:
# - the "context", an object with some metadata (see below)
# - the other arguments are those from the test suite
#   (the numbers 5 and 6 in this case)
def evaluate_test(context, five, six):
    today = datetime.today().strftime('%d-%m-%Y')
    return EvaluationResult(
      # Boolean whether the result is correct
      result=today == context.actual,
      # The "expected value" to display on Dodona
      dsl_expected=repr(today),
      # The actual value from the solution to display on Dodona
      dsl_actual=repr(context.actual),
      # Optional list of messages to display on Dodona
      messages=[Message("Hello")]
    )
```

What we do in this function is calculate today's date.

The first argument of the function is always an object with the following fields:
- `expected`: the expected value of the oracle as defined by the key `value` in the test suite
- `actual`: the value generated by the student's solution
- `execution_directory`: the path of the directory in which the solution was evaluated
- `evaluation_directory`: the path of the `evaluation` directory from the exercise (where the test suite is located)
- `programming_language`: the programming language of the student's solution
- `natural_language`: the natural language of the student who submitted the solution

We then return an `EvaluationResult` with four parameters:

1. `result`: A boolean indicating whether the value from the solution is correct or not. In this case, we simply compare it with today's date.
2. `dsl_expected`: The expected value to display on Dodona. We override the expected value from the test suite with today's date. This uses Python syntax.
3. `dsl_actual`: The actual value to display on Dodona. We simply pass the actual value here. This uses Python syntax.
4. `messages`: An optional list of messages. These messages are also displayed on Dodona and can be used to provide additional feedback or explanation to the students.

`stderr` and `stdout` can also use their own check function.
The same notation is used for this, but with `data` instead of `value`:

```yaml
- tab: "Today"
  testcases:
    - stdin: '1 + 1'
      stdout:
        data: "2"
        oracle: "custom_check"
        file: "test.py"
        name: "evaluate_stdout"
```

## Arguments, Input, and Exit Code

The arguments of a program, the standard input (`stdin`), and the exit code can only be used once per context.
A context is independent of the other contexts and thus a separate execution of the program.

There are two special "test cases" in a context:

1. In the first test case, arguments and `stdin` can be given.
2. In the last test case, the exit code can be checked.

The first and last test case can also be the same test case, for example:

```yaml
- tab: "sum"
  testcases:
  - arguments: ["spam", "eggs", "bacon"]
    stderr: "invalid arguments"
    exit_code: 1
```

A more extensive (fictional) example is:

```yaml
- tab: "sum"
  contexts:
    - testcases:
        - arguments: [ "spam", "eggs", "bacon" ]  # The arguments
          stdin: "today"  # Standard input
          stdout: "Hello"  # The program must generate stdout
        - expression: "some_function()"
          return: "hello"
        - statement: "exit_the_program(25)"
          exit_code: 25
```

You can also combine `stdin` with an expression. It is not mandatory to use arguments:

```yaml
- tab: "example"
  testcases:
  - stdin: "Jan"
    expression: "greet()"
    return: "Hello, Jan."
```

## Language-Specific Expressions and Statements

::: warning Advanced Topic
Language-specific expressions and statements are not needed for most exercises.

If you think you need language-specific expressions and statements, we would like to know why: do not hesitate to [send us an email](mailto:dodona@ugent.be?subject=Language-specific%20expressions) to report your use.
This way, we can possibly expand TESTed with new functionality or make your specific use case easier.
:::

In certain cases, you may want to do something for which there is no support in TESTed.
An example is the use of lambdas in Python (or Java) or the use of operators.

In that case, it is possible to write language-specific expressions and statements.
In the following example, a function is called with the sum of two numbers as an argument.

```yaml
- tab: "My tab"
  testcases:
  - expression:
      c: "to_string(1+1)"
      cpp: "to_string(1+1)"
      haskell: "Submission.toString (1+1)"
      runhaskell: "Submission.toString (1+1)"
      java: "Submission.toString(1+1)"
      javascript: "submission.toString(1+1)"
      kotlin: "toString(1+1)"
      python: "submission.to_string(1+1)"
      csharp: "Submission.toString(1+1)"
    return: "2"
```

::: info Note
When using language-specific expressions and statements, you are responsible for using the correct prefix for functions (the `(S|s)ubmission` in the example).
Moreover, expressions will not work with functions that return `void`.

More information and discussion at <https://github.com/dodona-edu/universal-judge/issues/423>
:::

If you only want to support one programming language, you can also set the language of the expressions and statements globally:

```yaml
- tab: "My tab"
  language: "java"
  testcases:
  - expression: "Submission.toString(1+1)"
    return: "2"
```

## Linking Files to Expressions

When creating an exercise on files, we recommend the following approach:

1. Place the files you want to use during evaluation in the `workdir/` folder in the exercise folder.
2. Pass the name of the file as a parameter during a function call or as an argument when executing.
3. Link the exercises to the file name in the test suite. This allows students to click on the file name in the feedback and download this file.

To do this, it is necessary to also place the files in the `description/media/` folder of the exercise folder.
In the test suite, you then specify the `files` attribute:

```yaml
- tab: "Example with files"
  testcases:
  - expression: "read_the_file('file.txt')"
    return: "This is the content of the file"
    files:
      - name: "file.txt"
        url: "media/file.txt"
```

The structure of the exercise folder will then look like this:

```
repository/  # The repo with exercises
└── example/ # The actual exercise
   ├── evaluation/
   |  └── suite.yaml
   ├── description/
   |  ├── media/
   |  |   └── file.txt  # The file to link
   |  └── description.en.md
   ├── solution/
   |  └── solution.py
   ├── workdir/
   |  └── file.txt  # The file to evaluate
   └── config.json
```