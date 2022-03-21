---
title: "Adding support for a new programming language"
description: "Adding support for a new programming language in TESTed."
---

# Adding support for a new programming language

In this guide, we explain in detail how to add support for a new programming language to TESTed.
In this guide, we add support for the programming language C.
We do also note where we do C-specific stuff,
so it should also be usable as a guide for adding support for other languages.

Some useful links that can help you:

- Existing configurations: <https://github.com/dodona-edu/universal-judge/tree/master/tested/languages>, including the configuration for C, which is what we are adding here.
- Test exercises: <https://github.com/dodona-edu/universal-judge/tree/master/exercise>

## TESTed locally

Since language support is added to TESTed itself, you need to get the code for TESTed locally.
We recommend following the guide in the [readme of the TESTed repository](https://github.com/dodona-edu/universal-judge#installing-tested).
Note that you only need to install the Python dependencies.
Dependencies of other languages (e.g. ghc for Haskell) are optional.

For this guide, you also need to have an installation of gcc available,
since that is the compiler we're going to use (version 8.1 or up).

::: tip Window users
We recommend using the [Windows Subsystem for Linux](https://ubuntu.com/wsl) on Linux.
While TESTed itself is written in Python and thus platform independent,
the dependencies of the programming languages are not always available on Windows.
:::

### Running TESTed

After cloning the repository and installing the necessary dependencies,
the folder in which TESTed is located should look like this:

```
universal-judge
├── exercise/     # Test exercises
├── tested/       # Sources
├── tests/        # Tests
├── workdir/      # Working directory when manually running TESTed
├── config.json   # Used in Dodona
└── run           # Used in Dodona
```

In this guide, we assume you run the commands in the root directory of the repository. 
The main way to run TESTed is to use the following command:

```shell
> python -m tested --help
usage: __main__.py [-h] [-c CONFIG] [-o OUTPUT] [-v]

The programming language agnostic educational test framework.

optional arguments:
  -h, --help            show this help message and exit
  -c CONFIG, --config CONFIG
                        Where to read the config from
  -o OUTPUT, --output OUTPUT
                        Where the judge output should be written to.
  -v, --verbose         Include verbose logs. It is recommended to also use -o in this case.
```

This is fine when running TESTed in production,
but for development it is annoying to always have to specify the configuration.
Therefore, you can use the development mode, in which the configuration is hard-coded:

```shell
> python -m tested.manual
```

This will run an exercise according to the hard-coded values in `tested/manual.py`.
Running in this mode will put all generated files into the `workdir` folder.
This can be very useful, e.g. to inspect the generated code.
If `workdir` does not exist, you might need to create it.

## Plan of action

Adding support for a programming language in TESTed boils down to implementing a programming language module for that programming language.
Implementing such a module is theoretically as easy as creating one subclass,
but we recommend the following structure:

1.  The configuration file,
    which contains some options for the programming language.
    This also includes the type configuration, which specifies the data type support.
2.  The configuration class, which has more dynamic options, like the compilation command that should be used when evaluating a submission.
3.  The templates, which are used to generate the necessary test code.

TESTed includes a utility to generate the necessary files in the correct location.
Based on a few questions, stubs will be generated for the configuration file, the configuration class and the templates.

You can run the utility as follows:
```shell
> python -m tested.generation
```

Note that this will only generate the necessary files.
It will not modify existing files,
so you must not forget to do the steps in the [Registration](#registration) section later.

We will now look at the various features of the programming language C.
We will assume the generation tool was not used, so the files need to be created manually.
If you did use the generation tool, skip the instructions on creating files.

## The programming language C

Before starting with adding support for C,
we will look briefly at which features of C we want to support:
which features of the language can we support in TESTed and which features from TESTed can we support in C?

Of course, we want to support as much as possible.
However, there are some limitations, specifically in the data type support.

##### Unsupported basic types

In our support for C, we won't support the following basic types:

- `sequence`:
  Arrays are a special case in C.
  For example, static arrays cannot be used as a return value,
  and are not ideal as function parameter either.
  To use dynamic arrays effectively, you need a pointer to the data and the size of the array.
  This has implications:
  for example, if you want to pass an array as a parameter to a function, you need to pass two parameters.
  TESTed has no support for this at the moment.
  As such, arrays are not supported.
- `set`:
  C does not have any built-in sets.
- `map`:
  C does not have any built-in maps.
  There are structs, but it is not possible to get the field names at runtime, so there is no way to serialize them.

##### Unsupported advanced types

Of the basic types that we do support, we cannot support the following advanced types:

- `big_int`:
  C does not have a type for arbitrary size numbers.
- `fixed_precision`:
  C does not have a type for fixed precision floats.
- **Other data types**:
  This concerns types such as `array` and `list`.
  Similarly, `tuple` is also not supported.

The first step is to create a folder in which we will put the code of the C module.
This folder should be named after the programming language
and created in the correct location within the source directory.
Create a new folder `tested/languages/c`:

```
universal-judge/
├─ tested/
│ ├─ languages/
│ │ ├── c/        <- new folder
│ │ ├── haskell/
│ │ ├── java/
│ │ ├── python/
│ │ ├── config.py
│ │ ...
│ ...
...
```

## Configuration file

The configuration file is a JSON file with some properties of the programming language.
Technically, this file is optional: you only need to implement the configuration class (which we'll do later).
However, using the configuration file is easier.
Create the configuration file `tested/languages/c/config.json`:

```json5
{
  // General options about the language.
  "general": {
    // Files which will be available in the compilation and execution step.
    // We'll discuss these later, but these are depdencies that are needed
    // during the compilation step in C.
    "dependencies": [
      "values.h",
      "values.c",
      "evaluation_result.h",
      "evaluation_result.c"
    ],
    // If the language uses a selector during compilation.
    // This is true for most languages, including C.  
    "selector": true
  },
  "extensions": {
    // Extension of the generated test code.  
    "file": "c",
    // Extensions of the templates.
    // Defaults to the file extension and mako.
    "templates": ["c", "mako"]  // The default value, so not really necessary.
  },
  // Language constructs are translated into the style of the programming language
  "naming_conventions": {
    // Possibilities are snake_case, camelCase and PascalCase
    "namespace": "snake_case",
    // snake_case is the default
    "function": "snake_case"
  },
  // Indicate for which language constructs recognized by TESTed
  // we want to add support.
  // By default, all constructs are false, meaning no support.
  "constructs": {
    // Object-oriented stuff, such as classes and constructors.
    "objects": false,
    // Throwable exceptions.
    "exceptions": false,
    // Functions
    "function_calls": true,
    // Assignments (often a variable)
    // However, e.g. in Haskell this is implemented as a constant function
    // returning the same value. So, it is a "conceptual" assignment, not
    // necessarily a real one.
    // For example, `x = 5` is technically a function in Haskell, but is
    // considered an assignment in TESTed.
    "assignments": true,
    // If collections (e.g. lists) can have elements of different types.
    // For example, Python supports this, it is difficult in Java and
    // Haskell does not support it at all.
    "heterogeneous_collections": false,
    // If a function can accept arguments of different types.
    // For example, Java supports this with method overloading.
    // On the other hand, C does not support this.
    // An example is `echo("string")` and `echo(5)`.
    "heterogeneous_arguments": false,
    // If programmed checks are supported in this language.
    // Technically, not a language construct.
    "evaluation": false,
    // If named function arguments are supported.
    // This implies the arguments can be passed in a different order.
    // For example, Python supports this.
    "named_arguments": false,
    // If default values for function arguments are supported.
    "default_parameters": false
  },
  // Indicate which datatypes are supported in this language.
  // By default, all basic types are supported, but advanced types are not.
  // There are three possible values:
  // - supported: full support
  // - unsupported: no support
  // - reduced: only for advanced types. This indicates that the type will
  //   be reduced to its basic type. E.g. a list will become a sequence.
  "datatypes": {
    // BASIC TYPES
    "integer": "supported",
    "rational": "supported",
    "char": "supported",
    "text": "supported",
    "boolean": "supported",
    "sequence": "unsupported",
    
    // ADVANCED TYPES
    "set": "unsupported",
    "map": "unsupported",
    "nothing": "supported",
    "int8": "supported",
    "uint8": "supported",
    "int16": "supported",
    "uint16": "supported",
    "int32": "supported",
    "uint32": "supported",
    "int64": "supported",
    "uint64": "supported",
    "bigint": "reduced",
    "single_precision": "supported",
    "double_precision": "supported",
    "double_extended": "supported",
    "fixed_precision": "unsupported",
    "array": "unsupported",
    "list": "unsupported",
    "tuple": "unsupported"
  },
  // Indicate limits on data structures.
  // For example, some languages have limits on the possible types for keys
  // in map-like data structures.
  // For example, maps are implemented using Objects in JavaScript, which means
  // that not all types are usable as keys.
  // This is an advanced configuration, we recommend leaving it until later.
  // For C, the list is empty, since C does not support either data structure.
  "restrictions": {
    "map_key": [],
    "set": []
  }
}
```

## User-facing type configuration

::: warning Experimental
This file is currently experimental, and thus optional.
:::

When generating problem statements,
TESTed needs to know how certain data types should be shown to the user.
For this purpose, you can provide a type configuration file.
Create the configuration file `tested/languages/c/types.json`.
See the existing files for examples.
Note that this is experimental, so changes are possible.

## Configuration class

The configuration class is the only mandatory part of adding language support.
It serves as the API between TESTed and the language module.
Because TESTed is written in Python, the class needs to be Python as well.

Create a file `tested/languages/c/config.py` and add a class the inherits from `Language`:

```python
class C(Language):
  # See the docs of the parent class for all available options.
  # Most of the default implementations fall back to using the JSON
  # configuration file, but you could also override them all and not
  # use the configuration file.

  # The compilation command used by TESTed.
  # See below for more information, or check the method documentation
  # for technical details.
  def compilation(self, config: Config, files: List[str]) -> CallbackResult:
    main_file = files[-1]
    exec_file = Path(main_file).stem
    result = executable_name(exec_file)
    return (["gcc", "-std=c11", "-Wall", "evaluation_result.c", "values.c",
             main_file, "-o", result], [result])

  # Execution command used by TESTed.
  # This will execute the result of the compilation command.
  # See below for more information, or check the method documentation
  # for technical details.
  def execution(self, config: Config,
                cwd: Path, file: str, arguments: List[str]) -> Command:
    local_file = cwd / executable_name(Path(file).stem)
    return [str(local_file.absolute()), *arguments]


  def solution(self, solution: Path, bundle: Bundle):
    # Contains some code to change the main function.
    # See the actual implementation for the details.
    pass
```

### Compilation step

::: tip Interpreted languages
Whenever possible, we recommend adding a compilation step, even if the language is not compiled.
For example, in Python and JavaScript the compilation step is used to check the syntax of the submission.
However, if the language does not support it (e.g. Bash),
you can skip this implementation; the default implementation does nothing.
:::

The first parameter in the `compilation` method is a class with some configuration options.
These options include all exercise options.
For example, you could enable the exercise author to choose the C version used by TESTed (e.g. C99 instead of C11).
However, in this case, we only support C11.

The second parameter is a list of files TESTed considers to be useful to have during compilation.
It will contain the dependencies specified by the configuration file, the submission and the generated test code files.
By convention, the last file in the list is the one with the main function, and should thus be the one being compiled.

All of these files will be in the same directory as the main file.
It's not mandatory to actually use the files, e.g. for C,
GCC will take care of loading all other files, so we only use the main file.
As we do, you can also hardcode the name of files defined as a dependency in the configuration file.

The method must be a tuple with two elements: the compilation command and the resulting file or file filter.

The compilation command will be executed by TESTed with the `subprocess` Python module.

The resulting file or file filter is used to copy the compiled binary to the execution directory.
Only this file will be available during execution.
You can return a list of files if the result of compilation is a file with a predicable name.
For example, in C we always know the name of the binary, so we just return that.
When returning a list, you should also place the "main" file at the end.

However, this is not always the case.
For example, compiling a `.java` file will result in one or more `.class` files,
depending on the content of the `.java` file.
Therefore, you can return a filter function, which determines which files are kept.
TESTed will call the filter function for each file in the compilation directory after compiling.

An example of calling this method with the parameters and return values for C:
```python
>>> compilation(['submission.c', 'evaluation_result.c', 'context_0_0.c', 'selector.c'])
(
    ['gcc', '-std=c11', '-Wall', 'evaluation_result.c', 'values.c', 'selector.c',
     '-o', 'selector.exe'], ['selector.exe']
)
```

Return an empty compilation command to skip compilation.

### Execution

After compiling the submission and test code, the test code must be executed to get the results of the evaluation.
This method has four parameters:

- `config`:
  Same as for the compilation method.
  For example, the Java implementation uses this to set the maximum JVM memory.
- `cwd`:
  the directory in which the execution is taking place
- `file`:
  the executable file that must be executed
- `arguments`:
  arguments that should be passed to the process.
  This is used, for example, to select which context should be executed.

The return value is again a command that will be passed to the `subprocess` module.

In the case of C, this is simple: we execute the executable file and pass the arguments to it.

An example is:
```python
>>> execution('/test/path', 'executable.exe', ['arg1', 'arg2'])
['/test/path/executable.exe', 'arg1', 'arg2']
```

In most languages, we would be done by now with the configuration.
However, a C program can only have one main function.
Since the submission can have a main function, and the generated test code also has a main function, there is a conflict.
As such, we use the `submission` method to modify the submission by renaming the main function.

## Templates

Finally, we need to implement a set of templates that will be used by TESTed to generate the test code
(and translate the test suite into the programming language of the submission).

Some templates are mandatory (as they are used by the configuration class),
but it is often useful to create a few more templates, to enable reuse.
For C, we create the following templates:

- `run.c`: template for a run, used to execute multiple contexts (**mandatory**)
- `selector.c`: template to select which context to run when using batch compilation (**mandatory** if batch compilation is supported)
- `declaration.mako`: translates a variable declaration to C
- `function.mako`: translates a function call to C
- `statement.mako`: translates a TESTed statement (thus also expressions) to C (**mandatory**)
- `value.mako`: translates a literal to C (we also have a two helper templates: `value_arguments.mako`, `value_basic.mako`)

All templates are located in `tested/languages/c/templates`.

### Run template

This is conceptually the most complex template.
It is responsible for generating the test code for one run.

::: tip Runs in TESTed
Normally, TESTed will execute every context separately.
However, this means starting a new process for each context, which can introduce a lot of overhead.
As such, TESTed will combine contexts into one run, which is then run in a single process.
:::

::: tip Mako white space
TESTed uses the templating system Mako for these templates.
The default configuration in TESTed will strip Mako-induced white space.
For example, the `for`-loop above will not be intended in the final file.

Newlines in the template will result in newlines in the final file.
This can be prevented by using a backslash:

```c
int test = \⏎
"test";⏎
```

Will result in:
```c
int test = "test";⏎
```
:::

In C, the annotated implementation is:

```c
#include <stdio.h>

// Include the values module, reponsible for serialisation.
#include "values.h"
// Include the submission code.
#include "${submission_name}.c"

// Import all programming language-specific checks.
% for name in evaluator_names:
    #include "${name}.c"
% endfor

// Create the variables which will contain the names of the files used to
// save the return values and the exceptions.
// C doesn't support exceptions, but TESTed still requires the file to be present.
// We also define two functions to write a seperator to the file.
// These will be used between each context and each test case,
// allowing TESTed to seperate the results in the output files.
static FILE* ${execution_name}_value_file = NULL;
static FILE* ${execution_name}_exception_file = NULL;

static void ${execution_name}_write_separator() {
    fprintf(${execution_name}_value_file, "--${secret_id}-- SEP");
    fprintf(${execution_name}_exception_file, "--${secret_id}-- SEP");
    fprintf(stdout, "--${secret_id}-- SEP");
    fprintf(stderr, "--${secret_id}-- SEP");
}

static void ${execution_name}_write_context_separator() {
    fprintf(${execution_name}_value_file, "--${context_secret_id}-- SEP");
    fprintf(${execution_name}_exception_file, "--${context_secret_id}-- SEP");
    fprintf(stdout, "--${context_secret_id}-- SEP");
    fprintf(stderr, "--${context_secret_id}-- SEP");
}

... continued after the text block
```

If a return value is produced, it must be serialized before it is written to the output file.
This serialization converts the programming-language-specific value into the language-independent format used by TESTed.
It is useful to implement this as a separate module, which is called "values" by convention.

TESTed will expect the following functions to be available:

- `send_value(value)` serialise and write a value to the return output file.
- `send_exception(exception)` serialise and write an exception to the exception file.
- `send_specific_value(value)` serialise and write the result of a programming-language-specific check for the return channel.
- `send_specific_exception(exception)` serialise and write the result of a programming-language-specific check for the exception channel.

However, since C does not support exceptions, we don't implement those.
The other functions are implemented using a macro:

```c
... continued from before the text block

// Uses the function from the values module.
#undef send_value
#define send_value(value) write_value(${execution_name}_value_file, value)

#undef send_specific_value
#define send_specific_value(value) write_evaluated(${execution_name}_value_file, value)

... continued after the text block
```

Finally, we execute the contexts.
We generate a function per context:

```c
... continued from before the text block

// Generate a function for each context in this run:
% for i, ctx in enumerate(contexts):
    void ${execution_name}_context_${i}(void) {
        // Optional code fragment before executing a context.
        ${ctx.before}
        // Execute each test case.
        % for testcase in ctx.testcases:
            // Write the separator to the output files.
            ${execution_name}_write_separator();
            // Use another template to generate the statement that must be executed.
            <%include file="statement.mako" args="statement=testcase.input_statement()" />;
        % endfor
        // Optional code fragment after executing a context.
        ${ctx.after}
    }
% endfor

... continued after the text block
```
Now, we must still generate the code that will call these context functions:

```c
// Generate a function that will execute the run.
int ${execution_name}() {
    
    // Create the output files.
    ${execution_name}_value_file = fopen("${value_file}", "w");
    ${execution_name}_exception_file = fopen("${exception_file}", "w");

    // Similary to the separator for test cases, we write the context
    // seperator between each execution of a context.
    ${execution_name}_write_context_separator();
    
    // This is a special test case: it is used when you want to test
    // the main function of the submission.
    % if run_testcase.exists:
        char* args[] = {\
        % for argument in ["solution"] + run_testcase.arguments:
            "${argument}", \
        % endfor
        };
        int exit_code = solution_main(${len(run_testcase.arguments) + 1}, args);
        if (exit_code != 0) {
            return exit_code;
        }
    % endif

    // Execute all contexts from the test suite.
    % for i, ctx in enumerate(contexts):
        // Don't forget the separator.
        ${execution_name}_write_context_separator();
        // Call the function we generated previously.
        ${execution_name}_context_${i}();
    % endfor

    // We are done, so close the result files.
    fclose(${execution_name}_value_file);
    fclose(${execution_name}_exception_file);
    return 0;
}

// TESTed also supportes batch compilation, in which case
// we don't need a main function. Otherwise we do.
// In batch compilation the main is not needed, since this
// module will be called from the selector module.
#ifndef INCLUDED
int main() {
    return ${execution_name}();
}
#endif
```

### Selector template

In batch compilation, TESTed will use a selector template to choose which context is executed.
We set `INCLUDED` to `true`, since this will allow us to include the run file from before:


```c
#include <string.h>
#include <stdio.h>

#define INCLUDED true

% for cont in contexts:
    // Include individual context files.
    // This is the same code as in the file before.
    // We will probably merge these in the future.
    #include "${cont}.c"
% endfor

// Main function.
int main(int argc, const char* argv[]) {

    if (argc < 1) {
        fprintf(stderr, "No run context selected.");
        return -2;
    }
    
    // Code to execute the correct context.
    const char* name = argv[1];
    % for cont in contexts:
        if (strcmp("${cont}", name) == 0) {
            return ${cont}();
        }
    % endfor
    fprintf(stderr, "Non-existing run context '%s' selected.", name);
    return -1;
}
```

### Statement template

Used to convert a TESTed statement to the programming language of the submission.
In this case, we generate C code:

```c
## Convert a statement and/or expression into Java code.
<%! from tested.utils import get_args %>\
<%! from tested.serialisation import Value, Identifier, FunctionCall, Assignment %>\
<%page args="statement,full=False"/>\
% if isinstance(statement, Identifier):
    ## If the expression is an identifier, just echo it.
    ${statement}\
% elif isinstance(statement, FunctionCall):
    ## Delegate to the function template for function calls.
    <%include file="function.mako" args="function=statement"/>\
% elif isinstance(statement, get_args(Value)):
    ## We have a value, delegate to the value template.
    <%include file="value.mako", args="value=statement" />\
% else:
    <% assert isinstance(statement, get_args(Assignment)) %>\
    % if full:
        <%include file="declaration.mako" args="tp=statement.type, value=statement.expression" /> \
    % endif
    ${statement.variable} = <%include file="statement.mako" args="statement=statement.expression"/>\
% endif
```

One non-intuitive aspect is the `full` parameter.
It indicates if a variable declaration is needed or not:

```c
int variabele = 5; // with declaration
variabele = 6; // without declaration
```

See the actual templates for examples on how to handle most constructs.

## Register the language

We must also register the language module in TESTed.
You must always do this, even if you used the generator to generate the stubs.

In the file `tested/languages/__init__.py`, modify `LANGUAGES`:
```python
LANGUAGES = {
  'c': C,   # This is what we added here, mapping a name to the configuration class.
  'haskell': Haskell,
  'java': Java,
  'javascript': JavaScript,
  'kotlin': Kotlin,
  'python': Python,
  'runhaskell': RunHaskell,
}
```

## Testing the language implementation

To test the language implementation, there are a set of test.
You should also add support for your new programming language:

1. Add solutions in your programming language to one ore more of the test exercises (in the folder `exercise`).
  See the existing solutions for what your solution should do.
2. Modify `tests/test_functionality.py` and other test files to also test the new programming language.
