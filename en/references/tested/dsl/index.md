---
title: Reference for DSL test suites
description: "Easily create test suites for TESTed"
order: 2
---

# DSL test suite reference

In TESTed, a test suite specifies which test cases are executed against a submission.
TESTed differs from other test frameworks in that its test suites are independent of any programming language.
As a result, a single test suite is sufficient to check submissions for the same exercise in different programming languages.

While TESTed has an [advanced format](/en/references/tested/json) for the test suites, we have also developed a small _domain-specific language_ (DSL), to make creating common exercises much easier.
This document is the reference for the DSL test suite format, and contains all options and possibilities.

[//]: # (We also have a set of tutorials, for creating certain types of exercises.)

DSL test suites are written in [YAML](https://en.wikipedia.org/wiki/YAML).
A JSON Schema of the format is available in the TESTed repository, which can enable checks and autocompletion in your editor.

## Structure

The structure of a DSL test suites follows the general Dodona structure, and consists of three levels:

1. [Tabs](#tabs)
2. [Contexts](#contexts)
3. [Test cases](#test-cases)

Below we describe objects of each level.
Mandatory attributes are indicated with a star (*).
At the [end of this document](#full-example), there is a full example of a test suite.

### Root of the test suite

The test suite starts with either a root object, or a list of [tabs](#tabs).
The root object contains three attributes:

- `tabs`*: a list of [tab](#tabs) objects
- `namespace`: the "namespace" for the code of the submission, such as the class name in Java.
- `config`: the global [configuration options](#configuration-options)
- `language`: the [language of the expressions and statements](#language-specific-expressions-and-statements). If this attribute is not set to `"tested"`, all expressions and statements (except for return values) will be programming-language-specific expressions or statements.

### Tabs

A tab object maps onto a tab in the output on Dodona.
It has four possible attributes:

- `tab`*: the name of the tab to be displayed in Dodona
- `contexts`*: a list of [contexts](#contexts) (if this is given, you cannot use the attribute `testcases`)
- `testcases`*: a list of [test cases](#test-cases) (if this is given, you cannot use the attribute `contexts`)
- `config`: the [configuration options](#configuration-options) for this tab and all children

In a lot of exercises, you have precisely one testcase per context.
This is exactly what you can do using the `testcases` attribute: behind the scenes, each testcase will be placed in its own context.

:::tip Hint
While there are four possible attributes, each tab object can only have three,
since `contexts` and `testcases` are mutually exclusive.
:::

### Contexts

A context is a group of test cases that depend on each other.
The context object has three attributes:

- `testcases`*: a list of [test cases](#test-cases)
- `config`: the [configuration options](#configuration-options) for this context and all children
- `context`: an optional description of the context
- `files`: optional list of [files](#files)

In most cases, it is fine to leave the description empty.

Each context must have at least one test case.
Since each context is executed separately, the following two constraints apply:

- Only the first test case may have a "main call", i.e. command line arguments or stdin.
- Only the last test case may have a test for the program's exit code.

Do note that the first and last test case may be the same one:
if you only have one test case, it may be a main call and have a check for the exit code.

### Test cases

Test cases are the building blocks of a test suite, and contain some input and the expected outputs (the _tests_).
Within each context, the following constraints apply to test cases:

- Only the first test case may have a "main call", i.e. command line arguments or stdin.
- Only the last test case may have a test for the program's exit code.

Do note that the first and last test case may be the same one:
if you only have one test case, it may be a main call and have a check for the exit code.

A test case can have the following attributes:

- `config`: the [configuration options](#configuration-options) for this test case and all children
- `files`: optional list of [files](#files)

Additionally, a test case can have all attributes described below, but do note:

- A test case can only have one "input", meaning the `arguments`/`stdin`, `expression` and `statement` attributes are mutually exclusive.
- The attribute `return` requires the attribute `expression`.

#### `stdin`

The data to provide to the [standard input](https://en.wikipedia.org/wiki/Standard_streams#Standard_input_(stdin)).

If this attribute is used, you cannot specify `expression` or `statement` as input, nor can you use `return` as tests.

#### `arguments`

A list of strings to pass to the program as the [command line arguments](https://en.wikipedia.org/wiki/Command-line_interface#Arguments).

If this attribute is used, you cannot specify `expression` or `statement` as input, nor can you use `return` as tests.

#### `expression` / `statement`

This attribute can take two values: a string or an object.

A string contains the expression to evaluate or statement to execute during this test case.
For a statement, in contrast to for an expression, all return values are ignored if there are any.

Expressions and statements use the Python syntax, with some restrictions, which are detailed [here](#expressions-and-statements).

If the value is an object, it must be a mapping of programming language to a [language-specific expressions or statement](#language-specific-expressions-and-statements).

```yaml
return:
  python: "submission.the_function()"
  java: "Submission.theFunction()"
```

#### `stdout` / `stderr`

Specifies the expected output on [standard output](https://en.wikipedia.org/wiki/Standard_streams#Standard_output_(stdout)) and [standard error](https://en.wikipedia.org/wiki/Standard_streams#Standard_error_(stderr)) respectively.

The attribute is either a string (in which case the string is the expected value), or an object for more advanced cases.
The object has the following attributes:

- `data`: the expected data, same as using a string
- `config`: the [configuration options](#test-options)

#### `exception`

Specifies the expected message of an expected exception.
Note that TESTed currently does not allow checking the exception type or class.
For example, you cannot check that an assertion error or exception happened.

#### `return`

Specifies the expected return value.

Depening on the value, this attribute is interpreted as:

- If an untagged string, the string uses the same Python syntax as for [expressions and statements](#expressions-and-statements).
- If it is an untagged object, it is seen as the advanced output for an oracle.
- If it is another value, it is interpreted as a YAML value.

With the tags `!v` or `!values`, you can mark strings or objects as also being YAML values.

#### `exit_code`

Specifies the expected exit code of the program.

Note that only the last test case of a context can have this attribute, although the last test case can also be the first test case if needed.

### Files

Some parameters or other strings are a name of a file.
If you want that parameter to link to the actual file, it needs to be added to the list of files.
Each object in this list has two attributes:

- `name`: the name of the file as it appears in the input
- `url`: the location where the link should point to, relative to the exercise folder

## Configuration options

The configuration object can be specified on any level and applies to all levels below it.
For example, specifying the config on the tab level means it will apply to all contexts and, in turn, all test cases within that tab.

The configuration option has two attributes:

- `stdout`: the [configuration options](#test-options) for standard output
- `stderr`: the [configuration options](#test-options) for standard error
- `return`: the [configuration options](#test-options) for the expected return value

### Test options

This object contains a set of configuration options that influence how the test results are checked by TESTed.
The following options are available:

- `applyRounding`: apply rounding when comparing values as float point numbers
- `roundTo`: the number of decimals to round to, if `applyRouding` is true
- `caseInsensitive`: ignore the case of text when comparing strings
- `ignoreWhitespace`: ignore leading and trailing whitespace
- `tryFloatingPoint`: try comparing text as floating point numbers

## Expressions and statements

In the test suite, expressions and statements are written as YAML strings, using the Python syntax.
For example, a function call with one argument `"hello"`:

```yaml
expression: "a_function_name('hello')"
```

Since the Python syntax does not have a separate syntax for all features supported by TESTed, there are some conventions:

- Function calls whose name begins with a capital are considered constructors, e.g. `Constructor(56)`.
- Identifiers that are in all caps are considered global constants, e.g. `VERY_LONG_NAME`.
- Casts are done using the normal Python way. For example, to cast a number to `int64`: `int64(56)`.

Additionally, most of the syntax is not supported, since TESTed only has support for limited expressions and statements.
The following is supported:

- Simple values, such as `5`, `-9.3` or `"Hello world"`.
- Complex values, such as `[5, 6, 7]`, `{5, "Hello"}` or `{"key": "value"}`.
- Function calls, including named arguments `the_function(5, named=6)`. Do note that named arguments are converted to positional arguments in programming languages that do not support named arguments.
- Constructors (using our convention).
- Assignments, such as `some_variabel = 5`.
- Referencing variables, such as `the_function(some_variable)`.

Notably, absent are any type of function or class definitions and all operators.

## Language-specific expressions and statements

If language-specific expressions or statements are used (either by setting the language globally or by using an object to an attribute `expression` or `statement`), the string will be used literally in the test code.

This has the advantage that all language features of the programming language can be used.
On the other hand, this causes exercises to no longer be programming language independent.
You have to use the correct namespace yourself, and it will not work for functions with return type `void`.

Since TESTed cannot analyse these strings, it is necessary to use the `namespace` yourself.
This is the name of the submitted solution or class (configurable with the attribute [`namespace`](#root-of-the-test-suite)).
This name is programming language dependent:

```yaml
- tab: "My tab"
  testcases:
  - expression:
      c: "to_string(1+1)"
      haskell: "Submission.toString (1+1)"
      runhaskell: "Submission.toString (1+1)"
      java: "Submission.toString(1+1)"
      javascript: "submission.toString(1+1)"
      kotlin: "toString(1+1)"
      python: "submission.to_string(1+1)"
      csharp: "Submission.toString(1+1)"
    return: "2"
```

## Supported tags

TESTed supports the following standard types:

- `!!set` to denote a set.

TESTed also supports:

- `!v` or `!value` to mark a return value as a YAML value.

Finally, all [TESTed types](/en/references/tested/types) can also be used as tags.


## YAML cheat sheet

This section contains a very brief overview of the YAML features used in the DSL.

### Objects

Objects in YAML are key-value pairs, where the key (the attribute) and value are separated by a colon:

```yaml
key: value
```

Nested objects are created using indentation:

```yaml
root:
  child0:
    subchild0: "leaf"
    subchild1: "leaf"
  child1:
    subchild0: "leaf"
```

### Lists

Lists in YAML can be written either on one line (using the JSON syntax) or with one value per line.
For example, a list on one line

```yaml
["Item 0", "Item 1", "Item 2", "Item 3"]
```

When using one value per line, each value must be prefixed with a dash (-) and space:

```yaml
- "Item 0"
- "Item 1"
- "Item 2"
- "Item 3"
```

You can also combine lists and objects:

```yaml
list:
- name: "Item 0"
  items: 5
- name: "Item 1"
- name: "Item 2"
  items: 3
- name: "Item 3"
```

### Strings

Ordinary strings in YAML are written using double quotes:

```yaml
description: "Hello"
```

However, doing multi-line strings is rather ugly:

```yaml
description: "Hello\nWorld"
```

YAML supports special syntax for multi-line strings.
Writing the same string as the last example, we get:

```yaml
description: |
  Hello
  World
```

The reverse is also possible, which are called "folded strings".
With this syntax, YAML will remove newlines:

```yaml
description: >
  Hello
  World
```

This is equivalent to writing:

```yaml
description: "Hello World"
```

### Tags

YAML supports tags to give values another type:

```yaml
!!set [1, 2, 3]
```

## Full example

```yaml
# A tab on Dodona.
- tab: "Name of the tab"
  contexts:
    # The files used in this context.
    - files:
        - name: "file.txt"
          url: "media/workdir/file.txt"
      testcases:
        # An assignment of the variable data.
        - statement: 'data = ["list\nline", "file.txt"]'
          # Function call that uses the variable.
        - statement: 'function(data, 0.5)'
          # Expected return value of the function.
          return: [ 0, 0 ]
    - testcases:
        # A function call where the value is cast to "uint8".
        - statement: 'echo(uint8(5))'
          # The expected return value is also cast to "uint8".
          return_raw: "uint8(5)"

# A second tab in the same test suite.
- tab: "Exception"
  contexts:
    - testcases:
        # Another function call.
        - statement: 'function_error()'
          # The expected text on stdout.
          stdout: "Invalid"
          # The expected text on stderr.
          stderr: "Error"
          # We expect an error or exception with the message "Unknown".
          exception: "Unknown"

# A third tab.
- tab: "Arguments"
  testcases:
    # This program gets input via stdin.
    - stdin: "Alice"
      # There are also command line arguments.
      arguments: [ "stdin" ]
      # The expected text on stdout.
      stdout: "Hello Alice"

# A fourth tab.
- tab: "Config"
  # We configure everything on the tab level.
  config:
    stdout:
      # First try to compare text on stdout as float.
      tryFloatingPoint: true
      # When comparing floats, round to 2 decimals.
      applyRounding: true
      roundTo: 2
    # On stderr we ignore white space and make it case insensitive.
    stderr:
      ignoreWhitespace: true
      caseInsensitive: true
  contexts:
    - config:
        stdout:
          # We override the tab configuration for this context.
          roundTo: 0
      testcases:
        - statement: 'diff(5, 2)'
          stdout: "2"
        - statement: 'diff(5, 2)'
          stdout:
            data: "2.5"
            # We override the context configuration in this test.
            config:
              roundTo: 4

```
