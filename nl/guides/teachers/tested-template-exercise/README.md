---
title: "Oefeningssjabloon TESTed"
description: "Tutorial: Oefeningssjabloon TESTed"
---
::: warning Opmerking
Oefeningssjabloonen worden gebruikt wanneer je één oefening in meerdere programmeertalen wilt aanbieden.
:::

# Oefeningssjabloon TESTed
TESTed is een meertalige judge, waarmee we bedoelen dat TESTed meerdere programmeertalen ondersteunt.
Dit maakt het mogelijk om programmeertaalonafhankelijke oefeningen op te stellen: je schrijf één oefening,
die oplosbaar zal zijn in meerdere programmeertalen (zie de [TESTed-referentie](../../../references/tested-judge/)).

Hoewel de judge meerdere programmeertalen ondersteunt, verwacht Dodona voorlopig per programmeertaal een aparte oefening.
Als oplossing hiervoor introduceert deze handleiding het concept van oefeningssjabloonen.
Dit is een programmeertaalonafhankelijk sjabloon voor een oefening,
dat zal worden omgezet naar een programmeertaalspecifieke (en Dodona-compatibele) oefening voor TESTed.

## 1. Aanmaken Git repository
De oefeningen voor Dodona bevinden zich in een Git repository, zoals normale oefeningen.
We verwijzen naar [de handleiding _oefening repositories aanmaken_](../new-exercise-repo).

## 2. Mapstructuur
De mapstructuur voor een oefeningssjabloon van TESTed komt in grote mate overeen met de
[vereiste structuur door Dodona](../../../references/exercise-directory-structure).
Bij de oefeningssjabloon is het `config.json` bestand hernoemd naar `config.template.json`,
met als hoofdreden dat we de oefeningssjabloon niet als een oefening op Dodona willen weergeven.

### Voorbeeld minimale mapstructuur
```text
+-- sjabloon/oefening/map
|   +-- config.template.json       # Configuratie sjabloon oefening
|   +-- evaluation                 #
|   |   +-- plan.yaml              # DSL-testplan
|   +-- description                #
|   |   +-- description.nl.md.mako # Markdown sjabloonopgave nederlands
|   |   +-- description.en.md.mako # Markdown sjabloonopgave engels
:   :   :
```

## 3. Opstellen testplan
De testen voor een oefening in TESTed worden geschreven in een testplan.
Documentatie over hoe een testplan kan worden opgesteld,
kan gevonden worden op [TESTed DSL-testplannen](../../../references/tested-judge/dsl).
We veronderstellen dat dit testplan zich bevindt in het bestand `evaluation/plan.yaml`.

::: tip Tip voor geavanceerde gebruikers
De oefeningssjabloonen kunnen ook gebruikmaken van de
[geavanceerde testplannen](../../../references/tested-judge/json).
:::

## 4. Opstellen sjabloonopgaven
De sjabloonopgaven worden geschreven met het sjablonensysteem Mako,
zie [TESTed sjabloonbeschrijvingen](../../../references/tested-judge/template-description).
Deze sjabloonopgaven moeten zich bevinden in de bestanden `description/description.nl.md.mako` (nederlands) en
`description/description.en.md.mako` (engels).

::: tip Tip
We raden sterk aan om de opgaven in markdown te schrijven,
zie [Oefeningbeschrijvingen](../../../references/exercise-description).
:::

## 5. Configureren van de oefeningssjabloon
Het configureren van een oefening wordt uitgelegd in [Oefeningconfiguratie](../../../references/exercise-config).
Wij zullen de specifieke configuratie voor TESTed in `config.template.json` bekijken.

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
    "memory_limit": 500000000,
    "plan_name": "plan.yaml"
  },
  "labels": []
}
```

Het `access`-veld en het `description`-object zijn vereist door Dodona.
De programmeertaal zal toegevoegd worden aan de benamingen van de oefening wanneer er een instantie gegeneerd wordt.
Dodona vereist ook het `programming_language`-veld,
maar deze wordt pas ingevuld tijdens het gegeneren van de instanties van de oefeningssjabloon.

Voor de oefeningssjabloonen vereist TESTed dat het veld `evaluation.plan_name` ingevuld is.
Dit veld bepaalt welk testplan er zal gebruikt worden door TESTed.
Dit testplan zal ook worden gebruikt om te bepalen welke `namespace` de sjabloonbeschrijvingen zullen gebruiken,
alsook om te bepalen voor welke programmeertalen een instantie gegenereerd mag worden.


Voorbeeld finaal configuratiebestand voor Java:

```json
{
  "access": "private",
  "description": {
    "names": {
      "en": "My exercise (java)",
      "nl": "Mijn oefening (java)"
    }
  },
  "programming_language": "java",
  "evaluation": {
    "handler": "TESTed",
    "memory_limit": 500000000,
    "plan_name": "plan.yaml"
  },
  "labels": []
}
```


## 6. Genereren instanties
::: warning Opmerking
Op dit ogenlijk vereist Dodona voor elke programmeertaal een afzonderlijke oefening.

In de toekomst willen we dit aanpassen,
met als doel meerdere programmeertalen te ondersteunen voor dezelfde oefening op Dodona.
:::

Na het opstellen van de oefeningssjabloon, kunnen we deze instantiëren voor alle vereiste programmeertalen.
Hiervoor kan er gebruikt gemaakt worden van een Python-script dat deel uitmaakt van TESTed.
Dit script kan terug gevonden worden in de
[GitHub repository](https://github.com/dodona-edu/universal-judge) van TESTed.
Het script kan uitgevoerd worden met het volgende commando in de root directory van de GitHub repository:
```shell
$ python3 -m tested.instantiate_exercise "sjabloon/oefening/map" "instanties/oefening/map"
```

Dit script zal, voor de oefeningssjabloon in de map `sjabloon/oefening/map`,
per programmeertaal een instantie genereren in de map `instanties/oefening/map/{programmeer_taal}`.

Dit script heeft enkele optionele opties:
- `-i`, `--programming_languages_included`:
  Lijst van programmeertalen waarvoor een instantie gegenereerd mag worden indien het testplan dit toelaat.
  Standaard alle programmeertalen ondersteund door TESTed.
- `-e`, `--programming_languages_excluded`:
  Lijst van programmeertalen waarvoor geen instantie gegenereerd mag worden.
  Standaard een lege lijst.
- `-n`, `--i18n`:
  Standaard natuurlijke taal voor de beschrijvingen, wanneer dit niet afgeleid kan worden uit de bestandsnaam.
  Opties ‘en’ (standaard) en ‘nl’.
- `-H`, `--human_readable`:
  Het genereerde JSON-testplan vanuit het DSL-testplan moet leesbaar zijn door een mens.
- `-b`, `--backup_descriptions`: Behoud de bestaande beschrijvingen.
  De `description` map zal naar `description.bak` hernoemd worden.
