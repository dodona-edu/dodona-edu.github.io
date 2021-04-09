---
title: TESTed JSON-testplannen
description: "TESTed JSON-testplannen"
sidebarDepth: 2
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

Er kunnen voorbeeld JSON-testplannen en evaluators gevonden in de
[GitHub repository](https://github.com/dodona-edu/universal-judge/tree/master/exercise) van TESTed.

## Plan
Het *Plan*-object heeft 2 attributen: `namespace` en `tabs`.
- **namespace**: De `namespace` is de naam van het bestand van de ingediende oplossing (`<namespace>.<ext>`).
  De `namespace` is ook de namespace in de code.
  Standaard is de namespace `submission`.
  :::tip Hint
  De namespace wordt het best genoteerd in `snake_case`,
  zodat de juiste stijlconventie per programmeertaal gevolgd kan worden.
  :::
- **tabs**: Het `tabs` object bevat een lijst met alle [tabbladen](#tab) die uitgevoerd moet worden.

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

## Tab
Tabbladen in het testplan komen overeen met de weergave op Dodona.
Een tabblad bevat een lijst van runs die uitgevoerd moeten worden.

Een *tab*-object heeft 3 attributen: `name`, `hidden` en `runs`.
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
Een run is een gegenereerd uitvoerbare bestand, die een collectie contexten bevat en ook een optioneel testgeval
kan bevatten die het door de student geschreven programma zelf uitvoert.

Het *Run*-object heeft twee attributen: `run` en `contexts`.
- **run**: Dit is het testgeval die het geschreven programma zelf uitvoert (zie [RunTestcase](#runtestcase)).
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

## RunTestcase
Het *RunTestcase*-object is het testgeval die het door de student geschreven programma zelf uitvoert.
Deze wordt weergegeven als een aparte context op Dodona.

Het *RunTestcase*-object heeft 4 attributen: `input`, `output`, `description` en `link_files`.
- **input**: De [invoergegevens](#runinput) voor het programma.
- **output**: De [verwachte uitvoer](#runoutput) en evaluators voor het programma.
- **description**: De beschrijving voor de weergave op Dodona,
  wanneer de `description` niet is opgegeven zal deze door TESTed genereert worden.
- **link_files**: De lijst met bestanden die gelinkt moeten worden in de feedback (zie [FileUrl](#fileurl)).

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

### RunInput
Het *RunInput*-object bevat alle informatie voor het opstarten van de programmatest.

Het *RunInput*-object heeft 3 attributen: `stdin`, `arguments` en `main_call`.
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

### RunOutput
Het *RunOutput*-object bevat alle informatie die nodig is voor het evalueren van de *programma* uitvoer.

Het *RunOutput*-object heeft 5 attributen: `stdout`, `stderr`, `file`, `exception`, `exit_code`.
- **stdout** en **stderr**: Het uitvoerkanaal voor standaardfout en -error.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen uitvoer verwacht op dit kanaal.
    Dit is de standaard optie.
  - [IgnoredChannel](#ignoredchannel): Er wordt geen uitvoer verwacht opt dit kanaal,
    maar gegeven uitvoer zal genegeerd worden.
  - [TextOutputChannel](#textoutputchannel): Er wordt uitvoer verwacht op dit kanaal.
- **file**: Het uitvoerkanaal voor een bestand.
  De mogelijke uitvoerkanalen zijn:
  - [IgnoredChannel](#ignoredchannel): Er wordt geen uitvoer verwacht opt dit kanaal,
    maar gegeven uitvoer zal genegeerd worden.
    Dit is de standaard optie.
  - [FileOutputChannel](#fileoutputchannel): Een bestand is verwacht als uitvoer.
  
  ::: warning Opmerking
  Het is momenteel niet mogelijk op in TESTed meer dan één bestand te verwachten per programmatest.
  :::
  ::: warning Opmerking
  Het is momenteel ook niet mogelijk in TESTed om te controleren of er geen bestanden aangemaakt werden.
  :::
- **exception**: Het uitvoerkanaal voor een fout.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen fout verwacht tijdens de uitvoer.
    Dit is de standaard optie.
  - [IgnoredChannel](#ignoredchannel): Er wordt geen fout verwacht tijdens de uitvoer,
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

Het *context*-object heeft 5 attributen: `testcases`, `before`, `after`, `description` en `link_files`.
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

Het *testcase*-object heeft 3 attributen: `input`, `description` en `output`.
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

### Output
Het *Output*-object bevat alle informatie die nodig is voor het evalueren van het testgeval.

Het *Output*-object heeft 5 attributen: `stdout`, `stderr`, `file`, `exception`, `value`.
- **stdout** en **stderr**: Het uitvoerkanaal voor standaardfout en -error.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen uitvoer verwacht op dit kanaal.
    Dit is de standaard optie.
  - [IgnoredChannel](#ignoredchannel): Er wordt geen uitvoer verwacht opt dit kanaal,
    maar gegeven uitvoer zal genegeerd worden.
  - [TextOutputChannel](#textoutputchannel): Er wordt uitvoer verwacht op dit kanaal.
- **file**: Het uitvoerkanaal voor een bestand.
  De mogelijke uitvoerkanalen zijn:
  - [IgnoredChannel](#ignoredchannel): Er wordt geen uitvoer verwacht opt dit kanaal,
    maar gegeven uitvoer zal genegeerd worden.
    Dit is de standaard optie.
  - [FileOutputChannel](#fileoutputchannel): Er wordt een bestand verwacht als uitvoer.

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
  - [IgnoredChannel](#ignoredchannel): Er wordt geen fout verwacht tijdens de uitvoer,
    maar een opgeworpen fout zal genegeerd worden.
  - [ExceptionOutputChannel](#exceptionoutputchannel): Er wordt een fout verwacht op dit kanaal.
- **value**: Het uitvoerkanaal voor de returnwaarde van een expressie.
  De mogelijke uitvoerkanalen zijn:
  - [EmptyChannel](#emptychannel): Er wordt geen returnwaarde verwacht.
    Dit is de standaard optie.
  - [IgnoredChannel](#ignoredchannel): Er wordt geen returnwaarde verwacht tijdens de uitvoer,
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
Het *FileUrl*-object wordt gebruikt om het linken van bestand in de feedback mogelijk te maken.
De inhoud van dit object is gebaseerd op de invoer de verwacht wordt voor de *Python Tutor*.
::: warning Opmerking
Hoewel dit object overeenkomt met de invoer voor de *Python Tutor*.
Is TESTed momenteel beperkt tot het openen van gelinkte bestanden in een nieuw browsertabblad.
:::

Het *FileUrl*-object heeft 4 attributen: `content`, `name`, `location` en `storage`.
- **content**: De inhoud van het bestand.
  Voorlopig beperkt tot een url (meestal een relative url naar een bestand in de `description` map van de oefening).
- **name**: De naam van het bestand die gelinkt moet worden.
- **location**: Het locatietype van de inhoud.
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
Het *TextData*-object is het object die gebruikt wordt om tekst of tekstbestanden als invoer te gebruiken.

Het *TextData*-object heeft 2 attributen: `data` en `type`.
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

## Opsomtypes
De opsomtypes worden gebruikt om het type van objecten te definiëren.

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
Hierbij een overzicht van alle uitvoerkanalen.

### EmptyChannel
Het *EmptyChannel*-object stelt het lege invoer-/uitvoerkanaal voor.
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

### IgnoredChannel
Het *IgnoredChannel*-object stelt het uitvoerkanaal voor die geen uitvoer verwacht, 
maar wanneer er uitvoer aanwezig is zal dit genegeerd worden.
Dit is de constante string `ignore`.

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
Het *ExceptionOutputChannel*-object is het uitvoerkanaal voor verwachte opgegooide fouten.
Deze verwacht de boodschap van de opgegooide fout en de gebruikte evaluator.

Het *ExceptionOutputChannel*-object heeft 2 attributen: `exception` en `evaluator`.
- **exception**: De verwachte foutboodschap in een [ExceptionValue](#exceptionvalue) object.
- **evaluator**: De evaluator die gebruikt moet worden voor het evalueren van de fout.
  Er kunnen twee evaluators gebruikt worden:
  - [GenericExceptionEvaluator](#genericexceptionevaluator): Dit is de interne evaluator van TESTed voor fouten.
    Dit is de standaard evaluator.
    ::: warning Opmerking
    Alleen de foutboodschap (niet te verwarren met het fouttype) kan gecontroleerd worden in de interne evaluator.
    :::
  - [SpecificEvaluator](#specificevaluator): Dit is een evaluator geschreven in de programmeertaal van de oplossing.
    ::: tip Tip
    Wanneer je fouttypes wilt kunnen evalueren, moet je deze evaluators gebruiken.
    :::

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

#### ExceptionValue
Het *ExceptionValue*-object bevat het bericht die verwacht wordt in een opgegooide fout.

Het *ExceptionValue*-object heeft 1 attribuut: `message`.
- **message**: Het tekstbericht van de opgegooide fout.

```json
"ExceptionValue": {
  "title": "ExceptionValue",
  "type": "object",
  "properties": {
    "message": {
      "title": "Message",
      "type": "string"
    }
  },
  "required": [
    "message"
  ]
},
```

### ExitCodeOutputChannel
Het *ExitCodeOutputChannel*-object is het uitvoerkanaal voor de stopcode van een uitgevoerd programma.

Het *ExitCodeOutputChannel*-object heeft 1 attribuut: `value`.
- **value**: Dit is het geheel getal die de foutcode voorstelt.
  Standaard is dit de waarde `0`.
  ::: warning Opmerking
  Wanneer de verwachte en uitgevoerde foutcodes `0` zijn, zal deze niet weergegeven worden op Dodona. 
  :::

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
Het *FileOutputChannel*-object is het uitvoerkanaal voor een bestand dat door de student verwacht werd gecreëerd
te worden.
::: warning Opmerking
TESTed kan momenteel slechts één bestand evalueren per testgeval.
:::
::: warning Opmerking
TESTed ondersteund momenteel enkel tekstbestanden.
:::

Het *FileOutputChannel*-object heeft 3 attributen: `expected_path`, `actual_path` en `evaluator`.
- **expected_path**: Relatief pad naar het bestand in de `workdir`, waarin de verwachte uitvoer bevat is.
- **actual_path**: Relatief pad naar het bestand die verwacht werd geschreven te zijn door de ingediende oplossing,
  waarin de gegenereerde uitvoer bevat is.
- **evaluator**: De evaluator die gebruikt moet worden voor het evalueren van het gegenereerde bestand.
  Er kunnen twee evaluators gebruikt worden:
  - [GenericTextEvaluator](#generictextevaluator): Dit is de interne evaluator van TESTed voor tekst en tekstbestanden.
    Dit is de standaard evaluator.
  - [ProgrammedEvaluator](#programmedevaluator): Dit is een eigen geschreven evaluator.

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
Het *TextOutputChannel*-object is een tekstueel uitvoerkanaal, zoals standaarduitvoer.

Het *TextOutputChannel*-object heeft 3 attributen: `data`, `type` en `evaluator`.
- **data**: De verwachte uitvoer zelf (type: `text`)
  of een relatief pad naar het bestand, in de `workdir` map, die de verwachte uitvoer bevat (type: `file`).
- **type**: Het type van de verwachte uitvoer: de tekst zelf (`text`) of een tekstbestand (`file`).
  Zie [TextChannelType](#textchanneltype).
- **evaluator**: De evaluator die gebruikt moet worden voor het evalueren van het gegenereerde tekstuele uitvoer.
  Er kunnen twee evaluators gebruikt worden:
  - [GenericTextEvaluator](#generictextevaluator): Dit is de interne evaluator van TESTed voor tekst en tekstbestanden.
    Dit is de standaard evaluator.
  - [ProgrammedEvaluator](#programmedevaluator): Dit is een eigen geschreven evaluator.

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
Het *ValueOutputChannel*-object is het uitvoerkanaal voor returnwaarden.

Het *ValueOutputChannel*-object heeft 2 attributen: `value` en `evaluator`.
- **value**: De verwachte returnwaarde.
  Zie [Statements en expressies](#statements-en-expressies) voor de mogelijke returnwaarden.
  ::: danger Opmerking
  De verwachte returnwaarde mag geen functieoproepen en variabelen bevatten.
  :::
- **evaluator**: De evaluator die gebruikt moet worden voor het evalueren van de returnwaarde.
  Er kunnen drie evaluators gebruikt worden:
  - [GenericValueEvaluator](#genericvalueevaluator): Dit is de interne evaluator van TESTed voor returnwaarden.
    Dit is de standaard evaluator.
    ::: danger Opmerking
    Deze evaluator ondersteund alleen de datatypes van TESTed.
    :::
  - [ProgrammedEvaluator](#programmedevaluator): Dit is een eigen geschreven evaluator,
    die onafhankelijk is van de programmeertaal van de ingediende oplossing.
    ::: danger Opmerking
    Deze evaluator ondersteund alleen de datatypes van TESTed,
    die ondersteund worden door de programmeertaal van de evaluator.
    :::
  - [SpecificEvaluator](#specificevaluator): Dit is een eigen geschreven evaluator,
    die afhankelijk is van de programmeertaal van de ingediende oplossing.
    ::: warning Opmerking
    Dit is de enige evaluator die programmeertaal specifieke datatypes kan evalueren.
    :::

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
Het *GenericExceptionEvaluator*-object bevat alle informatie die nodig is om fouten te evalueren met de interne
evaluator.
:::warning Opmerking
Deze evaluator kan enkel foutboodschappen evalueren en niet de fouttypes.
Dit komt door dat de fouttypes programmeertaal afhankelijk zijn.
:::

Het *GenericExceptionEvaluator*-object heeft 3 attributen: `type`, `options` en `name`.
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
Het *GenericValueEvaluator*-object bevat alle informatie die nodig is om returnwaarden te evalueren met de interne
evaluator.

Het *GenericValueEvaluator*-object heeft 3 attributen: `type`, `options` en `name`.
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
Het *GenericTextEvaluator*-object bevat alle informatie die nodig is om tekstuele data te evalueren met de interne
evaluator.

Het *GenericTextEvaluator*-object heeft 3 attributen: `type`, `options` en `name`.
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
Het *ProgrammedEvaluator*-object is het object die gebruikt moet worden wanneer je een geprogrammeerde evaluatie
gebruikt.

Het *ProgrammedEvaluator*-object heeft 4 attributen: `language`, `function`, `arguments` en `type`.
- **language**: Een string de programmeertaal van de evaluator specificeert.
  ::: warning Opmerking
  De programmeertaal van de geprogrammeerde evaluator is onafhankelijk van de programmeertaal van de ingediende
  oplossing.
  :::
- **function**: Een [EvaluationFunction](#evaluationfunction) object, welke informatie bevat over de evaluatiefunctie.
- **arguments**: Een lijst met extra argumenten voor de evaluatiefunctie,
  zie [EvaluationFunction](#evaluationfunction) en [Statements en expressies](#statements-en-expressies).
  ::: warning Opmerking
  Deze argumenten kunnen geen functieoproepen en variabelen bevatten.
  :::
- **type**: Een string met de vaste waarde `programmed`.

::: tip Tip
Om een hoge evaluatieperformantie te hebben, raden we aan op de geprogrammeerde evaluator in **Python** te schrijven.

Dit komt omdat de geprogrammeerde evaluator in **Python** in hetzelfde proces als TESTed uitgevoerd wordt.
In tegenstelling tot de evaluators in de andere programmeertalen.
Deze evaluators worden in een ander process uitgevoerd (en moeten mogelijks ook gecompileerd worden),
wat een niet verwaarloosbare performantie overhead heeft.
:::

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
Het *SpecificEvaluator*-object is het object die gebruikt moet worden wanneer je een programmeertaal specifieke
evaluatie gebruikt.

Het *SpecificEvaluator*-object heeft 2 attributen: `evaluators` en `type`.
- **evaluators**: Dit is een object met de programmeertalen, waarvoor een evaluator beschikbaar, is als sleutels.
  De waarden van dit object zijn van het type [EvaluationFunction](#evaluationfunction),
  welke informatie bevat over de evaluatiefunctie.
  ::: warning Opmerking
  De programmeertaal van de specifieke evaluator is dezelfde als die van de ingediende oplossing.
  :::
  ::: danger Opmerking
  Wanneer er geen specifieke evaluator beschikbaar is voor een programmeertaal,
  kan de oefening niet opgelost worden in die programmeertaal.
  :::
- **type**: Dit is een string met de vaste waarde `specific`.

::: warning Opmerking
De specifieke evaluator wordt uitgevoerd in hetzelfde proces (dit is niet het TESTed proces)
die uitgevoerd wordt voor het uitvoeren van de studentencode.
:::

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
Het *EvaluationFunction*-object bevat de informatie voor de functieoproep voor de specifieke/geprogrammeerde evaluator.

Het *EvaluationFunction*-object heeft 2 attributen: `file` en `name`.
- **file**: Het relatief pad naar het broncode bestand in de `evaluation` map van de oefening,
  waarin de evaluator functie zich bevindt.
- **name**: De naam van de evaluatiefunctie die opgeroepen moet worden.
  Standaard is dit de functie `evaluate`.
  ::: danger Belangrijk
  Voor een specifieke evaluator verwacht deze functie slecht één argument `actual` welke de returnwaarde bevat.
  :::
  ::: danger Belangrijk
  Voor een geprogrammeerde evaluator verwacht deze functie drie argumenten: `expected`, `actual` en `arguments`.
  - `expected` bevat de verwachte returnwaarde uit het testplan.
  - `actual` bevat de werkelijke returnwaarde.
  - `arguments` bevat een lijst met extra argumenten voor de evaluatiefunctie.
  :::
  ::: danger Belangrijk
  Voor zowel de specifieke evaluator als de geprogrammeerde evaluator moet deze functie een object van het type 
  [EvaluationResult](https://github.com/dodona-edu/universal-judge/blob/4216ddd983add3bc05c61d47c09233093bff8808/tested/evaluators/__init__.py#L43).
    
  Dit object is geïmplementeerd voor elke ondersteunde programmeertaal.
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
In deze paragraaf zullen de mogelijke statements en expressies in TESTed.

### Datatypes TESTed
TESTed heeft verschillende datatypes die gebruikt kunnen worden.
We kunnen 3 soorten datatypes onderscheiden: [basis datatypes](#basis-datatypes),
[geavanceerde datatypes](#geavanceerde-datatypes) en [het variabele type](#variabletype).

#### Basis datatypes
De basis datatypes zijn een abstract datatype voor een concept, zoals gehele getallen en niet 8-bit gehele getallen.
Deze datatypes zullen gegenereerd worden als het standaard datatype in die programmeertaal voor een concept.

##### BasicNumericTypes
Er bestaan twee basis numerieke datatypes in TESTed: `integer` en `rational`.
- **integer**: gehele getallen.
- **rational**: rationale getallen.

```json
"BasicNumericTypes": {
  "title": "BasicNumericTypes",
  "description": "An enumeration.",
  "enum": [
    "integer",
    "rational"
  ],
  "type": "string"
},
```

##### BasicStringTypes
Er bestaan twee basis string datatypes in TESTed: `text` en `any`.
- **text**: tekst.
- **any**: Het datatype die elke waarde voorstelt.
  ::: warning Opmerking
  Dit datatype moet normaal niet gebruikt worden in het testplan. 
  :::

```json
"BasicStringTypes": {
  "title": "BasicStringTypes",
  "description": "An enumeration.",
  "enum": [
    "text",
    "any"
  ],
  "type": "string"
},
```

##### BasicBooleanTypes
Er bestaat één booleaans datatype in TESTed: `boolean`.

```json
"BasicBooleanTypes": {
  "title": "BasicBooleanTypes",
  "description": "An enumeration.",
  "enum": [
    "boolean"
  ],
  "type": "string"
},
```

##### BasicObjectTypes
Er bestaat één object datatype in TESTed: `map`.
Dit datatype stelt een collectie van sleutel-waarde paren voor.

```json
"BasicObjectTypes": {
  "title": "BasicObjectTypes",
  "description": "An enumeration.",
  "enum": [
    "map"
  ],
  "type": "string"
},
```

##### BasicNothingTypes
Er bestaat één 'niets' datatype in TESTed: `nothing`.
Dit datatype stelt de waarde 'niets' voor.

```json
"BasicNothingTypes": {
  "title": "BasicNothingTypes",
  "description": "An enumeration.",
  "enum": [
    "nothing"
  ],
  "type": "string"
},
```

##### BasicSequenceTypes
Er bestaan twee basis sequentie datatypes in TESTed: `sequence` en `set`.
- **sequence**: Een geordende sequentie van gegevens.
- **set**: Een ongeordende collectie van unieke invariabele gegevens.

```json
"BasicSequenceTypes": {
  "title": "BasicSequenceTypes",
  "description": "An enumeration.",
  "enum": [
    "sequence",
    "set"
  ],
  "type": "string"
},
```

#### Geavanceerde datatypes
De geavanceerde datatypes zijn een concrete datatype voor een concept,
zoals 8-bit gehele getallen en niet gehele getallen.
Deze datatypes zijn een specifiek datatype in de programmeertaal.

##### AdvancedNumericTypes
Er bestaan dertien geavanceerde numerieke datatypes in TESTed: `int8`, `uint8`, `int16`, `uint16`, `int32`, `uint32`,
`int64`, `uint64`, `bigint`, `single_precision`, `double_precision`, `double_extended` en `fixed_precision`.
- **int8**: 8-bit gehele getallen.
- **uint8**: 8-bit natuurlijke getallen.
- **int16**: 16-bit gehele getallen.
- **uint16**: 16-bit natuurlijke getallen.
- **int32**: 32-bit gehele getallen.
- **uint32**: 32-bit natuurlijke getallen.
- **int64**: 64-bit gehele getallen.
- **uint64**: 64-bit natuurlijke getallen.
- **bigint**: Onbeperkte grote gehele getallen.
- **single_precision**: 32-bit vlottende komma getallen.
- **double_precision**: 64-bit vlottende komma getallen.
- **double_extended**: Onbeperkt grote vlottende komma getallen.
- **fixed_precision**: Vast komma getallen.

```json
"AdvancedNumericTypes": {
  "title": "AdvancedNumericTypes",
  "description": "The advanced numeric types. Programming configs should be implemented using\nthe C/C++ rules: the size of the types is a minimum. For example, Python's ints\nare arbitrary precision, which means Python supports all integer types.\nOn the other hand, C only supports up to 64 bits.",
  "enum": [
    "int8",
    "uint8",
    "int16",
    "uint16",
    "int32",
    "uint32",
    "int64",
    "uint64",
    "bigint",
    "single_precision",
    "double_precision",
    "double_extended",
    "fixed_precision"
  ],
  "type": "string"
},
```

##### AdvancedSequenceTypes
Er bestaan drie geavanceerde sequentie datatypes in TESTed: `array`, `list` en `tuple`.
- **array**: Een dynamische sequentie van vaste lengte.
- **list**: Een dynamische sequentie van dynamische lengte.
- **tuple**: Een invariabele sequentie.

```json
"AdvancedSequenceTypes": {
  "title": "AdvancedSequenceTypes",
  "description": "Advanced sequence types. The names of these types are kept as generic as\npossible, to accommodate as many types as possible.",
  "enum": [
    "array",
    "list",
    "tuple"
  ],
  "type": "string"
},
```

##### AdvancedStringTypes
Er bestaat één geavanceerd string datatype in TESTed.
Dit is `char` welke een karakter voor stelt.

```json
"AdvancedStringTypes": {
  "title": "AdvancedStringTypes",
  "description": "An enumeration.",
  "enum": [
    "char"
  ],
  "type": "string"
},
```

#### VariableType
Het variabele type moet gebruikt worden wanneer de waarde die men wil voorstellen niet voorgesteld kan worden door een
datatype van TESTed.

Dit object heeft twee attributen: `data` en `type`.
- **data**: De naam van het datatype.
- **type**: De string met constante waarde `custom`.

```json
"VariableType": {
  "title": "VariableType",
  "type": "object",
  "properties": {
    "data": {
      "title": "Data",
      "type": "string"
    },
    "type": {
      "title": "Type",
      "const": "custom",
      "type": "string"
    }
  },
  "required": [
    "data"
  ]
},
```

### Assignment
TESTed ondersteund momenteel slechts één statement, welke een assignment is.

Een assignment heeft drie attributen `variable`, `expression` en `type`.
- **variable**: De naam van de variabele.
- **expression**: De [expressie](#expressies) die moet worden toegekend aan de variabele.
- **type**: Het [datatype](#datatypes-tested) van de variabele.

```json
"Assignment": {
  "title": "Assignment",
  "type": "object",
  "properties": {
    "variable": {
      "title": "Variable",
      "type": "string"
    },
    "expression": {
      "title": "Expression",
      "anyOf": [
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
    "type": {
      "title": "Type",
      "anyOf": [
        {
          "$ref": "#/definitions/BasicNumericTypes"
        },
        {
          "$ref": "#/definitions/BasicStringTypes"
        },
        {
          "$ref": "#/definitions/BasicBooleanTypes"
        },
        {
          "$ref": "#/definitions/BasicObjectTypes"
        },
        {
          "$ref": "#/definitions/BasicNothingTypes"
        },
        {
          "$ref": "#/definitions/BasicSequenceTypes"
        },
        {
          "$ref": "#/definitions/AdvancedNumericTypes"
        },
        {
          "$ref": "#/definitions/AdvancedSequenceTypes"
        },
        {
          "$ref": "#/definitions/AdvancedStringTypes"
        },
        {
          "$ref": "#/definitions/VariableType"
        }
      ]
    }
  },
  "required": [
    "variable",
    "expression",
    "type"
  ]
},
```

### Expressies
TESTed ondersteund momenteel drie types van expressies: [Identifier](#identifier), [FunctionCall](#functioncall)
en [waarden](#waarden).

#### Identifier
Een identifier is een string die een variabele voorstelt.

#### FunctionCall
Het *FunctionCall*-object stelt een functieoproep voor.

Het *FunctionCall*-object heeft 4 attributen: `type`, `name`, `namespace` en `arguments`.
- **type**: Het type van de functie: een gewone functieoproep, een constructor of een eigenschap,
  zie [FunctionType](#functiontype).
- **name**: De naam van de functie.
- **namespace**: De namespace van de functie.
  ::: warning Opmerking
  Wanneer deze niet opgegeven wordt is het een globale functie.
  Wanneer deze opgegeven is zal dit meestal een object variabele zijn, maar dit is niet altijd het geval.
  :::
- **arguments**: Een lijst van van [expressies](#expressies) en [NamedArguments](#namedargument) die meegeven moeten
  worden als argumenten van de functieoproep.

```json
"FunctionCall": {
  "title": "FunctionCall",
  "type": "object",
  "properties": {
    "type": {
      "$ref": "#/definitions/FunctionType"
    },
    "name": {
      "title": "Name",
      "type": "string"
    },
    "namespace": {
      "title": "Namespace",
      "type": "string"
    },
    "arguments": {
      "title": "Arguments",
      "default": [],
      "type": "array",
      "items": {
        "anyOf": [
          {
            "anyOf": [
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
          {
            "$ref": "#/definitions/NamedArgument"
          }
        ]
      }
    }
  },
  "required": [
    "type",
    "name"
  ]
},
```

::: warning Opmerking
Wanneer je een functie wil testen die geen returnwaarde heeft (niet de waarde [NothingType](#nothingtype),
bijvoorbeeld `void` in Java),
moet het uitvoerkanaal een [EmptyChannel](#emptychannel) of [IgnoreChannel](#ignoredchannel) zijn.
:::

##### FunctionType
TESTed heeft 3 functietypes: `function`, `constructor` en `property`.
- **function**: Een normale functieoproep.
- **constructor**: Een object constructor oproep.
- **property**: Een objecteigenschap.

```json
"FunctionType": {
  "title": "FunctionType",
  "description": "An enumeration.",
  "enum": [
    "function",
    "constructor",
    "property"
  ],
  "type": "string"
},
```

##### NamedArgument
Het *NamedArgument*-object wordt gebruikt voor genaamde argumenten voor een functieoproep.

Het *NamedArgument*-object heeft 2 attributen: `name` en `value`.
- **name**: De naam van het argument.
- **value**: De waarde van het argument welke een [expressie](#expressies) is.

```json
"NamedArgument": {
  "title": "NamedArgument",
  "type": "object",
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"
    },
    "value": {
      "title": "Value",
      "anyOf": [
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
    }
  },
  "required": [
    "name",
    "value"
  ]
},
```

#### Waarden
TESTed ondersteund momenteel 6 mogelijke waarden: [getallen](#numbertype), [tekst](#stringtype),
[booleaanse waarden](#booleantype), [sequenties](#sequencetype), [afbeeldingen](#objecttype) en ['niets'](#nothingtype).

##### NumberType
Het *NumberType*-object stelt numerieke data voor.

Het *NumberType*-object heeft 2 attributen: `type` en `data`.
- **type**: Het type van de numerieke data,
  zie [BasicNumericTypes](#basicnumerictypes) en [AdvancedNumericTypes](#advancednumerictypes).
- **data**: De numerieke data.

```json
"NumberType": {
  "title": "NumberType",
  "type": "object",
  "properties": {
    "type": {
      "title": "Type",
      "anyOf": [
        {
          "$ref": "#/definitions/BasicNumericTypes"
        },
        {
          "$ref": "#/definitions/AdvancedNumericTypes"
        }
      ]
    },
    "data": {
      "title": "Data",
      "anyOf": [
        {
          "type": "number"
        },
        {
          "type": "integer"
        },
        {
          "type": "number"
        }
      ]
    }
  },
  "required": [
    "type",
    "data"
  ]
},
```

##### StringType
Het *StringType*-object stelt tekstuele data voor.

Het *StringType*-object heeft 2 attributen: `type` en `data`.
- **type**: Het type van de tekstuele data,
  zie [BasicStringTypes](#basicstringtypes) en [AdvancedStringTypes](#advancedstringtypes).
- **data**: De tekstuele data als string.

```json
"StringType": {
  "title": "StringType",
  "type": "object",
  "properties": {
    "type": {
      "title": "Type",
      "anyOf": [
        {
          "$ref": "#/definitions/BasicStringTypes"
        },
        {
          "$ref": "#/definitions/AdvancedStringTypes"
        }
      ]
    },
    "data": {
      "title": "Data",
      "type": "string"
    }
  },
  "required": [
    "type",
    "data"
  ]
},
```

##### BooleanType
Het *BooleanType*-object stelt een booleaanse waarde voor.

Het *BooleanType*-object heeft 2 attributen: `type` en `data`.
- **type**: Het `boolean` datatype, zie [BasicBooleanTypes](#basicbooleantypes).
- **data**: Een booleaanse waarde `true` of `false`.

```json
"BooleanType": {
  "title": "BooleanType",
  "type": "object",
  "properties": {
    "type": {
      "$ref": "#/definitions/BasicBooleanTypes"
    },
    "data": {
      "title": "Data",
      "type": "boolean"
    }
  },
  "required": [
    "type",
    "data"
  ]
},
```

##### SequenceType
Het *SequenceType*-object stelt de collectie van waarden voor.

Het *SequenceType*-object heeft 2 attributen: `type` en `data`.
- **type**: Het type van de sequentie,
  zie [BasicSequencetypes](#basicsequencetypes) en [AdvancedSequenceTypes](#advancedsequencetypes).
- **data**: De lijst van [expressie](#expressies)-elementen.

```json
"SequenceType": {
  "title": "SequenceType",
  "type": "object",
  "properties": {
    "type": {
      "title": "Type",
      "anyOf": [
        {
          "$ref": "#/definitions/BasicSequenceTypes"
        },
        {
          "$ref": "#/definitions/AdvancedSequenceTypes"
        }
      ]
    },
    "data": {
      "title": "Data",
      "type": "array",
      "items": {
        "anyOf": [
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
      }
    }
  },
  "required": [
    "type",
    "data"
  ]
},
```

##### ObjectType
Het *ObjectType*-object stelt een collectie van sleutel-waarde paren voor.

Het *ObjectType*-object heeft 2 attributen: `type` en `data`.
- **type**: Het `map` datatype, zie [BasicObjectTypes](#basicobjecttypes).
- **data**: De lijst van de [sleutel-waarde paren](#objectkeyvaluepair).

```json
"ObjectType": {
  "title": "ObjectType",
  "type": "object",
  "properties": {
    "type": {
      "$ref": "#/definitions/BasicObjectTypes"
    },
    "data": {
      "title": "Data",
      "type": "array",
      "items": {
        "$ref": "#/definitions/ObjectKeyValuePair"
      }
    }
  },
  "required": [
    "type",
    "data"
  ]
},
```

###### ObjectKeyValuePair
Het *ObjectKeyValuePair*-object stelt een sleutel-waarde paar voor.

Het *ObjectKeyValuePair*-object heeft 2 attributen: `key` en `value`.
- **key**: De sleutel, wat een [expressie](#expressies) is.
- **value**: De waarde, wat opnieuw een [expressie](#expressies) is.

```json
"ObjectKeyValuePair": {
  "title": "ObjectKeyValuePair",
  "type": "object",
  "properties": {
    "key": {
      "title": "Key",
      "anyOf": [
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
    "value": {
      "title": "Value",
      "anyOf": [
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
    }
  },
  "required": [
    "key",
    "value"
  ]
},
```

##### NothingType
Het *NothingType*-object stelt de 'niets'-waarde voor.

Het *NothingType*-object heeft 2 attributen: `type` en `data`.
- **type**: Het `nothing` datatype, zie [BasicNothingTypes](#basicnothingtypes).
- **data**: De constante waarde `null`.

```json
"NothingType": {
  "title": "NothingType",
  "type": "object",
  "properties": {
    "type": {
      "allOf": [
        {
          "$ref": "#/definitions/BasicNothingTypes"
        }
      ]
    },
    "data": {
      "title": "Data",
      "const": null
    }
  }
},
```