---
title: Configuratieopties voor oefeningen
description: "Configuratieopties voor oefeningen met TESTed"
order: 1
---

# Configuratieopties voor oefeningen

Naast de [algemene configuratieopties](/nl/references/exercise-config) voor oefeningen van Dodona, zijn er een aantal configuratie-opties voor TESTed.

## Testplan

Het veld `test_suite` in het `evaluation`-blok wordt gebruikt om de locatie van het testplan op te geven, relatief tegenover de map `evaluation`.

```json
{
  "evaluation": {
    "test_suite": "suite.yaml"
  }
}
```

Zie [_Formaat voor testplannen_](/nl/references/tested/json) voor een gedetailleerde beschrijving van het formaat voor testplannen voor TESTed.

## Algemene opties

Het `evaluation`-blok ondersteunt een `option`-object met velden die het gedrag van TESTed beïnvloeden.
We overlopen deze opties hieronder.

### `options.mode`

Het veld `mode` geeft aan hoe testcode gegenereerd en uitgevoerd moeten worden (samen met de ingediende oplossing).
Twee modi worden ondersteund:

* `batch` (standaard): Alle testcode van een tabblad wordt gegenereerd en gecompileerd in één compilatie-eenheid (batchcompilatie).
* `context`: Testcode wordt gegenereerd en gecompileerd per context (contextuele compilatie).

Het compilatieproces is sneller bij batchcompilatie dan met contextuele compilatie,
maar kan falen als een ingediende oplossing niet aan alle vereisten van de oefening voldoet.
Als een oefening bijvoorbeeld vereist dat twee functie geïmplementeerd worden, maar de ingediende oplossing implementeert er slechts één, zal dit bij oplossingen in Java leiden tot compilatiefouten.
Zie het volgende veld voor een oplossing.

Hier is een voorbeeld dat contextuele compilatie gebruikt:

```json
{
  "evaluation": {
    "options": {
      "mode": "context"
    }
  }
}
```

### `options.allow_fallback`

Als het Booleaanse veld `allow_fallback` op `true` staat (de standaardwaarde),
zal TESTed automatisch contextuele compilatie gebruiken als de batchcompilatie faalt.
Dit kan nuttig zijn om ingediende oplossingen te evalueren die niet alle vereisten implementeren.

Hier is een voorbeeld dat het terugvallen op de contextuele compilatie uitschakelt:

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

Bij het [toevoegen van een nieuwe programmeertaal aan TESTed](/nl/references/tested/new-programming-language)
is het ook mogelijk een [linter](https://en.wikipedia.org/wiki/Lint_(software)) toe te voegen, die TESTed gebruikt om statische code-analyze uit te voeren bij het beoordelen van een ingediende oplossing.
Dit zijn de linters die TESTed op dit moment gebruikt:

| Programmeertaal | Linter                                                 |
|-----------------|--------------------------------------------------------|
| Bash            | [Shellcheck](https://www.shellcheck.net/)              |
| C               | [Cppcheck](http://cppcheck.sourceforge.net/)           |
| C++             | [Cppcheck](http://cppcheck.sourceforge.net/)           |
| Haskell         | [HLint](https://github.com/ndmitchell/hlint)           |
| Java            | [Checkstyle](https://github.com/checkstyle/checkstyle) |
| JavaScript      | [ESLint](https://eslint.org/)                          |
| Kotlin          | [Ktlint](https://ktlint.github.io/)                    |
| Python          | [Pylint](https://pylint.pycqa.org/en/latest/)          |

Het Booleaanse veld `options.linter` kan gebruikt worden om linters in (`true`) of uit (`false`) te schakelen voor een programmeeroefening,
voor alle programmeertalen samen ofwel voor individuele talen.
Het is een voorbeeld dat linters uitschakelt voor alle programmeertalen:

```json
{
  "evaluation": {
    "options": {
      "linter": false
    }
  }
}
```

Hier is een voorbeeld dat enkel de linter voor JavaScript inschakelt:

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

## Opties voor individuele programmeertalen

De modules voor de programmeertalen in TESTed kunnen eigen opties hebben.
Hieronder is een overzicht van de opties voor elke programmeertaal die momenteel door TESTed ondersteund wordt.

### Bash

In het veld `shellcheck_config` kan de locatie van een configuratiebestand voor Shellcheck gegeven worden, relatief ten opzicht van de `evaluation`-map van de oefening.
TESTed zal dit configuratiebestand gebruiken bij het uitvoeren van de linter op ingediende oplossingen in Bash.
Hier is een voorbeeld dat het bestand `shellcheckrc` instelt als configuratiebestand voor Shellcheck:

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

In het veld `hlint_config` kan de locatie van een configuratiebestand voor HLint gegeven worden, relatief ten opzicht van de `evaluation`-map van de oefening.
TESTed zal dit configuratiebestand gebruiken bij het uitvoeren van de linter op ingediende oplossingen in Haskell.
Hier is een voorbeeld dat het bestand `hlint.config.yaml` instelt als configuratiebestand voor HLint:

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

In het veld `checkstyle_config` kan de locatie van een configuratiebestand voor Checkstyle gegeven worden, relatief ten opzicht van de `evaluation`-map van de oefening.
TESTed zal dit configuratiebestand gebruiken bij het uitvoeren van de linter op ingediende oplossingen in Java.
Hier is een voorbeeld dat het bestand `java_style.xml` instelt als configuratiebestand voor Checkstyle:


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

In het veld `eslint_config` kan de locatie van een configuratiebestand voor ESLint gegeven worden, relatief ten opzicht van de `evaluation`-map van de oefening.
TESTed zal dit configuratiebestand gebruiken bij het uitvoeren van de linter op ingediende oplossingen in JavaScript.
Hier is een voorbeeld dat het bestand `eslintrc.yaml` instelt als configuratiebestand voor ESLint:

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

TESTed ondersteunt volgende velden voor de linter bij Kotlin (`ktlint`):

- `editorconfig`: Locatie en naam van een `.editorconfig`-bestand (zie <https://editorconfig.org/>), relatief ten opzichte van de `evaluation`-map van de oefening.
- `disabled_rules_ktlint`: Regels die _ktlint_ moeten negeren, ofwel als een lijst van strings, ofwel als één string die door komma's gescheiden wordt.
- `ktlint_ruleset`: Locatie en naam van een JAR-bestand met extra regels, relatief ten opzichte van de `evaluation`-map van de oefening.
- `ktlint_experimental`: Booleaanse waarde die aangeeft of `ktlint` ook experimentele regels moet gebruiken (`true`, de standaardwaarde) of niet (`false`).

Hier is een voorbeeld dat het gebruik van een aantal van deze velden toont:

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

In het veld `pylint_config` kan de locatie van een configuratiebestand voor PyLint gegeven worden, relatief ten opzicht van de `evaluation`-map van de oefening.
TESTed zal dit configuratiebestand gebruiken bij het uitvoeren van de linter op ingediende oplossingen in Python.
Hier is een voorbeeld dat het bestand `pylint.rc` instelt als configuratiebestand voor PyLint:

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

Hieronder is een voorbeeld van een volledig configuratiebestand (`config.json`) voor een programmeeroefeningen voor Dodona dat gebruik maakt van TESTed voor automatische feedback:

```json
{
  "access": "public",
  "description": {
    "names": {
      "en": "My exercise",
      "nl": "Mijn oefening"
    }
  },
  "evaluation": {
    "handler": "TESTed",
    "plan_name": "plan.json",
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
