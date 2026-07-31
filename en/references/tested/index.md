---
title: TESTed judge
description: "TESTed judge"
order: 5
---

# TESTed: one judge to rule them all

::: tip
This is the extended documentation for the TESTed judge. A guide aimed at teachers who are creating an exercise for the first time is available in [this guide](/en/guides/exercises/).
:::

TESTed is an *educational software testing framework* (also known as a *judge*)
to test submissions for programming exercises using a programming-language-independent test suite.
It allows specifying software requirements (i.e. the tests) for an exercise once,
while submissions in different programming languages can be tested automatically.
TESTed can be used as a standalone command line tool,
but it's also integrated as a judge into the online learning platform [Dodona](https://dodona.be).

## When to use TESTed?

The first requirement to using TESTed is that TESTed must support your target programming language(s).
Currently, the following languages are supported:

* Bash
* C (gcc)
* C++ (g++)
* Haskell (ghc)
* Java
* JavaScript (NodeJS)
* Kotlin
* Python
* C# (.NET)

Because programming exercises underpinned by TESTed are independent of any programming language,
TESTed is best suited for the following kinds of exercises:

- Exercises on generic concepts that are found in (almost) all programming languages.
- Exercises that focus on algorithms or high-level programming concepts, not on specific syntax or constructs of programming languages.

TESTed is thus less suitable for exercises that focus on syntax or concepts for a specific programming language.
For example, exercises on C pointers won't work well with TESTed.

## TESTed in a nutshell

Consider an exercise called "echo" with the following problem statement:

> Define a function `echo` that outputs its string argument to _stdout_.

A single test suite is enough to test submissions in every supported programming language:

```yaml
- tab: "Echo"
  testcases:
     - expression: "echo('input-1')"
       stdout: "input-1"
```

Here are some correct submissions for this exercise in a couple of different programming languages:

::: code-group

```bash [Bash]
function echo {
    echo "$1"
}
```

```c [C]
#include <stdio.h>

void echo(char* what) {
    printf("%s", what);
}
```

```cpp [C++]
#include <iostream>

void echo(std::string what) {
    std::cout << what;
}
```

```haskell [Haskell]
echo = putStrLn
```

```java [Java]
class Submission {
    public static void echo(String what) {
        System.out.println(what);
    }
}
```

```javascript [JavaScript]
function echo(what) {
  console.log(what);
}
```

```kotlin [Kotlin]
fun echo(what: String) {
    println(what)
}
```

```python [Python]
def echo(argument):
    print(argument)
```

```csharp [C#]
using System;

class Submission
{
    public static void Echo(string content)
    {
        Console.WriteLine(content);
    }
}
```

:::

## Getting started

A step-by-step tutorial on creating TESTed exercises for Dodona, from setting up a repository to writing test suites, is available in the [creating exercises guide](/en/guides/exercises/creating-exercises/introduction/).
If you want to use TESTed outside of Dodona, we recommend following [this tutorial](https://github.com/dodona-edu/universal-judge) instead.

A number of technical specifications are also available:

- [Configuration options](/en/references/tested/exercise-config)
- [Reference for DSL test suites](/en/references/tested/dsl) (recommended)
- [Reference for advanced test suites](/en/references/tested/json) (not recommended for general use)
- [Data types for programming languages](/en/references/tested/types)

Useful guides if you want to work on TESTed itself:

- The [installation instructions](https://github.com/dodona-edu/universal-judge) to run TESTed locally.
- A [guide on adding a programming language](/en/references/tested/new-programming-language).
