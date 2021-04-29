---
title: Configuratie TESTed
description: "Configuratie TESTed"
sidebarDepth: 2
---

# Configuratie TESTed

Als judge die oplossingen voor programmeeroefeningen automatisch beoordeelt, 
heeft TESTed een verplicht veld `evaluation.plan_name` in het 
configuratiebestand van de oefening (`config.json`). Dit veld moet aangeven
wat de bestandsnaam is van het testplan in de map `evaluation` van de oefening.

Voor testplannen zijn er twee opties. TESTed ondersteunt een domeinspecifieke
taal (DSL; *domain specific language*) om de testen te beschrijven waaraan een
ingediende oplossing zal onderworpen worden. Het gebruik van deze DSL is de 
meest eenvoudige manier om de testen te beschrijven. De specificatie van 
[**DSL-testplannen**](../dsl) gebeurt in het 
[YAML-formaat](https://en.wikipedia.org/wiki/YAML){: target="_blank"} in 
bestanden met de extensie `.yaml` of `.yml`. Meer 
[**geavanceerde testplannen**](../json) worden beschreven in het 
[JSON-formaat](https://nl.wikipedia.org/wiki/JSON){: target="_blank"} in 
bestanden die typisch de extensie `.json` gebruiken, al legt TESTed geen 
specifieke beperkingen op aan de bestandsextensie van geavanceerde testplannen.

Naast het verplichte veld voor het testplan, kan je in het configuratiebestand 
van een oefening (`config.json`) 
[bijkomende configuratieopties](../../references/exercise-config) instellen in 
het object `evaluation.options`. In de volgende secties bespreken de 
verschillende opties. Hun specificatie wordt vastgelegd in onderstaand 
[JSON Schema](https://json-schema.org/){: target="_blank"}.

```json
{
  "title": "OptionsModel",
  "$ref": "#/definitions/Options",
  "definitions": {
    "ExecutionMode": {
      "title": "ExecutionMode",
      "description": "An enumeration.",
      "enum": [
        "batch",
        "context"
      ],
      "type": "string"
    },
    "Options": {
      "title": "Options",
      "type": "object",
      "properties": {
        "parallel": {
          "title": "Parallel",
          "default": false,
          "type": "boolean"
        },
        "mode": {
          "default": "batch",
          "allOf": [
            {
              "$ref": "#/definitions/ExecutionMode"
            }
          ]
        },
        "allow_fallback": {
          "title": "Allow Fallback",
          "default": true,
          "type": "boolean"
        },
        "language": {
          "title": "Language",
          "default": {},
          "type": "object",
          "additionalProperties": {
            "type": "object"
          }
        },
        "linter": {
          "title": "Linter",
          "default": {},
          "type": "object",
          "additionalProperties": {
            "type": "boolean"
          }
        },
        "optimized": {
          "title": "Optimized",
          "default": true,
          "type": "boolean"
        }
      }
    }
  }
}
```

## Parallel uitvoeren van testbestanden

Het veld `parallel` geeft aan of de beoordeling geparallelliseerd mag uitgevoerd
worden. Dit gaat specifiek over het uitvoeren van de verschillende testbestanden 
die voor één tabblad gegenereerd worden. Standaard worden deze testbestanden 
sequentieel uitgevoerd, maar de testen in die bestanden zijn wel altijd 
onafhankelijk van elkaar.

Voorbeeld (parallel uitvoeren ingeschakeld):

```json
{
  "evaluation": {
    "options": {
      "parallel": true
    }   
  }
}
```

## Compilatiemodus

Het veld `mode` geeft aan hoe uitvoerbare bestanden (testbestanden en ingediende 
oplossingen) moeten gecompileerd moet worden. Daarvoor biedt TESTed twee 
mogelijkheden aan:

* `batch`: Alle uitvoerbare bestanden in één keer compileren.
* `context`: Elk uitvoerbare bestanden afzonderlijk compileren (individuele compilatie).

In vergelijking met individuele compilatie, heeft `batch`-compilatie minder tijd
nodig voor het compileren van testbestanden en ingediende oplossingen. Standaard 
zal TESTed alle uitvoerbare bestanden in één keer compileren.
   
Voorbeeld (individueel compileren):

```json
{
  "evaluation": {
    "options": {
      "mode": "context"
    }
  }
}
```

### Fallback voor compilatie

Bij `batch`-compilatie kan ingesteld worden dat TESTed mag teruggevallen op 
individuele compilatie als de `batch`-compilatie faalt. Hiervoor gebruik je het 
veld `allow_fallback`. Standaard mag TESTed terugvallen op individuele 
compilatie als de `batch`-compilatie faalt.

Voorbeeld (fallback voor compilatie uitgeschakeld):

```json
{
  "evaluation": {
    "options": {
      "mode": "batch",
      "allow_fallback": false
    }   
  }
}
```

## Geoptimaliseerde Python-evaluatie

Gebruik het veld `optimized` om aan te geven of geprogrammeerde 
Python-evaluators geoptimaliseerd mogen uitgevoerd worden. Daarmee bedoelen we
dat de Python-evaluators in hetzelfde proces als TESTed mogen uitgevoerd worden.
Het uitvoeren van evaluators in afzonderlijke processen zorgt voor een 
aanzienlijke overhead qua performantie. Standaard mag TESTed Python-evaluators 
geoptimaliseerd uitvoeren.

Voorbeeld (geoptimaliseerde Python-evaluatie uitschakelen):

```json
{
  "evaluation": {
    "options": {
      "optimized": false
    }   
  }
}
```

## Linters

Bij de [configuratie van een programmeertaal voor TESTed](configure-new-programming-language) 
kan ook een [linter](https://en.wikipedia.org/wiki/Lint_(software)){: target="_blank"} 
geconfigureerd worden. Dit zijn de linters die TESTed op dit moment gebruikt:

| Programmeertaal | Linter                                                                    |
| --------------- | ------------------------------------------------------------------------- |
| C               | [Cppcheck](http://cppcheck.sourceforge.net/){: target="_blank"}           |
| Haskell         | [HLint](https://github.com/ndmitchell/hlint){: target="_blank"}           |
| Java            | [Checkstyle](https://github.com/checkstyle/checkstyle){: target="_blank"} |
| JavaScript      | [ESLint](https://eslint.org/){: target="_blank"}                          |
| Kotlin          | [ktlint](https://ktlint.github.io/){: target="_blank"}                    |
| Python          | [Pylint](https://www.pylint.org/){: target="_blank"}                      |

Bij de configuratie van een oefening kan je in het veld `linter` voor elke 
programmeertaal instellen of ingediende oplossingen door de linter moeten 
geëvalueerd worden. De sleutels van het geassocieerde object zijn de 
programmeertalen die door TESTed ondersteund worden. Met een boolean wordt 
aangegeven of TESTed de linter voor de programmeertaal moet gebruiken. Standaard 
zal TESTed voor elke programmeertaal de linter gebruiken.

Voorbeeld (linters uitschakelen):

```json
{
  "evaluation": {
    "options": {
      "linter": {
        "c": false,
        "haskell": false,
        "java": false,
        "javascript": false,
        "kotlin": false,
        "python": false
      }
    }
  }
}
```

## Programmeertaal-specifieke opties
 
Naast algemene configuratieopties, kunnen individuele programmeertalen ook eigen 
opties hebben. Dergelijke programmeertaal-specifieke opties worden ingesteld in 
het object dat geassocieerd wordt met het veld `evaluation.language`. Hieronder 
bespreken we de opties per programmeertaal. Programmeertalen zonder
programmeertaal-specifieke opties worden niet opgelijst. 

### Haskell

De programmeertaal Haskell heeft 1 optie: `hlint_config`.
Deze verwacht de bestandsnaam van een HLint-configuratiebestand.
Dit bestand moet zich in de map `evaluation` van de oefening bevinden.

Voorbeeld HLint-configuratie:
```json
{
  "evaluation": {
    "options": {
      "language": {
        "haskell": {
          "hlint_config": "hlint.config.yaml"
        }
      }
    }
  }
}
```

### Java

Via de optie `checkstyle_config` kan de bestandsnaam van een 
Checkstyle-configuratiebestand (linter) ingesteld worden. Het bestand zelf moet
in de map `evaluation` van de oefening geplaatst worden.

Voorbeeld:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "java": {
          "checkstyle_config": "java_style.xml"
        }
      }
    }
  }
}
```

### JavaScript

Via de optie `eslint_config` kan de bestandsnaam van een 
ESLint-configuratiebestand (linter) ingesteld worden. Het bestand zelf moet
in de map `evaluation` van de oefening geplaatst worden.

Voorbeeld:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "javascript": {
          "eslint_config": "eslintrc.yaml"
        }
      }
    }   
  }
}
```

### Kotlin

De linter `ktlint` kan geconfigureerd worden op basis van de volgende opties:

- `editorconfig`: Bestandsnaam van een `.editorconfig`-bestand 
  (zie <https://editorconfig.org/>) in de map `evaluation` van de oefening.
- `disabled_rules_ktlint`: Lijst van regels die *ktlint* moeten negeren. Kan ook
  ingesteld worden als een kommagescheiden string van regels.
- `ktlint_ruleset`: Bestandsnaam van een JAR-bestand met extra regels. Dit 
  bestand moet in de map `evaluation` van de oefening geplaatst worden.
- `ktlint_experimental`: Boolean die aangeeft of *ktlint* ook experimentele 
  regels moet gebruiken. Standaard zal *ktlint* experimentele regels gebruiken.

Voorbeeld:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "kotlin": {
          "editorconfig": "kotlin.editorconfig",
          "disabled_rules_ktlint": ["filename"],
          "ktlint_ruleset": "ktlint_rules.jar",
          "ktlint_experimental": false
        }
      }
    }   
  }
}
```

### Python

Via de optie `pylint_config` kan de bestandsnaam van een 
Pylint-configuratiebestand (linter) ingesteld worden. Het bestand zelf moet
in de map `evaluation` van de oefening geplaatst worden.

Voorbeeld:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "python": {
          "pylint_config": "pylint.rc"
        }
      }
    }   
  }
}
```

## Uitgewerkt voorbeeld

Hieronder zie je een volledig configuratiebestand van een oefening 
( `config.json`) waarvan de oplossingen door TESTed beoordeeld worden.

```json
{
  "access": "private",
  "description": {
    "names": {
      "en": "My exercise",
      "nl": "Mijn oefening"
    }
  },
  "evaluation": {
    "handler": "TESTed",
    "plan_name": "plan.yaml",
    "options": {
      "parallel": true,
      "mode": "batch",
      "allow_fallback": true,
      "optimized": true,
      "linter": {
        "c": true,
        "haskell": true,
        "java": true,
        "javascript": true,
        "kotlin": true,
        "python": true
      },
      "language": {
        "haskell": {
          "hlint_config": "hlint.config.yaml"
        },
        "java": {
          "checkstyle_config": "java_style.xml"
        },
        "javascript": {
          "eslint_config": "eslintrc.yaml"
        },
        "kotlin": {
          "editorconfig": "kotlin.editorconfig",
          "disabled_rules_ktlint": ["filename"],
          "ktlint_ruleset": "ktlint_rules.jar",
          "ktlint_experimental": false
        },
        "python": {
          "pylint_config": "pylint.rc"
        }
      }
    }
  },
  "labels": []
}
```
