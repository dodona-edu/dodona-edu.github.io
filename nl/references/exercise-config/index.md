---
title: "Oefeningconfiguratie"
description: "Oefeningconfiguratie op Dodona"
order: 2
---

# Oefeningconfiguratie

Dodona laat toe om de configuratie van een **oefening** of een **leesactiviteit** in te stellen door middel van configuratiebestanden. Deze bestanden moeten het JSON-formaat hebben en `config.json` genoemd worden in oefeningenmappen en `dirconfig.json` in andere mappen. Om de finale configuratiewaarden te bekomen voor een leeractiviteit, voegt Dodona het standaardconfiguratiebestand samen met de dirconfigs in de bovenliggende folders van de oefening en met het oefeningconfiguratiebestand. Dit proces laat je toe om waarden in een bovenliggende folder te overschrijven.

## Configuratiebestandsstructuur voor oefeningen

- **`type`**: Moet ingesteld worden op `exercise` voor oefeningen. De standaardwaarde indien afwezig is `exercise`.
- **`programming_language`** (string): de programmeertaal van de oefening, wordt gebruikt voor *syntax highlighting* en om de juiste bestandsextensie te bepalen. Een overzicht van de mogelijke programmeertalen vind je [hier](https://dodona.be/nl/programming_languages/).
- **`access`** (`public` of `private`): bepaalt wie deze oefening kan gebruiken
  - **`public`**: elke lesgever op Dodona kan deze oefening gebruiken
  - **`private`**: enkel lesgevers met expliciete toestemming mogen deze oefening gebruiken. Een cursus krijgt deze toestemming pas nadat die toegevoegd is aan de toegelaten cursussen van de repository van de oefening. Het kopiëren van een cursus doet dit niet automatisch; zie [een cursus kopiëren](/nl/guides/teachers/creating-a-course/) voor meer uitleg.
- **`description`** (object): de specificatie van de beschrijving van deze oefening
  - **`names`** (object): de naam van de oefening, met [tweelettercodes](https://nl.wikipedia.org/wiki/Lijst_van_ISO_639-codes) als sleutels (bv. `nl`, `en`, `fr`)
  - **`sandbox_files`** (array van strings, optioneel): een lijst van bestanden in de `description/media`-folder die automatisch ingeladen worden in de sandbox
- **`evaluation`**: de specificatie van de evaluatieprocedure
  - **`handler`** (string, optioneel): de naam van de judge die gebruikt wordt voor de evaluatie. Standaard gebruikt Dodona de judge die ingesteld is voor de repository. Een overzicht van de mogelijke judges vind je [hier](/nl/references/judges).
  - **`image`** (string, optioneel): de naam van de docker image die gebruikt wordt voor de evaluatie. Standaard gebruikt Dodona de image die ingesteld is voor de judge.
  - **`time_limit`** (integer, optioneel): de tijd in seconden waarna de evaluatie van een oefening stopgezet wordt. Standaard is dit 42 seconden. Bij een eenvoudige oefening is het nuttig om deze waarde te verlagen: een student die een oneindige lus schrijft, krijgt dan na 5 seconden feedback in plaats van na 42, en er gaat minder evaluatietijd verloren. Laat wel genoeg ruimte voor een correcte oplossing. De limiet geldt voor de volledige evaluatie, dus ook voor het opstarten van de judge en het compileren van de code, niet enkel voor het uitvoeren van het programma van de student. Een waarde die volstaat voor Python kan te krap zijn voor een gecompileerde taal.
  - **`memory_limit`** (integer, optioneel): de hoeveelheid geheugen in bytes die gebruikt kan worden bij het uitvoeren van de evaluatie. Standaard is dit 256MB, of meer als de judge een hogere waarde instelt. Stel dit enkel in als je meer nodig hebt dan de standaardwaarde. Een lagere waarde geeft zelden een duidelijke foutmelding: meestal wordt elke evaluatie gewoon verschillende keren trager. Bij [geheugenlimieten](/nl/references/memory-limits/) lees je welke limieten van toepassing zijn en waarom een lagere waarde problemen geeft.
  - **`network_enabled`** (boolean, optioneel): ingesteld op `true` als toegang tot het internet toegelaten is. Standaard staat deze waarde op `false`.
- **`labels`** (lijst van strings, optioneel): een lijst van labels die gebruikt kunnen worden om deze oefening te vinden via de Dodona web interface. Standaard een lege lijst.
- **`contact`** (string, optioneel): informatie over de auteur van deze oefening, geformatteerd zoals een e-mail-ontvanger hoofding.

## Configuratiebestandsstructuur voor leesactiviteiten

De structuur voor een leesactiviteit is identiek aan deze van een oefening. Er zijn echter twee grote verschillen: de waarde van `type` moet ingesteld worden op `content` en velden die niet relevant zijn voor oefeningen, zoals `programming_language`, mogen achterwege gelaten worden. Het formaat van de beschrijving is ook identiek.

- **`type`**: Moet ingesteld worden op `content` voor leesactiviteiten.
- **`access`** (`public` of `private`): bepaalt wie deze oefening kan gebruiken
  - **`public`**: elke lesgever op Dodona kan deze oefening gebruiken
  - **`private`**: enkel lesgevers met expliciete toestemming mogen deze oefening gebruiken
- **`description`** (object): de specificatie van de beschrijving van deze oefening
  - **`names`** (object): de naam van de oefening, met [tweelettercodes](https://nl.wikipedia.org/wiki/Lijst_van_ISO_639-codes) als sleutels (bv. `nl`, `en`, `fr`)
- **`labels`** (lijst van strings, optioneel): een lijst van labels die gebruikt kunnen worden om deze oefening te vinden via de Dodona web interface. Standaard een lege lijst.
- **`contact`** (string, optioneel): informatie over de auteur van deze oefening, geformatteerd zoals een e-mail-ontvanger hoofding.

## Voorbeeld configuratiebestand `config.json`

### Oefening

```json
{
  "type": "exercise",
  "programming_language": "python",
  "access": "private",
  "description": {
    "names": {
      "nl": "Voorbeeld oefening",
      "en": "Example exercise",
      "fr": "Exercice exemple"
    }
  },
  "evaluation": {
    "handler": "tested",
    "test_suite": "suite.yaml",
    "network_enabled": true
  },
  "labels": ["voorbeeld", "eenvoudige oefening"],
  "contact": "Dodona <team@dodona.be>"
}
```

### Leesactiviteit

```json
{
  "description": {
    "names": {
      "en": "Aeneid",
      "nl": "Aeneis",
      "fr": "Énéide"
    }
  },
  "type": "content",
  "access": "private",
  "labels": ["test", "intro"]
}
```

## Voorbeeld mappenconfiguratiebestand `dirconfig.json`

```json
{
  "access": "private",
  "evaluation": {
    "handler": "tested"
  },
  "programming_language": "python",
  "contact": "Firstname Lastname <firstname_lastname@dodona.be>"
}
```
