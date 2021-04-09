---
title: Configuratie TESTed
description: "Configuratie TESTed"
sidebarDepth: 2
---

# Configuratie TESTed
De TESTed judge heeft een verplicht veld `evaluation.plan_name` in het `config.json` bestand van een Dodona oefening.
Dit veld moet de naam van een testplan, in de map `evaluation` van de oefening, bevatten.
Het testplan kan zowel een [DSL-testplan](../dsl) zijn, als een [geavanceerd testplan](../json).
De DSL-testplannen moet eindigen op één van de YAML-extensies (`.yaml` of `.yml`).
Voor de geavanceerde testplannen zijn er geen beperkingen op de bestandsextensie, behalve de YAML-extensies.

Naast het verplichte testplan-veld, heeft TESTed enkele configuratieopties die ingesteld kunnen worden.
De opties moeten ingesteld worden in het `config.json` van een Dodona oefening
(zie [Oefeningconfiguratie](../../exercise-config)).
De opties moeten meegegeven worden in het object `evaluation.options`.

## JSON-Schema
Hieronder kun je het JSON Schema vinden van de verschillende opties.
De opties zullen in de volgende paragrafen verder uitgelegd worden.
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

## Parallellisatie
Het veld `parallel` heeft aan of de evaluatie geparallelliseerd uitgevoerd mag worden.
De parallellisatie slaat op de verschillende gegenereerde uitvoerbare bestanden voor een tabblad.
Standaard wordt er niet geparallelliseerd.

Voorbeeld toepassen parallellisatie:
```json
{
  "evaluation": {
    "options": {
      "parallel": true
    }   
  }
}
```

## Compilatie modus
Het veld `mode` heeft aan hoe er gecompileerd moet worden.
TESTed ondersteunt twee modi:
1) Alle uitvoerbare bestanden in één keer compileren (`batch`).
2) Elke uitvoerbaar bestand apart compileren (`context`, individuele compilatie).

`batch`-compilatie heeft als gevolg dat er minder tijd gespendeerd wordt aan het compileren van testcode en oplossing,
in vergelijking met de individuele compilatie.

Standaard zal TESTed alle uitvoerbare bestanden in één keer compileren.
   
Voorbeeld individueel compileren:
```json
{
  "evaluation": {
    "options": {
      "mode": "context"
    }
  }
}
```

### Compilatie fallback
Wanneer je `batch`-compilatie gebruikt kun je instellen of er overgeschakeld mag worden naar de individuele compilatie,
wanneer de `batch`-compilatie faalt.
Hiervoor maak je gebruik van het veld `allow_fallback`.
Standaard zal TESTed terugvallen naar de individuele compilatie, wanneer de `batch`-compilatie faalt.

Voorbeeld uitschakelen compilatie fallback:
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

## Geoptimaliseerde python evaluatie
Het veld `optimized` wordt gebruikt om aan te geven
of de geprogrammeerde Python evaluators geoptimaliseerd uitgevoerd mogen worden.
Met geoptimaliseerd bedoelen we dat ze in hetzelfde proces als TESTed uitgevoerd zullen worden.
Anders zullen ze een apart process uitgevoerd worden, wat een niet verwaarloosbare performantie overhead hebben.
Standaard zal TESTed deze geoptimaliseerd uitvoeren.

Voorbeeld niet geoptimaliseerde Python-evaluatie:
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
De TESTed judge heeft ondersteuning voor linters.
Per programmeertaal kan er beslist worden of je aldan niet de linter wenst te gebruiken voor die programmeertaal.
De gebruikte linters zijn:
| Programmeertaal | Linter     |
| --------------- | ---------- |
| C               | Cppcheck   |
| Haskell         | HLint      |
| Java            | Checkstyle |
| JavaScript      | ESLint     |
| Kotlin          | KTLint     |
| Python          | PYLint     |

De linters worden ingesteld in het object bijhorend bij het veld `linter`.
De sleutels van dit object zijn de ondersteunde programmeertalen.
Met een boolean wordt aangegeven of de linters gebruikt moeten worden.
Standaard zullen de linters voor elke programmeertaal gebruikt worden.

Voorbeeld uitschakelen linters:
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

## Programmeertaal specifiek
Naast de configuratieopties voor TESTed zelf, bestaan er ook optionele programmeertaalspecifieke opties.
Deze opties worden ingesteld in het object bijhorend bij het veld `evaluation.language`.

### C
De programmeertaal C heeft geen programmeertaalspecifieke opties.

### Haskell
De programmeertaal Haskell heeft 1 optie: `hlint_config`.
Deze verwacht de bestandsnaam van een HLint-configuratiebestand.
Dit bestand moet zich in de map `evaluation` van de Dodona-oefening bevinden.

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
De programmeertaal Java heeft 1 optie: `checkstyle_config`.
Deze verwacht de bestandsnaam van een Checkstyle-configuratiebestand.
Dit bestand moet zich in de map `evaluation` van de Dodona-oefening bevinden.

Voorbeeld Checkstyle-configuratie:
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
De scripttaal JavaScript heeft 1 optie: `eslint_config`.
Deze verwacht de bestandsnaam van een ESLint-configuratiebestand.
Dit bestand moet zich in de `evaluation`-map van de Dodona-oefening bevinden.

Voorbeeld ESLint-configuratie:
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
De programmeertaal Kotlin heeft 4 opties:
`editorconfig`, `disabled_rules_ktlint`, `ktlint_ruleset` en `ktlint_experimental`.
Al deze opties worden gebruikt door de linter *KTLint*.
- `editorconfig`: bestandsnaam van een `.editorconfig`-bestand (zie <https://editorconfig.org/>) in de map `evaluation`
  van de Dodona-oefening.
- `disabled_rules_ktlint`: een lijst van *KTLint*-regels die genegeerd mogen worden.
  Er kan ook gebruik gemaakt worden van een kommagescheiden string van regels.
- `ktlint_ruleset`: Een bestandsnaam van een JAR-bestand met extra regels.
  Dit bestand moet zich in de map `evaluation` van de Dodona-oefening bevinden.
- `ktlint_experimental`: Duid aan of de experimentele linterregels gebruikt mogen worden.
  Standaard zullen deze regels gebruikt worden.

Voorbeeld KTLint-configuratie:
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
De scripttaal Python heeft 1 optie: `pylint_config`.
Deze verwacht de bestandsnaam van een PYLint-configuratiebestand.
Dit bestand moet zich in de map `evaluation` van de Dodona-oefening bevinden.

Voorbeeld PYLint-configuratie:
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

## Voorbeeld volledig `config.json`
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
