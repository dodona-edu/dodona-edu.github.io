---
title: "Nextflow judge"
description: "Nextflow judge"
order: 7
---
# Nextflow judge

The Nextflow judge annotates the submitted code using CodeNarc, executes the submitted script and optionally checks the existence of directories and files.
The following bioinformatics tools are available by default:
* FastQC
* MultiQC
* Trimmomatic.

Also available are Perl and Python3.

## Configuration

The judge configuration is split between multiple files.

Passing extra argument to Nextflow can be accomplished by modifying the exercises `config.json`:
```json
{
  "evaluation": {
    "nextflow_arguments": "--reads /dev/null"
  }
}
```

A `judge.json` configuration file inside of the `evaluation` directory that contains a JSON array of JSON objects.
Each object represents either a file or a directory, this is specified by the `type` property.
The object contains a `path` property which contains the expected location of the file/directory.
Additionally object representing files can also contain a `compare` or `regex` property.
`compare` should be the name of a file inside of the `workdir` with which the file at `path` should be compared with.
`regex` contains a ("extended") "regular expression that should match on the content of the file at `path`.

An example `judge.json`:
```json
[
    { "type": "directory", "path": "work" },
    { "type": "file", "path": "ggal_gut_1_fastqc.html" },
    { "type": "file", "path": "ggal_gut_1_fastqc.zip" },
    { "type": "file", "path": "ggal_gut_2_fastqc.html" },
    { "type": "file", "path": "ggal_gut_2_fastqc.zip" },
    { "type": "directory", "path": "multiqc" },
    { "type": "file", "path": "multiqc/multiqc_report.html" }
]
```

### Scripts
Due to limited resources available to the judge, it isn't always possible to run the tools required for an exercise.To work around this limitation, I suggest you create a dummy script that emulates the behaviour of the required tool, this script should be placed inside of the `resources/bin` directory of the exercise.
