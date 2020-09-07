---
title: "Oefeningconfiguratie"
description: "Oefeningconfiguratie op Dodona"
---

# Oefeningconfiguratie

Dodona laat toe om de configuratie van een **oefening** of een **leesactiviteit** in te stellen door middel van configuratiebestanden. Deze bestanden moeten het JSON-formaat hebben en `config.json` genoemd worden in oefeningenmappen en `dirconfig.json` in andere mappen. Om de finale configuratiewaarden te bekomen voor een leeractiviteit, voegt Dodona het standaardconfiguratiebestand samen met de dirconfigs in de bovenliggende folders van de oefening en met het oefeningconfiguratiebestand. Dit proces laat je toe om waarden in een bovenliggende folder te overschrijven.

## Configuratiebestandsstructuur voor oefeningen

- **`type`**: Moet ingesteld worden op `exercise` voor oefeningen. De standaardwaarde indien afwezig is `exercise`.
- **`programming_language`** (string): de programmeertaal van de oefening, wordt gebruikt voor *syntax highlighting* en om de juiste bestandsextensie te bepalen
- **`access`** (`public` of `private`): bepaalt wie deze oefening kan gebruiken
  - `public`: elke lesgever op Dodona kan deze oefening gebruiker
  - `private`: enkel lesgevers met expliciete toestemming mogen deze oefening gebruiken
- **`description`** (object): de specificatie van de beschrijving van deze oefening
  - **`names`** (object): de naam van de oefening
    - **`nl`**: de naam van de oefening in het Nederlands
    - `en`: de naam van de oefening in het Engels
- **`evaluation`**: de specificatie van de evaluatieprocedure
  - **`handler`** (string, optioneel): de naam van de judge die gebruikt wordt voor de evaluatie. Standaard gebruik Dodona de judge die ingesteld is voor de repository.
  - **`image`** (string, optioneel): de naam van de docker image die gebruikt wordt voor de evaluatie. Standaard gebruikt Dodona de image die ingesteld is voor de judge.
  - **`time_limit`** (integer, optioneel): de tijd in seconden waarna de evaluatie van een oefening stopgezet wordt. Standaard is dit 42 seconden
  - **`memory_limit`** (integer, optioneel): de hoeveelheid geheugen in bytes die gebruikt kan worden bij het uitvoeren van de evaluatie. Standaard is dit ingesteld op 100M.
  - **`network_enabled`** (**`false`** of `true`) (boolean, optioneel): ingesteld op `true` als toegang tot het internet toegelaten is. Standaard staat deze waarde op `false`.
- **`labels`** (lijst van strings, optioneel): een lijst van labels die gebruikt kunnen worden om deze oefening te vinden via de Dodona web interface. Standaard een lege lijst.
- **`contact`** (string, optioneel): informatie over de auteur van deze oefening, geformatteerd zoals een email-ontvanger hoofding.

## Configuratiebestandsstructuur voor leesactiviteiten

De structuur voor een leesactiviteit is identiek aan deze van een oefening. Er zijn echter 2 grote verschillen: de waarde van `type` moet ingesteld worden op `content` en bepaalde verplichte velden zoals `programming_language` mogen achterwege gelaten worden.

- **`type`**: Moet ingesteld worden op `content` voor leesctiviteiten.
- **`access`** (`public` of `private`): bepaalt wie deze oefening kan gebruiken
  - **`public`**: elke lesgever op Dodona kan deze oefening gebruiker
  - **`private`**: enkel lesgevers met expliciete toestemming mogen deze oefening gebruiken
- **`description`** (object): de specificatie van de beschrijving van deze oefening
  - **`names`** (object): de naam van de oefening
    - **`nl`**: de naam van de oefening in het Nederlands
    - **`en`**: de naam van de oefening in het Engels
- **`labels`** (lijst van strings, optioneel): een lijst van labels die gebruikt kunnen worden om deze oefening te vinden via de Dodona web interface. Standaard een lege lijst.
- **`contact`** (string, optioneel): informatie over de auteur van deze oefening, geformatteerd zoals een email-ontvanger hoofding.

## Voorbeeld configuratiebestand `config.json`

### Oefening

```json
{
  "type": "exercise",
  "programming_language": "python",
  "access": "public",
  "description": {
    "names": {
      "nl": "Voorbeeld oefening",
      "en": "Example exercise"
    }
  },
  "evaluation": {
    "handler": "python",
    "image": "dodona/dodona-python",
    "time_limit": 10,
    "memory_limit": 10000000,
    "network_enabled": true
  },
  "labels": ["voorbeeld", "eenvoudige oefening"],
  "contact": "Dodona <dodona@ugent.be>"
}
```

### Leesactiviteit

```json
{
  "description": {
    "names": {
      "en": "Aeneid",
      "nl": "Aeneis"
    }
  },
  "type": "content",
  "visibility": "public",
  "labels": ["test", "intro"]
}
```

## Voorbeeld mappenconfiguratiebestand `dirconfig.json`

```json
{
  "visibility": "private",
  "evaluation": {
    "handler": "python",
    "time_limit": 15,
    "memory_limit": 100000000
  },
  "programming_language": "python",
  "author": "Firstname Lastname <firstname_lastname@ugent.be>",
  "contact": "firstname_lastname@ugent.be"
}
```
