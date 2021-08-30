---
title: "Exercise templates for TESTed"
description: "Tutorial: Exercise template for TESTed"
---

::: warning Remark
Exercise templates are used when you want to make an exercise available in multiple programming languages.
:::

# Template exercise TESTed
TESTed is a polyglot judge, meaning it supports multiple programming languages.
This is achieved by using programming language independent exercises: you write one exercise, which is then solvable in multiple programming languages (see the [reference on TESTed](../) for more information).

However, Dodona still expects each exercise to be for one specific programming language.
As a solution, this guide introduces the concept of an exercise template.
This is a programming language independent exercise description, which is converted to a programming language specific (and Dodona compatible) exercise by TESTed.

## 1. Create a Git repository
Exercise templates must be located in a git repository, just as normal exercises.
Refer to the [guide on create exercise repositories](../../guides/teachers/new-exercise-repo) for more information.

## 2. Directory structure
The directory structure for an exercise template for TESTed corresponds to a large extent with the
[expected structure by Dodona](../../references/exercise-directory-structure).
For the exercise templates, the file `config.json` is renamed to `config.template.json`.
The most important reason for this is that we don't want to display the template itself as an exercise in Dodona.

### Minimal directory structure

The following is an example of the minimal directory structure you'll need:
```text
+-- template/exercise/directory
|   +-- config.template.json       # Template configuration
|   +-- evaluation                 #
|   |   +-- plan.yaml              # DSL-test plan
|   +-- description                #
|   |   +-- description.nl.md.mako # Markdown exercise template for Dutch
|   |   +-- description.en.md.mako # Markdown exercise template for English
:   :   :
```

## 3. Create a test plan
The tests for a TESTed exercise are written in a test plan.
The documentation for creating test plans can be found at  [TESTed DSL test plans](../dsl).
We assume that this test plan is located at `evaluation/plan.yaml` in the repository. 

::: tip Hint for advanced users
You can also use [advanced test plans](../json) with the exercise templates.
:::

## 4. Create the description templates
The description templates will be written using the Mako templating system.
See [TESTed description templates](../template-description).
These description templates must be located at `description/description.nl.md.mako` (Dutch) and
`description/description.en.md.mako` (English).

::: tip Hint
We recommend writing the descriptions in Markdown,
see [Exercise descriptions](../../references/exercise-description) for the Markdown constructs supported by Dodona.
:::

## 5. Configuring the exercise templates
The general configuration of an exercise is explained in [Exercise configuration](../exercise-config).
We will see the specific configuration for TESTed in `config.template.json`.

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
    "memory_limit": 500000000,
    "plan_name": "plan.yaml"
  },
  "labels": []
}
```

The `access`-field and the `description`-object are mandatory by Dodona.
The programming languages will be added to description names when an instance is generated.
Dodona also requires the `programming_language` field,
but this field will be automatically filled when generating an instance.

For the template exercise TESTed required that the field `evaluation.plan_name` is filled.
This field determines, which test plan will be used by TESTed.
This test plan will also be used to determine the `namespace` used by the template descriptions,
also it will be used to determine for which programming languages an instances may be generated.

Example of final configuration file for Java:

```json
{
  "access": "private",
  "description": {
    "names": {
      "en": "My exercise (java)",
      "nl": "Mijn oefening (java)"
    }
  },
  "programming_language": "java",
  "evaluation": {
    "handler": "TESTed",
    "memory_limit": 500000000,
    "plan_name": "plan.yaml"
  },
  "labels": []
}
```

## 6. Generate the exercise instances
::: warning Remark
Dodona currently requires a separate exercise for each programming language.

We're exploring changing this in the future, with the goal of supporting multiple programming languages for the same exercise in Dodona.
:::

After writing the exercise template, we can use it to generate the programming language specific exercises.
TESTed provides a Python script specifically created to do this.
This script can be found in TESTed's [GitHub repository](https://github.com/dodona-edu/universal-judge).
The script can be executed with the following command in the root directory of the GitHub repository:
```shell
$ python3 -m tested.instantiate_exercise "template/exercise/directory" "instance/exercise/directory"
```

This script will, for the template exercise in the directory `template/exercise/directory`,
generate a programming language specific exercise in the directory `instance/exercise/directory/{programming_language}` for each supported programming language.

This script has some optional options:
- `-i`, `--programming_languages_included`:
  List of programming languages for which an exercise may be generated, if the test plan allows this.
  By default, an exercise is generated for each programming language supported by TESTed.
- `-e`, `--programming_languages_excluded`:
  List of programming languages for which no exercise may be generated.
  Default empty.
- `-n`, `--i18n`: The default natural language for the descriptions, when this can't be derived from the file name.
  Options ‘en’ (default) and ‘nl’.
- `-H`, `--human_readable`: The generated JSON-test plan from the DSL-test plan must be human-readable.
- `-b`, `--backup_descriptions`: Keep existing exercise descriptions. The `description` directory will be renamed to `description.bak`.
