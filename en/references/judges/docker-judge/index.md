---
title: "Docker judge"
description: "Docker judge"
order: 7
---
# Docker judge

The Docker judge has 4 main functions.
Firstly it uses [dodona-containerfile-evaluator](https://github.com/Bond-009/dodona-containerfile-evaluator), a custom utility, to check the usage of certain Docker instruction e.g. USER and WORKDIR.
Secondly it uses [Hadolint](https://github.com/hadolint/hadolint) to annotate the code and optionally fail the solution if it errors out.
Thirdly it uses [kaniko](https://github.com/GoogleContainerTools/kaniko) to build the image from the Dockerfile.
Lastly the judge checks the existence of files and directories in the created image.

## Configuring Hadolint

The behavior of Hadolint can be modified by creating a [Hadolint configuration file](https://github.com/hadolint/hadolint#configure) with one of the following names inside of the `evaluation` directory: `.hadolint.yml`, `.hadolint.yaml`, `hadolint.yml` or `hadolint.yaml`.
Using this it's possible to change the severity of annotations, fail when a certain severity is hit, check if labels exist and more.

An example configuration file looks as follows:
```yml
no-fail: false
failure-threshold: error
label-schema:
  org.opencontainers.image.title: text
  org.opencontainers.image.description: text
  org.opencontainers.image.source: text
  org.opencontainers.image.revision: text
  org.opencontainers.image.licenses: text
  org.opencontainers.image.vendor: text
override:
  error:
    - DL3049
ignored:
  - DL3004
```

`no-fail` specifies if the judge should fail the solution if the linter fails.
`failure-threshold` sets the threshold for which rules will cause a fail, valid values are `error`, `warning`, `info` and `style`.
`label-schema` is a dictionary where the key is the label name and the value of a label can be either of `text`, `url`, `semver`, `hash`, `rfc3339`, `spdx` or `email`.
`override` is used to override the severity of rules, valid severities are the same as for `failure-threshold`.
`ignored` is a list or rules that should be ignored.
For more configuration options can be found in the [Hadolint README](https://github.com/hadolint/hadolint#configure)


## Judge configuration

The judge is configured by specifying a `judge.json` configuration file inside of the `evaluation` directory.
Using this file it's possible to verify if the `USER` or `WORKDIR` instructions are used with the desired arguments.
This file also contains a `files` property that is a JSON array of JSON objects.
Each object contains a `path` property with the desired location in the resulting image.
The object represents either a file or a directory, this is specified by the `type` property.
Additionally object representing files can also contain a `compare` or `regex` property.
`compare` should be the name of a file inside of the `workdir` with which the file at `path` should be compared with.
`regex` contains a ("extended") "regular expression that should match on the content of the file at `path`.

```json
{
  "user": "runner",
  "workdir": "/course",
  "files": [
    { "type": "directory", "path": "/course" },
    { "type": "file", "path": "/environment.yml", "compare": "environment.yml" },
    { "type": "directory", "path": "/usr/miniconda3/envs/pipeline-tools-1.0.0" },
    { "type": "file", "path": "/etc/os-release", "regex": "^ID=\"ubuntu\"$" }
  ]
}
```
