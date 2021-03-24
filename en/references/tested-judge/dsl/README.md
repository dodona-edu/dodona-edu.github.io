---
title: TESTed DSL
description: "TESTed DSL testplans"
---

# Documentation TESTed DSL
A DSL-testplan for TESTed is described in the YAML-syntax.
The DSL follows in large lines the structure how Dodona the tests described.
The following codefragment describes the structure of the DSL-testplans.
The use of square brackets indicates a list of objects.

```text
. # With top-level
├ namespace
├ config
│ ├ stdout
│ │ ├ ignoreWhitespace
│ │ ├ caseInsensitive
│ │ ├ tryFloatingPoint
│ │ ├ applyRounding
│ │ └ roundTo
│ └ stderr
│   └ ... # identical to stdout
├ disable_optimizations
└ tabs[]
  ├ config
  │ └ ... # identical to config at top-level
  ├ tab
  └ contexts[]
    ├ config
    │ └ ... # identical to config at top-level
    ├ files[]
    │ ├ name
    │ └ url
    ├ arguments
    ├ stdin
    ├ exception
    ├ exit_code
    ├ stderr
    ├ stdout
    └ testcases[] # Could be removed if the context only exists of one testcase
      │           # and have not contexttestcase
      ├ files[]
      │ └ ... # identical to files of context
      ├ statement
      ├ exception
      ├ return     # either 'return' either 'return-raw'
      ├ return-raw # either 'return' either 'return-raw'
      ├ stderr
      └ stdout
      
[] # Without top-level
└ ... # identical to tabs above
```

In the following paragraphs will we describe the DSL with examples.

## Simple input-output
The first kind of exercises are input-output exercises.
We will describe an example testplan of an exercise that expects one line at standard input and copied that line to standard output.

```yaml
- tab: "Feedback"
  contexts:
  - stdin: "invoertekst-0"
    stdout: "invoertekst-0"
  - stdin: "invoertekst-1"
    stdout: "invoertekst-1"
```

The following figure visualised the previous codefragment at Dodona.
This figure has extra annotations of the form `[0].testcases[0].stdin`, these annotations describes a path to an object in the testplan.
Interpretation: `[0]` the first tab, `contexts[0]` the first context, `stdin` the given input at standard input and `stdout` the expected output at standard output.

![Visualisation Dodona echo exercise](./echo.png)

### Description

#### Objects
`yaml` make use of objects to describe data.
It uses indentation levels to **nested** objects in another.
Objects exists of key-valuepairs, thereby is the **key** a string without whitespace and must be **terminated with a colon**.
The values could be other objects, but also strings, numbers, logical values and lists.

#### Lists
When you use lists in `yaml`, the **first key** of each object in the list must be **prepended** by an **underscore** followed by a **space**.

#### Testplan
The structure of the testplans is a list at the highest level, which contains tab-objects.

#### Tab
The first required key of a tab is `tab`.
This one expects a string that contains the name of the tab, as displayed by Dodona.
The second key of a tab is `contexts`, this one expects a list of all contexts that must be executed.

#### Context
A context is an independent executed test-sequence.
At this moment we only have seen an example of input-output tests.

##### stdin
The keyword `stdin` is used to provide the standard input for a testcase.

##### stdout
The keyword `stdout` is used to specify the expect output at the standard output channel.
For this output, we recommend to use strings.
Numbers and boolean values are also supported, but they will be translated to strings.
We will be referring to these datatypes as textual datatypes.

