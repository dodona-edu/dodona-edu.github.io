---
title: Repository directory structure
description: "Repository directory structure Dodona"
---

# Repository directory structure

A repository directory contains all the directories and files that make up a course. We expect this repository directory to have a specific structure:

- **A `dirconfig.json` file**: this file contains the [repository-wide configuration](/en/references/exercise-config). This configuration will be merged with the `config.json` file in an exercise's directory. These values can be overridden by the config files in the lower directory.
- **A `public` directory**: this directory contains files that are relevant for the whole course or series:
  You can add pictures or other resources that can then be referred to in the description of the course or a series. These are public elements, so these files should not be confidential.
- **Optionally multiple `exercise` directories**: these directories contain the information for the individual exercises, possibly grouped within series. For more information regarding their structure, please see the [exercise directory structure page](/en/references/exercise-directory-structure). An example can be found below, where `intsum` is the name of the exercise directory, found within the series directory `week01`.

Dodona ignores every other file and directory. You can thus freely create additional files (for example, containing the solutions to your exercises) or create a personal exercise hierarchy. The only thing that isn't allowed is placing exercise directories inside other exercise directories.

## Example of a valid repository structure

```
+-- README.md                      # Describes the repository
+-- public                         # Contains files that belong to the course or series
|   +-- CodersApprentice.png       # An example image to reuse throughout the course
+-- dirconfig.json                 # Shared config for all exercises in subdirs
+-- week01                         # We could group exercises per week
|   +-- intsum                     # short name for the exercise
|   |   +-- config.json            # configuration of the exercise
|   |   +-- evaluation             #
|   |   |   `-- intsum_test.hs       # A Haskell test file
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