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
    "test_suite": "suite.yaml"
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
| Python     | [Ruff](https://docs.astral.sh/ruff/)                   |
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

The attribute `eslint_config` takes the path name of an [ESLint](https://eslint.org/) configuration file,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting JavaScript submissions.
ESLint only reads configuration files in the [flat config format](https://eslint.org/docs/latest/use/configure/configuration-files), a JavaScript module such as `eslint.config.mjs`.
Here's an example that configures an ESLint configuration file `eslint.config.mjs`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "javascript": {
          "eslint_config": "eslint.config.mjs"
        }
      }
    }
  }
}
```

The configuration file replaces the default configuration of TESTed entirely, it does not extend it.
To add an exception, start from a copy of the [default configuration](https://github.com/dodona-edu/universal-judge/blob/master/tested/languages/javascript/eslint.config.mjs) and change that copy.
For example, this copy also turns on `eqeqeq` and declares `prompt` as a name that is available at runtime:

```js
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const js = require("@eslint/js");
const globals = require("globals");

const files = ["**/!(*.*)", "**/*.js"];

export default [
  { files, ...js.configs.recommended },
  {
    files,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node, ...globals.es2020, prompt: "readonly" },
    },
    rules: {
      "no-var": "warn",
      semi: "warn",
      "no-unused-vars": "off",
      eqeqeq: "error",
    },
  },
];
```

Keep two things from the default configuration in your copy:

- `files` on every configuration object. The submitted file has no extension, and ESLint skips a file that no `files` pattern matches, so without it the submission is not linted at all. The pattern `**/!(*.*)` matches files without an extension.
- `createRequire` to load packages. An `import` doesn't find the packages installed in the judge. The packages `@eslint/js`, `globals`, `@typescript-eslint/eslint-plugin` and `@typescript-eslint/parser` are available.

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

The attribute `ruff_config` takes the path name of a [Ruff](https://docs.astral.sh/ruff/) configuration file such as `ruff.toml`,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting Python submissions.
Here's an example that configures a Ruff configuration file `ruff.toml`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "python": {
          "ruff_config": "ruff.toml"
        }
      }
    }   
  }
}
```

The configuration file replaces the default rules of TESTed entirely, it does not extend them.
To add an exception, start from a copy of the [default rules](https://github.com/dodona-edu/universal-judge/blob/master/tested/languages/python/rules/ruff.toml) and add the exception to that copy.
For example, `ignore` turns off a rule, and a top-level `builtins` list declares names that are available at runtime:

```toml
builtins = ["get_choice"]

[lint]
ignore = ["SIM115"]
```

Keep the `target-version` of your copy equal to the Python version TESTed runs submissions on (currently `py315`).
Otherwise Ruff reports syntax that Python accepts as an error.

### TypeScript

The attribute `eslint_config` takes the path name of an ESLint configuration file,
relative to the `evaluation` directory of the exercise.
TESTed will use this configuration file when linting TypeScript submissions.
Here's an example that configures an ESLint configuration file `eslint.config.mjs`:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "typescript": {
          "eslint_config": "eslint.config.mjs"
        }
      }
    }
  }
}
```

The configuration file works as for [JavaScript](#javascript): it replaces the default configuration entirely and needs the same `files` and `createRequire`.
Start from a copy of the [default TypeScript configuration](https://github.com/dodona-edu/universal-judge/blob/master/tested/languages/typescript/eslint.config.mjs), which uses the `@typescript-eslint` plugin and parser and matches `**/*.ts` instead of `**/*.js`.

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
          "eslint_config": "eslint.config.mjs"
        },
        "kotlin": {
          "editorconfig": "kotlin.editorconfig",
          "ktlint_ruleset": "ktlint_rules.jar"
        },
        "python": {
          "ruff_config": "ruff.toml"
        },
        "typescript": {
          "eslint_config": "eslint.config.mjs"
        }
      }
    }
  },
  "labels": []
}
```
