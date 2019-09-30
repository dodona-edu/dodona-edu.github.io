---
layout: default
title: Exercise config
description: "Exercise config reference Dodona"
permalink: /references/exercise-config/
parent: References
nav_order: 2
lang: en
---

# Exercise configuration

Dodona allows setting the configuration of an exercise using config files. These files are in the JSON format and must be named `config.json` in exercise directories and `dirconfig.json` for other directories. To determine the final config values for an exercise, Dodona merges the default config file with the dirconfigs in the parent directories of the exercise and with the exercise config. Merging happens in such a way that you can always override values set in a parent directory.

## Config file structure

- `programming_language` (string): the programming language of the exercise, used for syntax highlighting and correct file extensions
- `access` (`public` or `private`): determines who can use this exercise
  - public: any other teacher on Dodona can use this exercise
  - private: only teachers with explicit permission can use this exercise
- `description` (object): the specification of the description of the exercise
  - `names` (object): the name of the exercise
    - `nl`: the name of the exercise in Dutch
    - `en`: the name of the exercise in English
- `evaluation`: the specification of the evaluation procedure
  - `handler` (string, optional): the name of the judge that is used for evaluation. By default, Dodona uses the judge specified for the repository.
  - `image` (string, optional): the name of the docker image that is used for evaluation. By default, Dodona uses the image specified by the judge.
  - `time_limit` (integer, optional): the time in seconds before the evaluations times out. By default, the limit is 42 seconds.
  - `memory_limit` (integer, optional): the amount of memory in bytes that is available for running the evaluation. By default, the limit is 100MB.
  - `network_enabled` (boolean, optional): set to `true` if internet access should be enabled. This optional setting is false by default.
- `labels` (array of strings, optional): a list of labels that can be used to search for this exercise using the Dodona web interface.

## Example config file

```json
{
  "programming_language": "python",
  "access": "public",
  "description": {
    "names": {
      "nl": "Voorbeeld oefening",
      "en": "Example exercise"
    }
  },
  "evaluation": {
    "handler": "pythia",
    "image": "biopythia",
    "time_limit": 10,
    "memory_limit": 10000000,
    "network_enabled": true
  },
  "labels": ["voorbeeld", "eenvoudige oefening"]
}
```
