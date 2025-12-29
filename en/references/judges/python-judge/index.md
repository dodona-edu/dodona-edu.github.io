---
title: Python judge
description: "Python judge"
order: 5
---

# Python judge

::: warning Note
We do not recommend creating new exercises for this judge.
This judge is no longer actively developed.

Use [TESTed](/en/guides/exercises/) to create new Python exercises instead.
:::

All Python judges are written in Python and share a common base class `Judge`. The base class for master judges is called `MasterJudge`. The base class for interactive judges is called `TestcaseJudge`. Two generic interactive judges have already been implemented:

-   The [**`OutputJudge`**](#output-judge) class implements a judge that evaluates the submitted source code based on the output written to `stdout` based on input read via `stdin`. This judge is therefore suitable for exercises that ask for input via `input()` and print the results via `print()`.
-   The [**`DoctestJudge`**](#doctest-judge) class implements a judge that evaluates the submitted source code by running a series of *unit tests* on it, described using an extended version of the Python `doctest` module format. This judge is suitable for testing Python **functions**.

You must let the Python judge know which of these two options you want to use by setting this in the [`config.json`](/en/references/exercise-config/) file of your exercise. Under `evaluation`, add the key `pythia_judge` with the value `output` or `doctest`, depending on the type of exercise you are creating.

::: tip Examples
Take a look at the [example exercises repository](https://github.com/dodona-edu/example-exercises) and [example course](https://dodona.be/en/courses/358/) to find an example of how to use these judges.
:::

The hierarchy of the judge classes developed within the Python project is as follows:

    Judge -> MasterJudge
          -> TestcaseJudge -> OutputJudge
                           -> DoctestJudge

## General settings

The following settings can be used for both the output judge and the doctest judge. Settings specific to a judge will be discussed separately in [Output judge](#output-judge) and [Doctest judge](#doctest-judge).

- **`time limit`**:   This setting specifies the time limit as a natural number in seconds.

- **`continue upon wrong answer`**:   Boolean indicating whether to continue running tests when a wrong answer is generated. Default `true`.

- **`continue upon failure`**:   Boolean indicating whether to continue running tests when a runtime error occurs. Default `true`.

- **`tab name`**:   String indicating the name of the tab in the feedback. Tab names are also exposed to translations performed by the judge, but all types of names are translated separately, meaning names of functions, methods, classes, and keyword arguments are detected as tokens.

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

- **`python input without prompt`**:   Boolean indicating whether the prompt of the built-in functions `input` and `raw_input` should be written to standard output or not. Default `false` (meaning the prompt **is** written to standard output).

- **`block count`**:   String indicating how many blocks of input the judge can expect.

  - **`one`** (default): The input is considered as one block.
  - **`multi`**: The input consists of a number of blocks one after the other (meaning for certain questions only 1 test case with multiple test inputs is needed).
  - **`first line`**: The first line of the input indicates the number of blocks.
  - **`ends with <string>`**: The input is terminated with a line equal to `<string>`. So if `ends with STOP` is set, the input must be terminated with a line containing only `STOP`.

- **`input block size`**:   String indicating what each block from the input looks like.

  - **`first line`** (default): The first line of the block indicates how many lines come after it in the block; this first line is also part of the input that must be processed by the submitted code.
  - **`ends with <string>`**: Each block is terminated with a line equal to `<string>`. If no string is specified, an empty line is considered a terminator/separator. If the last block ends with `<string>`, the `<string>` is considered a terminator and is part of the actual input to be processed by the submitted code. In case the last block does not end with `<string>`, `<string>` is considered a separator and is not part of the input to be processed by the submitted code.
  - **`<integer>`**: Each block consists of `<integer>` lines.

- **`blockwise execution`**:   Boolean indicating whether the output should be compared block by block or not.
    This is default `true` and then output is generated per block and compared with the expected output. If set to `false`, only the global generated and expected output will be compared.

### Parameters to change the comparison method

- **`comparison`**:   String indicating how the generated and expected output should be compared.

  - **`exact match`**: The two outputs must be exactly the same.
  - **`ignore extra whitespace`** (default): The expected and generated output must be the same, but consecutive whitespace characters are reduced to a single whitespace character.
  - **`ignore whitespace`**: The expected and generated output must be the same but whitespace is ignored for the comparison.

- **`ignore fp rounding`**:   Determines how floating point numbers are compared.

  -   `default`: Numbers are compared character by character and must match in all characters.
  -   `getal <e>`: The numbers $n$ and $m$ are equal if $|n-m| < 10^e$; in other words, if $e = -2$, the two numbers must be equal up to two digits after the decimal point.

- **`case sensitive`**:   Boolean indicating whether the difference between uppercase and lowercase letters should be taken into account when comparing the generated and expected output. Default `true`.

- **`field order sensitive`**:   Boolean indicating whether the order of fields on a line should be taken into account when comparing the generated and expected output. Default `true`.

- **`field separator`**:   Field separator used for the `field order sensitive` setting. By default, a consecutive series of whitespace characters is used as a field separator.

- **`line order sensitive`**:   Boolean indicating whether the order of lines should be taken into account when comparing the generated and expected output. Default `true`.

### Defining a custom evaluation function

In the file with expected output, there is also the possibility to define a custom function that evaluates whether the solution is correct or incorrect. This function must receive the expected and generated output as arguments and return `True` or `False` depending on the correctness.

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

The doctest judge uses doctests to check students' solutions.

### Parameters

- **`used output channel`**:   Sets the output channel for the entire doctest. See [Output channels](#output-channels) for the explanation regarding output channels. By default, all doctests use `return` as the sole output channel. Possible values are `stdout`, `return` and `stdout return`.

- **`independent examples`**:   Boolean indicating whether all doctests should be considered dependent or independent of each other. (See [Execution context](#execution-context) for more info on execution contexts for the Python Tutor.) Default is `true`, meaning each statement forms its own execution context. If `false`, statements are bundled to form an execution context.

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
>>> # If we want both the prints and the return value, we explicitly add both:
>>> my_print(5) #doctest: +STDOUT, +RETURN
5
None
>>> my_combination(5) #doctest: +STDOUT, +RETURN
5
5
>>> # Note that the last line in the expected output is interpreted as the return value
>>> my_multiline(5) #doctest: +RETURN
5
5
5
>>> # Note that in this case the full output is considered the return value,
>>> # and that the feedback table will show the expected and generated output over multiple lines
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
the representation of myself.
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
>>> 0.005 #doctest: +NOSTICKY
0.006
>>> # This test was correct, the sticky was cleared for one test case with +NOSTICKY
>>> 0.007 # this test will fail again
0.008
>>> 0.005 #doctest: +CLEARSTICKY
0.006
>>> # The test above succeeded
```

Defining a *sticky* output processor adds it to the list of stickies. These stickies will be added to an output processor explicitly defined in the tags for each test unless the `NOSTICKY` flag was used. The `CLEARSTICKY` flag clears the list of *stickies*.

There are more standard processors, but these are quite specific. They are all defined in `output_processors.py` together with enough documentation to explain their operation and parameters. In general:

- **`FileContentChecker`**:   Checks if a file with a given name exists on the local file system and if the content corresponds to that of another file. This second file can be located in the local file system or the content can be retrieved from the block (where the latter option takes precedence).

  -   `ignoreTrailingNewlines`: Boolean indicating whether extra newlines at the end of the generated (and expected) output should be removed.

- **`ImageRenderer`**:   This output processor renders 2-dimensional matrices as colored images. If the output is correct, the matrix will be shown in the feedback table.

### Defining output processors

To define a custom output processor, we introduce the `DEFINITION` tag. This tag allows defining anything within the scope of the doctest.

```python
>>> my_new_function() #doctest: STDOUT
<DEFINITION>
def my_new_function():
    print('hello world')
</DEFINITION>
hello world
```

This example would of course be confusing for students, as they cannot see the definitions, but they can see the test itself. However, the tag can be used to define new output processors. The examples below make the standard processors friendlier. First a brief overview of the structure of the standard processors:

-   `BasicProcessor`: Both processing standard output (`process_stdout`) and the return value (`process_return`) set the block status to "WA" (*wrong answer*).
-   `OutputComparator(BasicProcessor)`: Overrides `process_stdout` and sets the status to "AC" (*answer correct*) if the expected and generated output are equal (comparing strings). Also adds the expected and generated output to the block so they can be shown with a diff in the feedback table.
-   `TypedContentChecker(BasicProcessor)`: Overrides `process_return` and sets the status to "AC" if the type and values of the expected return and generated return are equal. Also adds the expected and generated return to the block after annotating them so they can be shown in the feedback table.
-   `OutputProcessor(OutputComparator, TypedContentChecker)`: Inherits from the previous two output processors and combines their functionality: `process_stdout` calls `OutputComparator.process_stdout` and `process_return` calls `TypedContentChecker.process_return`.

```python
>>> print('hello') #doctest: STDOUT
<DEFINITION>
class FriendlyOutputComparator(OutputComparator):
    def process_stdout(self, block, expected_output, generated_output, **kwargs):
        retval = super().process_stdout(self, block, expected_output, generated_output, **kwargs)
        if block.status == 'AC':
            block.addMessage("That's a job nice done!")
        else:
            block.addMessage("Nice try, but it's not entirely correct.")
        return retval
</DEFINITION>
hello
>>> 'hello'
<DEFINITION>
class FriendlyTypedContentChecker(TypedContentChecker):
    def process_return(self, block, expected_output, generated_output, expected_type=None, **kwargs):
        retval = super().process_return(self, block, expected_output, generated_output, expected_type=None, **kwargs)
        if block.status == 'AC':
            block.addMessage('That's a job nice done!')
        else:
            block.addMessage('Nice try, but it's not entirely correct.')
        return retval
</DEFINITION>
'hello'
>>> print('hello') or 'hello'
<DEFINITION>
class FriendlyProcessor(OutputProcessor):
    def process_stdout(self, block, expected_output, generated_output, **kwargs):
        retval = super().process_stdout(self, block, expected_output, generated_output, **kwargs)
        if block.status == 'AC':
            block.addMessage('My God, I love that printing of yours!')
        else:
            block.addMessage('Nice try, but you printed not entirely correct.')
        return retval
    def process_return(self, block, expected_output, generated_output, expected_type=None, **kwargs):
        retval = super().process_return(self, block, expected_output, generated_output, expected_type=None, **kwargs)
        if block.status == 'AC':
            block.addMessage('You return it the way I like!')
        else:
            block.addMessage('I gave you everything, and you return it wrong?')
        return retval
</DEFINITION>
hello
'hello'
```

Some remarks:

-   If the content needs to be compared using a custom method, the `content_check=False` parameter can be passed to `super().process_return`. The function will then only determine if the types match (and set the block status to "AC" or "WA"). If the types did not match, the block will already contain annotations. If the types did match, `setExpectedReturn` and `setGeneratedReturn` must be called with annotated strings if the returns should be shown. However, it is also possible to limit feedback to a message calculated from the returns, for example.
-   Use only the functionality you need. If no printing is expected, override `TypedContentChecker`. Any unexpected standard output will then be caught and correctly shown to the user. With `OutputProcessor`, a diff would still be shown, but the "unexpected output" message would not be shown.
-   Do not forget to return whether the answer is accepted or not. `continueUponWrongAnswer` depends on this.
-   Set the expected/generated pairs with `Feedbacktable.setOutputPair(channel, exp, gen)`, where `channel` is one of `return`, `stderr`, and `stdout`. Add messages to each pair with `Feedbacktable.addOutputMessage(channel, message, ...)`.

### Hidden and unexecuted test cases

In case you want to show a test case to students but not execute it, you can use the `NOEXEC` flag. Conversely (to execute a test but not show it) can be done with the `NOSHOW` flag.

```python
>>> 1/0 #doctest: +NOEXEC
"This test case was not executed"
>>> get_password() $doctest: +NOSHOW
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
    <fixed from="&quot;    just use it.&quot;" to="&quot;    gebruik het dan toch gewoon.&quot"/>
</LANGUAGE>
```

The possible substitution types are `function`, `method`, `class`, `kwarg`, `fixed`, and `regex`. With `kwarg`, the names of keyword arguments will be replaced. `fixed` ensures literal substitutions without extra boundaries.

Each substitution tag also has an optional parameter `detect` which defaults to `true`. This means that the `to` parameter of the tag is also used to detect the language. However, if `detect` is set to `false`, the substitution is ignored for language detection.

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

This tag has three forms. Each form will ensure that the name of the file ends up in the feedback table as a link to the content of the file. If the optional `href` parameter is not filled in, the content of the file will be shown with a pop-up. This can lead to long waiting times for large files, as the content is processed twice in the feedback table. For large files, the `href` parameter can be used. This will ensure that the name of the file is a link to a download of the file. If the `href` parameter is empty, there will be no link to the content of the file.

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

To allow the use of the Python Tutor for exercises with files, a `FILE` tag must be used. If it is not an embedded file, a (valid) `href` attribute must also be present. In this latter case, the Python Tutor will also only work if the exercise is public.

### Execution context

When a session is started from the online Python Tutor for the current statement, the execution of the statement may depend on previously executed statements. Therefore, we have introduced the concept of an execution context. The execution context can be adjusted in two ways.

The parameter `independent examples` indicates whether each statement forms its own execution context. If this parameter is `True` (the default value), each statement will be executed separately and only the current statement will be added to the source code when the Python Tutor is started. If the parameter is `False`, all statements will form an execution context by default. With the `NEWCONTEXT` flag, a new context can be started.

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

### Namespaces

Doctests can be conditionally executed depending on whether some names are defined in the global namespace or some namespaces in the global namespace. This can be done by adding a (single) `NAMESPACE` tag to the doctest.

The elements of the `NAMESPACE` tag describe conditions on multiple named objects. Each element has a mandatory `name` attribute, resulting in a test whether the name exists in the enclosed namespace (`NAMESPACE` or `CLASS`) and has the correct type (as given by the name of the tag).

The namespace tests are executed in the order they appear in the `NAMESPACE` tag. As soon as a test fails, the execution of doctest and the following namespace tests stops. Only one block will be shown with the error message of the block that failed.

Namespace tests are always *sticky* in that a failed namespace test does not execute the current doctest and all subsequent doctests until a doctest is found with its own `NAMESPACE` tag (and this tag does not have the `extend` attribute set to `true`).

The `arg` attributes of `FUNCTION` and `METHOD` are implemented in a generic way and refer to the suffixes of the `function.__code__.co_` attributes. For example, `names` can be used to check that the function itself calls all mandatory functions. The value in the argument is evaluated as a python object.

``` xml
<NAMESPACE extends="true|false">
    <FUNCTION name="function_name" args="arg1,arg2" names="function1,function2"/>
    <CLASS name="Classname1">
        <METHOD name="method_name" args="arg5" names="function3"/>
    </CLASS>
</NAMESPACE>
```

The attributes are as follows:

- **`extends`**: When a new namespace tag is found with `extends="true"`, the tests in the new namespace tag are only executed if there were no previous namespace errors.
- **`name`**: Name of the function/method/class that must be present in the namespace. This field is mandatory.
- **`args`**: The mandatory arguments that must be present in the definition
- **`names`**: The mandatory functions/methods that must be called in the function/method.