## Multi-tab and multi-line
We will now extend the testplan with multi-line strings and multiple tabs.
We will use the exercise [Thoughts that count](https://dodona.ugent.be/en/courses/27/activities/1047652305/) for this example.

```yaml
- tab: "Kleiner dan"
  contexts:
  - stdin: |
      100
      53
      <
    stdout: |
      2
      51
      49
- tab: "Groter dan"
  contexts:
  - stdin: "34\n4\n>\n"
    stdout: "2\n2\n32\n"
```

Because of a display problem at Dodona, are the newlines in the description in the following figures replaced by spaces.
<p float="left">
  ![Thoughts that count Smaller](./boeketje_rozen_KleinerDan.png)
  ![Thoughts that count Larger](./boeketje_rozen_GroterDan.png)
</p>

### Description

#### Multi-line
As visible in the testplan from the codefragment, has YAML multiple ways to describe multi-line strings.
A first is the classic escape-string and a second notation uses ‘|’.
The class escape-string gives the most control about whitespace to the user.

::: tip Hint
More information about multi-line in paragraph [Known traps](#known-traps).
:::

#### Multi-tab
As visible in the example, can you also use multiple tabs.

## Commandline-arguments, standarderror and exit code
Now, we will add commandline-arguments, standarderror and exit code to the testplan.
Hereby we will look for a fictive exercises for a simple calculator with integers.

```yaml
- tab: "Sum"
  contexts:
  - arguments: [ "-a", "5", "20" ]
    stdout: "25"
  - arguments: [ "-a", "alpha", "beta" ]
    stderr: "'alpha' and 'beta' aren't integers"
    exit_code: 1
- tab: "Difference"
  contexts:
  - arguments: [ "-s", "5", "20" ]
    stdout: "-15"
  - arguments: [ "-s", "5", "20" ]
    stdin: "Random input"
    stderr: "There is no input expected at standard input"
    exit_code: 1
- tab: "Multiplication"
  contexts:
  - arguments: [ "-m", "25", "5" ]
    stdout: "125"
- tab: "Division"
  contexts:
  - arguments: [ "-d", "25", "5" ]
    stdout: "5"
  - arguments: [ "-d", "25", "0" ]
    stderr: "Integer division by zero"
    exit_code: 2
```

### Description

#### arguments
The arguments are a list of commandline-arguments that must be passed to the program for the testcase.

::: tip Hint
We advise using strings for these arguments, however the textual types are also supported.
:::

#### stderr
This keyword defines the expected output for the testcase.  
This is analogous to `stderr`.

#### exit_code
Hereby must you give the expected exit code of the program for the testcase.
This must be an integer.

## Configuration options
The next step is adding configuration options for standard output and standarderror.
We will use the exercise [How smart are you?](https://dodona.ugent.be/en/courses/392/series/3920/activities/726249058/).

```yaml
namespace: "solution"
disable_optimizations: true
tabs:
- tab: "Hoe slim ben jij?"
  config:
    stdout:
      ignoreWhitespace: true
      tryFloatingPoint: true
  contexts:
  - stdin: "8809"
    stdout: "6"
  - config:
      stdout:
        caseInsensitive: false
    stdin: 7111
    stdout: 0
  - stdin: "2172"
    stdout:
      data: "0"
      config:
        applyRounding: true
        roundTo: 10
```

### Description

#### namespace
Default will TESTed use `submission` as namespace for an exercise.
For Java this must also be the name of the class.
When you, as teacher, expect that students must write a class, you would like to define the namespace yourself.
So you can set the namespace for this purpose.
When you set the namespace, you best use `snake_case` so that foreach programming language the correct conventions.

#### disable_optimizations
TESTed will use some default optimization techniques to optimize the execution time.
However, these optimization techniques could cause the optimized code to lead to unwanted results.
Therefore can the user disable these optimizations for the entire testplan, must this be necessary.

#### tabs
When jou wanted to give `namespace`, `disable_optimizations` or global configuration, you must use the keyword `tabs` the pass the list of tabs.

#### Textual types
The second testcase in the testplan for __How smart are you?__, illustrate that not only strings could be used for standard input, output or error.
In this case it where integers, but also logical values and rational numbers are supported.

::: warning Remark
To avoid problems, we recommended to use strings for standard input, output and error.
This is caused by the fact that the textual types will be converted to strings.
For more information about the translation of textual types, see paragraph [Known traps](#known-traps).
:::

#### Configuration
There are multiple configuration options to pass to the evaluator for standard output and error.
These options are:

- **ignoreWhitespace**:
  Ignore whitespace in prefix and suffix of the text by comparing the output.
- **caseInsensitive**:
  Compare the output case insensitive.
  So without making a distinction between uppercase and lowercase letters.
- **tryFloatingPoint**:
  Try to compare the output as floats.
- **applyRounding**:
  Apply rounding when comparing the output as floats.
- **roundTo**:
  The number of decimals after the point, that you want to keep after rounding.
  This is mandatory when you want to apply rounding.
  
You can pass the configuration options at the global level, foreach tab, context and/or specific for each output.
The configuration options must be accumulated, the option at to must specific level will be kept.

- **Global**:
  Globally the options must be passed foreach output stream, in the object by the optional key `config`.
  This object has two keys `stdout` (options for standard output) and `stderr` (options for standarderror), whereby at least on key must be passed.
- **Tab**:
  Identical to __global__.
- **Context**:
  Identical to __global__.
- **Specific**:
  When you only want to pass a configuration for one test, you must pass an object instead of the value for that channel.
  An example of this is given in testcase 3 of the codefragment.
  This object has two mandatory keys:
  - **data**:
    The expected value, to compare with.
  - **config**:
    The object with the configuration params.

## Simple function calls
Now we will examine a testplan for simple function calls.
The testplan that we will examine is for the exercise [Rail fence cipher](https://dodona.ugent.be/en/courses/392/series/3922/activities/444829407/).

```yaml
- tab: "Encode"
  contexts:
  - expression: 'encode("And now for something completely different.", 4)'
    return: "Awsimlf.no  ohnopeyfetdnfrmtgclt irn oe ede"
  - expression: 'encode("Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", 1)'
    return-raw: '"Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present."'
- tab: "Decode"
  contexts:
  - expression: 'decode("Awsimlf.no  ohnopeyfetdnfrmtgclt irn oe ede", 4)'
    return: "And now for something completely different."
  - expression: 'decode("Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", 1)'
    return: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present."
```

![Rail fence cipher Encode](./spoorhekcodering_encode.png)
![Rail fence cipher Decode](./spoorhekcodering_decode.png)

### Description

#### Expression
By function call tests is the input a statement or expresssion (both can use one of the following keywords: `expression` or `statement`) in a testcase for a context.

::: tip Hint
Statements and expressions are discussed in detail in paragraph [Statements, expressions and return-raw](#statements-expressions-and-return-raw).
:::

#### Return values
There are two ways to pass the expected return value of the expression in the DSL.
Either you use the `return` or you use` return-raw`.

- **return**:
  The expected value of the expression is noted using YAML objects.
  The YAML data types will be translated to the basic data types of TESTed.
- **return-raw**:
  The expected value of the expression is noted using the same grammar as for statements and expressions (see section [Statements, expressions and return-raw](#statements-expressions-and-return-raw)).

::: warning Remark
When you want to test a function that has no return value (not the value `null`, `void` in Java by example),
you may not specify `return` or` return-raw`.
:::
  
## Variable assignments
We will now look at a test plan where we also assign values to a variable.
For this we use the example exercise [Objects](https://github.com/dodona-edu/universal-judge/tree/master/exercise/objects) from TESTed.

```yaml
namespace: "equal_checker"
tabs:
- tab: "Feedback"
  contexts:
  - testcases:
    - statement: 'instance = new EqualChecker(5)'
    - expression: 'instance.check(25)'
      return: false
    - expression: 'instance.check(5)'
      return: true
```

![Objects](./equal_checker.png)

### Description
In a context can we define multiple testcase, that can depends on another.
In this example we first create an object, after which we will call functions on these objects.

This is the most important reason to make a difference between contexts and testcases.
The contexts could be executed independent, while testcase in a context could be dependent.

#### Testcases
To use multiple testcases in a context, you must use the keyword `testcases`.
This is a list of sequential dependent testcases.

If you want to evaluate one/more function call test(s) in addition to the code itself (or `main` method), you must also use the list of testcases.

## Fault messages
A concept often used in programming languages are errors that can be thrown up.
Our testplans can expect error messages, not to be confused with error types (which are programming language dependent).
For this we are looking at a testplan for the "division" function.

```yaml
- tab: "Division"
  contexts:
  - statement: 'division(9, 0)'
    exception: "Division by zero"
```

### Description

#### exception
This keyword expects the expected fault message (as textual type) for a testcase.

## File linking
In some programming exercises are the students expected to read input from files.
In the evaluation feedback you often want to allow the student to see the content of these files.
Hereby can you add list of files that must be linked at the context and/or testcase level.

```yaml
- tab: "Count"
  contexts:
  - statement: 'count_valid_passports("passports01.txt")'
    return: 2
    files:
    - name: "passports01.txt"
      url: "media/workdir/passports01.txt"
```

![File linking](./link_files.png)

### Description

#### files
At the level of a context and/or testcase you could be a list of the files to be linked.

#### name
Name of the file.

#### url
The relative path to the file that is located in the description folder of the exercise.

## Hidden tabs
Dodona support to hide tabs.
However, it is visible when this tab contains errors.
For this you can give the option `hidden` to a tab that expects a Boolean value.

```yaml
- tab: "Hidden"
  hidden: true
  contexts:
  - stdin: "zero"
    stdout: "0\n"
- tab: "Visible"
  hidden: false
  contexts:
  - stdin: "one"
    stdout: "1\n"
```

![Fault in hidden tab](./hidden.png)

## Combination of function calls and input-output
We have already seen testplans for either input-output or function calls.
We will now combine these concepts in one testplan.
We will use a basic calculator example for this testplan.
YAML also support comments.
The line is preceded by a pound sign (#).

```yaml
# Testing sum of two numbers
- tab: "Sum"
  contexts:
  - arguments: [ "-a", "5", "20" ]
    stdout: "25"
    testcases:
    - statement: 'add(4, 16)'
      return: 20
# Testing difference of two numbers
- tab: "Difference"
  contexts:
  - arguments: [ "-s", "5", "20" ]
    stdout: "-15"
    testcases:
    - statement: 'sub(4, 16)'
      return: -12
# Testing multiplication of two numbers
- tab: "Multiplication"
  contexts:
  - arguments: [ "-m", "25", "5" ]
    stdout: "125"
    testcases:
    - statement: 'mul(4, 16)'
      return: 64
# Testing division of two numbers
- tab: "Division"
  contexts:
  - arguments: [ "-d", "25", "5" ]
    stdout: "5"
    testcases:
    - statement: 'div(32, 8)'
      return: 4
  - arguments: [ "-d", "25", "0" ]
    stderr: "Integer division by zero"
    exit_code: 1
    testcases:
    - statement: 'div(1, 0)'
      exception: "Integer division by zero"
```

## Statements, expressions and return-raw
In this section we will describe the grammar of the statements, expressions and return values.

### Namings
Constructor, function, and variable names can only consist of lowercase and uppercase letters of the alphabet (without accents), numbers and a hyphen, and cannot begin with a number.

### Datatypes
Our grammar offers support for all data types from tested, see table below.

| datatype | Description |
| -------- | ------ |
| nothing  | Datatype null values |
| boolean  | Datatype boolean values |
| text     | Default datatype text |
| char     | Datatype single character |
| integer  | Default datatype integers  |
| uint8    | Datatype 8 bit natural numbers |
| int8     | Datatype 8 bit integers |
| uint16   | Datatype 16 bit natural numbers |
| int16    | Datatype 16 bit integers |
| uint32   | Datatype 32 bit natural numbers |
| int32    | Datatype 32 bit integers |
| uint64   | Datatype 64 bit natural numbers |
| int64    | Datatype 64 bit integers |
| bigint   | Datatype larger integers (>64 bit) |
| rational | Default datatype rational numbers |
| single   | Datatype 32-bit floating point numbers |
| double   | Datatype 64-bit floating point numbers |
| extended | Datatype high precision floating points numbers |
| fixed    | Datatype rational numbers fixed precision |
| sequence | Default datatype sequences |
| list     | Datatype lists (sequence, dynamic length) |
| array    | Datatype arrays (sequence, fixed length) |
| tuple    | Datatype tuples |
| set      | Datatype sets |
| map      | Datatype dictionaires |

### Values
The grammar supports numbers, booleans, null-values and strings.

#### Numbers
Both integers and rational numbers are supported.
Integers always use a decimal format (ex: `2020`,` + 5`, `−2`).
Rational numbers can use either decimal (ex: `2.5`) or exponential (ex:` 27.15e2`, `−2e − 2`) format.

#### Booleans
The two boolean values are `true` and `false`.

#### Null-values
`null` and `undefined` represent both null-values.

#### Strings
Text or strings must be noted between double quotes, where the special characters are escaped using a backslash.
In the table below is there an overview of these special characters.

| Description | Escape sequence |
| ------------ | ---------------- |
| Backslash | `\\` |
| Single quote | `\'` |
| Double quote | `\"` |
| ASCII Bell | `\a` |
| ASCII Backspace | `\b` |
| ASCII Formfeed | `\f` |
| ASCII Linefeed | `\n` |
| ASCII Carriage Return | `\r` |
| ASCII Horizontal tab | `\t` |
| ASCII Vertical tab | `\v` |
| Octal character value | `\ooo` |
| Hexadecimal character value | `\xhh` |
| 16-bit unicode character value | `\uhhhh` |
| 32-bit unicode character value | `\Uhhhhhhhh` |
| Named unicode character | `\N{name}` |

#### Collections
There are multiple data collections in TESTed: sequence, sets, tuples and dictionaires.
When you use collections in expressions and statements can the values in these collection contain both values and expressions.
For the **return values** can these collections only contains values and **no expressions**.
In addition, the values in these collections can be heterogeneous (different data types).

##### Sequences
An ordered dynamic collection of values.
These are denoted with help of squared brackets and could be empty.
Some examples:
```javascript
[5, 7, 8]
[5, 7.5, true, "text", null]
[random()]
[]
```

##### Tuples
An ordered fixed collection of values.
These are denoted with help of round brackets and could be empty.
Some examples:
```javascript
(5, 7, 8)
(5, 7.5, [true, "text"], null)
(random())
()
```

##### Sets
An unordered dynamic collection of unique invariable values.
These are denoted with help of accolades.
Empty sets must be notated in a specific way because the dictionaries als use curly brackets for notation.
Some examples:
```javascript
{5, 7, 8}
{5, 7.5, (true, "text")}
{random()}
```

::: warning Remark
Not every programming language support each datatype as set element.
::::

##### Dictionaries
An unordered dynamic collection of key-value pairs.
Hereby must the keys be invariable, the values could be both invariable and variable.
Like the sets are dictionaries denoted with curly brackets, but dictionaries could be empty.
Both the keys and values can be of any datatype.
Some examples:
```javascript
{}
{"first": 5}
{"size": 5, "precision": 0.75, "rounding active": true}
{0: random(), get_id(): get_username()}
```

::: warning Remark
Not every programming language support each datatype as key.
:::

#### Cast
Our grammar supports the ability to "cast" the values (not expressions) to a specific data type.
Casting is denoted with `<Value> :: <Datatype>`.
An empty set by examples kan be denoted with one of the following notations:
```haskell
[] :: set
() :: set
{} :: set
```

### Functions
The arguments of a function call are notated within round brackets.
A function call can be both be a global function, or an object function.
Some examples:
```javascript
add(5, 2)
object.get_name()
get_element(4, ["first", 2, 3.4])
```

### Constructor
Constructors are very similar to function calls, except that they are preceded with the keyword `new`.
Some examples:
```javascript
new Counter()
new object.Pair("Pair", 8.4e-5)
```

### Expression
By expressions we mean values, function calls, constructors and variables (and properties).

### Variable assignments
If we want to use variables, we want to assign values to these variables.
For constructors and values can the datatype be derived and must not be specified.
For function calls, however, the data type must be specified explicitly.
Some examples:
```javascript
Counter counter = new Counter()
pair = new object.Pair("Paar", 8.4e-5)
text value = get_value(0, pair)
number = 5 :: int8
```

## Known traps

### Keys
Forgetting a colon after the keynames in the YAML-syntax.
Example:

Fault:
```yaml
- tab "Feedback"
```

Corrected:
```yaml
- tab: "Feedback"
```

### Lists
Forgetting hyphen and space by list elements.
Or using it to much, which leads to much more elements than expected.
Example:

Fault:
```yaml
- tab: "Feedback"
- contexts:
  - stdin: "input-0"
    stdout: "output-0"
    stdin: "input-1"
    stdout: "output-1"
```

Corrected:
```yaml
- tab: "Feedback"
  contexts:
  - stdin: "input-0"
    stdout: "output-0"
  - stdin: "input-1"
    stdout: "output-1"
```

### Text
There are multiple ways to denote strings in YAML.
The different notations have different ways to handle whitespace.
::: tip Hint
To avoid confusion we recommend using the double quotes' notation when you want to pass textual values.
Whereby you can escape special characters, for example newlines.
When you want to specify statements, expressions and raw return-values, we recommend to use single quotes, because it doesn't escape special characters.
:::
Below you find an overview of all YAML strings notations, if you want to use another.

#### Single quotes
By the single quotes, no character will be escaped.
Except for the single quote itself, that must be escaped by repeating the symbol.
Example YAML:
```yaml
single: 'data''\ndata'
```

Translation JSON:
```json
{"single": "data'\\ndata"}
```

#### Double quotes
By the double quotes, characters will be escaped.
Example YAML:
```yaml
double: "data\ndata"
```

Translate JSON:
```json
{"double": "data\ndata"}
```

#### Unquoted
When you use unqouted strings, no character will be escaped.
Example YAML:
```yaml
unquoted: data \ data
```

Translation JSON:
```json
{"unquoted": "data \\ data"}
```

#### Multi-line unquoted
By multi-line unquoted string, will a single newline character be replaced with a space and will the whitespace around a line be trimmed.
A complet empty line by replaced with a newline character.
Example YAML:
```yaml
multi unquoted:
  line1
    line2
  line3

  line4


  line5
```

Translation JSON:
```json
{"multi unquoted": "line1 line2 line3\nline4\n\nline5"}
```

#### Multi-line single quotes
This is very similar to the multi-line unquoted strings.
Example YAML:
```yaml
multi single quoted: 'line1''\nline1a
    line2
  line3

  line4


  line5'
```

Translation JSON:
```json
{"multi single quoted": "line1'\\nline1a line2 line3\nline4\n\nline5"}
```

#### Multi-line double quotes
This is very similar to multi-line unquoted strings, but special characters must be escaped.
Example YAML:
```yaml
multi double quoted: "line1\nline1a
    line2
  line3

  line4


  line5"
```

Translation JSON:
```json
{"multi double quoted": "line1\nline1a line2 line3\nline4\n\nline5"}
```

#### literal block
YAML support multiple bloknotations, whereby newlines are kept.
Hereby will the indentation, that deviates from the alignment not be trimmed away.
There will be also no escaping.

##### Default (`|`)
Removes each empty line at the end of the string, but keeps one newline character at the end.
Example YAML:
```yaml
literal: |
  line1a\nline1b
    line2
  # not a comment
  end

# end of statement
```

Translation JSON:
```json
{"literal": "line1a\\nline1b\n  line2\n# not a comment\nend\n"}
```

##### Keep (`|+`)
Keeps all newlines at the end of the string.
Example YAML:
```yaml
literal: |+
  line1a\nline1b
    line2
  # not a comment
  end

# end of statement
```

Translation JSON:
```json
{"literal": "line1a\\nline1b\n  line2\n# not a comment\nend\n\n"}
```

##### Trim (`|-`)
Hereby will each newline at the end be removed and there will be no newline at the end of the string.
Example YAML:
```yaml
literal: |-
  line1a\nline1b
    line2
  # not a comment
  end

# end of statement
```

Translation JSON:
```json
{"literal": "line1a\\nline1b\n  line2\n# not a comment\nend"}
```

#### Folded block
YAML also support multiple block notations whereby newline are replaced by a space, when te next line the alignment respects.
Each empty line will be interpreted as a newline.
Also will an alignment, that deviates not be trimmed away.
There will also be no escaping.

##### Default (`>`)
Removes each empty line at the end of the string, but keeps one newline character at the end.
Example YAML:
```yaml
literal: >
  line1a
  line1b
    line2

  line3

# end of statement
```

Translation JSON:
```json
{"literal": "line1a line1b\n  line2\n\nline3\n"}
```

##### Keep (`>+`)
Keeps all newlines at the end of the string.
Example YAML:
```yaml
literal: >+
  line1a
  line1b
    line2

  line3

# end of statement
```

Translation JSON:
```json
{"literal": "line1a line1b\n  line2\n\nline3\n\n"}
```

##### Trim (`>-`)
Removes each empty line at the end of the string and there will be no newline character at the end.
Example YAML:
```yaml
literal: >-
  line1a
  line1b
    line2

  line3

# end of statement
```

Translation JSON:
```json
{"literal": "line1a line1b\n  line2\n\nline3"}
```

### 'yes' and 'no'
`yes` and `no` are an extra notation for the booleans `true` and `false`.

### Translation to textual types
If no strings are used for `stdin`,` stdout` and `stderr`, but numbers and boolean values, the final textual data may deviate from what you intended.
Example:
```yaml
stdin: 077
```

Will be interpreted as an octal number: `7 ⋅ 8 + 7 = 63`.
```yaml
stdin: "63"
```

### Function name
De style convention for function names in the DSL is `snake_case`.
When you deviate from this convention, it can't be guaranteed that the correct style convention for a specific programming languages could be followed.

## Convert
To translate DSL-testplans to JSON-testplans for TESTed, a Python script can be used, which is part of TESTed.
This script could be found on the [GitHub repository](https://github.com/dodona-edu/universal-judge) of TESTed.
The script could be execute with one of the following commands (and combinations) in the root directory of the GitHub repository:
```bash
# Standard input - standard output
$ python3 -m tested.translate_dsl < testplan.yaml > testplan.json
# Short options
$ python3 -m tested.translate_dsl -i testplan.yaml -o testplan.json
# Long option names
$ python3 -m tested.translate_dsl --dsl testplan.yaml --json testplan.json
# Positional arguments
$ python3 -m tested.translate_dsl testplan.yaml testplan.json
```





