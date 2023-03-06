---
title: Test suite format
description: "Create test suites for TESTed"
sidebarDepth: 2
---

# Test suite format

In TESTed, a test suite specifies which test cases are executed against a submission.
TESTed differs from other test frameworks in that its test suites are independent of any programming language.
As a result, a single test suite is sufficient to check submissions for the same exercise in different programming
languages.

The TESTed test suite format is formally specified
by [this Python module](https://github.com/dodona-edu/universal-judge/blob/master/tested/testplan.py).
It can also generate a JSON Schema to make the validation of test suites easier.
The [source code repository](https://github.com/dodona-edu/universal-judge/tree/master/exercise) for TESTed contains a number of examples of test suites.

The first section of this reference describes the structure of the test suite.
A dot notation is used to indicate where the attribute is located in the hierarchical structure.
A star (`*`) is used to indicate a list of objects.
For example, `.tabs.*.contexts.*.testcases.*.description` can roughly be converted to json like this:

```json5
{                         // <root>
 tabs: [                  // .tabs
  {                       // .tabs.*
   contexts: [            // .tabs.*.contexts
    {                     // .tabs.*.contexts.*` 
     testcases: [         // .tabs.*.contexts.*.testcases
       {                  // .tabs.*.contexts.*.testcases.*
         description: "1" // .tabs.*.contexts.*.testcases.*.description
       }
     ]
    }
   ]
  }
 ]
}
```

In the sections after that, some aspects are discussed in more detail.

## `<root>`

Root object of a test suite.
Since this object is not named in a test suite, we ignore it in all titles below.

### `.namespace`

The name of the submission file (`<namespace>.<ext>`).

The `namespace` is also used as the namespace of the code.
The default namespace is `submission`.
For example, Java submissions must include a class called `Submission`.

:::tip Hint
You should use `snake_case` for the namespace,
as it enables using the right style convention for each programming language.
:::

## `.tabs.*`

A list of all tabs that will be executed.

The tabs in a test suite correspond with the visual grouping of test cases into tabs on Dodona.
A tab contains a list of the contexts.

### `.name`

The name of the tab; displayed on Dodona.

### `.hidden`

A boolean indicating if the tab must be hidden when all its test cases succeed.

## `.tabs.*.contexts.*`

A list of contexts to be executed.
A context is a set of test cases that are executed together, and optionally depend on each other.
For example, if you save the result of a function call in a variable and wish to use that variable later, these test cases must be in the same context.

### `.before`

An object whose keys are programming languages.
The corresponding values are [TextData](#textdata) objects that are executed before the test cases.

### `.after`

An object whose keys are programming languages.
The corresponding values are [TextData](#textdata) objects that are executed after the test cases.

### `.description`

A description of the context as displayed by Dodona.
When no description is given, it will be automatically generated.

### `.link_files.*`

A list of files that must be linked in the feedback on Dodona.
Each object is used to enable file linking in the feedback.

#### `.link_files.*.name`

The name of a file.
All exact matches of the filename will be linked to the content.

#### `.link_files.*.content`

The URL of a text file (usually a relative URL to a file in the description directory of the exercise).

#### `.link_files.*.location`

The type of content.
Currently, the only value supported is `href`, which is also the default value.
This attribute is only included for legacy reasons and may become deprecated in the future.

#### `.link_files.*.storage`

The storage method of the content.
Currently, the only value supported is `disk`, which is also the default value.
This attribute is only included for legacy reasons and may become deprecated in the future.

## `.tabs.*.contexts.*.testcases.*`

A test case is a statement or an expression that will be executed and evaluated.
Each context has at least one test case.
The following two constraints apply:

- Only the first test case may have a "main call", i.e. command line arguments or stdin.
- Only the last test case may have a test for the program's exit code.

Do note that the first and last test case may be the same one:
if you only have one test case, it may be a main call and have a check for the exit code.

### `.input`

The input for a test case can always be a statement or an expression
(see [Statements and expressions](#statements-and-expressions)).

However, if this is the first test case, the input may also be the "main" input, using the properties described below.
If using the "main" input, at least one of the properties below is required.

#### `.input.stdin`

The content that is made available on standard input.
This can either be an ([EmptyChannel](#emptychannel)) object,
or a [TextData](#textdata) object providing the path name of a text file or a string containing the content.

#### `.input.arguments`

A list of string arguments that are passed when executing the submission.
If left out, an empty list is used.

#### `.input.main_call`

If there is no `stdin` and there are no arguments,
but you still want to have a "main" input, you can set this field to `True`.

### `.description`

A description of the test case to be displayed by Dodona.
When no description is given, it will be automatically generated by TESTed based on the input for this test case.
In most cases, you will probably want to use the automatically generated description.

### `.output`

The output object contains all tests for the given test case.

Note that you can only use the test for the exit code if this is the last test case in the context.

#### `.output.stdout`

The output channel for standard output.
Possible output channels are:

- [EmptyChannel](#emptychannel) (default): No output is expected on this channel.
  This is the default option.
- [IgnoredChannel](#ignoredchannel): No output is expected on this channel, but generated output is ignored.
- [TextOutputChannel](#textoutputchannel): Expected output on this channel.

#### `.output.stderr`

The output channel for standard error.
Possible output channels are:

- [EmptyChannel](#emptychannel) (default): No output is expected on this channel.
- [IgnoredChannel](#ignoredchannel): No output is expected on this channel, but generated output is ignored.
- [TextOutputChannel](#textoutputchannel): Expected output on this channel.

#### `.output.file`

The output channel for a file.
Possible output channels are:

- [IgnoredChannel](#ignoredchannel) (default): No output is expected on this channel, but generated output is ignored.
- [FileOutputChannel](#fileoutputchannel): Expected output on this channel.

_**Note:**_ TESTed currently supports at most one expected file for each execution of the submission.
Additionally, there is currently no way to check that _no_ files were generated.

#### `.output.exception`

The output channel for an exception.
The possible channels are:

- [EmptyChannel](#emptychannel) (default): No exception is expected.
- [IgnoredChannel](#ignoredchannel): No exception is expected, but any exceptions raised are ignored.
- [ExceptionOutputChannel](#exceptionoutputchannel): Expected exception.

#### `.output.result`

The output channel for the result of an expression.
The possible channels are:

- [EmptyChannel](#emptychannel) (default): No result is expected.
- [IgnoredChannel](#ignoredchannel): No exception is expected, but any exceptions raised are ignored.
- [ValueOutputChannel](#valueoutputchannel): The expected result of the expression.

#### `.output.exit_code`

The output channel for the exit code of the submission.
The possible channels are:

- [IgnoredChannel](#ignoredchannel) (default): Exit code is not checked.
- [ExitCodeOutputChannel](#exitcodeoutputchannel): Allows you to specify the expected exit code.

## TextData

A `TextData` object represents textual data.

### `.type`

The type of data: `text` or `file`.
If `type` is `text`, the `.data` is interpreted as the textual data itself.
If `type` is `file`, the `.data` is interpreted as the pathname of a text file in the workdir directory of the judge
that contains the textual data.

### `.data`

A string.

## Channels

The output channels represent all possible side effects of executing the submission.
Here's an overview of all output channels currently supported by TESTed:

### EmptyChannel

An `EmptyChannel` describes that no output is expected on a specific file descriptor (e.g. stdout or stderr).
Any output generated will be considered as incorrect by TESTed.
The `EmptyChannel` is represented by a string constant `none`.

For example, disallowing any output on standard output:

```json
{
 "output": {
  "stdout": "none"
 }
}
```

For most output types, this is the default value, meaning you don't need to specify it.

### IgnoredChannel

An IgnoredChannel object describes that no output is expected on a specific file descriptor (e.g. stdout or stderr).
Any output generated on the file descriptor will be ignored, and is considered correct by TESTed.
In other words, if you do not want output, you should use [`EmptyChannel`](#emptychannel),
while if you don't care about the output, you should use `IgnoredChannel`.
The `EmptyChannel` is represented by a string constant `ignored`.

For example, ignoring any output on standard output:

```json
{
 "output": {
  "stdout": "ignored"
 }
}
```

### ExceptionOutputChannel

An `ExceptionOutputChannel`describes an expected exception, thrown upon executing the submission by an error message and
an evaluator used to evaluate the exception.
It is represented by an object with two attributes.

For example, if you require an error with the message `"Error"`:

```json
{
 "output": {
  "exception": {
   "exception": {
    "message": "Valid exceptions"
   }
  }
 }
}
```

Since evaluating anything more than the exception message requires programming-language-specific code,
TESTed supports the concept of "evaluators".
This is a function you can write,
which will be called by TESTed to evaluate whether a thrown exception is the correct one.
See the attribute documentation below or the [Evaluators section](#evaluators) for more information.

For example, requiring a `assertion` exception, in an exercise supporting `Python`, `Java` and `Haskell`:

```json
{
 "output": {
  "exception": {
   "exception": {
    "message": "Some assertions went wrong"
   },
   "evaluator": {
    "type": "specific",
    "evaluators": {
     "python": {
      "file": "evaluator.py"
     },
     "java": {
      "file": "Evaluator.java"
     },
     "haskell": {
      "file": "Evaluator.hs"
     }
    }
   }
  }
 }
}
```

#### `.exception.message`

An object representing an expected error message.

#### `.evaluator`

The evaluator to use to determine whether the exception is valid or not.
TESTed currently supports the following two evaluators:

- [GenericExceptionEvaluator](#genericexceptionevaluator) (default): Built-in evaluator for exceptions.
  **Note:** Only the error message (not the exception type) is evaluated with the built-in evaluator.
- [SpecificEvaluator](#specificevaluator): An evaluator in the programming language of the submission.

### ExitCodeOutputChannel

An `ExitCodeOutputChannel` object describes the expected exit code of the executed submission.

For example, if you require an exit code of -25:

```json
{
 "output": {
  "exit_code": {
   "value": -25
  }
 }
}
```

::: warning
When the expected and actual exit codes are both `0`, no feedback is generated on this output channel.
:::

#### `.value`

The expected exit code as an integer.

### FileOutputChannel

A `FileOutputChannel` object represents a file that is created upon executing the submission.

::: warning
Currently, these are some known limitations for testing file creation:

- Only a single file can be evaluated per test case.
- Only text files are supported (no binary files).
  :::

For example, if the generated file `gen.txt` must be identical to a sample file `expected.txt`:

```json
{
 "output": {
  "file": {
   "expected_path": "gen.txt",
   "actual_path": "expected.txt"
  }
 }
}
```

#### `.expected_path`

A relative path to a text file in the `workdir` that contains the expected output.

#### `.actual_path`

A relative path where a text file is expectedly generated upon execution of the submission.

#### `.evaluator`

An evaluator used to evaluate the generated text file.
TESTed currently supports the following two evaluators:

- [GenericTextEvaluator](#generictextevaluator)(default): Built-in evaluator for text and text files.
- [ProgrammedEvaluator](#programmedevaluator): A custom evaluator.

### TextOutputChannel

A `TextOutputChannel` object represents text that is expected to be generated on an output channel (e.g. stdout or
stderr).

For example, if the text `"Hello world"` must be written to `stdout`:

```json
{
 "output": {
  "stdout": {
   "data": "Hello world",
   "type": "text"
  }
 }
}
```

It is also possible to use a file containing the expected output:

```json
{
 "output": {
  "stdout": {
   "data": "./expected-output.txt",
   "type": "file"
  }
 }
}
```

#### `.type`

Similar to the `.type` attribute of the [`TextData` object](#textdata).
The type of data: `text` or `file`.
If `type` is `text`, the `.data` is interpreted as the textual data itself.
If `type` is `file`, the `.data` is interpreted as the pathname of a text file in the workdir directory of the judge
that contains the textual data.

#### `.data`

Similar to the `.data` attribute of the [`TextData` object](#textdata).
A string.

#### `.evaluator`

An evaluator used to evaluate the generated text.
TESTed currently supports the following two evaluators:

- [GenericTextEvaluator](#generictextevaluator)(default): Built-in evaluator for text and text files.
- [ProgrammedEvaluator](#programmedevaluator): A custom evaluator.

### ValueOutputChannel

A `ValueOutputChannel` object represents the value obtained upon evaluating the expression of the test case.

For example, if a function call must produce a list with two strings (`"a"` and `"c"`):

```json
{
 "output": {
  "result": {
   "value": {
    "data": [
     {
      "data": "a",
      "type": "text"
     },
     {
      "data": "c",
      "type": "text"
     }
    ],
    "type": "sequence"
   }
  }
 }
}
```

#### `.value`

The expected value.
See [Statements and expressions](#statements-and-expressions) to learn how values must be described.

::: warning
The expected value must be a literal value, and can not be a function call or a variable.
:::

#### `.evaluator`

An evaluator used to evaluate the generated value.
TESTed currently supports the following three evaluators:

- [GenericValueEvaluator](#genericvalueevaluator) (default): Built-in evaluator that compares the generated value with
  the expected value.
- [ProgrammedEvaluator](#programmedevaluator): A custom evaluator that is independent of the programming language of the
  submission.
- [SpecificEvaluator](#specificevaluator): A custom evaluator that depends on the programming language of the
  submission.

::: warning
The first two evaluators only support datatypes that are also [supported by TESTed](#data-types).
To support custom datatypes, you must use a `SpecificEvaluator`.
:::

## Evaluators

There are three ways of checking results in TESTed:

1. *Built-in checks*
   These are programming-language-independent, and are the preferred way to use TESTed.
2. *Programmed checks*
   In this case, you, as the exercise author, provide an implementation of a function which will be called by TESTed
   when checking the results.
   You only have to implement this function once in one programming language.
   TESTed takes care of translating the results between multiple programming languages.
   This means these types of checks are still programming-language-independent.
   A good example is checking non-deterministic behavior, such as randomness or dynamic results, e.g. when results are
   dependent on the current date.
3. *Language-specific checks*
   Here, you need to provide the implementation of a function for each programming language the exercise needs to
   support.
   The downside is that the test suite is no longer programming-language-independent.
   For example, if a new language is added to TESTed, your test suite will need updating.
   However, this does allow you to test programming-language-specific aspects, such as custom datatypes.

Internally, these checks are implemented using evaluators.
The *built-in checks* are implemented using "generic evaluators", which are the default for all output channels.
This means you often don't need to specify them.

*Programmed checks* are achieved using the [`SpecificEvaluator`](#specificevaluator).
*Language-specific checks* are implemented using the [`ProgrammedEvaluator`](#programmedevaluator).

Each evaluator has an attribute `.type` with the internal type of the evaluator.
Generic evaluators also have an attribute `.name` with the internal name of the evaluator.

### GenericExceptionEvaluator

A `GenericExceptionEvaluator` object contains all the necessary information to use the built-in evaluator for
exceptions.

:::warning
This evaluator only evaluates error messages.
It does not take into account exception types because of their programming language dependencies.
:::

For example, an [`ExceptionOutputChannel`](#exceptionoutputchannel) with the generic evaluator:

```json
{
 "output": {
  "exception": {
   "exception": {
    "message": "Valid exceptions"
   },
   "evaluator": {
    "type": "builtin",
    "name": "exception"
   }
  }
 }
}
```

Note that you never have to actually specify the example above, since the generic evaluator is the default value.

#### `.type`

A string with constant value `builtin`.

#### `.name`

A string with constant value `exception`.

#### `.options`

The *GenericExceptionEvaluator* does not support any options at the moment.

### GenericValueEvaluator

A `GenericValueEvaluator` object contains all the necessary information to use the built-in evaluator for values.

For example, a [`ValueOutputChannel`](#valueoutputchannel) with the generic evaluator:

```json
{
 "output": {
  "result": {
   "evaluator": {
    "type": "builtin",
    "name": "value"
   },
   "value": {
    "data": [
     {
      "data": "a",
      "type": "text"
     },
     {
      "data": "c",
      "type": "text"
     }
    ],
    "type": "sequence"
   }
  }
 }
}
```

#### `.type`

A string with constant value `builtin`.

#### `.name`

A string with constant value `value`.

#### `.options`

The *GenericValueEvaluator* does not support any options at the moment.

### GenericTextEvaluator

A `GenericTextEvaluator` object contains all the necessary information to use the built-in evaluator for textual data.

#### `.type`

A string with constant value `builtin`.

#### `.name`

A string with constant value `text` or `file`.

#### `.options`

By default, exact matching is used to compare a generated text with an expected text.
The following options can be used to adjust the matching behaviour:

- `ignoreWhitespace`: Ignore leading and trailing whitespace.
- `caseInsensitive`: Ignore differences between uppercase and lowercase.
- `tryFloatingPoint`: Try to compare the text as floats.
- `applyRounding`: Apply rounding when comparing text as floats.
- `roundTo`: Precision of floating points when rounding numbers. Mandatory option when rounding is applied.

### ProgrammedEvaluator

A `ProgrammedEvaluator` object contains all the necessary information to use a custom evaluator for values that works
independent of the programming language of the submission.

::: tip Hint
For performance reasons, we strongly recommend implementing custom evaluators in Python if this is an option.
If the programmed evaluator is implemented in Python, it is executed in the same process as TESTed and no language
barriers need to be crossed.

Context switching between the TESTed core and a programmed evaluator comes with an overhead for starting new processes,
compilation, and serializing and deserializing values and function calls.
:::

For example, using a programmed evaluator for the return value:

```json
{
 "output": {
  "result": {
   "value": {
    "type": "text",
    "data": "input-3"
   },
   "evaluator": {
    "type": "programmed",
    "function": {
     "file": "evaluator.py",
     "name": "evaluate_value"
    },
    "language": "python"
   }
  }
 }
}
```

#### `.type`

A string with constant value `programmed`.

#### `.language`

The programming language of the evaluation function.
Note that this is independent of the programming language of the submission.

#### `.function`

An [`EvaluationFunction`](#evaluationfunction) object that represents the custom evaluation function.

#### `.arguments.*`

A list of arguments that are passed when calling the evaluation function (see [EvaluationFunction](#evaluationfunction)
and [Statements and expressions](#statements-and-expressions)).

### SpecificEvaluator

A `SpecificEvaluator` object contains all the necessary information to use a custom evaluator for values that depends on
the specific programming language of the submission.

For example, using a specific evaluator for the return value:

```json
{
 "output": {
  "result": {
   "evaluator": {
    "type": "specific",
    "evaluators": {
     "python": {
      "file": "evaluator.py"
     },
     "java": {
      "file": "Evaluator.java"
     },
     "haskell": {
      "file": "Evaluator.hs"
     },
     "c": {
      "file": "evaluator.c"
     },
     "javascript": {
      "file": "evaluator.js"
     }
    }
   }
  }
 }
}
```

#### `.type`

A string with constant value `specific`.

#### `.evaluators`

An object mapping programming languages onto a [`EvaluationFunction`](#evaluationfunction) object that represents the
custom evaluation function for that programming language.
The keys of the objects are strings, e.g. `"python"` or `"java"`.

::: danger
A submission can not be evaluated if there is no evaluator function associated with its programming language.
For example, in the fragment above, the exercise will not be solvable in Kotlin.
:::

### EvaluationFunction

An `EvaluationFunction` object represents a function that can be called as an evaluator function.

When used with a programmed evaluator, the function takes three arguments:

- `expected`: the expected return value from the test suite
- `actual`: the actual return value, produced by the submission
- `arguments`: a list of additional arguments from the test suite

It must return a [`EvaluationResult`](#evaluationresult).

For example:

:::: tabs
::: tab Haskell

```haskell
{-# LANGUAGE ScopedTypeVariables #-}
module Evaluator where

import EvaluationUtils
import Control.Exception

evaluate_value :: String -> String -> [String] -> EvaluationResult
evaluate_value expected actual arguments =
    let correct = if actual == expected then True else False
    in evaluationResult {
        result = correct,
        readableExpected = Just expected,
        readableActual = Just actual,
        messages = [message "Hallo"]
    }
```

:::
::: tab Java

```java
import java.util.*;

public class Evaluator {
    public static EvaluationResult evaluateValue(Object expected, Object actual, List<?> arguments) {
        return EvaluationResult.builder(expected.equals(expected))
                .withReadableExpected(expected.toString())
                .withReadableActual(actual != null ? actual.toString() : "")
                .withMessage(new EvaluationResult.Message("Hallo"))
                .build();
    }
}
```

:::
::: tab JavaScript

```javascript
function evaluateValue(expected, actual, args) {
  return {
    "result": expected === actual,
    "expected": expected,
    "actual": actual,
    "messages": [{ "description": "Hallo", "format": "text" }]
  }
}

exports.evaluateValue = evaluateValue;
```

:::
::: tab Kotlin

```kotlin
class Evaluator {
    companion object {
        @JvmStatic
        fun evaluateValue(expected: Any, actual: Any?, arguments: List<Any?>?): EvaluationResult {
            return EvaluationResult.Builder(
                result = expected == actual,
                readableExpected = expected.toString(),
                readableActual = actual?.toString() ?: ""
            )
                .withMessage(EvaluationResult.Message("Hallo"))
                .build()
        }
    }
}
```

:::
::: tab Python

```python
from evaluation_utils import EvaluationResult, Message


def evaluate_value(expected, actual, args):
    return EvaluationResult(expected == actual, expected, actual, [Message("Hallo")])
```

:::
::::

When used with a programming-language-specific evaluator, the function takes one argument:

- `actual`: the actual return value, produced by the submission

It must also return a [`EvaluationResult`](#evaluationresult).

For example, the evaluator function for a programming-language-specific evaluator:

:::: tabs
::: tab C

```c
#include <string.h>
#include <stdbool.h>

#include "evaluation_result.h"

EvaluationResult* evaluate(char* actual) {
    bool result = !strcmp("correct", actual);
    EvaluationResult* r = create_result(1);
    r->result = result;
    r->readableExpected = "correct";
    r->readableActual = actual;
    r->messages[0] = create_message("Hallo", NULL, NULL);
    return r;
}
```

:::
::: tab Haskell

```haskell
{-# LANGUAGE ScopedTypeVariables #-}
module Evaluator where

import EvaluationUtils
import Control.Exception

evaluate :: String -> EvaluationResult
evaluate value  =
    let correct = if value == "correct" then True else False
    in evaluationResult {
        result = correct,
        readableExpected = Just "correct",
        readableActual = Just value,
        messages = [message "Hallo"]
    }
```

:::
::: tab Java

```java
import java.util.*;

public class Evaluator {
    public static EvaluationResult evaluate(Object actual) {
        var correct = "correct".equals(actual);
        return EvaluationResult.builder(correct)
                .withReadableExpected("correct")
                .withReadableActual(actual != null ? actual.toString() : "")
                .withMessage(new EvaluationResult.Message("Hallo"))
                .build();
    }
}
```

:::
::: tab JavaScript

```javascript
function evaluate(actual) {
  const correct = actual === "correct";
  return {
    "result": correct,
    "readable_expected": "correct",
    "readable_actual": actual.toString(),
    "messages": [{ "description": "Hallo", "format": "text" }]
  }
}

exports.evaluate = evaluate;
```

:::
::: tab Kotlin

```kotlin
class Evaluator {
    companion object {
        @JvmStatic
        fun evaluate(actual: Any?): EvaluationResult {
            return EvaluationResult.Builder(
                result = "correct" == actual,
                readableExpected = actual.toString(),
                readableActual = actual?.toString() ?: ""
            )
                .withMessage(EvaluationResult.Message("Hallo"))
                .build()
        }
    }
}
```

:::
::: tab Python

```python
from evaluation_utils import EvaluationResult, Message


def evaluate(actual):
    correct = actual == "correct"
    return EvaluationResult(correct, "correct", actual, [Message("Hallo")])
```

:::
::::

#### `.file`

The path name of the source code relative to the evaluation directory of the exercise.
The source code must at least define the custom evaluator function.

#### `.name`

The name of the custom evaluator function, with a default value of `evaluate`.

### EvaluationResult

The result of an evaluator function.
In most languages, TESTed provides utilities to create a correct return type.
In other languages, you must return an object with the following attributes:

- `result`: the result of the check
    - `.enum`: the actual result (useful statuses include `compilation error`, `correct`, `wrong`, `internal error`).
      Check the Dodona docs for more information on the status.
    - `.human`: an optional human-readable description of the status.
      This allows you to give more information.
- `readable_expected`: a human-readable representation of the expected value
- `readable_actual`: a human-readable representation of the actual value
- `messages`: an optional list of additional messages to display

## Statements and expressions

TESTed supports a restricted language to describe expressions and statements in a generic way.
The language contains literal values (and their data types), variables, assignments, object construction and
function/method calls.

### Assignment

Variable assignment is the only statement that is currently supported by TESTed.
An assignment is represented by an object.

For example, assigning the result of a function call to a variable called `codes01`:

```json
{
 "input": {
  "type": "integer",
  "variable": "codes01",
  "expression": {
   "type": "function",
   "name": "echo",
   "arguments": []
  }
 }
}
```

#### `.variable`

The name of the variable.
Generally, safe characters are ASCII letters and numbers, as well as an underscore.
Other characters may limit in which programming languages the test suite is usable.

::: tip
It is recommended to use `snake_case` for the variable name.
This way, TESTed will transform it into the correct convention for each programming language.
:::

#### `.expression`

The [expression](#expressions) that is assigned to the variable.

#### `.type`

The [data type](#data-types) of the variable.

### Expressions

TESTed currently supports three different kinds of expressions:
[identifiers](#identifier), [function calls](#function-call) and [literal values](#literal-values).

#### Identifier

An identifier is a string that represents a variable.

For example, to use a previously defined variable:

```json
{
 "input": {
  "type": "integer",
  "variable": "codes01",
  "expression": "previously_defined_variable"
 }
}
```

#### Function call

A `FunctionCall` object represents a function call, a method call, a constructor or an object property

For example, calling a top-level function:

```json
{
 "input": {
  "type": "function",
  "name": "echo",
  "arguments": [
   {
    "type": "text",
    "data": "input-1"
   }
  ]
 }
}
```

Calling the method `the_method` on an object instance called `some_object`:

```json
{
 "input": {
  "type": "function",
  "namespace": "some_object",
  "name": "the_method",
  "arguments": [
   {
    "type": "text",
    "data": "input-1"
   }
  ]
 }
}
```

Accessing the property `property` on an object instance called `some_object`:

```json
{
 "input": {
  "type": "property",
  "namespace": "some_object",
  "name": "the_method"
 }
}
```

##### `.type`

Indicates the type of "function call".
TESTed supports three kinds of function calls:

- `function`: a function or method
- `constructor`: an object constructor
- `property`: an object property

The name of the object is given as the `.namespace` attribute.
Not providing a namespace means the global namespace will be used.
For example, not providing a namespace for a property call will use global variables instead.

##### `.namespace`

The object or namespace on which the function, method or property should be called.
Not providing a namespace means the global namespace will be used.
For example, not providing a namespace for a property call will use global variables instead.

##### `.arguments.*`

An array of expressions or `NamedArguments` that are passed as arguments when calling the function, method or
constructor.

The result of any given expression is passed to the function as a positional argument.

A named argument represents an argument that is passed to a specific function parameter, identified by its name, when
calling a function.
While in many programming languages, the order of named arguments is of no consequence, the order does matter in TESTed.
Named arguments are converted to positional arguments for programming language that lack support for named arguments.
Their position is determined by their position in the array of arguments.

A `NamedArguments` object has two attributes:

- `name`: The parameter name.
- `value`: The value of the argument, which must be an [expression](#expressions).

For example, a function call in which the first argument is positional, while the second argument is a named argument:

```json
{
 "input": {
  "type": "function",
  "name": "echo",
  "arguments": [
   {
    "type": "text",
    "data": "input-1"
   },
   {
    "name": "separator",
    "value": {
     "type": "text",
     "data": "-"
    }
   }
  ]
 }
}
```

#### Literal values

Any value that has a [supported data type](#data-types) can be written as a literal.
These are divided into six kinds of literal values, depending on how the value is encoded in JSON.

The six kinds are [numbers](#numbers), [text](#strings),
[booleans](#booleans), [sequences](#sequences), [dictionaries](#dictionaries) and ["nothing"](#nothing).

Each literal value is represented by a JSON object with two properties:

- `type`: the [data type](#data-types) of the value
- `data`: the value, encoded in JSON

##### Numbers

Numbers are encoded as a numeric JSON value, or one of the following special string constants:

- `nan`: special code for "Not a Number" (NaN)
- `inf`: +∞
- `-inf`: -∞

For example, an integer would be:

```json
{
 "type": "integer",
 "value": 10
}
```

Infinity would be represented as:

```json
{
 "type": "integer",
 "value": "inf"
}
```

##### Strings

Strings are encoded as a JSON string.

For example:

```json
{
 "type": "text",
 "value": "Hello World"
}
```

##### Booleans

Booleans are encoded using JSON booleans.

For example:

```json
{
 "type": "boolean",
 "value": true
}
```

##### Sequences

Sequences are encoded as a JSON list.
Each element of the list is again an [expression](#expressions).

For example, a set with one literal element:

```json
{
 "type": "set",
 "value": [
  {
   "type": "boolean",
   "value": true
  }
 ]
}
```

##### Dictionaries

Objects are encoded using a list of key-value pairs.
A key-value pair is an object with two properties:

- `key`: an [expression](#expressions) representing the key
- `value`: an [expression](#expressions) representing the value

We cannot use a JSON object, since some programming languages support objects/maps/dicts where the keys are not just strings.
For example, an object where the key is a list (`[5]`), and the value a boolean (`false`):

```json
{
 "type": "map",
 "value": [
  {
   "key": {
    "type": "list",
    "value": [
     {
      "type": "integer",
      "value": 5
     }
    ]
   },
   "value": {
    "type": "boolean",
    "value": false
   }
  }
 ]
}
```

##### Nothing

Nothing is represented as JSON `null`.

For example:

```json
{
 "type": "nothing",
 "value": null
}
```

### Data types

TESTed supports three different kinds of data types: [basic data types](#basic-types),
[advanced data types](#advanced-types) and [custom types](#custom-types).

A complete list of all supported data types and their mapping to the different programming languages can be found [here](/en/tested/types).

#### Basic types

Basic types represent abstract data types such as integers, not specific implementations thereof like unsigned 8-bit
integers.
They are used as the default data type for a concept in a specific programming language,
but each programming language can have multiple data types that map to the concept represented by a basic type.

See [_Data type support in TESTed_](/en/tested/types#basic-types) for a list of types.

#### Advanced types

Advanced types represent specific implementations of data types, like unsigned 8-bit integers.
Each advanced type corresponds to at most one data type in a programming language,
and some programming languages will not have support for specific implementations.

See [_Data type support in TESTed_](/en/tested/types#advanced-types) for a list of types.

#### Custom types

TESTed has limited support for using custom types.
The "data" of this type will be outputted verbatim in the various programming languages.
A custom value is indicated with the type `"custom"`.

::: danger
As custom types are outputted verbatim, it is difficult to use them while still keeping the test suite
programming-language-independent.
For that reason, we strongly discourage using them.
:::
