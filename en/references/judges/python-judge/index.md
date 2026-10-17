---
title: Python judge
description: "Python judge"
order: 5
---

# Python judge

::: danger Deprecated
We do not recommend creating new exercises for this judge.
This judge is no longer actively developed.

Use [TESTed](/en/guides/exercises/) to create new Python exercises instead.
:::

The Python judge can evaluate a submission in two ways:

-   The [**output judge**](#output-judge) runs the submitted code with the input you provide on `stdin` and compares what it writes to `stdout` with the expected output. It is suitable for exercises that ask for input via `input()` and print the results via `print()`.
-   The [**doctest judge**](#doctest-judge) runs a series of tests on the submitted code, described in an extended version of the format of Python's `doctest` module. It is suitable for testing Python **functions** and classes.

You must let the Python judge know which of these two options you want to use by setting this in the [`config.json`](/en/references/exercise-config/) file of your exercise. Under `evaluation`, add the field `pythia_judge` with the value `output` or `doctest`, depending on the type of exercise you are creating.

The tests of an exercise are in its `evaluation` directory, as pairs of files with the same number: `0.in` and `0.out`, `1.in` and `1.out`, and so on. Each pair becomes a tab in the feedback.

::: tip Examples
Take a look at the [example exercises repository](https://github.com/dodona-edu/example-exercises) and [example course](https://dodona.be/en/courses/358/) to find an example of how to use these judges.
:::

## General settings

The following settings can be used for both the output judge and the doctest judge. Settings specific to a judge will be discussed separately in [Output judge](#output-judge) and [Doctest judge](#doctest-judge).

- **`time limit`**:   The time limit for the tests of this file, as a natural number in seconds. By default, the judge divides the time limit of the exercise over its test files.

- **`continue upon wrong answer`**:   Boolean indicating whether to continue running tests when a wrong answer is generated. Default `true`.

- **`continue upon failure`**:   Boolean indicating whether to continue running tests when a runtime error occurs. Default `true`.

- **`tab name`**:   String indicating the name of the tab in the feedback. Tab names are also exposed to translations performed by the judge, but all types of names are translated separately, meaning names of functions, methods, classes, and keyword arguments are detected as tokens.

- **`show expected output`**:   Boolean indicating whether the feedback shows the expected output next to the generated output. Default `true`.

You can change these default settings at the bottom of a `.out` file, preceded by a line consisting of (at least 3) hyphens. For example:

    ----------------------------------------
    tab name: Echo
    continue upon wrong answer: false
    continue upon failure: false

## Output judge

The normal operation of the judge consists of a number of steps per uploaded test case:

- Parsing the input and expected output into coherent blocks.
- For each block, output is generated based on the submitted code and the input from the block.
- The expected and generated output per block are compared with each other.

If errors (or runtime errors/time limit exceeded) are encountered, the judge stops there and returns feedback (in the form of a table with indicated differences between expected and generated output). If, on the other hand, all blocks were correct, the generated output is also checked against the expected output for the full input, and feedback is then returned about this last comparison.

The default operation of the judge can be changed using a number of parameters. These must be added at the bottom of the file with expected output after a single line consisting only of hyphens (at least 3).

### Parameters to adjust the judge's operation

- **`python input without prompt`**:   Boolean indicating whether the prompt of the built-in function `input` should be written to standard output or not. Default `false` (meaning the prompt **is** written to standard output).

- **`block count`**:   String indicating how many blocks of input the judge can expect.

  - **`one`** (default): The input is considered as one block.
  - **`multi`**: The input consists of a number of blocks one after the other (meaning for certain questions only 1 test case with multiple test inputs is needed).
  - **`first line`**: The first line of the input indicates the number of blocks.
  - **`ends with <string>`**: The input is terminated with a line equal to `<string>`. So if `ends with STOP` is set, the input must be terminated with a line containing only `STOP`.

- **`input block size`**:   String indicating what each block from the input looks like.

  - **`first line`** (default): The first line of the block indicates how many lines come after it in the block; this first line is also part of the input that must be processed by the submitted code.
  - **`ends with <string>`**: Each block is terminated with a line equal to `<string>`. If no string is specified, an empty line is considered a terminator/separator. If the last block ends with `<string>`, the `<string>` is considered a terminator and is part of the actual input to be processed by the submitted code. In case the last block does not end with `<string>`, `<string>` is considered a separator and is not part of the input to be processed by the submitted code.
  - **`<integer>`**: Each block consists of `<integer>` lines.

- **`output block size`**:   String indicating what each block of the expected output looks like. It takes the same values as `input block size`, plus one more:

  - **`first line`** (default), **`ends with <string>`** and **`<integer>`**: as for `input block size`.
  - **`input block size`**: Each block of expected output has as many lines as the corresponding block of input.

- **`blockwise execution`**:   Boolean indicating whether the output should be compared block by block or not.
    This is default `true` and then output is generated per block and compared with the expected output. If set to `false`, only the global generated and expected output will be compared.

### Parameters to change the comparison method

- **`comparison`**:   String indicating how the generated and expected output should be compared.

  - **`exact match`**: The two outputs must be exactly the same.
  - **`ignore extra whitespace`** (default): The expected and generated output must be the same, but consecutive whitespace characters are reduced to a single whitespace character.
  - **`ignore whitespace`**: The expected and generated output must be the same but whitespace is ignored for the comparison.

- **`ignore fp rounding`**:   An integer $e$ that determines how floating point numbers are compared. With this setting, the numbers $n$ and $m$ are equal if $|n-m| < 10^e$; in other words, with `ignore fp rounding: -2`, the two numbers must be equal up to two digits after the decimal point. Without this setting, numbers are compared character by character, like the rest of the output.

- **`case sensitive`**:   Boolean indicating whether the difference between uppercase and lowercase letters should be taken into account when comparing the generated and expected output. Default `true`.

- **`field order sensitive`**:   Boolean indicating whether the order of fields on a line should be taken into account when comparing the generated and expected output. Fields are separated by whitespace. Default `true`.

- **`line order sensitive`**:   Boolean indicating whether the order of lines should be taken into account when comparing the generated and expected output. Default `true`.

### Defining a custom evaluation function

In the file with expected output, there is also the possibility to define a custom function that evaluates whether the solution is correct or incorrect. Put it in a `<DEFINITION>` tag after the line of hyphens, with the `def` line of the function as the first line of the tag. The function receives the expected and generated output as lists of lines, and returns `True` or `False` depending on the correctness. It can also return a pair: the verdict and a list of messages to show to the student. When there is a custom evaluation function, the comparison settings above are not used.

In the following example, a different allowed floating point margin is used per line:

    2.04e+13
    136.365577302
    68.1827886512
    ---------
    <DEFINITION>
    def customEvaluate(expected_output, generated_output):
        if len(generated_output) != 3:
             return False
        ignore_rounding = [9, -2, -2]
        for i, rounding in zip([0, 1, 2], ignore_rounding):
            if abs(float(expected_output[i].strip('\n')) - float(generated_output[i])) > 10 ** rounding:
                return False
        return True
    </DEFINITION>

#### Example 1

In the exercise [Zodiac](https://dodona.be/nl/exercises/1178427390/), the submitted code prints the correct zodiac sign (on 1 line) for a date (on 2 lines). We use `block count: multi` to define multiple tests in one file.

Input file (`0.in`):

    1
    january
    12
    november
    23
    april
    25
    december

Output file (`0.out`):

    Steenbok
    Schorpioen
    Stier
    Steenbok
    ---------------------------------------------------------
    python input without prompt: true
    block count: multi
    input block size: 2
    output block size: 1
    blockwise execution: true
    continue upon wrong answer: false

#### Example 2

In the exercise [Divisors](https://dodona.be/nl/exercises/1581119193/), all divisors must be printed for a given number. Again, `block count: multi` can be used here. This time the expected output is terminated by an empty line (`output block size: ends with`).

Input file (`0.in`):

    298
    299

Output file (`0.out`):

    1
    2
    149
    298

    1
    13
    23
    299

    ---------------------------------------------
    python input without prompt: true
    block count: multi
    input block size: 1
    output block size: ends with
    blockwise execution: true
    continue upon wrong answer: false

## Doctest judge

The doctest judge uses doctests to check students' solutions. Each `.in` file holds a doctest, and the matching `.out` file only holds the settings (after the line of hyphens) and the translations (see [Doctests in multiple languages](#doctests-in-multiple-languages)).

### Parameters

- **`used output channel`**:   Sets the output channel for the entire doctest. See [Output channels](#output-channels) for the explanation regarding output channels. By default, all doctests use `return` as the sole output channel. Possible values are `stdout`, `return` and `stdout return`. With `stdout return`, the first line of the expected output is the return value and the other lines are the printed output.

- **`independent examples`**:   Boolean indicating whether all doctests should be considered dependent or independent of each other. (See [Execution context](#execution-context) for more info on execution contexts for Dodona's debugger.) Default is `true`, meaning each statement forms its own execution context. If `false`, statements are bundled to form an execution context.

### Output channels

The output of an execution is split into channels (standard output and return values). This differs from the standard doctest behavior.

By default, the doctest judge will only compare return values. This can be changed with the `used output channel` parameter mentioned in [Parameters](#parameters) and option flags (`STDOUT` and `RETURN`) for individual tests. See the following example:

``` python
>>> def my_return(value):
...     return value
...
>>> def my_print(value):
...     print(value)
...
>>> def my_combination(value):
...     print(value)
...     return value
...
>>> def my_multiline(value):
...     return '{0}\n{0}\n{0}'.format(value)
...
>>> # The standard behavior expects a return value
>>> my_return(5)
5
>>> # The following will be evaluated as incorrect
>>> # The value is printed, not returned
>>> my_print(5)
5
>>> # If we want the student to print in their function, we add the 'STDOUT' option flag
>>> # The following is correct:
>>> my_print(5) #doctest: +STDOUT
5
>>> # If we add the 'STDOUT' option flag, it will be checked that None is returned.
>>> # If we want both the prints and the return value, we explicitly add both flags.
>>> # The first line of the expected output is then the return value,
>>> # and the other lines are the printed output:
>>> my_print(5) #doctest: +STDOUT, +RETURN
None
5
>>> my_combination(5) #doctest: +STDOUT, +RETURN
5
5
>>> # With only the 'RETURN' flag, the full expected output is the return value,
>>> # and the feedback shows the expected and generated value over multiple lines
>>> my_multiline(5) #doctest: +RETURN
5
5
5
>>>
>>> # Tracebacks are simply placed in the expected output. Indented lines are ignored
>>> # just like the output channels.
>>> 1/0
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  These lines are completely ignored
  They don't even appear in the feedback.
ZeroDivisionError: division by zero
```

There is one special option flag (`REPR`) that is used when the representation of a custom object is used. This is only the case when this representation has been overwritten. When the flag is activated, the (representation of the object) of the return value will be compared with the expected output. Note that this is only useful (and will work) when the `__repr__(self)` method is overwritten. Otherwise, the address of the object will be included in the representation (which will differ for each execution).

``` python
>>> class MyObject(object):
...     def __repr__(self):
...         return 'I present to you:\nthe representation of myself'
...
>>> MyObject() #doctest: +REPR
I present to you:
the representation of myself
```

The `REPR` flag cannot be combined with other flags (the flag overrides all other flags).

### Comparison of output

The main reason for splitting the different outputs is to allow them to be compared in a different way. Return values are compared by type and content. Standard output (and thus also tracebacks) are checked by comparing strings. The comparison method can be changed with the `OUTPUTPROCESSOR` option tag. The expected type for the return values is derived from the type of the return value. Only if these types match will the content be compared. The comparison of the content can now be done type-specifically.

To customize the comparison of the output, the `OUTPUTPROCESSOR` tag is used. This allows creating a custom processor. For example, for floats 2 decimals are compared by default, but this can be adjusted to the following:

``` python
>>> 0.001 # default precision is 2, so correct
0.002
>>> 0.001 # precision is set to 5, so incorrect
<OUTPUTPROCESSOR>
OutputProcessor(expected_type=float, precision=5)
</OUTPUTPROCESSOR>
0.002
```

Note that all output processors can be made *sticky*. It would be annoying if there were 20 tests, each with precision 6, and the processor had to be defined again for each test case. This works as follows:

``` python
>>> 0.001 # default precision is 2
0.002
>>> 0.001 # set precision to 6 and keep it that way, so this will fail
<OUTPUTPROCESSOR sticky="sticky">
OutputProcessor(expected_type=float, precision=6)
</OUTPUTPROCESSOR>
0.002
>>> 0.003 # this will still fail
0.004
>>> 0.005 #doctest: +CLEARSTICKY
0.006
>>> # The test above succeeded: +CLEARSTICKY cleared the sticky processor
>>> 0.007 # and so does this one
0.008
```

Defining a *sticky* output processor adds it to the list of stickies. Every following test is then also checked by the sticky processors, besides any processor it defines itself. The `CLEARSTICKY` flag clears the list of *stickies*, starting with the test that has the flag.

`OutputProcessor` takes these parameters:

- **`expected_type`**:   The type the return value must have, such as `float`, `[int]` (a list of integers), `(int, str)` (a tuple of an integer and a string), `{str: int}` (a dictionary) or `{float}` (a set). By default, the type is derived from the expected return value.
- **`expected_types`**:   A list of types the return value may have.
- **`precision`**:   The number of decimals to which floating point numbers are compared. Default `2`.

Two more standard processors are available for specific cases:

- **`FileContentChecker`**:   Checks whether the submission wrote a file with the expected content. The first argument is the name of the file the submission must write. The expected content comes from a `FILE` tag with `src="memory"` and the same name, or else from the file given by the `expectedFileName` parameter (by default a file with the same name).

  -   `ignoreTrailingNewlines`: Boolean indicating whether extra newlines at the end of the generated (and expected) file should be ignored. Default `true`.

- **`ImageRenderer`**:   Checks that the return value is a matrix of pixels and shows it as an image in the feedback. A matrix is a list of rows: integers from 0 to 255 or floats from 0 to 1 for a grayscale image, or lists of three such numbers for a colour image.

### Defining output processors

To define your own output processor, use the `DEFINITION` tag. This tag allows defining anything within the scope of the doctest.

```python
>>> my_new_function() #doctest: +STDOUT
<DEFINITION>
def my_new_function():
    print('hello world')
</DEFINITION>
hello world
```

This example would of course be confusing for students, as they cannot see the definitions, but they can see the test itself. The tag is mostly used to define new output processors: a subclass of `OutputProcessor` that overrides one or more of these methods. Each method returns whether the output is correct.

-   **`checkReturnValue(self, expected, generated, **kwargs)`**: compares the return value, after its type has been checked.
-   **`checkStdout(self, expected, generated, **kwargs)`**: compares the standard output (as strings).
-   **`checkReturnType(self, generated, expected_types=None, **kwargs)`**: checks the type of the return value.

Within these methods, you can use:

-   **`self.addMessage(message)`**: shows a message to the student in this test.
-   **`self.executeStatement(channels=['return'], expected_type=...)`**: runs the statement of the test again and returns the requested output, for example to check a function that returns a random value.
-   **`self.setExpectedOutput(channel='return', output=...)`** and **`self.setGeneratedOutput(channel='return', output=...)`**: change the expected or generated output shown in the feedback. The channel is `return`, `stdout` or `stderr`.
-   **`self.getTranslator()`**: the translator of the exercise, whose `translate(text)` translates a text to the language of the student.

The example below makes the standard processor friendlier. It calls the method it overrides to do the actual comparison, and adds a message to the result:

```python
>>> 'hello'
<DEFINITION>
class FriendlyProcessor(OutputProcessor):

    def checkReturnValue(self, expected, generated, **kwargs):
        correct = super().checkReturnValue(expected, generated, **kwargs)
        if correct:
            self.addMessage('You return it just the way I like it!')
        else:
            self.addMessage('Nice try, but that is not the right return value.')
        return correct
</DEFINITION>
<OUTPUTPROCESSOR>
FriendlyProcessor()
</OUTPUTPROCESSOR>
'hello'
```

The next example checks a function `roll_die()` that returns a random number of eyes. The expected value `4` is only shown as an example: the processor runs the statement again until every number from 1 to 6 has come up.

```python
>>> roll_die()
<DEFINITION>
class DieChecker(OutputProcessor):

    def checkReturnValue(self, expected, generated, **kwargs):
        # the first roll must be a valid number of eyes
        if generated not in range(1, 7):
            self.addMessage('Error: a die only has the numbers 1 to 6')
            return False
        # roll again until every number has come up (at most 1000 times)
        seen = {generated}
        for _ in range(1000):
            generated = self.executeStatement(channels=['return'], expected_type=int)
            if generated not in range(1, 7):
                self.addMessage('Error: a die only has the numbers 1 to 6')
                return False
            seen.add(generated)
            if len(seen) == 6:
                break
        if len(seen) < 6:
            missing = ', '.join(str(eyes) for eyes in sorted(set(range(1, 7)) - seen))
            self.addMessage(f'Error: these numbers never came up: {missing}')
            return False
        return True
</DEFINITION>
<OUTPUTPROCESSOR>
DieChecker(expected_type=int)
</OUTPUTPROCESSOR>
4
```

Some remarks:

-   Do not forget to return whether the output is correct. `continue upon wrong answer` depends on this.
-   A class or function defined in a `DEFINITION` tag stays available in the following tests of the same file, so you only have to define a processor once.
-   The methods you do not override keep their standard checks. For example, a processor that only overrides `checkReturnValue` still reports printed output when the test expects none.

### Hidden and unexecuted test cases

In case you want to show a test case to students but not execute it, you can use the `NOEXEC` flag. Conversely (to execute a test but not show it) can be done with the `NOSHOW` flag.

```python
>>> 1/0 #doctest: +NOEXEC
"This test case was not executed"
>>> get_password() #doctest: +NOSHOW
"hunter2"
```

### Doctests in multiple languages

It is possible to support multiple languages in doctests. Nothing needs to be changed in the input file; almost everything must be done in the output file. Between the parameters under the horizontal line, a `LANGUAGE` tag must be placed. The tested source code and an example translation follows. Here we assume the original doctest is in English.

``` python
def show_usage():
    print("usage")
    print("    just use it.")

class HtmlParagraph(object):
    def __init__(self, content):
        self.content = content
    def to_html(self):
##         return '<p>{}</p>'.format(self.content)
<LANGUAGE code="nl">
    <function from="show_usage" to="toon_gebruiksaanwijzing" />
    <class from="HtmlParagraph" to="HtmlParagraaf" />
    <method from="to_html" to="naar_html"/>
    <fixed from="&quot;usage&quot;" to="&quot;gebruik&quot;" />
    <fixed from="&quot;    just use it.&quot;" to="&quot;    gebruik het dan toch gewoon.&quot;"/>
</LANGUAGE>
```

The possible substitution types are `function`, `method`, `class`, `kwarg`, `token`, `fixed`, and `regex`. With `kwarg`, the names of keyword arguments will be replaced. `token` replaces a whole word. `fixed` ensures literal substitutions without extra boundaries, also inside words. With `regex`, `from` is a regular expression and `to` can refer to its groups with `\1`, `\2`, and so on.

Each substitution tag also has an optional parameter `detect` which defaults to `true`. This means that the `to` parameter of the tag is also used to detect the language. However, if `detect` is set to `false`, the substitution is ignored for language detection. A `<detect token="..." />` tag adds a word that is only used to detect the language.

Once the language is detected, translation is fully automatic. However, the language must be detected. The detected language is the language with the most words in the global scope if there is one with more than 0. If no words are found, no translation or selection is performed.

Selection is the process that accounts for the fact that not everything can be translated with short phrases. Or sometimes you want to execute some things only for users of a certain language. The following example clarifies this:

``` python
<LANGUAGE code="nl">
    <fixed from="english" to="nederlands" />
    <fixed from="&quot;This is seen translated by everyone.&quot;" to="&quot;Dit wordt door iedereen gezien en is vertaald.&quot;" />
    <fixed from="&quot;This should appear for everyone and be translated.&quot;" to="&quot;Dit zou aan iedereen moeten verschijnen en vertaald zijn.&quot;" />
    <fixed from="&quot;And back to translating for everyone&quot;" to="&quot;En terug voor iedereen vertalen&quot;" />
    <fixed from="&quot;This should appear for everyone and be translated.&quot;" to="&quot;Dit zou vertaald aan iedereen moeten verschijnen.&quot;" />
    <fixed from="&quot;Now, we're going into an untranslated part.&quot;" to="&quot;Nu beginnen we aan een onvertaald gedeelte.&quot;" />
    <fixed from="&quot;This is shown to everyone, but not translated.&quot;" to="&quot;Dit wordt aan iedereen getoond, maar niet vertaald.&quot;" />
</LANGUAGE>
>>> "This is seen translated by everyone." and None
>>> "This is seen only be Dutch users." and None
<LANGUAGE code="nl" />
>>> "This is seen by both Dutch and French users." and None
<LANGUAGE code="nl fr" />
>>> "This is seen by anyone but Dutch and French users." and None
<LANGUAGE code="!nl fr" />
>>> "This is only seen by users of the default language (and undetected
languages)" and None
<LANGUAGE code="notdetected" />
>>> "This is seen by anyone but users of the default language" and None
<LANGUAGE code="!notdetected" />
>>> "Starting a whole block for Dutch users only" and None
<LANGUAGE code="nl" sticky="sticky" />
>>> "Gegroet, Kees!" and None
>>> "Starting a whole block for anyone but the Dutch" and None
<LANGUAGE code="!nl" sticky="sticky" />
>>> "What's a fascia?" and None
>>> "And back to translating for everyone" and None
<LANGUAGE code="" sticky="sticky" />
>>> "This should appear for everyone and be translated." and None
>>> "Now, we're going into an untranslated part." and None
<LANGUAGE code="!" sticky="sticky" />
>>> "This is shown to everyone, but not translated." and None
```

### Files

The `FILE` tag has four forms. The first three ensure that the name of the file ends up in the feedback table as a link to the content of the file. If the optional `href` parameter is not filled in, the content of the file will be shown with a pop-up. This can lead to long waiting times for large files, as the content is processed twice in the feedback table. For large files, the `href` parameter can be used. This will ensure that the name of the file is a link to a download of the file. If the `href` parameter is empty, there will be no link to the content of the file.

-   Embedded

    ``` python
    >>> filestring = open('text.txt', 'r').read()
    <FILE name="text.txt">
    This will be the content of text.txt.
    </FILE>
    ```

    With the first form, as shown above, you can embed your files in the test definitions. Instead of this code, `filestring = StringIO("""This is the content of text.txt""").read()` will be executed. For the student, the original code will still be shown.

-   Open existing file

    This form takes care of existing files. This allows the content to be linked to the pop-up.

    ``` xml
    <FILE name="text.txt" src="/temp/text.txt" />
    ```

    The `src` attribute contains the actual location of the file. If this is empty, we use `name` as the path to the file.

-   Create and open new file

    This form creates a file with the text of the tag as content. Then it is used in the same way as above.

    ``` python
    >>> print_out_file('text.txt') # this would be a function doing print(open(file).read())
    <FILE name="text.txt" src="/temp/text.txt">
    This is the content of text.txt.
    </FILE>
    <OUTPUTPROCESSOR>
    OutputProcessor(expected_type=str)
    </OUTPUTPROCESSOR>
    This is the content of text.txt.
    ```

-   Expected file

    With `src="memory"`, the tag gives the content of a file that the submission must write. The `FileContentChecker` output processor then compares the file the submission wrote with this content.

    ``` python
    >>> write_greeting('greeting.txt')
    <FILE name="greeting.txt" src="memory">
    Hello world!
    </FILE>
    <OUTPUTPROCESSOR>
    FileContentChecker('greeting.txt')
    </OUTPUTPROCESSOR>
    ```

To allow the use of Dodona's debugger for exercises with files, a `FILE` tag must be used. If it is not an embedded file, a (valid) `href` attribute must also be present. In this latter case, the debugger will also only work if the exercise is public.

### Execution context

When a student starts Dodona's debugger for a test, the execution of the statement may depend on previously executed statements. Therefore, we have introduced the concept of an execution context. The execution context can be adjusted in two ways.

The parameter `independent examples` indicates whether each statement forms its own execution context. If this parameter is `True` (the default value), each statement will be executed separately and only the current statement will be added to the source code when the debugger is started. If the parameter is `False`, all statements will form an execution context by default. With the `NEWCONTEXT` flag, a new context can be started.

``` python
# first context
>>> statement1
>>> statement2

# second context
>>> statement3 #doctest: +NEWCONTEXT
>>> statement4

# third context
>>> statement5 #doctest: +NEWCONTEXT
>>> statement6
```
