---
title: Judges
description: "Overview of all judges available on Dodona"
---

# Judges

This guide is written for teachers who are creating exercises for Dodona.

Before you create an exercise, you should decide which `judge` you want to use.
The `judge` is the program that will evaluate the submissions of students.
It is often written for for one specific programming language, or for a set of programming languages.
Each `judge` has its own configuration options, we will provide a link to the relevant documentation for each `judge` below.
These judge specific options should be provided in the `evaluation` directory of the [exercise configuration](/en/references/exercise-directory-structure).

Advanced users can also create their own judge, see [this guide](/en/guides/creating-a-judge/).


Dodona currently supports the following judges:

### TESTed
TESTED is a whitebox judge that can be used for multiple programming languages.
It uses a simple custom exercise format, that is indpendent of the programming language.\
**Programing languages:** Bash, C, C#, Haskell, Jave, Javascript, Kotlin, Python\
**Documentation** [TESTed](/en/tested#designing-exercises-for-dodona)\
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Python
Python/Pythia is the first judge that was created for Dodona.
It is a python judge that allows simple input/output tests or more advanced doctests.\
**Programing languages:** Python\
**Documentation** [Python](/en/references/python-judge)\
**Created by:** [Team dodona](mailto:dodona@ugent.be)

### Haskell
Haskell is a judge that can be used for Haskell exercises.\
**Programing languages:** Haskell\
**Documentation** not present\
**Created by:** [Team dodona](mailto:dodona@ugent.be)





