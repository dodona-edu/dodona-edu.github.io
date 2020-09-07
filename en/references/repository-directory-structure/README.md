---
title: Repository directory structure
description: "Repository directory structure Dodona"
---

# Repository directory structure

A repository directory contains a collection of exercises. We expect this repository directory to have a specific structure:

- **A `dirconfig.json` file**: this file contains the [repository-wide configuration](/en/references/exercise-config). This configuration will be merged with the `config.json` file in an exercise's directory. These values can be overridden by the config files in the lower directory.
- **A `public` directory**: this directory contains files that can be used anywhere in Dodona:
You can add pictures or other resources that can then be referred to in the description of the course or a series. The URL to these files can be found on the repository page on Dodona. These are public elements, so these files should not be confidential.
- **A `media` directory**: this directory contains media files that can be used in all exercise descriptions in that repository only. Dodona will automatically fallback to this folder if a media item is referred to but not found in the `media` directory of the exercise it was used in.
- **Optionally multiple `exercise` directories**: these directories contain the information for the individual exercises. For more information regarding their structure, please see the [exercise directory structure page](/en/references/exercise-directory-structure).

Dodona ignores other files and directories. You can thus freely create additional files (for example, containing the solutions to your exercises) or create a personal exercise hierarchy. The only thing that isn't allowed is placing exercise directories inside other exercise directories.

## Example of a valid repository structure

```
+-- README.md                      # Describes the repository
+-- public                         # Contains files that belong to the course or series
|   +-- CodersApprentice.png       # An example image to reuse throughout the course
+-- media                          # Contains files that can be used in any exercise description
|   +-- RedBlackTree.png           # An example image if you have multiple exercises involving red-black trees
+-- dirconfig.json                 # Shared config for all exercises in subdirs
+-- week01                         # We could group exercises per week
|   +-- intsum                     # short name for the exercise
|   |   +-- config.json            # configuration of the exercise
|   |   +-- evaluation             #
|   |   |   +-- intsum_test.hs     # A Haskell test file
|   |   +-- description            #
|   |   |   +-- description.nl.md  # The description in Dutch
|   |   |   +-- description.en.md  # The description in English
|   |   |   +-- media              #
|   |   |   |   +-- some_image.png # An image used in the description
|   |   |   +-- boilerplate        #
|   |   |       +-- boilerplate    # Default (here Dutch?) boilerplate code
|   |   |       +-- boilerplate.en # English boilerplate code
|   |   +-- workdir                # current working dir for student code
|   |       +-- intlines.txt       # a file available to the student
|   :
:
```