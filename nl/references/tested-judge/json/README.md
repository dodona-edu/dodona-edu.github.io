---
title: TESTed JSON-testplannen
description: "TESTed JSON-testplannen"
---

::: warning Waarschuwing
De JSON-testplannen zijn enkel geschikt voor geavanceerde gebruikers van TESTed.
Het is aangeraden om de [DSL-tesplannen](../dsl) te gebruiken wanneer dit mogelijk is.
:::

# TESTed JSON-testplannen
Het JSON-testplan bevat alle mogelijke configuratieopties en evaluatiemogelijkheden die door TESTed ondersteund worden.
Het volledige JSON-schema voor de testplannen kan <a href="/tested-json-testplan-schema.json" target="_blank">hier</a>
worden bekeken.

Het doel van deze documentatie is een uitgebreid overzicht geven van alle parameters die in het JSON-testplan kunnen
worden ingesteld.
Hiervoor zullen we ook partieel het JSON-schema gebruiken.

## Het toplevel object
Dit object heeft 2 attributen: `namespace` en `tabs`.
- **namespace**: De `namespace` is de naam van het bestand van de ingediende oplossing (`<namespace>.<ext>`).
  De `namespace` is ook de namespace in de code.
  Standaard is de namespace `submission`.
  :::tip Hint
  De namespace wordt het best genoteerd in `snake_case`,
  zodat de juiste stijlconventie per programmeertaal gevolgd kan worden.
  :::
