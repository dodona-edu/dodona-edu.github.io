---
title: Exercise directory structure
description: "Exercise directory structure Dodona"
---

# Exercise directory structure

Inside an exercise repository, Dodona handles every directory containing a `config.json` file as a separate learning activity: this can be a programming exercise or a reading activity. We expect this directory to have a specific structure:

- **A `config.json` file**: this file contains the [exercise-specific configuration](/en/references/exercise-config). This configuration will be merged with all `dirconfig.json` files in the exercise's ancestor directories. You can always override config values set by a higher directory with the `config.json`-file. 
- **An optional `readme.md`, `readme.en.md` and/or `readme.nl.md` file:** The content of these files will be shown on the exercise info page. These files are meant to give extra context to teachers who might be interested in using this exercise in a course. If a localized file is available for a user's language (`readme.<lang>.md`) that will be shown instead of the generic `readme.md`. This is useful because `readme.md` is rendered and shown by GitHub in the exercise directory. We suggest creating a `readme.md` in the language of your target audience and optionally creating a translated `readme.nl.md` or `readme.en.md` file in the other language. 
- **A `description` directory**: this directory contains the files describing the exercise containing:
  - **A `description.en.md` and/or `description.nl.md` file**: these files contain the English and/or Dutch description of the exercise.

::: tip Examples
Take a look at the [example exercises repository](https://github.com/dodona-edu/example-exercises) and [example course](https://dodona.ugent.be/en/courses/358/) to see some examples on how to use these files.
:::

## Exercise-only configuration

> These directories are only relevant for programming exercises, not reading activities.

Inside the `description` directory, you can specify the following directories:
- **An optional `media` directory**: this directory contains static files such as images used in the exercise description.
- **An optional `boilerplate` directory**: this directory contains the files `boilerplate.en`, `boilerplate.nl`, and/or `boilerplate`. The contents of these files are loaded automatically in the submission text area of the users. You can use this to provide some starting code or structure to your students.
- **An `evaluation` directory**: the content of this directory is made available to the judge and can, for example, contain files containing the test code.
- **An optional `workdir` directory**: The content of this directory is made available when running the judge and can, for example, contain data files needed during execution.
- **An optional `solution` directory**: Files in this directory will be shown on the exercise info page as sample solutions. Multiple sample solutions are possible, but files with a name starting with *solution* will be sorted first.

Dodona ignores every other file and directory. You can thus freely create additional files (for example, containing the solutions to your exercises) or create a personal exercise hierarchy. The only thing that isn't allowed is placing exercise directories inside other exercise directories.

## Example of a valid exercise directory structure

```
+-- intsum                     # Short name for the exercise
|   +-- config.json            # Configuration of the exercise
|   +-- evaluation             #
|   |   +-- intsum_test.hs     # A Haskell test file
|   +-- description            #
|   |   +-- description.nl.md  # The description in Dutch
|   |   +-- description.en.md  # The description in English
|   |   +-- media              #
|   |   |   +-- some_image.png # An image used in the description
|   |   +-- boilerplate        #
|   |       +-- boilerplate    # Default boilerplate code
|   |       +-- boilerplate.en # English boilerplate code
|   +-- solution               # Files in this directory will be shown on the exercise info page
|   |   +-- solution.nl.hs     #
|   |   +-- solution.en.hs     #
|   +-- workdir                # Current working dir for student code
|       +-- intlines.txt       # A file available to the student
:
```

## Example of a valid reading activity directory structure

```
+-- Aeneid                     # Short name for the reading activity
|   +-- config.json            # Configuration of the reading activity
|   +-- README.md              # Description of the reading activity
|   +-- description            #
|   |   +-- description.nl.md  # The description in Dutch
|   |   +-- description.en.md  # The description in English
|   |   +-- media              #
|   |   |   +-- some_image.png # An image used in the description
:
```
