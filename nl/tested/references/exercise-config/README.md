---
title: Configuratie voor oefeningen
description: "De configuratie-opties ondersteund door TESTed"
---

# Configuratie voor oefeningen

Naast de standaardopties van Dodona zijn er een aantal opties die eigen aan TESTed zijn.

## Testplan

De enige verplichte optie is de naam van het testplan meegeven.
Dit moet binnen het `evaluation`-blok:

```json
{
  "evaluation": {
    "testplan": "plan.json"
  }
}
```

Bij het gebruik van de [vereenvoudigde testplannen (met de DSL)](../../references/dsl) is de extensie `.yaml` verplicht.
In alle andere gevallen zal TESTed er van uitgaan dat je een [volledig testplan (met JSON)](../../references/json) gebruikt.

## General opties

Daarnaast kan je bepaalde delen van het gedrag van TESTed aanpassen door opties mee te geven in een `options`-blok.
In de volgende paragrafen bespreken we de verschillende opties.
Hun specificatie wordt vastgelegd in onderstaand [JSON Schema](https://json-schema.org/).

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
          "default": true,
          "type": "boolean"
        }
      }
    }
  }
}
```

### Compilatiemodus

Het veld `mode` geeft aan hoe uitvoerbare bestanden (testbestanden en ingediende oplossingen) moeten gecompileerd moet worden.
Daarvoor biedt TESTed twee mogelijkheden aan:

* `batch`: Alle uitvoerbare bestanden in één keer compileren.
* `context`: Elk uitvoerbare bestanden afzonderlijk compileren (individuele compilatie).

Het voornaamste voordeel van de batchcompilatie is dat het sneller is dat de individuele compilatie.
Standaard zal TESTed alle uitvoerbare bestanden in één keer compileren.

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

Bij `batch`-compilatie kan ingesteld worden dat TESTed mag teruggevallen op individuele compilatie als de `batch`-compilatie faalt.
Dit kan bijvoorbeeld nuttig zijn als een oplossing nog niet alle functies heeft geïmplementeerd.
Hiervoor gebruik je het veld `allow_fallback`.
Standaard mag TESTed terugvallen op individuele compilatie als de `batch`-compilatie faalt.

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

## Linters

Bij de [configuratie van een programmeertaal voor TESTed](../../new-programming-language)
kan ook een [linter](https://en.wikipedia.org/wiki/Lint_(software)) geconfigureerd worden.
Dit zijn de linters die TESTed op dit moment gebruikt:

| Programmeertaal | Linter                                                 |
|-----------------|--------------------------------------------------------|
| Bash            | [Shellcheck](https://www.shellcheck.net/)              |
| C               | [Cppcheck](http://cppcheck.sourceforge.net/)           |
| Haskell         | [HLint](https://github.com/ndmitchell/hlint)           |
| Java            | [Checkstyle](https://github.com/checkstyle/checkstyle) |
| JavaScript      | [ESLint](https://eslint.org/)                          |
| Kotlin          | [Ktlint](https://ktlint.github.io/)                    |
| Python          | [Pylint](https://pylint.pycqa.org/en/latest/)          |

Bij de configuratie van een oefening kan je in het veld `linter` globaal de linters uit- of inschakelen. Voorbeeld (alle linters uitschakelen):

```json
{
  "evaluation": {
    "options": {
      "linter": false
    }
  }
}
```

De linters kunnen ook per programmeertaal in-/uitgeschakeld worden in de programmeertaal-specifieke opties. Voorbeeld (alleen linting voor JavaScript):

```json
{
  "evaluation": {
    "options": {
      "linter": false,
      "language": {
        "javascript": {
          "linter": true
        }
      } 
    }
  }
}
```

## Programmeertaal-specifieke opties

Naast algemene configuratieopties, kunnen individuele programmeertalen ook eigen opties hebben.
Onderstaande opties zijn momenteel beschikbaar.

### Bash

Met de optie `shellcheck_config` kan je een Shellcheck-configuratiebestand meegeven, dat zal gebruikt worden om de linter in te stellen.
Dit bestand moet zich in de map `evaluation` van de oefening bevinden.

Voorbeeld (Shellcheck-configuratie):
```json
{
  "evaluation": {
    "options": {
      "language": {
        "bash": {
          "shellcheck_config": "shellcheckrc"
        }
      }
    }
  }
}
```

### Haskell

Met de optie `hlint_config` kan je een HLint-configuratiebestand meegeven, dat zal gebruikt worden om de linter in te stellen.
Dit bestand moet zich in de map `evaluation` van de oefening bevinden.

Voorbeeld (HLint-configuratie):
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

Met de optie `checkstyle_config` kan je een Checkstyle-configuratiebestand meegeven, dat zal gebruikt worden om de linter in te stellen.
Dit bestand moet zich in de map `evaluation` van de oefening bevinden.

Voorbeeld (Checkstyle-configuratie):

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

Met de optie `eslint_config` kan je een ESLint-configuratiebestand meegeven, dat zal gebruikt worden om de linter in te stellen.
Dit bestand moet zich in de map `evaluation` van de oefening bevinden.

Voorbeeld (ESLint-configuratie):

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

Voor Kotlin zijn er een aantal opties voor de linter `ktlint`:

- `editorconfig`: Naam van een `.editorconfig`-bestand (zie <https://editorconfig.org/>) in de map `evaluation` van de oefening.
- `disabled_rules_ktlint`: Lijst van regels die *ktlint* moeten negeren. Kan ook
  ingesteld worden als een kommagescheiden string van regels.
- `ktlint_ruleset`: Bestandsnaam van een JAR-bestand met extra regels. Dit
  bestand moet in de map `evaluation` van de oefening geplaatst worden.
- `ktlint_experimental`: Boolean die aangeeft of *ktlint* ook experimentele
  regels moet gebruiken. Standaard zal *ktlint* experimentele regels gebruiken.

Voorbeeld (KTLint-configuratie):

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

Met de optie `pylint_config` kan je een PyLint-configuratiebestand meegeven, dat zal gebruikt worden om de linter in te stellen.
Dit bestand moet zich in de map `evaluation` van de oefening bevinden.

Voorbeeld (PyLint-configuratie):

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

## Volledig voorbeeld

Hieronder zie je een volledig configuratiebestand van een oefening (`config.json`):

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
      "mode": "batch",
      "allow_fallback": true,
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