- **tabs**: Het `tabs` object bevat een lijst met alle [tabbladen](#tabblad) die moet worden uitgevoerd.

```json
"Plan": {
  "title": "Plan",
  "type": "object",
  "properties": {
    "tabs": {
      "title": "Tabs",
      "type": "array",
      "items": {
        "$ref": "#/definitions/Tab"
      }
    },
    "namespace": {
      "title": "Namespace",
      "type": "string"
    }
  }
}
```

## Tabblad
Tabbladen in het testplan komen overeen met de weergave op Dodona.
Een tabblad bevat alle contexten en testgevallen die uitgevoerd moeten worden.

Een tabblad heeft 3 attributen: `name`, `hidden` en `runs`.
- **name**: Hieraan moet de naam meegegeven worden voor het tabblad, zoals deze moet weergegeven worden op Dodona.
- **hidden**: Heeft aan of het tabblad verborgen moet worden, wanneer alle testgevallen slagen.
- **runs**: Dit is de lijst van alle [runs](#run) (generereerde uitvoerbare bestanden) die uitgevoerd moeten worden.

```json
"Tab": {
  "title": "Tab",
  "type": "object",
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"
    },
    "runs": {
      "title": "Runs",
      "type": "array",
      "items": {
        "$ref": "#/definitions/Run"
      }
    },
    "hidden": {
      "title": "Hidden",
      "type": "boolean"
    }
  },
  "required": [
    "name",
    "runs"
  ]
},
```

## Run
Een run is een gegenereerd uitvoerbare bestand, die een collectie contexten bevat en ook een testgeval kan bevatten die
het geschreven programma zelf uitvoert.

De run heeft twee attributen `run` en `contexts`.
- **run**: Dit is het testgeval die het geschreven programma zelf uitvoert (zie [De Run](#de-run)).
- **contexts**: Deze bevat een lijst van alle [contexten](#context) die uitgevoerd moeten worden.

```json
"Run": {
  "title": "Run",
  "type": "object",
  "properties": {
    "run": {
      "title": "Run",
      "allOf": [
        {
          "$ref": "#/definitions/RunTestcase"
        }
      ]
    },
    "contexts": {
      "title": "Contexts",
      "type": "array",
      "items": {
        "$ref": "#/definitions/Context"
      }
    }
  }
},
```

## De Run
De *Run* is het testgeval die het geschreven programma zelf uitvoert.
Deze wordt weergegeven als een aparte context op Dodona.

De *Run* heeft 4 attributen: `input`, `output`, `description` en `link_files`.
- **input**: De [invoergegevens](#runinput) voor het programma.
- **output**: De [verwachte uitvoer](#runoutput) van het programma en evaluators.
- **description**: De beschrijving voor de weergave op Dodona,
  wanneer de `description` niet is opgegeven zal deze door TESTed genereert worden.
- **link_files**: De lijst met bestanden die gelinkt moeten worden in de feedback (Zie [FileUrl](#fileurl)).

```json
"RunTestcase": {
  "title": "RunTestcase",
  "type": "object",
  "properties": {
    "input": {
      "title": "Input",
      "allOf": [
        {
          "$ref": "#/definitions/RunInput"
        }
      ]
    },
    "output": {
      "title": "Output",
      "allOf": [
        {
          "$ref": "#/definitions/RunOutput"
        }
      ]
    },
    "description": {
      "title": "Description",
      "type": "string"
    },
    "link_files": {
      "title": "Link Files",
      "type": "array",
      "items": {
        "$ref": "#/definitions/FileUrl"
      }
    }
  }
},
```

## RunInput
De *RunInput* bevat alle informatie voor het opstarten van de programmatest.

De *RunInput* heeft 3 attributen: `stdin`, `arguments` en `main_call`.
- **stdin**: De gegeven invoer op standaardinvoer.
  Dit kan ofwel het lege kanaal zijn ([EmptyChannel](#emptychannel)).
  Ofwel [TextData](#textdata) welke een bestandslocatie of string verwacht.
- **arguments**: De lijst van de programma-argumenten, dit zijn verplicht strings.
- **main_call**: Dit is een boolean die aangeeft of de programmatest uitgevoerd moet worden.
  Standaard wordt de programmatest niet uitgevoerd.

```json
"RunInput": {
  "title": "RunInput",
  "type": "object",
  "properties": {
    "stdin": {
      "title": "Stdin",
      "anyOf": [
        {
          "$ref": "#/definitions/TextData"
        },
        {
          "$ref": "#/definitions/EmptyChannel"
        }
      ]
    },
    "arguments": {
      "title": "Arguments",
      "type": "array",
      "items": {
        "type": "string"
      }
    },
    "main_call": {
      "title": "Main Call",
      "type": "boolean"
    }
  }
},
```

## RunOutput
De *RunOutput* bevat alle informatie die nodig is voor het evalueren van de *programma* uitvoer.

De *RunOutput* heeft 5 attributen: `stdout`, `stderr`, `file`, `exception`, `exit_code`.
- **stdout** en **stderr**: Het uitvoerkanaal voor standaardfout en -error.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen uitvoer verwacht op dit kanaal.
    Dit is de standaard optie.
  - [IgnoreChannel](#ignorechannel): Er wordt geen uitvoer verwacht opt dit kanaal,
    maar gegeven uitvoer zal genegeerd worden.
  - [TextOutputChannel](#textoutputchannel): Er wordt uitvoer verwacht op dit kanaal.
- **file**: Het uitvoerkanaal voor een bestand.
  De mogelijke uitvoerkanalen zijn:
  - [IgnoreChannel](#ignorechannel): Er wordt geen uitvoer verwacht opt dit kanaal,
    maar gegeven uitvoer zal genegeerd worden.
    Dit is de standaard optie.
  - [FileOutputChannel](#fileoutputchannel): Er wordt uitvoer verwacht op dit kanaal.
  
  ::: warning Opmerking
  Het is momenteel niet mogelijk op in TESTed meer dan één bestand te verwachten per test.
  :::
  ::: warning Opmerking
  Het is momenteel ook niet mogelijk in TESTed om te controleren of er geen bestanden aangemaakt werden.
  :::
- **exception**: Het uitvoerkanaal voor een fout.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen fout verwacht tijdens de uitvoer.
    Dit is de standaard optie.
  - [IgnoreChannel](#ignorechannel): Er wordt geen fout verwacht tijdens de uitvoer,
    maar een opgeworpen fout zal genegeerd worden.
  - [ExceptionOutputChannel](#exceptionoutputchannel): Er wordt een fout verwacht op dit kanaal.
- **exit_code**: Het uitvoerkanaal voor de stopcode van het programma.
  Hieraan wordt de stopcode meegegeven in het object [ExitCodeOutputChannel](#exitcodeoutputchannel).
  Standaard wordt `0` als stopcode verwacht.

```json
"RunOutput": {
  "title": "RunOutput",
  "type": "object",
  "properties": {
    "stdout": {
      "title": "Stdout",
      "anyOf": [
        {
          "$ref": "#/definitions/TextOutputChannel"
        },
        {
          "$ref": "#/definitions/EmptyChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    },
    "stderr": {
      "title": "Stderr",
      "anyOf": [
        {
          "$ref": "#/definitions/TextOutputChannel"
        },
        {
          "$ref": "#/definitions/EmptyChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    },
    "file": {
      "title": "File",
      "anyOf": [
        {
          "$ref": "#/definitions/FileOutputChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    },
    "exception": {
      "title": "Exception",
      "anyOf": [
        {
          "$ref": "#/definitions/ExceptionOutputChannel"
        },
        {
          "$ref": "#/definitions/EmptyChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    },
    "exit_code": {
      "title": "Exit Code",
      "allOf": [
        {
          "$ref": "#/definitions/ExitCodeOutputChannel"
        }
      ]
    }
  }
},
```

## Context
Een context is een lijst van testgevallen die uitgevoerd moeten worden.
Daarnaast kan een context ook voorbereiden en afsluitende code bevatten die programmeertaal afhankelijk is.

Een context heeft 5 attributen: `testcases`, `before`, `after`, `description` en `link_files`.
- **testcases**: De lijst van [testgevallen](#testcase) die geëvalueerd moeten worden.
- **before** en **after**: Een object waarbij de sleutels de programmeertalen zijn,
  waarbij voorbereidende en/of afstuitende code als [TextData](#textdata) objecten meegegeven worden.
- **description**: De beschrijving voor de weergave op Dodona.
- **link_files**: De lijst met bestanden die gelinkt moeten worden in de feedback (Zie [FileUrl](#fileurl)).

```json
"Context": {
  "title": "Context",
  "type": "object",
  "properties": {
    "testcases": {
      "title": "Testcases",
      "type": "array",
      "items": {
        "$ref": "#/definitions/Testcase"
      }
    },
    "before": {
      "title": "Before",
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/TextData"
      }
    },
    "after": {
      "title": "After",
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/TextData"
      }
    },
    "description": {
      "title": "Description",
      "type": "string"
    },
    "link_files": {
      "title": "Link Files",
      "type": "array",
      "items": {
        "$ref": "#/definitions/FileUrl"
      }
    }
  }
},
```

## Testcase
Een testcase is een assignment of expressie die geëvalueerd moet worden.

Een testcase heeft 3 attributen: `input`, `description` en `output`.
- **input**: Het invoer statement of expressie, zie [Statements en expressies](#statements-en-expressies).
- **description**: De beschrijving voor de weergave op Dodona,
  wanneer de `description` niet is opgegeven zal deze door TESTed genereert worden.
- **output**: Het [Output](#output) object met alle uitvoerkanalen van het testgeval.

```json
"Testcase": {
  "title": "Testcase",
  "type": "object",
  "properties": {
    "input": {
      "title": "Input",
      "anyOf": [
        {
          "$ref": "#/definitions/Assignment"
        },
        {
          "type": "string"
        },
        {
          "$ref": "#/definitions/FunctionCall"
        },
        {
          "$ref": "#/definitions/NumberType"
        },
        {
          "$ref": "#/definitions/StringType"
        },
        {
          "$ref": "#/definitions/BooleanType"
        },
        {
          "$ref": "#/definitions/SequenceType"
        },
        {
          "$ref": "#/definitions/ObjectType"
        },
        {
          "$ref": "#/definitions/NothingType"
        }
      ]
    },
    "description": {
      "title": "Description",
      "type": "string"
    },
    "output": {
      "title": "Output",
      "allOf": [
        {
          "$ref": "#/definitions/Output"
        }
      ]
    }
  },
  "required": [
    "input"
  ]
},
```

## Output
De *Output* bevat alle informatie die nodig is voor het evalueren van het testgeval.

De *Output* heeft 5 attributen: `stdout`, `stderr`, `file`, `exception`, `value`.
- **stdout** en **stderr**: Het uitvoerkanaal voor standaardfout en -error.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen uitvoer verwacht op dit kanaal.
    Dit is de standaard optie.
  - [IgnoreChannel](#ignorechannel): Er wordt geen uitvoer verwacht opt dit kanaal,
    maar gegeven uitvoer zal genegeerd worden.
  - [TextOutputChannel](#textoutputchannel): Er wordt uitvoer verwacht op dit kanaal.
- **file**: Het uitvoerkanaal voor een bestand.
  De mogelijke uitvoerkanalen zijn:
  - [IgnoreChannel](#ignorechannel): Er wordt geen uitvoer verwacht opt dit kanaal,
    maar gegeven uitvoer zal genegeerd worden.
    Dit is de standaard optie.
  - [FileOutputChannel](#fileoutputchannel): Er wordt uitvoer verwacht op dit kanaal.

  ::: warning Opmerking
  Het is momenteel niet mogelijk op in TESTed meer dan één bestand te verwachten per test.
  :::
  ::: warning Opmerking
  Het is momenteel ook niet mogelijk in TESTed om te controleren of er geen bestanden aangemaakt werden.
  :::
- **exception**: Het uitvoerkanaal voor een fout.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen fout verwacht tijdens de uitvoer.
    Dit is de standaard optie.
  - [IgnoreChannel](#ignorechannel): Er wordt geen fout verwacht tijdens de uitvoer,
    maar een opgeworpen fout zal genegeerd worden.
  - [ExceptionOutputChannel](#exceptionoutputchannel): Er wordt een fout verwacht op dit kanaal.
- **value**: Het uitvoerkanaal voor de returnwaarde van een expressie.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen returnwaarde verwacht.
    Dit is de standaard optie.
  - [IgnoreChannel](#ignorechannel): Er wordt geen returnwaarde verwacht tijdens de uitvoer,
    maar teruggegeven waarde zal genegeerd worden.
  - [ValueOutputChannel](#valueoutputchannel): Er wordt een returnwaarde verwacht op dit kanaal.
  
```json
"Output": {
  "title": "Output",
  "type": "object",
  "properties": {
    "stdout": {
      "title": "Stdout",
      "anyOf": [
        {
          "$ref": "#/definitions/TextOutputChannel"
        },
        {
          "$ref": "#/definitions/EmptyChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    },
    "stderr": {
      "title": "Stderr",
      "anyOf": [
        {
          "$ref": "#/definitions/TextOutputChannel"
        },
        {
          "$ref": "#/definitions/EmptyChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    },
    "file": {
      "title": "File",
      "anyOf": [
        {
          "$ref": "#/definitions/FileOutputChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    },
    "exception": {
      "title": "Exception",
      "anyOf": [
        {
          "$ref": "#/definitions/ExceptionOutputChannel"
        },
        {
          "$ref": "#/definitions/EmptyChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    },
    "result": {
      "title": "Result",
      "anyOf": [
        {
          "$ref": "#/definitions/ValueOutputChannel"
        },
        {
          "$ref": "#/definitions/EmptyChannel"
        },
        {
          "$ref": "#/definitions/IgnoredChannel"
        }
      ]
    }
  }
},
```

## FileUrl
*FileUrl* is een object voor het linken van bestand in de feedback mogelijk te maken.
De inhoud van dit object is gebaseerd op de invoer de verwacht wordt voor de *Python Tutor*.
::: warning Opmerking
Hoewel dit object overeenkomt met de invoer voor de *Python Tutor*.
Is TESTed momenteel beperkt tot gelinkte bestanden, die in een nieuw browsertabblad geopend worden.
:::

*FileUrl* heeft 4 attributen: `content`, `name`, `location` en `storage`.
- **content**: De inhoud van het bestand.
  Voorlopig beperkt tot een url (meestal een relative url naar een bestand in de `description` map van de oefening).
- **name**: De naam van het bestand die gelinkt moet worden.
- **location**: De locatie van de inhoud.
  Voorlopig is enkel `href` toegestaan, wat ook de standaardwaarde is.
- **storage**: De opslag methode van de inhoud.
  Voorlopig is enkel `disk` toegestaan, wat ook de standaardwaarde is.

```json
"FileUrl": {
  "title": "FileUrl",
  "type": "object",
  "properties": {
    "content": {
      "title": "Content",
      "type": "string"
    },
    "name": {
      "title": "Name",
      "type": "string"
    },
    "location": {
      "title": "Location",
      "type": "string"
    },
    "storage": {
      "title": "Storage",
      "type": "string"
    }
  },
  "required": [
    "content",
    "name"
  ]
},
```

## TextData
*TextData* is het object die gebruikt wordt om tekst of tekstbestanden als invoer te gebruiken.

*TextData* heeft 2 attributen: `data` en `type`.
- **data**: Wanneer het type `text` is, is dit de tekst zelf.
  Anders is dit een pad naar een bestand in de `workdir` van de judge.
- **type**: Het type van de invoer: de tekst zelf (`text`) of een tekstbestand (`file`).
  Zie [TextChannelType](#textchanneltype).

```json
"TextData": {
  "title": "TextData",
  "type": "object",
  "properties": {
    "data": {
      "title": "Data",
      "type": "string"
    },
    "type": {
      "allOf": [
        {
          "$ref": "#/definitions/TextChannelType"
        }
      ]
    }
  },
  "required": [
    "data"
  ]
},
```

## Types
De types zijn een verzameling van tekstuele opsomtypes.

### ExceptionBuiltin
Opsomtype interne fout-evaluator.
De enige aanvaarde waarde is `exception`.

```json
"ExceptionBuiltin": {
  "title": "ExceptionBuiltin",
  "description": "Built in evaluators for exceptions.",
  "enum": [
    "exception"
  ],
  "type": "string"
},
```

### TextBuiltin
Opsomtype interne tekstevaluator.
De twee waarden zijn `text` (voor tekstuele evaluaties) en `file` (voor bestandsevaluaties).

```json
"TextBuiltin": {
  "title": "TextBuiltin",
  "description": "Textual built in evaluators.",
  "enum": [
    "text",
    "file"
  ],
  "type": "string"
},
```

### TextChannelType
Dit is het opsomtype voor tekstuele kanalen.
TextChannelType heeft 2 types: `text` en `file`.

```json
"TextChannelType": {
  "title": "TextChannelType",
  "description": "An enumeration.",
  "enum": [
    "text",
    "file"
  ],
  "type": "string"
},
```

### ValueBuiltin
Opsomtype interne waarde-evaluator.
De enige aanvaarde waarde is `value`.

```json
"ValueBuiltin": {
  "title": "ValueBuiltin",
  "description": "Built in evaluators for values.",
  "enum": [
    "value"
  ],
  "type": "string"
},
```

## Kanalen

### EmptyChannel
*EmptyChannel* stelt het lege invoer-/uitvoerkanaal voor.
Dit is de constante string `none`.

```json
"EmptyChannel": {
  "title": "EmptyChannel",
  "description": "There is nothing on this output channel.",
  "enum": [
    "none"
  ],
  "type": "string"
},
```

### IgnoreChannel
*IgnoreChannel* stelt het uitvoerkanaal voor die geen uitvoer verwacht, 
maar wanneer er uitvoer aanwezig is zal dit genegeerd worden.

```json
"IgnoredChannel": {
  "title": "IgnoredChannel",
  "description": "A file channel is ignored by default.",
  "enum": [
    "ignored"
  ],
  "type": "string"
},
```

### ExceptionOutputChannel
```json
"ExceptionOutputChannel": {
  "title": "ExceptionOutputChannel",
  "type": "object",
  "properties": {
    "exception": {
      "$ref": "#/definitions/ExceptionValue"
    },
    "evaluator": {
      "title": "Evaluator",
      "anyOf": [
        {
          "$ref": "#/definitions/GenericExceptionEvaluator"
        },
        {
          "$ref": "#/definitions/SpecificEvaluator"
        }
      ]
    },
  }
},
```

### ExitCodeOutputChannel
```json
"ExitCodeOutputChannel": {
  "title": "ExitCodeOutputChannel",
  "type": "object",
  "properties": {
    "value": {
      "title": "Value",
      "type": "integer"
    },
  }
},
```

### FileOutputChannel
```json
"FileOutputChannel": {
  "title": "FileOutputChannel",
  "type": "object",
  "properties": {
    "expected_path": {
      "title": "Expected Path",
      "type": "string"
    },
    "actual_path": {
      "title": "Actual Path",
      "type": "string"
    },
    "evaluator": {
      "title": "Evaluator",
      "anyOf": [
        {
          "$ref": "#/definitions/GenericTextEvaluator"
        },
        {
          "$ref": "#/definitions/ProgrammedEvaluator"
        }
      ]
    }
  },
  "required": [
    "expected_path",
    "actual_path"
  ]
},
```

### TextOutputChannel
```json
"TextOutputChannel": {
  "title": "TextOutputChannel",
  "type": "object",
  "properties": {
    "data": {
      "title": "Data",
      "type": "string"
    },
    "type": {
      "allOf": [
        {
          "$ref": "#/definitions/TextChannelType"
        }
      ]
    },
    "evaluator": {
      "title": "Evaluator",
      "anyOf": [
        {
          "$ref": "#/definitions/GenericTextEvaluator"
        },
        {
          "$ref": "#/definitions/ProgrammedEvaluator"
        }
      ]
    }
  },
  "required": [
    "data"
  ]
},
```

### ValueOutputChannel
```json
"ValueOutputChannel": {
  "title": "ValueOutputChannel",
  "type": "object",
  "properties": {
    "value": {
      "title": "Value",
      "anyOf": [
        {
          "$ref": "#/definitions/NumberType"
        },
        {
          "$ref": "#/definitions/StringType"
        },
        {
          "$ref": "#/definitions/BooleanType"
        },
        {
          "$ref": "#/definitions/SequenceType"
        },
        {
          "$ref": "#/definitions/ObjectType"
        },
        {
          "$ref": "#/definitions/NothingType"
        }
      ]
    },
    "evaluator": {
      "title": "Evaluator",
      "anyOf": [
        {
          "$ref": "#/definitions/GenericValueEvaluator"
        },
        {
          "$ref": "#/definitions/ProgrammedEvaluator"
        },
        {
          "$ref": "#/definitions/SpecificEvaluator"
        }
      ]
    }
  }
},
```

## Evaluators

### GenericExceptionEvaluator
De *GenericExceptionEvaluator* bevat alle informatie die nodig is om fouten te evalueren met de interne evaluator.
:::warning Opmerking
Deze evaluator kan enkel foutboodschappen evalueren en niet de fouttypes.
Dit komt door dat de fouttypes programmeertaal afhankelijk zijn.
:::

De *GenericExceptionEvaluator* heeft 3 attributen: `type`, `options` en `name`.
- **type**: Een string met vaste waarde `builtin`.
- **options**: De extra evaluatie opties die gebruikt kunnen worden door de interne evaluator.
  ::: warning Opmerking
  Voorlopig worden er geen opties gebruikt in de interne evaluator voor fouten.
  :::
- **name**: Een string met vaste waarde `exception`, zie [ExceptionBuiltin](#exceptionbuiltin).

```json
"GenericExceptionEvaluator": {
  "title": "GenericExceptionEvaluator",
  "type": "object",
  "properties": {
    "type": {
      "title": "Type",
      "const": "builtin",
      "type": "string"
    },
    "options": {
      "title": "Options",
      "type": "object"
    },
    "name": {
      "allOf": [
        {
          "$ref": "#/definitions/ExceptionBuiltin"
        }
      ]
    }
  }
},
```

### GenericValueEvaluator
De *GenericValueEvaluator* bevat alle informatie die nodig is om returnwaarden te evalueren met de interne evaluator.

De *GenericValueEvaluator* heeft 3 attributen: `type`, `options` en `name`.
- **type**: Een string met vaste waarde `builtin`.
- **options**: De extra evaluatie opties die gebruikt kunnen worden door de interne evaluator.
  ::: warning Opmerking
  Voorlopig worden er geen opties gebruikt in de interne evaluator voor de returnwaarden.
  :::
- **name**: Een string met vaste waarde `value`, zie [ValueBuiltin](#valuebuiltin).

```json
"GenericValueEvaluator": {
  "title": "GenericValueEvaluator",
  "type": "object",
  "properties": {
    "type": {
      "title": "Type",
      "const": "builtin",
      "type": "string"
    },
    "options": {
      "title": "Options",
      "type": "object"
    },
    "name": {
      "allOf": [
        {
          "$ref": "#/definitions/ValueBuiltin"
        }
      ]
    }
  }
},
```

### GenericTextEvaluator
De *GenericTextEvaluator* bevat alle informatie die nodig is om tekstuele data te evalueren met de interne evaluator.

De *GenericTextEvaluator* heeft 3 attributen: `type`, `options` en `name`.
- **type**: Een string met vaste waarde `builtin`.
- **options**: De extra evaluatie opties die gebruikt kunnen worden door de interne evaluator,
  zie [DSL Configuratie opties voor standaarduitvoer en standaarderror](../dsl/#configuratieopties).
- **name**: Het type van de tekstbron die geëvalueerd moet worden.
  Ofwel `text`, ofwel `file`, zie [TextBuiltin](#textbuiltin).

```json
"GenericTextEvaluator": {
  "title": "GenericTextEvaluator",
  "type": "object",
  "properties": {
    "type": {
      "title": "Type",
      "const": "builtin",
      "type": "string"
    },
    "options": {
      "title": "Options",
      "type": "object"
    },
    "name": {
      "allOf": [
        {
          "$ref": "#/definitions/TextBuiltin"
        }
      ]
    }
  }
},
```

### ProgrammedEvaluator
De *ProgrammedEvaluator* is het object die gebruikt moet worden wanneer je een geprogrammeerde evaluatie gebruikt.

De *ProgrammedEvaluator* heeft 2 attributen: `language`, `function`, `arguments` en `type`.
- **language**: Een string de programmeertaal van de evaluator specificeert.
- **function**: Een [EvaluationFunction](#evaluationfunction) object, welke informatie bevat over de evaluatiefunctie.
- **arguments**: Een lijst met extra argumenten voor de evaluatiefunctie,
  zie [EvaluationFunction](#evaluationfunction) en [Statements en expressies](#statements-en-expressies).
  ::: warning Opmerking
  Deze argumenten kunnen geen functieoproepen en variabelen bevatten.
  :::
- **type**: Een string met de vaste waarde `programmed`.

```json
"ProgrammedEvaluator": {
  "title": "ProgrammedEvaluator",
  "type": "object",
  "properties": {
    "language": {
      "title": "Language",
      "type": "string"
    },
    "function": {
      "$ref": "#/definitions/EvaluationFunction"
    },
    "arguments": {
      "title": "Arguments",
      "type": "array",
      "items": {
        "anyOf": [
          {
            "$ref": "#/definitions/NumberType"
          },
          {
            "$ref": "#/definitions/StringType"
          },
          {
            "$ref": "#/definitions/BooleanType"
          },
          {
            "$ref": "#/definitions/SequenceType"
          },
          {
            "$ref": "#/definitions/ObjectType"
          },
          {
            "$ref": "#/definitions/NothingType"
          }
        ]
      }
    },
    "type": {
      "title": "Type",
      "const": "programmed",
      "type": "string"
    }
  },
  "required": [
    "language",
    "function"
  ]
},
```

### SpecificEvaluator
De *SpecificEvaluator* is het object die gebruikt moet worden wanneer je een programmeertaal specifieke evaluatie
gebruikt.

De *SpecificEvaluator* heeft 2 attributen: `evaluators` en `type`.
- **evaluators**: Dit is een object met de programmeertalen waarvoor een evaluator beschikbaar is als sleutels.
  De waarden van dit object zijn van het type [EvaluationFunction](#evaluationfunction),
  welke informatie bevat over de evaluatiefunctie.
- **type**: Dit is een string met de vaste waarde `specific`.

```json
"SpecificEvaluator": {
  "title": "SpecificEvaluator",
  "type": "object",
  "properties": {
    "evaluators": {
      "title": "Evaluators",
      "type": "object",
      "additionalProperties": {
        "$ref": "#/definitions/EvaluationFunction"
      }
    },
    "type": {
      "title": "Type",
      "const": "specific",
      "type": "string"
    }
  },
  "required": [
    "evaluators"
  ]
},
```

### EvaluationFunction
De *EvaluationFunction* bevat de informatie voor de functieoproep voor de specifieke/geprogrammeerde evaluator.

De *EvaluationFunction* heeft 2 attributen: `file` en `name`.
- **file**: Het relatief pad naar het broncode bestand in de `evaluation` map van de oefening,
  waarin de evaluator functie zich bevindt.
- **name**: De naam van de evaluatiefunctie die opgeroepen moet worden.
  Standaard is dit de functie `evaluate`.
  ::: warning Belangrijk
  Voor een specifieke evaluator verwacht deze functie slecht één argument `actual` welke de terug gekregen waarde bevat.
  :::
  ::: warning Belangrijk
  Voor een geprogrammeerde evaluator verwacht deze functie drie argumenten: `expected`, `actual` en `arguments`.
  - `expected` bevat de verwachte returnwaarde uit het testplan.
  - `actual` bevat de werkelijke returnwaarde.
  - `arguments` bevat een lijst met extra argumenten voor de evaluator.
  :::

```json
"EvaluationFunction": {
  "title": "EvaluationFunction",
  "type": "object",
  "properties": {
    "file": {
      "title": "File",
      "type": "string",
      "format": "path"
    },
    "name": {
      "title": "Name",
      "type": "string"
    }
  },
  "required": [
    "file"
  ]
},
```

## Statements en expressies
