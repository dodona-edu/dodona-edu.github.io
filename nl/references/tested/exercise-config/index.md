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

Zie de referentiedocumentatie voor [DSL-testplannen](/nl/references/tested/dsl) en [geavanceerde testplannen](/nl/references/tested/json) voor een gedetailleerde beschrijving van de formaten voor testplannen.

## Algemene opties

Het `evaluation`-blok ondersteunt een `option`-object met velden die het gedrag van TESTed beïnvloeden.
We overlopen deze opties hieronder.

### `options.allow_fallback`

Standaard genereert en compileert TESTed alle testcode van een tabblad samen in één compilatie-eenheid (*batchcompilatie*).
Dat is snel, maar kan falen als een ingediende oplossing niet aan alle vereisten van de oefening voldoet.
Als een oefening bijvoorbeeld vereist dat twee functies geïmplementeerd worden, maar de ingediende oplossing implementeert er slechts één, zal dit bij oplossingen in Java leiden tot compilatiefouten.

Als het Booleaanse veld `allow_fallback` op `true` staat (de standaardwaarde),
valt TESTed automatisch terug op het per context compileren van de testcode (*contextuele compilatie*) wanneer de batchcompilatie faalt.
Dit kan nuttig zijn om ingediende oplossingen te evalueren die niet alle vereisten implementeren.

Hier is een voorbeeld dat dit terugvallen uitschakelt:

```json
{
  "evaluation": {
    "options": {
      "allow_fallback": false
    }
  }
}
```

### `options.compiler_optimizations`

Standaard compileert TESTed testcode zonder compileroptimalisaties,
omdat de extra compilatietijd voor korte oefeningen vaak veel groter is dan de gewonnen uitvoeringstijd.
Als het Booleaanse veld `compiler_optimizations` op `true` staat (de standaardwaarde is `false`),
worden compileroptimalisaties ingeschakeld voor de talen waarvan de compiler die ondersteunt: C, C++ en Haskell.
Dit kan nuttig zijn voor langere oefeningen, of oefeningen waarbij de oplossing afhangt van optimalisatie.

```json
{
  "evaluation": {
    "options": {
      "compiler_optimizations": true
    }
  }
}
```

### `options.parallel`

Als het Booleaanse veld `parallel` op `true` staat (de standaardwaarde is `false`),
voert TESTed de contexten van het testplan parallel uit.
Dit kan het onderzoeken waard zijn voor oefeningen die rekenintensief zijn.
Het is aangeraden om dit uitgeschakeld te laten voor oefeningen die zelf al multithreaded zijn.

```json
{
  "evaluation": {
    "options": {
      "parallel": true
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
| Python          | [Ruff](https://docs.astral.sh/ruff/)                   |
| TypeScript      | [ESLint](https://eslint.org/)                          |

Het Booleaanse veld `options.linter` kan gebruikt worden om linters in (`true`) of uit (`false`) te schakelen voor een programmeeroefening,
voor alle programmeertalen samen ofwel voor individuele talen.
Hier is een voorbeeld dat linters uitschakelt voor alle programmeertalen:

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
ESLint leest enkel configuratiebestanden in het [flat config-formaat](https://eslint.org/docs/latest/use/configure/configuration-files), een JavaScript-module zoals `eslint.config.mjs`.
Hier is een voorbeeld dat het bestand `eslint.config.mjs` instelt als configuratiebestand voor ESLint:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "javascript": {
          "eslint_config": "eslint.config.mjs"
        }
      }
    }   
  }
}
```

