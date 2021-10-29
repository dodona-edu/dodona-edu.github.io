---
title: TESTed judge
description: "TESTed judge"
---

# TESTed judge

This is the reference for the **TESTed** judge.
**TESTed** is a polyglot judge, supporting multiple programming languages.

## Supported programming languages

**TESTed** supports 7 programming languages:

* Bash 5.0.3
* C (gcc 8.3.0)
* Haskell (ghc 8.4.4)
* Java 11
* JavaScript (NodeJS v14)
* Kotlin 1.4.10
* Python 3.9

## Creating exercises
As with all exercises for Dodona, you'll need to write a description and define some tests. For TESTed, the tests are written in a testplan. Since TESTed supports multiple programming languages, an exercise is not written directly. Instead, an exercise template is written, which will be converted to the actual exercises by TESTed.

You probably want to start with the [guide on creating an exercise template](template-exercise).

We also have some useful references:
- [Simple testplans using the DSL](dsl)
- [Advanced testplans using JSON](json)
- [Configuration TESTed exercise](exercise-config)
- [Description templates](template-description)

## Adding a programming language

Adding a programming language to TESTed is relatively easy. If you want to add one, we recommend that you contact us first.
We do have a comprehensive guide on [\[nl\] adding a new programming language](configure-new-programming-language), if you want to have an idea of what it takes to add a programming language to TESTed.
