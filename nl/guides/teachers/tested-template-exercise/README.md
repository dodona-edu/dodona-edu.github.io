---
title: "Sjabloonoefening TESTed"
description: "Tutorial: Sjabloonoefening TESTed"
---
::: warning Opmerking
Sjabloonoefeningen worden gebruikt wanneer je één oefening in meerdere programmeertalen wilt aanbieden.
:::

# Sjabloonoefening TESTed
De TESTed judge is een programmeertaal onafhankelijke judge.
Dit wil zeggen dat de testplannen die opgesteld worden onafhankelijk zijn van de programmeertaal van de ingediende
oplossing.
Meer informatie zie [TESTed judge](../../../references/tested-judge/).

Omdat judge programmeertaal onafhankelijk is,
hoef je om meerdere programmeertalen te ondersteunen slechts eenmaal het testplan en opgave te schrijven.
Hiervan kun je dan per programmeertaal een instantie genereren.

## 1. Aanmaken Git repository
De oefeningen voor Dodona bevinden zich in een Git repository.
De uitleg om een nieuwe Git repository te maken voor Dodona bevindt zich in
[Een nieuwe repository met oefeningen maken](../new-exercise-repo).

## 2. Mapstructuur
De mapstructuur voor een sjabloonoefening van TESTed komt in grote mate overeen met de
[vereiste structuur door Dodona](../../../references/exercise-directory-structure).
Bij de sjabloonoefening is het `config.json` bestand hernoemd naar `config.template.json`,
met als hoofdreden dat we de sjabloonoefening niet als een oefening op Dodona willen weergeven.

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
Om een programmeeroefening aan te bieden moet er een testplan geschreven worden.
We veronderstellen dat dit testplan zich bevindt in het bestand `evaluation/plan.yaml`.
Voor hoe het testplan moet worden opgesteld verwijzen we naar de documentatie van de
[TESTed DSL-testplannen](../../../references/tested-judge/dsl).

::: tip Tip voor geavanceerde gebruikers
De sjabloonoefeningen kunnen ook gebruikmaken van de
[JSON-testplannen van TESTed](../../../references/tested-judge/json).
:::

## 4. Opstellen sjabloonopgaven
De sjabloonopgaven worden opgesteld met behulp van Mako sjabloonbestanden,
zie [TESTed sjabloonbeschrijvingen](../../../references/tested-judge/template-description).
De sjabloonbeschrijvingen moet zich in de `description` map bevinden.
Deze moeten zich bevinden in de bestanden `description.nl.md.mako` (nederlands) en ` description.en.md.mako` (engels).
We raden sterk aan om de opgaven in markdown te schrijven,
zie [Oefeningbeschrijvingen](../../../references/exercise-description).

## 5. Configureren van de sjabloonoefening
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
maar deze wordt pas ingevuld tijdens het gegeneren van instances van de sjabloonoefening.

Voor de sjabloonoefeningen vereisen we dat het veld `evaluation.plan_name` ingevuld is.
Dit veld bepaalt, welk testplan er zal gebruikt worden door TESTed.
Dit testplan zal ook worden gebruikt om te bepalen welke `namespace` de sjabloonbeschrijvingen zullen gebruiken,
alsook om te bepalen voor welke programmeertalen een instantie gegenereerd mag worden.

## 6. Genereren instanties
::: warning Opmerking
Op dit ogenlijk vereist Dodona voor elke programmeertaal een afzonderlijke oefening.

In de toekomst willen we dit aanpassen,
zodat je één oefening in meerdere programmeertalen kunt aanbieden zonder deze te moeten kopiëren.
:::

Na het opstellen van de sjabloonoefening, kunnen we deze instantiëren voor alle vereiste programmeertalen.
Hiervoor kan er gebruikt gemaakt worden van een Python script dat deel uitmaakt van TESTed.
Dit script kan terug gevonden worden in de
[GitHub repository](https://github.com/dodona-edu/universal-judge) van TESTed.
Het script kan uitgevoerd worden met het volgende commando in de root directory van de GitHub repository:
```shell
$ python3 -m tested.instantiate_exercise "sjabloon/oefening/map" "instanties/oefening/map"
```

Dit script zal, voor de sjabloonoefening in de map `sjabloon/oefening/map`,
per programmeertaal een instantie genereren in de map `instanties/oefening/map/{programmeer_taal}`.

Dit script heeft enkele optionele opties:
- `-i`, `--programming_languages_included`:
  Lijst van programmeertalen waarvoor een instantie gegenereerd mag worden indien het testplan dit toelaat.
  Standaard alle programmeertalen van TESTed.
- `-e`, `--programming_languages_excluded`:
  Lijst van programmeertalen waarvoor geen instantie gegenereerd mag worden.
  Standaard is dit geen enkele programmeertaal.
- `-n`, `--i18n`:
  Standaard natuurlijke taal voor de beschrijvingen, wanneer dit niet afgeleid kan worden uit de bestandsnaam.
  Opties ‘en’ (standaard) en ‘nl’.
- `-H`, `--human_readable`:
  Het genereerde JSON-testplan vanuit het DSL-testplan moet leesbaar zijn door een mens.
- `-b`, `--backup_descriptions`: Behoud de oude `description` map (hernoemd naar `description.bak`).