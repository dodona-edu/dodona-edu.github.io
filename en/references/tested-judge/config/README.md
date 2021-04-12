---
title: Configuration TESTed
description: "Configuration TESTed"
sidebarDepth: 2
---

# Configuration TESTed
The TESTed judge has one required field `evaluation.plan_name` in het `config.json` file of a Dodona exercise.
This field must contain the name of the test plan, in the `evaluation`-folder.
The test plan can be either a [DSL test plan](../dsl) or an [advanced test plan](../json).
The DLS test plans must end on one of the YAML extensions (`.yaml` or `.yml`).
For the advanced test plans, there are no restrictions about the file extension, except the YAML extensions.

In addition to the mandatory test plan field, TESTed has some configuration options that can be set.
The options must be set in the `config.json` of the Dodona exercise (see [Exercise config](../../exercise-config)).
The options must be set in the object `evaluation.options`.

## JSON Scheme
Below you can find the JSON Scheme of the different options.
These options will be discussed in the next paragraphs.
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
        "parallel": {
          "title": "Parallel",
          "default": false,
          "type": "boolean"
        },
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
          "default": {},
          "type": "object",
          "additionalProperties": {
            "type": "boolean"
          }
        },
        "optimized": {
          "title": "Optimized",
          "default": true,
          "type": "boolean"
        }
      }
    }
  }
}
```

## Parallelisation
The field `parallel` specifies whether the evaluations may be executed in parallel.
The parallellisation has effect on the different executables for one tab.
By default, there will be no parallellisation.

Example of applying parallelisation:
```json
{
  "evaluation": {
    "options": {
      "parallel": true
    }   
  }
}
```

## Compilation mode
The field `mode` indicates how to compile.
TESTed support two modes:
1) Compile all executables at once (`batch`).
2) Compile each executable file separately (`context`, individual compilation).

`batch` compilation has as result that there will be less time spend at compiling test and solution code,
when we compare it to the individual compilation.

By default, will TESTed compile all executables in one step.

Example individual compilation:
```json
{
  "evaluation": {
    "options": {
      "mode": "context"
    }
  }
}
```

### Compilation fallback
When you use the `batch` compilation you can set whether you can switch to the individual compilation,
when the `batch` compilation fails.
For this you use the `allow_fallback` field.
By default, will TESTed fallback to the individual compilation, when the `batch` compilation fails.

Example disabling compilation fallback:
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

## Optimized python evaluation
The field `optimized` is used to indicate whether the programmed Python evaluators may be optimized.
By optimized we mean that they will be executed in the same process as TESTed.
Otherwise, they will be executed in a separate proces, which has a non-negligible performance overhead.
By default, will TESTed use the optimized evaluation.

Example not-optimized Python evaluation:
```json
{
  "evaluation": {
    "options": {
      "optimized": false
    }   
  }
}
```

## Linters
The TESTed judge has support for the linters.
For each programming language it can be decided whether you wish to use the linter for that programming language.
The linters used are:
| Programming language | Linter     |
| -------------------- | ---------- |
| C                    | Cppcheck   |
| Haskell              | HLint      |
| Java                 | Checkstyle |
| JavaScript           | ESLint     |
| Kotlin               | KTLint     |
| Python               | PYLint     |

The linters could be set in the object associated with the field `linter`.
The keys of this object are the supported programming languages.
A boolean will indicate if the linters should be used or not.
By default, the linters will be used for every programming language.

Example disabling linters:
```json
{
  "evaluation": {
    "options": {
      "linter": {
        "c": false,
        "haskell": false,
        "java": false,
        "javascript": false,
        "kotlin": false,
        "python": false
      }
    }
  }
}
```

## Programming language specific
Next to the configuration options for TESTed itself, there are also programming language specific optional options.
These options are set in the object associated with the field `evaluation.language`.

### C
The programming language C has no programming language specific options.

### Haskell
The programming language Haskell has one option: `hlint_config`.
This option expects a file name of a HLint configuration file.
This file must be located in the `evaluation` folder of the Dodona exercise.

Example HLint configuration:
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
The programming language Java has one option: `checkstyle_config`.
This option expects the file name of the Checkstyle config file.
This file must be located in the `evaluation` folder of the Dodona exercise.

Example Checkstyle configuration:
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
De scripting language JavaScript has one option: `eslint_config`.
This option expects the file name of the ESLint config file.
This file must be located in the `evaluation` folder of the Dodona exerise.

Example ESLint configuration:
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
The programming language Kotlin has 4 options:
`editorconfig`, `disabled_rules_ktlint`, `ktlint_ruleset` and `ktlint_experimental`.
Al these options will be used by the *KTLint* linter.
- `editorconfig`: file name of the `.editorconfig` file (see <https://editorconfig.org/>) in the `evaluation` folder
  of the Dodona exercise.
- `disabled_rules_ktlint`: a list of *KTLint* rules that must be disabled.
  A comma separated string of rules could also be used.
- `ktlint_ruleset`: A file name for a JAR file with extra rules.
  This file must be located in the `evaluation` folder of the Dodona exercise.
- `ktlint_experimental`: This options specifies of the experimental linter rules may be used.
  By default, these rules will be used.

Example KTLint configuration:
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
The scripting language Python has one option: `pylint_config`.
This option expects the file name of the PYLint config file.
This file must be located in the `evaluation` folder of the Dodona exerise.

Example PYLint configuration:
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

## Example full `config.json`
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
      "parallel": true,
      "mode": "batch",
      "allow_fallback": true,
      "optimized": true,
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
