---
title: "Template exercise TESTed"
description: "Tutorial: Template exercise TESTed"
---

::: warning Remark
Template exercise are used when you want to offer one exercise in multiple programming languages.
:::

# Template exercise TESTed
The TESTed judge is a programming language independent judge.
This means that written test plans are independent of the programming language of the solution.
More information see [TESTed judge](../../../references/tested-judge/).

Because of the fact that the judge is programming language independent,
you only have to write once the testplan and the description.
Then you can generate an instance foreach programming language.

## 1. Creating Git repository
The exercises for Dodona must be located in a Git repository.
The description how to create a new Git repository for Dodona,
could be found at [Creating a new exercise repo](../new-exercise-repo).

## 2. Directory structure
The directory structure for a template exercise of TESTed corresponds to a large extent with the
[expected structure by Dodona](../../../references/exercise-directory-structure).
For the template exercises, the file `config.json` is renamed to `config.template.json`.
The most important reason for this is that we don't want to display the template as exercise at Dodona.

### Example minimal directory structure
```text
+-- template/exercise/directory
|   +-- config.template.json       # Configuration template exercise
|   +-- evaluation                 #
|   |   +-- plan.yaml              # DSL-testplan
|   +-- description                #
|   |   +-- description.nl.md.mako # Markdown template exercise Dutch
|   |   +-- description.en.md.mako # Markdown template exercise English
:   :   :
```

## 3. Create testplan
To offer a programming exercise, a test plan must be written.
We assume that this test plan is in the file `evaluation/plan.yaml`. 
The documentation to create a test plan can be found at  [TESTed DSL test plans](../../../references/tested-judge/dsl).

::: tip Hint for advanced users
The template exercise can also make use of the [TESTed JSON test plans](../../../references/tested-judge/json).
:::

## 4. Create template descriptions
The template descriptions will be written in the Mako template files,
see [TESTed template descriptions](../../../references/tested-judge/template-description).
These template descriptions must be located in the files `description/description.nl.md.mako` (Dutch) and
`description/description.en.md.mako` (English).

::: tip Hint
We recommend to write the descriptions in Markdown,
see [Exercise descriptions](../../../references/exercise-description).
:::

## 5. Configuring the template exercise
How to configure an exercise is explained in [Exercise configuration](../../../references/exercise-config).
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

The `access`-field and the `description`-object are mandatory by TESTed.
The programming languages will be add to description names when an instance is generated.
Dodona also requires the `programming_language` field,
but this field will be automatically filled when generating an instance.

For the template exercise we required that also the field `evaluation.plan_name` is filled.
This field determines, which test plan will be used by TESTed.
This test plan will also be used to determine the `namespace` used by the template descriptions,
also it will be used to determine for which programming languages an instances may be generated.

## 6. Generating instances
::: warning Remark
At this moment Dodona requires for each programming language an individual exercies.

In the future we want the change this,
so that you only have to add one exercise to support multiple programming languages.
:::

After drafting the template exercise, we can instantiate it for all required programming languages.
A Python script that is part of TESTed can be used for this.
This script could be found at the [GitHub repository](https://github.com/dodona-edu/universal-judge) of TESTed.
The script can be executed with the following command in the root directory of the GitHub repository:
```shell
$ python3 -m tested.instantiate_exercise "template/exercise/directory" "instance/exercise/directory"
```

This script will, for the template exercise in the directory `template/exercise/directory`,
generate foreach programming language an instance in the directory `instance/exercise/directory/{programming_language}`.

This script has some optional options:
- `-i`, `--programming_languages_included`:
  List of programming languages for which an instance may be generated, if the testplan allowes this.
  This are all programming languages of TESTed by default.
- `-e`, `--programming_languages_excluded`:
  List of programming languages for which no instance may be generated.
  This is not a single programming language by default.
- `-n`, `--i18n`: The default natural language for the descriptions, when this can't be derived from the file name.
  Options ‘en’ (default) and ‘nl’.
- `-H`, `--human_readable`: The generated JSON-testplan from the DSL-testplan, must be human-readable.
- `-b`, `--backup_descriptions`: Keep the old `description` directory (renamed to `description.bak`).

