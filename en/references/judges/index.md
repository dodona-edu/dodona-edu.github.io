---
title: Judges
description: "Overview of all judges available on Dodona"
order: 6
---

# Judges

On [this page](https://dodona.be/en/judges/) you can find an overview of all judges that are available on Dodona. A judge is a piece of software that is responsible for testing the solutions of students and writing the results in a format that Dodona understands.

Most judges only support one programming language, but there are also judges like [TESTed](#TESTed) that support multiple programming languages.

::: tip Recommended judge
If you're trying to decide which judge to use for your exercises, we strongly recommend taking a look at [TESTed](#tested) first.
:::

## C
C is a judge that uses the GTester framework to run tests on C exercises.\
**Programming languages:** C\
**Get started** [Documentation](https://github.com/mvdcamme/C-Judge), [examples](https://github.com/mvdcamme/C-Judge/tree/master/example_exercises) \
**Created by:** [Maarten Vandercammen](mailto:mvdcamme@vub.ac.be)

## Haskell
Haskell is a judge that uses HUnit to test Haskell exercises. \
**Programming languages:** Haskell\
**Get started** [Github repo](https://github.com/dodona-edu/judge-haskell), [examples](https://github.com/dodona-edu/example-exercises/tree/master/haskell) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

## HTML
The HTML judge evaluates both the HTML and CSS code of a student, based on a model solution or a checklist of criteria.\
**Programming languages:** HTML, CSS\
**Get started** [Documentation](https://github.com/dodona-edu/judge-html), [examples](https://github.com/dodona-edu/example-exercises/tree/master/html) \
**Created by:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

## Java
The java judge uses the JUnit4 framework to run tests on Java exercises.\
**Programming languages:** Java\
**Get started** [Documentation](https://github.com/dodona-edu/judge-java), [examples](https://github.com/dodona-edu/judge-java/tree/master/examples) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

## Markdown
The markdown judge is not a real judge as it does not evaluate code.
It does render the Markdown code of a student and can be useful to manually evaluate the output in Dodona.\
**Programming languages:** Markdown\
**Get started** [Documentation](https://github.com/dodona-edu/judge-markdown) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

## Prolog
Prolog is a judge that can be used for exercises on the Prolog programming language.
It supports PLUnit, QuickCheck and simple input output tests.\
**Programming languages:** Prolog\
**Get started** [Documentation](https://github.com/dodona-edu/judge-prolog), [examples](https://github.com/dodona-edu/example-exercises/tree/master/prolog) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

## R
R is a judge that can be used for exercises on the R programming language.\
**Programming languages:** R\
**Get started** [Documentation](https://github.com/dodona-edu/judge-r), [examples](https://github.com/dodona-edu/example-exercises/tree/master/R) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

## Scheme
Scheme is a judge that supports the `R5RS` variant of the scheme programming language. It uses a custom testframework [dunit](https://gitlab.soft.vub.ac.be/Structuur1/dodona-judge/-/tree/master/collects/dunit) to define the tests.\
**Programming languages:** Scheme\
**Get started** [Documentation](https://gitlab.soft.vub.ac.be/Structuur1/dodona-judge), [examples](https://gitlab.soft.vub.ac.be/Structuur1/dodona-judge/-/tree/master/example-exercises) \
**Created by:** [Mathijs Saey](mailto:scpi@dinf.vub.ac.be)

## SQL
The SQL judge supports both query evaluation (DML) and structural database building (DDL).\
**Programming languages:** SQL\
**Get started** [Documentation](https://github.com/dodona-edu/judge-sql), [examples](https://github.com/dodona-edu/example-exercises/tree/master/sql) \
**Created by:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

## TESTed
This judge is recommended by the Dodona team.
TESTed is a judge that can be used for multiple programming languages.
It uses a simple custom test format, that is independent of the programming language of the exercise.\
**Programming languages:** Bash, C, C#, Haskell, Java, JavaScript, Kotlin, Python\
**Get started** [Documentation](/en/guides/exercises/), [examples](https://github.com/dodona-edu/example-exercises/tree/master/tested) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

## Turtle
The Turtle judge evaluates the output of a Python Turtle program. It calculates the similarity between the output of the student and the model solution.\
**Programming languages:** Python (Turtle)\
**Get started** [Documentation](https://github.com/dodona-edu/judge-turtle) \
**Created by:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

## Deprecated judges

### Bash

::: warning Note
We do not recommend using this judge for new exercises.
Use [TESTed](/en/guides/exercises/) for new Bash exercises instead.
:::

Bash is a judge that can be used for exercises on the bash terminal.
It is undocumented and has a lot of very use-case-specific implementations.\
**Programming languages:** Bash\
**Get started** [Examples](https://github.com/dodona-edu/example-exercises/tree/master/bash), contact the creators to get more info about this judge. \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

### Csharp

::: warning Note
We do not recommend using this judge for new exercises.
Use [TESTed](/en/guides/exercises/) for new C# exercises instead.
:::

Csharp is a judge that can be used for exercises in C#.\
**Programming languages:** C#\
**Get started** [Examples](https://github.com/dodona-edu/example-exercises/tree/master/c%23) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

### Javascript

::: warning Note
We do not recommend using this judge for new exercises.
Use [TESTed](/en/guides/exercises/) for new Javascript exercises instead.
:::

Javascript is a judge that can be used for exercises on the JavaScript programming language.
It is undocumented and has a lot of very usecase specific implementations.\
**Programming languages:** JavaScript\
**Get started** [Github repo](https://github.com/dodona-edu/judge-javascript), [examples](https://github.com/dodona-edu/example-exercises/tree/master/javascript) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

### JUnit

::: warning Note
We do not recommend using this judge for new exercises.
Use the [Java judge](#java) instead.
:::

The JUnit judge is a judge for Java 8 exercises.\
**Programming languages:** Java\
**Get started** [Documentation](https://github.com/dodona-edu/judge-java8), [examples](https://github.com/dodona-edu/example-exercises/tree/master/java) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)

### Python
::: warning Note
We do not recommend using this judge for new exercises.
Use [TESTed](/en/guides/exercises/) for new Python exercises instead.
:::

Python/Pythia is the first judge that was created for Dodona.
It is a Python judge that allows simple input/output tests or more advanced doctests.\
**Programming languages:** Python\
**Get started** [Documentation](/en/references/judges/python-judge), [examples](https://github.com/dodona-edu/example-exercises/tree/master/python) \
**Created by:** [Team Dodona](mailto:dodona@ugent.be)
