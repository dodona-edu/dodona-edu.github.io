---
title: Exercise directory structure
description: "Exercise directory structure Dodona"
---

# Exercise directory structure

Inside an exercise repository, Dodona handles every directory containing a `config.json` file as a separate exercise or reading activity. We expect this exercise directory to have a specific structure:

- **A `config.json` file**: this file contains the [exercise-specific configuration](/en/references/exercise-config). This configuration will be merged with all `dirconfig.json` files in the exercise's ancestor directories. You can always override config values set by a higher directory.
- **An optional  `readme.md`, `readme.en.md` and/or `readme.nl.md` file:** The content of these files will be shown on the exercise info page. These files are meant to give extra context to teachers who might be interested in using this exercise in a course. If a localized file is available for a user's language (`readme.<lang>.md`) that will be shown instead of the generic `readme.md`. This is useful because `readme.md` is rendered and shown by GitHub in the exercise directory. We suggest creating a `readme.md` in the language of your target audience and optionally creating a translated `readme.nl.md` or `readme.en.md` file in the other language. Take a look at the [example exercises repository](https://github.com/dodona-edu/example-exercises) to see some examples on how to use these files.
- **A `description` directory**: this directory contains the files describing the exercise containing:
  - **A `description.en.md` and/or `description.nl.md` file**: these files contain the English and/or Dutch description of the exercise.
  - **An optional `media` directory**: this directory contains static files such as images used in the exercise description.
  - **An optional `boilerplate` directory**: this directory contains the files `boilerplate.en`, `boilerplate.nl`, and/or `boilerplate`. The contents of these files are loaded automatically in the submission text area of the users. You can use this to provide some starting code or structure to your students.
- **An `evaluation` directory**: the content of this directory is made available to the judge and can, for example, contain files containing the test code. This directory is unnecessary for reading activities. 
- **An optional `workdir` directory**: The content of this directory is made available when running the judge and can, for example, contain data files needed during execution. This directory is unnecessary for reading activities. 
- **An optional `solutions` directory**: Files in this directory will be shown on the exercise info page as sample solutions. Multiple sample solutions are possible, but files with a name starting with 'solution' will be sorted first. This directory is unnecessary for reading activities. 

Dodona ignores every other file and directory. You can thus freely create additional files (for example, containing the solutions to your exercises) or create a personal exercise hierarchy. The only thing that isn't allowed is placing exercise directories inside other exercise directories.

## Example of a valid exercise directory structure

```
+-- intsum                     # short name for the exercise
|   +-- config.json            # configuration of the exercise
|   +-- evaluation             #
|   |   +-- intsum_test.hs     # A Haskell test file
|   +-- description            #
|   |   +-- description.nl.md  # The description in dutch
|   |   +-- description.en.md  # The description in english
|   |   +-- media              #
|   |   |   +-- some_image.png # An image used in the description
|   |   +-- boilerplate        #
|   |       +-- boilerplate    # Default (here dutch?) boilerplate code
|   |       +-- boilerplate.en # English boilerplate code
|   +-- workdir                # current working dir for student code
|       +-- intlines.txt       # a file available to the student
:
```