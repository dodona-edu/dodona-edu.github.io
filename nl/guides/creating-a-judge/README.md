---
title: "[en] Creating a new judge"
description: "Tutorial: creating a judge"
---
# Creating a new Judge

::: warning
This is an advanced guide aimed at developers. You will probably not need the info on this page. If you plan to create a judge, please contact us at <a href="mailto:dodona@ugent.be">dodona@ugent.be</a>.
:::

Before you create your own judge, please check if there is no [existing judge](/nl/references/judges) that can be used for your exercises.

For each judge in Dodona, there is one git repository. This git repository requires a [predefined structure](#_2-repository-structure) and [interface](#_3-judge-interface) to fit into Dodona. Once created, a judge should be [added to Dodona](#_1-adding-a-judge), so it can be used for exercises.

## 1. Adding a Judge

As a Dodona staff member, you can go to the "Judges" page through the administrator header in the hamburger menu. To add a new judge, hit the `+` action button. Supply a human-readable name, the name of the Docker image the judge should run in, the git clone url, the pathname (where to store the repository on the server relative to the directory containing all judges, usually the name of the repository, however, this needs to be unique) and the [feedback renderer](#_4-feedback-renderers).

## 2. Repository Structure

The only thing a judge repository requires is a `run` executable in the root of the repository. This file willed be executed inside a docker container, where it can use the rest of the files in the repository. Optionally, the repository also contains a `config.json` file in the root, [used to overwrite configurations](#input).

## 3. Judge Interface

The judge is basically the `run` executable, and interfaces with Dodona through its standard input and standard output.

### Input

The `run` executable should accept JSON input with the following fields as configuration:

- **memory_limit**: An integer, the memory limit in bytes. The docker container will be killed when its internal processes exceed this limit. The judge can use this value to cut of the tests, so he might be able to give more feedback to the student than just the default "Memory limit exceeded."
- **time_limit**: An integer, the time limit in seconds. Just like the memory limit, the docker will be killed if the judging takes longer. Can be used to for instance specify the specific test case the limit would be exceeded, instead of just "Time limit exceeded."

These two values can be overwritten and extended with random other key-value pairs in _(1)_ the Judge configuration, found as `config.json` in the judge repository root and _(2)_ the `evaluation` subobject in the configuration of the submitted exercise, the latter overwriting the former.

In addition to the previous two, the following fields are also part of the input:

- **programming_language**: The full name (e.g. "python", "haskell") of the programming language the student submitted his code for.
- **natural_language**: The natural language (e.g. "nl", "en") in which the student submitted his code.
- **resources**: Full path to a directory containing the resources for the evaluation. This is the "evaluation" directory of an exercise.
- **source**: Full path to a file containing the code the user submitted.
- **judge**: Full path to a directory containing a copy of the judge repository.
- **workdir**: Full path to the directory in which all user code should be executed.

<!--- TODO: Check [the exercise wiki page](exercise-repositories#repository-structure) for more information on these last directories and files. -->

### Output

The `run` executable should output JSON to _stdout_, which will be interpreted by the Feedback Renderer to form the feedback table. There are two output schemas available: full and partial. "Full" should output a single JSON object at the end of its judgement. "Partial" should output multiple small JSON objects during its run, describing its progress.

#### Full output

The complete format description can be found on <!-- TODO --> [the wiki](<https://github.com/dodona-edu/dodona/wiki/Judge-output-format-(proposal)>) and is specified through a [JSON schema](https://github.com/dodona-edu/dodona/tree/develop/public/schemas). A more concise format can be found below. (Note: all items are rendered in the order used below; all list-type keys are optional, defaulting to the empty list as value)

The full output returns a single JSON at the end. You must ensure that this is emitted before the docker runs out of time or memory.

- A feedback JSON consists of:
  - `accepted`, a boolean indicating whether this submission passes the tests.
  - `status`, a `Status` string
  - `description`, a string describing the status more freely.
  - `messages`, a list of `Message` objects, the first thing shown to the user.
  - `groups`, a list of `Tab` objects, which define the visible tabs. Independent of this list, a "code" tab showing the submitted code will also be included.
  - `annotations`, a list of `Annotation` objects, used to annotate the submitted source code.
- A `Tab` object consists of:
  - An optional `description`, the string used as title for the tab (defaults to "Test").
  - An optional `badgeCount`, an integer shown next to the title if present and non-zero. Use this _only_ for the number of remarks (failing tests, failing testcases, style issues, ...) with the submission. No remarks (value `0` or just absence of this key) will show no badge, to avoid drawing the user's attention.
  - `messages`, a list of `Message` objects, shown in order at the top of the tab if present.
  - `groups`, a list of `Context` objects, shown in order at the bottom of the tab if present.
- A `Context` object consists of:
  - `accepted`, a boolean indicating whether this context (could be a grouping of testcase executed in the same context) is considered correct. Reflected in the feedback as a green or red bar on the left side of the group.
  - An optional `description`, a `Message` object.
  - `messages`, a list of `Message` objects.
  - `groups`, a list of `Testcase` objects.
- A `Testcase` object consists of:
  - `accepted`, a boolean indicating whether this testcase (could be a single statement or expression) is considered correct. Reflected in the feedback as a green checkmark or a red cross on the right side of the testcase.
  - An optional `description`, a `Message` object (probably a statement formatted as `code`).
  - `tests`, a list of `Test` objects.
  - `messages`, a list of message objects.
- A `Test` object (used, e.g. to test either the returned and printed output of a statement) consists of:
  - An optional `description`, a `Message` object.
  - `accepted`, a boolean indicating whether this test is considered correct. `true` results in only showing the `generated` string, `false` results in showing a "diff" between the `generated` and `expected` strings.
  - `generated`, a string containing the output of the user.
  - `expected`, a string containing what the user should have outputted. Only used when this test is not `accepted`.
  - `messages`, a list of message objects.
- An `Annotation` object consists of:

  - `row`, a zero-based index indicating the annotated line (start).
  - An optional `column`, a zero-based index indicating the first character to mark in the first `row`. If undefined, all rows will be marked completely.
  - `text`, a string containing the annotation
  - `type`, the severity of the annotation, either `"info"`, `"warning"` or `"error"`.
  - An optional `rows`, the number of rows to mark. This should be at least `1`. The default value is `1`.
  - An optional `columns`, the number of characters to mark in the last `row`. The default value is `0`, which will put a marker before the `column` character.

- A `Message` object is either a plain string or consists of:

  - `format`, the format in which the message should be rendered. This format can be any of
    - `"plain"`, which will render the message as normal text;
    - `"html"`, which allows for HTML markup in this message. Note that the HTML output is sanitised to prevent [XSS](https://en.wikipedia.org/wiki/Cross-site_scripting) issues. JavaScript, for example, is not allowed, but most other tags should work.
    - `"markdown"`, so the containing string is interpreted as markdown and converted to HTML;
    - `"code"`, which will render the message in monospace and preserve all included whitespace;
    - `"python"`, which is the same as `"code"` with Python highlighting;
    - `"javascript"`, which is the same as `"code"` with JavaScript highlighting.
  - `description`, the actual text of the message as a string.
  - `permission`, a string specifying the visibility of this message. The permission can be any of
    - `"student"`, which makes the message visible for everyone;
    - `"staff"`, which makes the message visible only for staff members (e.g. for judge debug output);
    - `"zeus"`, which make is visible only for almighty Zeus (e.g. for application debug output);

- A `Status` string indicates the status of the submission. They can be separated in two categories
  - Available for output by the judge:
    - `"compilation error"`, the submitted code did not compile.
    - `"runtime error"`, the submitted code crashed during the tests.
    - `"memory limit exceeded"`, the submitted code exceeded the memory limit during the tests.
    - `"time limit exceeded"`, the submitted code did not finish the tests withing the given time.
    - `"wrong"`, the submitted code finished the tests, but did not pass all tests.
    - `"correct"`, the submitted code finished and passed all tests.
  - Valid values, but used only by the platform:
    - `"queued"`, the submitted code is in the queue for testing.
    - `"running"`, the judge/tests are currently executing.
    - `"internal error"`, the judge exited with a non-zero status code.
    - `"unknown"`, something went wrong.

![judge-output-reflection](./judge-output.png)

#### Partial output

The partial output consists of multiple smaller JSON objects, validated by [this JSON schema](https://github.com/dodona-edu/dodona/tree/develop/public/schemas/partial_output.json). Each JSON object describes part of the judgement. An example judgement can be found below.

Because the format is split up in smaller commands, it can be parsed partially (hence the name). This implies a judge killed by the time limit or memory limit might still have judged the exercise partially.

```json
    { "command": "start-judgement" }
    { "command": "append-message", "message": "will be added to the judgement" }
    { "command": "annotate", "row": 3, "column": 4, "text": "some info on the fourth line, fifth column of the source" }
    { "command": "start-tab", "title": "Tab One" }
    { "command": "start-context" }
    { "command": "start-testcase", "description": "case 1" }
    { "command": "start-test", "expected": "SOMETHING" }
    { "command": "append-message", "message": "some more info about the test" }
    { "command": "close-test", "generated": "SOMETHING", "status": { "enum": "correct", "human": "Correct" } }
    { "command": "close-testcase" }
    { "command": "close-context" }
    { "command": "start-context" }
    { "command": "start-testcase", "description": "case 2" }
    { "command": "start-test", "expected": "SOMETHING" }
    { "command": "close-test", "generated": "ELSE", "status": { "enum": "wrong", "human": "Wrong" } }
    { "command": "close-testcase" }
    { "command": "close-context" }
    { "command": "close-tab" }
    { "command": "close-judgement" }
```

Note that the nesting of judgement, tab, context, testcase and test is enforced. Messages can occur on any level.

## 4. Feedback Renderers

Currently two feedback renderers are available: the `FeedbackRenderer` and the `PythiaFeedbackRenderer`. You should probably use the former, as the latter contains some extra features specifically for the Python judge.
