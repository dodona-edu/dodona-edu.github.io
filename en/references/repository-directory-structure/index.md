---
title: Repository directory structure
description: "Repository directory structure Dodona"
order: 4
---

# Repository directory structure

A repository directory contains a collection of exercises. We expect this repository directory to have a specific structure:

- **A `dirconfig.json` file**: this file contains the [repository-wide configuration](/en/references/exercise-config). This configuration will be merged with the `config.json` file in an exercise's directory. These values can be overridden by the config files in the lower directory.
- **A `public` directory**: this directory contains files that can be used anywhere in Dodona:
You can add pictures or other resources that can then be referred to in the description of the course or a series. The URL to these files can be found on the repository page on Dodona. These are public elements, so these files should not be confidential.
- **A `media` directory**: this directory contains media files that can be used in all exercise descriptions in that repository only. Dodona will automatically fallback to this folder if a media item is referred to but not found in the `media` directory of the exercise it was used in.
- **Optionally multiple `exercise` directories**: these directories contain the information for the individual exercises. For more information regarding their structure, please see the [exercise directory structure page](/en/references/exercise-directory-structure).
- **Optionally a `.dodonaignore` file**: this file lists the paths that Dodona should not copy from your repository. See [excluding files with `.dodonaignore`](#excluding-files-with-dodonaignore) below.

Dodona ignores other files and directories. You can thus freely create additional files (for example, containing the solutions to your exercises) or create a personal exercise hierarchy. The only thing that isn't allowed is placing exercise directories inside other exercise directories.

## Excluding files with `.dodonaignore`

Everything in your repository is copied to Dodona when you push. Add a `.dodonaignore` file to the root of your repository to keep some paths out. It works like a `.gitignore`, except that the files stay in your git repository and are only kept away from Dodona. That is useful for material the platform has no use for, such as sample solutions, large test data or generated files.

Each line is one path pattern:

```
solutions/
*.pyc
/scratch/
```

A pattern without a leading slash matches anywhere in the repository, a pattern that starts with a slash only matches at the root of the repository, and a trailing slash restricts the pattern to directories. The `.dodonaignore` file itself is never copied either.

The file is read on every synchronisation, so adding or editing it takes effect on your next push: paths that were copied before are then removed from Dodona as well. Remove a pattern again and the files reappear on the push after that.

::: warning Keep the files that Dodona needs
A pattern that is too broad, such as an unanchored `tests` or a stray `*`, also excludes files that Dodona needs to judge submissions. For judge repositories this is checked: a `.dodonaignore` that would exclude `config.json` or `run` makes the synchronisation fail and the last working version stays in place. The administrator of the repository receives an email whenever a synchronisation fails.
:::

## Example of a valid repository structure

::: tip Examples
Take a look at the [example exercises repository](https://github.com/dodona-edu/example-exercises) and [example course](https://dodona.be/en/courses/358/) to see some examples of a valid repository structure.
:::

```
+-- README.md                      # Describes the repository
+-- .dodonaignore                  # Optional: paths that are not copied to Dodona
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
|   |   +-- preparation            # an optional directory you can use to store files you used to create the exercises
|   |   +-- workdir                # current working dir for student code
|   |       +-- intlines.txt       # a file available to the student
|   :
:
```
