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

### `options.mode`

The `mode` attribute indicates how test code is generated and compiled (along with submissions).
Two modes are supported:

* `batch` (default): All test code in a tab is generated and compiled in a single compilation unit (batch compilation).
* `context`: Test code is generated and compiled per context (contextual compilation).

The compilation process is faster with batch compilation than with contextual compilation,
but may fail if a submission does not implement all requirements of the exercise.
For example, if an exercise requires a student to implement two functions,
but a submission only implements a single function, this will result in a compilation error for Java submissions.
See the next attribute for a workaround.

Here's an example that uses contextual compilation:

```json
{
  "evaluation": {
    "options": {
      "mode": "context"
    }
  }
}
```

### `options.allow_fallback`

When the boolean attribute `allow_fallback` is set to true (the default value),
TESTed automatically falls back to contextual compilation when batch compilation fails.
This may be useful with submissions that do not implement all requirements of the exercise.

Here's an example that disables falling back to contextual compilation:

```json
{
  "evaluation": {
    "options": {
      "mode": "batch",
      "allow_fallback": false
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
| Haskell    | [HLint](https://github.com/ndmitchell/hlint)           |
| Java       | [Checkstyle](https://github.com/checkstyle/checkstyle) |
| JavaScript | [ESLint](https://eslint.org/)                          |
| Kotlin     | [Ktlint](https://ktlint.github.io/)                    |
| Python     | [Pylint](https://pylint.pycqa.org/en/latest/)          |

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
- `disabled_rules_ktlint`: Rules that should be ignored by `ktlint`, either provided as a list of strings or as a comma-separated string.
- `ktlint_ruleset`: Path name of a JAR file with additional rules, relative to the `evaluation` directory of the exercise.
- `ktlint_experimental`: Boolean value that indicates if `ktlint` should use experimental rules (`true`; default value) or not (`false`).

Here's an example that shows some of these attributes in action:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "kotlin": {
          "editorconfig": "kotlin.editorconfig",
          "disabled_rules_ktlint": ["filename"],
          "ktlint_ruleset": "ktlint_rules.jar",
          "ktlint_experimental": false
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
    "handler": "TESTed",
    "test_suite": "suite.yaml",
    "options": {
      "mode": "batch",
      "allow_fallback": true,
      "linter": {
        "c": true,
        "haskell": true,
        "java": true,
        "javascript": true,
        "kotlin": true,
        "python": true
      },
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
          "disabled_rules_ktlint": ["filename"],
          "ktlint_ruleset": "ktlint_rules.jar",
          "ktlint_experimental": false
        },
        "python": {
          "pylint_config": "pylint.rc"
        }
      }
    }
  },
  "labels": []
}
```