Dit configuratiebestand vervangt de standaardconfiguratie van TESTed volledig, het vult ze niet aan.
Wil je een uitzondering toevoegen, vertrek dan van een kopie van de [standaardconfiguratie](https://github.com/dodona-edu/universal-judge/blob/master/tested/languages/javascript/eslint.config.mjs) en pas die kopie aan.
Deze kopie zet bijvoorbeeld ook `eqeqeq` aan en geeft `prompt` op als naam die tijdens het uitvoeren beschikbaar is:

```js
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const js = require("@eslint/js");
const globals = require("globals");

const files = ["**/!(*.*)", "**/*.js"];

export default [
  { files, ...js.configs.recommended },
  {
    files,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: { ...globals.node, ...globals.es2020, prompt: "readonly" },
    },
    rules: {
      "no-var": "warn",
      semi: "warn",
      "no-unused-vars": "off",
      eqeqeq: "error",
    },
  },
];
```

Neem twee dingen uit de standaardconfiguratie over in je kopie:

- `files` in elk configuratieobject. Het ingediende bestand heeft geen extensie, en ESLint slaat een bestand over als geen enkel `files`-patroon erop past. Zonder `files` wordt de ingediende oplossing dus helemaal niet gelint. Het patroon `**/!(*.*)` past op bestanden zonder extensie.
- `createRequire` om packages te laden. Een `import` vindt de packages die in de judge geïnstalleerd zijn niet. De packages `@eslint/js`, `globals`, `@typescript-eslint/eslint-plugin` en `@typescript-eslint/parser` zijn beschikbaar.

### Kotlin

TESTed ondersteunt volgende velden voor de linter bij Kotlin (`ktlint`):

- `editorconfig`: Locatie en naam van een `editorconfig`-bestand (zie <https://editorconfig.org/>), relatief ten opzichte van de `evaluation`-map van de oefening.
- `ktlint_ruleset`: Locatie en naam van een JAR-bestand met extra regels, relatief ten opzichte van de `evaluation`-map van de oefening.

Hier is een voorbeeld dat het gebruik van een aantal van deze velden toont:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "kotlin": {
          "editorconfig": "kotlin.editorconfig",
          "ktlint_ruleset": "ktlint_rules.jar"
        }
      }
    }   
  }
}
```

### Python

In het veld `ruff_config` kan de locatie van een configuratiebestand voor [Ruff](https://docs.astral.sh/ruff/) gegeven worden, zoals `ruff.toml`, relatief ten opzichte van de `evaluation`-map van de oefening.
TESTed zal dit configuratiebestand gebruiken bij het uitvoeren van de linter op ingediende oplossingen in Python.
Hier is een voorbeeld dat het bestand `ruff.toml` instelt als configuratiebestand voor Ruff:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "python": {
          "ruff_config": "ruff.toml"
        }
      }
    }   
  }
}
```

Dit configuratiebestand vervangt de standaardregels van TESTed volledig, het vult ze niet aan.
Wil je een uitzondering toevoegen, vertrek dan van een kopie van de [standaardregels](https://github.com/dodona-edu/universal-judge/blob/master/tested/languages/python/rules/ruff.toml) en voeg de uitzondering toe aan die kopie.
Met `ignore` zet je bijvoorbeeld een regel uit, en met een `builtins`-lijst bovenaan geef je namen op die tijdens het uitvoeren beschikbaar zijn:

```toml
builtins = ["get_choice"]

[lint]
ignore = ["SIM115"]
```

Laat de `target-version` in je kopie gelijk aan de Python-versie waarmee TESTed ingediende oplossingen uitvoert (momenteel `py315`).
Anders meldt Ruff syntax die Python wel aanvaardt als fout.

### TypeScript

In het veld `eslint_config` kan de locatie van een configuratiebestand voor ESLint gegeven worden, relatief ten opzicht van de `evaluation`-map van de oefening.
TESTed zal dit configuratiebestand gebruiken bij het uitvoeren van de linter op ingediende oplossingen in TypeScript.
Hier is een voorbeeld dat het bestand `eslint.config.mjs` instelt als configuratiebestand voor ESLint:

```json
{
  "evaluation": {
    "options": {
      "language": {
        "typescript": {
          "eslint_config": "eslint.config.mjs"
        }
      }
    }
  }
}
```

Dit configuratiebestand werkt zoals bij [JavaScript](#javascript): het vervangt de standaardconfiguratie volledig en heeft dezelfde `files` en `createRequire` nodig.
Vertrek van een kopie van de [standaardconfiguratie voor TypeScript](https://github.com/dodona-edu/universal-judge/blob/master/tested/languages/typescript/eslint.config.mjs), die de plugin en parser van `@typescript-eslint` gebruikt en `**/*.ts` in plaats van `**/*.js`.

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
    "handler": "tested",
    "test_suite": "suite.yaml",
    "options": {
      "allow_fallback": true,
      "linter": true,
      "language": {
        "haskell": {
          "hlint_config": "hlint.config.yaml"
        },
        "java": {
          "checkstyle_config": "java_style.xml"
        },
        "javascript": {
          "eslint_config": "eslint.config.mjs"
        },
        "kotlin": {
          "editorconfig": "kotlin.editorconfig",
          "ktlint_ruleset": "ktlint_rules.jar"
        },
        "python": {
          "ruff_config": "ruff.toml"
        },
        "typescript": {
          "eslint_config": "eslint.config.mjs"
        }
      }
    }
  },
  "labels": []
}
```
