---
title: Exercise configuration options
description: "Configuration options for exercises with TESTed"
order: 1
---

# Exercise configuration options

In addition to the [general configuration options](/en/references/exercise-config) for programming exercises in Dodona,
some specific options for TESTed can be used as well.

## Test suite

The `test_suite` attribute in the `evaluation` block takes the location of the test suite as a path name relative to the `evaluation` directory.

```json
{
  "evaluation": {
    "test_suite": "plan.yaml"
  }
}
```

See the reference documentation for the [DSL test suites](/en/references/tested/dsl) and the [advanced test suites](/en/references/tested/json) for a detailed description of the test suite formats.

## General options

The `evaluation` block can contain an `options` object with attributes that influence the general behaviour of TESTed.
We discuss each of these options below.

### `options.allow_fallback`

By default, TESTed generates and compiles all test code of a tab together in a single compilation unit (*batch compilation*).
This is fast, but it can fail if a submission does not implement all requirements of the exercise.
For example, if an exercise requires a student to implement two functions,
but a submission only implements a single function, this will result in a compilation error for Java submissions.

When the boolean attribute `allow_fallback` is set to `true` (the default value),
TESTed automatically falls back to compiling the test code per context (*contextual compilation*) when batch compilation fails.
This may be useful with submissions that do not implement all requirements of the exercise.

Here's an example that disables this fallback:

```json
{
  "evaluation": {
    "options": {
      "allow_fallback": false
    }
  }
}
```

### `options.compiler_optimizations`

By default, TESTed compiles test code without compiler optimizations,
because the additional compilation time is often much larger than the gains in execution time for short exercises.
When the boolean attribute `compiler_optimizations` is set to `true` (the default value is `false`),
compiler optimizations are enabled for the languages whose compiler supports them: C, C++ and Haskell.
This may be useful for longer exercises, or exercises where the solution depends on optimization.

```json
{
  "evaluation": {
    "options": {
      "compiler_optimizations": true
    }
  }
}
```

### `options.parallel`

When the boolean attribute `parallel` is set to `true` (the default value is `false`),
TESTed executes the contexts of the test suite in parallel.
This may be worth investigating for exercises that are computationally heavy.
It is recommended to keep this disabled for exercises that are already multithreaded.

```json
{
  "evaluation": {
    "options": {
      "parallel": true
    }
  }
}
```

## Linters

When [adding support for a new programming language to TESTed](/en/references/tested/new-programming-language),
it is possible to configure a [linter](https://en.wikipedia.org/wiki/Lint_(software)) that TESTed will use for static code analysis when processing submission for that language.
TESTed currently uses the following linters:

| Language   | Linter                                                 |
|------------|--------------------------------------------------------|
| Bash       | [Shellcheck](https://www.shellcheck.net/)              |
| C          | [Cppcheck](http://cppcheck.sourceforge.net/)           |
| C++        | [Cppcheck](http://cppcheck.sourceforge.net/)           |
| Haskell    | [HLint](https://github.com/ndmitchell/hlint)           |
| Java       | [Checkstyle](https://github.com/checkstyle/checkstyle) |
| JavaScript | [ESLint](https://eslint.org/)                          |
| Kotlin     | [Ktlint](https://ktlint.github.io/)                    |
| Python     | [Pylint](https://pylint.pycqa.org/en/latest/)          |
| TypeScript | [ESLint](https://eslint.org/)                          |

The boolean attribute `options.linter` can be used to enable (`true`) or disable (`false`) linting for a programming exercise,
either for all programming languages at once or for individual languages.
Here's an example that disables linting for all programming languages:

```json
{
  "evaluation": {
    "options": {
      "linter": false
    }
  }
}
```

Here's an example that only enables linting for JavaScript:

```json
{
  "evaluation": {
    "options": {
      "linter": false,
      "language": {
        "javascript": {
          "linter": true
        }
      } 
    }
  }
}
```

## Options for individual programming languages

Programming language modules for TESTed can use their own specific options.
Here's an overview of the options that can be used with the programming languages that are currently supported by TESTed.

### Bash

The attribute `shellcheck_config` takes the path name of a Shellcheck configuration file,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting Bash submissions.
Here's an example that configures a Shellcheck configuration file `shellcheckrc`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "bash": {
          "shellcheck_config": "shellcheckrc"
        }
      }
    }
  }
}
```

### Haskell

The attribute `hlint_config` takes the path name of a HLint configuration file,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting Haskell submissions.
Here's an example that configures a HLint configuration file `hlint.config.yaml`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "haskell": {
          "hlint_config": "hlint.config.yaml"
        }
      }
    }
  }
}
```

### Java

The attribute `checkstyle_config` takes the path name of a Checkstyle configuration file,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting Java submissions.
Here's an example that configures a Checkstyle configuration file `java_style.xml`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "java": {
          "checkstyle_config": "java_style.xml"
        }
      }
    }
  }
}
```

### JavaScript

The attribute `eslint_config` takes the path name of a ESLint configuration file,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting JavaScript submissions.
Here's an example that configures a ESLint configuration file `eslintrc.yaml`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "javascript": {
          "eslint_config": "eslintrc.yaml"
        }
      }
    }
  }
}
```

### Kotlin

TESTed supports the following attributes for linting Kotlin submissions:

- `editorconfig`: Path name of a `editorconfig` file, relative to the `evaluation` directory of the exercise (see <https://editorconfig.org/>).
- `ktlint_ruleset`: Path name of a JAR file with additional rules, relative to the `evaluation` directory of the exercise.

Here's an example that shows some of these attributes in action:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "kotlin": {
          "editorconfig": "kotlin.editorconfig",
          "ktlint_ruleset": "ktlint_rules.jar"
        }
      }
    }   
  }
}
```

### Python

The attribute `pylint_config` takes the path name of a PyLint configuration file,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting Python submissions.
Here's an example that configures a PyLint configuration file `pylint.rc`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "python": {
          "pylint_config": "pylint.rc"
        }
      }
    }   
  }
}
```

### TypeScript

The attribute `eslint_config` takes the path name of a ESLint configuration file,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting TypeScript submissions.
Here's an example that configures a ESLint configuration file `eslintrc.yaml`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "typescript": {
          "eslint_config": "eslintrc.yaml"
        }
      }
    }
  }
}
```

## Complete example

Here's an example of a complete configuration file (`config.json`) for a Dodona programming exercise that uses TESTed for automatic feedback generation:

```json
{
  "access": "public",
  "description": {
    "names": {
      "en": "My exercise",
      "nl": "Mijn oefening"
    }
  },
  "evaluation": {
    "handler": "tested",
    "test_suite": "suite.yaml",
    "options": {
      "allow_fallback": true,
      "linter": true,
      "language": {
        "haskell": {
          "hlint_config": "hlint.config.yaml"
        },
        "java": {
          "checkstyle_config": "java_style.xml"
        },
        "javascript": {
          "eslint_config": "eslintrc.yaml"
        },
        "kotlin": {
          "editorconfig": "kotlin.editorconfig",
          "ktlint_ruleset": "ktlint_rules.jar"
        },
        "python": {
          "pylint_config": "pylint.rc"
        },
        "typescript": {
          "eslint_config": "eslintrc.yaml"
        }
      }
    }
  },
  "labels": []
}
```
