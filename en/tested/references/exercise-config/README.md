---
title: Configuration for exercises
description: "The configuration options supported by TESTed"
---

# Configuration for exercises

Apart from the default Dodona options, there are a few TESTed-specific options than can be used.

## Test suite

The only mandatory option is the name of the test suite.
For compatibility reasons, this is called `testplan` at the moment.
This should be in the `evaluation` block:

```json
{
  "evaluation": {
    "testplan": "plan.json"
  }
}
```

When using the [Simplified test suites (DSL)](../../references/dsl), the extension must be `.yaml`.
In all other cases, TESTed will assume you're using a [full test suite (with JSON)](../../references/json).

## General options

Certain parts of the behaviour of TESTed can be influenced by setting options in the `options` block.
In the next section, we discuss the various options.
Their specification is given as a [JSON Schema](https://json-schema.org/).

```json
{
  "title": "OptionsModel",
  "$ref": "#/definitions/Options",
  "definitions": {
    "ExecutionMode": {
      "title": "ExecutionMode",
      "description": "An enumeration.",
      "enum": [
        "batch",
        "context"
      ],
      "type": "string"
    },
    "Options": {
      "title": "Options",
      "type": "object",
      "properties": {
        "mode": {
          "default": "batch",
          "allOf": [
            {
              "$ref": "#/definitions/ExecutionMode"
            }
          ]
        },
        "allow_fallback": {
          "title": "Allow Fallback",
          "default": true,
          "type": "boolean"
        },
        "language": {
          "title": "Language",
          "default": {},
          "type": "object",
          "additionalProperties": {
            "type": "object"
          }
        },
        "linter": {
          "title": "Linter",
          "default": true,
          "type": "boolean"
        }
      }
    }
  }
}
```

### Compilation mode

The `mode` field indicate how executable files (test code and submissions) should be compiled.
TESTed supports two modes:

* `batch`: All executable files are compiled at once.
* `context`: Each executable file is compiled separately (individual compilation).

The main advantage of the back compilation is that it's faster than the individual compilation.
As such, it is the default.

Example (using individual compilation):

```json
{
  "evaluation": {
    "options": {
      "mode": "context"
    }
  }
}
```

### Fallback for compilation

When using batch compilation,
you can allow TESTed to fall back to the individual compilation if the batch compilation fails.
This can be useful, for example, if a submission does not implement all required functions.
By default, the `allow_fallback` field is true, meaning the fallback is enabled.

Example (disabling the fallback):

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

When [adding support for a new programming language to TESTed](/en/tested/new-programming-language),
it is possible to add support for a [linter](https://en.wikipedia.org/wiki/Lint_(software)).
Following linters are supported by TESTed:

| Language   | Linter                                                 |
|------------|--------------------------------------------------------|
| Bash       | [Shellcheck](https://www.shellcheck.net/)              |
| C          | [Cppcheck](http://cppcheck.sourceforge.net/)           |
| Haskell    | [HLint](https://github.com/ndmitchell/hlint)           |
| Java       | [Checkstyle](https://github.com/checkstyle/checkstyle) |
| JavaScript | [ESLint](https://eslint.org/)                          |
| Kotlin     | [Ktlint](https://ktlint.github.io/)                    |
| Python     | [Pylint](https://pylint.pycqa.org/en/latest/)          |

You can use the field `linter` to enable or disable all linters.
Example of disabling all linters:

```json
{
  "evaluation": {
    "options": {
      "linter": false
    }
  }
}
```

You can also enable or disable linters per programming language.
For example, only enabling the JavaScript linter:

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

## Programming-language-specific options

There can also be options specific to a single programming language.
We discuss the available options below.

### Bash

With the option `shellcheck_config` you can specify a Shellcheck configuration file,
which will be used to configure the linter.
This file must be located inside the `evaluation` direction of the exercise.

Example (Shellcheck configuration):
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

With the option `hlint_config` you can specify a HLint configuration file,
which will be used to configure the linter.
This file must be located inside the `evaluation` direction of the exercise.

Example (HLint configuration):
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

With the option `checkstyle_config` you can specify a Checkstyle configuration file,
which will be used to configure the linter.
This file must be located inside the `evaluation` direction of the exercise.

Example (Checkstyle configuration):

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

With the option `eslint_config` you can specify a ESLint configuration file,
which will be used to configure the linter.
This file must be located inside the `evaluation` direction of the exercise.

Example (ESLint configuration):

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

Kotlin supports a number of options for the `ktlint` linter:

- `editorconfig`: Name of a `.editorconfig` file (see <https://editorconfig.org/>) in the `evaluation` folder of the exercise.
- `disabled_rules_ktlint`: List of rules that should be ignored by *ktlint*.
  Can also be a comma-separated string.
- `ktlint_ruleset`: Name of a JAR file with additional rules.
  This file must be in located in the `evaluation` folder of the exercise.
- `ktlint_experimental`: Boolean to indicate if *ktlint* should use experimental rules. Enabled by default.

Example (KTLint configuration):

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

With the option `pylint_config` you can specify a PyLint configuration file,
which will be used to configure the linter.
This file must be located inside the `evaluation` direction of the exercise.

Example (PyLint configuration):

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

## Full example

Below is a full configuration file of an exercise (`config.json`):

```json
{
  "access": "private",
  "description": {
    "names": {
      "en": "My exercise",
      "nl": "Mijn oefening"
    }
  },
  "evaluation": {
    "handler": "TESTed",
    "plan_name": "plan.yaml",
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
