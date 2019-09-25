---
layout: default
title: Exercise directory structure
description: "Exercise directory structure Dodona"
permalink: /references/exercise-directory-structure
parent: References
nav_order: 2
---

# Exercise directory structure

Inside an exercise repository, Dodona handles every directory containing a `config.json` file as a separate exercise. We expect this exercise directory to have a specific structure:

- **A `config.json` file**: this file contains the [exercise-specific configuration](Reference-exercise-config). This configuration will be merged with all `dirconfig.json` files in the exercise's ancestor directories. You can always override config values set by a higher directory.
- **A `description` directory**: this directory contains the files describing the exercise containing:
  - **A `description.en.md` and/or `description.nl.md` file**: these files contain the English and/or Dutch description of the exercise.
  - **An optional `media` directory**: this directory contains static files such as images used in the exercise description.
  - **An optional `boilerplate` directory**: this directory contains the files `boilerplate.en`, `boilerplate.nl`, and/or `boilerplate`. The contents of these files are loaded automatically in the submission text area of the users. You can use this to provide some starting code or structure to your students.
- **An `evaluation` directory**: the content of this directory is made available to the judge and can, for example, contain files containing the test code.
- **An optional `workdir` directory**: The content of this directory is made available when running the judge and can, for example, contain data files needed during execution.

Dodona ignores every other file and directory. You can thus freely create additional files (for example, containing the solutions to your exercises) or create a personal exercise hierarchy. The only thing that isn't allowed is placing exercise directories inside other exercise directories.

## Example of a valid repository structure

```
+-- README.md                      # Describes the repository
+-- dirconfig.json                 # Shared config for all exercises in subdirs
+-- week01                         # We could group exercises per week
|   +-- intsum                     # short name for the exercise
|   |   +-- config.json            # configuration of the exercise
|   |   +-- evaluation             #
|   |   |   ` intsum_test.hs       # A Haskell test file
|   |   +-- description            #
|   |   |   +-- description.nl.md  # The description in dutch
|   |   |   +-- description.en.md  # The description in english
|   |   |   +-- media              #
|   |   |   |   `-- some_image.png # An image used in the description
|   |   |   `-- boilerplate        #
|   |   |       +-- boilerplate    # Default (here dutch?) boilerplate code
|   |   |       `-- boilerplate.en # English boilerplate code
|   |   `-- workdir                # current working dir for student code
|   |       `-- intlines.txt       # a file available to the student
|   :
:
```
