---
title: Exercise config
description: "Exercise config reference Dodona"
---

# Exercise configuration

Dodona allows setting the configuration of an **exercise** and a **reading activity** using config files. These files are in the JSON format and must be named `config.json` in exercise directories and `dirconfig.json` for other directories. To determine the final config values for a learning activity, Dodona merges the default config file with the dirconfigs in the parent directories of the exercise and with the exercise config. Merging happens in such a way that you can always override values set in a parent directory.

## Config file structure for exercises

- **`type`**: Must be set to `exercise` for exercises. Defaults to `exercise` if not present.
- **`programming_language`** (string): the programming language of the exercise, used for syntax highlighting and correct file extensions
- **`access`** (`public` or `private`): determines who can use this exercise
  - `public`: any other teacher on Dodona can use this exercise
  - `private`: only teachers with explicit permission can use this exercise
- **`description`** (object): the specification of the description of the exercise
  - **`names`** (object): the name of the exercise
    - **`nl`**: the name of the exercise in Dutch
    - **`en`**: the name of the exercise in English
- **`evaluation`**: the specification of the evaluation procedure
  - **`handler`** (string, optional): the name of the judge that is used for evaluation. By default, Dodona uses the judge specified for the repository.
  - **`image`** (string, optional): the name of the docker image that is used for evaluation. By default, Dodona uses the image specified by the judge.
  - **`time_limit`** (integer, optional): the time in seconds before the evaluations times out. By default, the limit is 42 seconds.
  - **`memory_limit`** (integer, optional): the amount of memory in bytes that is available for running the evaluation. By default, the limit is 100MB.
  - **`network_enabled`** (**`false`** or `true`) (boolean, optional): set to `true` if internet access should be enabled. This optional setting is false by default.
- **`labels`** (array of strings, optional): a list of labels that can be used to search for this exercise using the Dodona web interface.
- **`contact`** (string, optional): info about the author of this exercise, formatted like an email To header.

## Config file structure for reading activities

The structure for a reading activity is identical to that of an exercise. There are 2 big differences: the value of `type` must be set to `content` and keys that are not relevant for exercises can be omitted. The format of the description is also identical.

- **`type`**: Must be set to `content` for reading activities
- **`access`** (`public` or `private`): determines who can use this exercise
  - `public`: any other teacher on Dodona can use this exercise
  - `private`: only teachers with explicit permission can use this exercise
- **`description`** (object): the specification of the description of the exercise
  - **`names`** (object): the name of the exercise
    - **`nl`**: the name of the exercise in Dutch
    - **`en`**: the name of the exercise in English
- **`labels`** (array of strings, optional): a list of labels that can be used to search for this exercise using the Dodona web interface.
- **`contact`** (string, optional): info about the author of this reading activity, formatted like an email To header.

## Example config file

### Exercise

```json
{
  "type": "exercise",
  "programming_language": "python",
  "access": "public",
  "description": {
    "names": {
      "nl": "Voorbeeld oefening",
      "en": "Example exercise"
    }
  },
  "evaluation": {
    "handler": "python",
    "image": "dodona/dodona-python",
    "time_limit": 10,
    "memory_limit": 10000000,
    "network_enabled": true
  },
  "labels": ["voorbeeld", "eenvoudige oefening"],
  "contact": "Dodona <dodona@ugent.be>"
}
```

### Reading activity

```json
{
  "description": {
    "names": {
      "en": "Aeneid",
      "nl": "Aeneis"
    }
  },
  "type": "content",
  "visibility": "public",
  "labels": ["test", "intro"]
}
```