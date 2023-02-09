---
title: Judges
description: "Overview of all judges available on Dodona"
---

This guide is written for teachers who are creating exercises for Dodona.

Before you create an exercise, you should decide which `judge` you want to use.
The `judge` is the program that will evaluate the submissions of students.
It is often written for for one specific programming language, or for a set of programming languages.
Each `judge` has its own configuration options, we will provide a link to the relevant documentation for each `judge` below.
These judge specific options should be provided in the `evaluation` directory of the [exercise configuration](/en/references/exercise-directory-structure).

Advanced users can also create their own judge, see [this guide](/en/guides/creating-a-judge/).


Dodona currently supports the following judges:
 * [TESTed](/en/references/judges#tested)
 * [Python](/en/references/judges#python)
 * [R](/en/references/judges#r)
 * [JUnit](/en/references/judges#junit)
 * [C](/en/references/judges#c)
 * [SQL](/en/references/judges#sql)
 * [Prolog](/en/references/judges#prolog)
 * [Haskell](/en/references/judges#haskell)
 * [Scheme](/en/references/judges#scheme)
 * [HTML](/en/references/judges#html)
 * [Turtle](/en/references/judges#turtle)
 * [Markdown](/en/references/judges#markdown)
 * [Java](/en/references/judges#java)
 * [JavaScript](/en/references/judges#javascript)
 * [Csharp (Deprecated)](/en/references/judges#csharp)
 * [Bash (Deprecated)](/en/references/judges#bash)

### TESTed
TESTED is a whitebox judge that can be used for multiple programming languages.
It uses a simple custom test format, that is indpendent of the programming language.\
**Programing languages:** Bash, C, C#, Haskell, Java, Javascript, Kotlin, Python\
**Get started** [Documentation](/en/tested#designing-exercises-for-dodona), [examples](https://github.com/dodona-edu/universal-judge/tree/master/exercise) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Python
Python/Pythia is the first judge that was created for Dodona.
It is a python judge that allows simple input/output tests or more advanced doctests.\
**Programing languages:** Python\
**Get started** [Documentation](/en/references/python-judge), [examples](https://github.com/dodona-edu/example-exercises/tree/master/python) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### R
R is a judge that can be used for exercises on the R programming language.\
**Programing languages:** R\
**Get started** [Documentation](https://github.com/dodona-edu/judge-r), [examples](https://github.com/dodona-edu/example-exercises/tree/master/R) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### JUnit 
JUnit uses the JUnit4 framework to run tests on java exercises.\
**Programing languages:** Java\
**Get started** [Documentation](https://github.com/dodona-edu/judge-java), [examples](https://github.com/dodona-edu/judge-java/tree/master/examples) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### C
C is a judge that uses the GTester framework to run tests on C exercises.\
**Programing languages:** C\
**Get started** [Documentation](https://github.com/mvdcamme/C-Judge), [examples](https://github.com/mvdcamme/C-Judge/tree/master/example_exercises) \
**Created by:** [Maarten Vandercammen](mailto:mvdcamme@vub.ac.be)

### SQL
The SQL judge supports both query evaluation (DML) and structural database building (DDL).\
**Programing languages:** SQL\
**Get started** [Documentation](https://github.com/dodona-edu/judge-sql), [examples](https://github.com/dodona-edu/example-exercises/tree/master/sql) \
**Created by:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

### Prolog
Prolog is a judge that can be used for exercises on the prolog programming language.
It supports PLUnit, QuickCheck and simple input output tests.\
**Programing languages:** Prolog\
**Get started** [Documentation](https://github.com/dodona-edu/judge-prolog), [examples](https://github.com/dodona-edu/example-exercises/tree/master/prolog) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Haskell
Haskell is a judge that uses HUnit to test haskell exercises. \
**Programing languages:** Haskell\
**Get started** [Github repo](https://github.com/dodona-edu/judge-haskell), [examples](https://github.com/dodona-edu/example-exercises/tree/master/haskell) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Scheme
Scheme is a judge that can be used for exercises on the scheme programming language.\
**Programing languages:** Scheme\
**Get started** Contact the creators to get more info about this judge.\
**Created by:** [Mathijs Saey](mailto:mathijs.saey@vub.be)

### HTML
The HTML judge evaluates both the HTML and CSS code of a student, based on a model solution or a checklist of criteria.\
**Programing languages:** HTML, CSS\
**Get started** [Documentation](https://github.com/dodona-edu/judge-html), [examples](https://github.com/dodona-edu/example-exercises/tree/master/html) \
**Created by:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

### Turtle
The Turtle judge evaluates the output of a python turtle program. It calculates the similarity between the output of the student and the model solution.\
**Programing languages:** Python (Turtle)\
**Get started** [Documentation](https://github.com/dodona-edu/judge-turtle) \
**Created by:** [Brecht Willems](mailto:Brecht.Willems@UGent.be)

### Markdown
The markdown judge is not a real judge as it does not evaluate code.
It does render the markdown code of a student and can be useful to manually evaluate the output in Dodona.\
**Programing languages:** Markdown\
**Get started** [Documentation](https://github.com/dodona-edu/judge-markdown) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Javascript
Javascript is a judge that can be used for exercises on the javascript programming language.
It is undocumented and has a lot of very usecase specific implementations.
If you want to create your own javascript exercises, we recommend you to use the [TESTed judge](/en/references/judges#tested) instead.\
**Programing languages:** Javascript\
**Get started** [Github repo](https://github.com/dodona-edu/judge-javascript), [examples](https://github.com/dodona-edu/example-exercises/tree/master/javascript) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Bash
Bash is a judge that can be used for exercises on the bash terminal.
It is undocumented and has a lot of very usecase specific implementations.
If you want to create your own bash exercises, we recommend you to use the [TESTed judge](/en/references/judges#tested) instead.
**Programing languages:** Bash\
**Get started** [Examples](https://github.com/dodona-edu/example-exercises/tree/master/bash), contact the creators to get more info about this judge. \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Csharp (Deprecated)
The Csharp judge is deprecated and should only be used for legacy exercises.
If you want to create your own C# exercises, we recommend you to use the [TESTed judge](/en/references/judges#tested) instead.\
**Programing languages:** C#\
**Get started** [Examples](https://github.com/dodona-edu/example-exercises/tree/master/c%23) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Java (Deprecated)
The Java judge is a JUnit judge for java8 exercises.
It is deprecated and should only be used for legacy exercises.
If you want to create your own Java exercises, we recommend you to use the [JUnit judge](/en/references/judges#junit) instead.\
**Programing languages:** Java\
**Get started** [Documentation](https://github.com/dodona-edu/judge-java8), [examples](https://github.com/dodona-edu/example-exercises/tree/master/java) \
**Created by:** [Team dodona](mailto:dodona@ugent.be)






