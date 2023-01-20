---
title: "Oefeningmap-structuur"
description: "Oefeningmap-structuur Dodona"
---

# Oefeningmap-structuur

Binnenin een oefeningmap behandelt Dodona elke map met een `config.json`-bestand als een aparte leeractiviteit: dit kan een programmeeroefening zijn of een leesactiviteit. We verwachten dat deze map de volgende structuur heeft: 

- **Een `config.json`-bestand**: dit bestand bevat de [oefening-specifieke configuratie](../exercise-config/). Deze configuratie zal samengevoegd worden met alle `dirconfig.json`-bestanden in de bovenliggende map van de oefeningmap. Je kan altijd configuratiewaarden die ingesteld werden door een bovenliggende map overschrijven met het `config.json`-bestand. 
- **Een optioneel `readme.md`-, `readme.en.md`- en/of `readme.nl.md`-bestand:** De inhoud van deze bestanden zal getoond worden op de oefening-infopagina. Deze bestanden hebben als doel extra informatie geven aan leerkrachten die deze oefening misschien willen gebruiken in een cursus. Als er een bestand beschikbaar is in de taal van de gebruiker (`readme.<taal>.md`), dan zal deze getoond worden in plaats van het generieke `readme.md`-bestand. Dit is nuttig omdat `readme.md` getoond wordt door GitHub in de oefeningmap. We suggereren om een `readme.md`-bestand te maken in de taal van je doelpubliek en dit optioneel te vertalen door `readme.nl.md` of `readme.en.md` te voorzien. 
- **Een `description`-map**: deze map bevat de volgende bestanden die de oefening beschrijven:
  - **Een `description.en.md`- en/of `description.nl.md`-bestand**: deze bestanden bevatten de Engelse en/of Nederlandse beschrijving van de oefening.

::: tip Voorbeelden
Neem een kijkje in de [voorbeeldoefeningenrepository](https://github.com/dodona-edu/example-exercises) en [voorbeeldcursus](https://dodona.ugent.be/en/courses/358/) om een voorbeeld te vinden van hoe je deze bestanden gebruikt.
:::


## Oefening-specifieke configuratie

> Deze mappen zijn enkel relevant voor programmeeroefeningen en niet voor leesactiviteiten.

Binnenin de `description`-map kan je volgende mappen specifiëren:
- **Een optionele `media`-map**: deze map bevat statische bestanden zoals afbeeldingen die gebruikt worden in de oefeningbeschrijving.
- **Een optionele `boilerplate`-map**: deze map bevat de bestanden `boilerplate.en`, `boilerplate.nl`, en/of `boilerplate`. De inhoud van deze bestanden worden automatisch ingeladen in het inzendingstekstveld van de gebruikers. Je kan deze bestanden gebruiken om startcode of structuur te voorzien voor de studenten.
- **Een `evaluation`-map**: de inhoud van deze map wordt beschikbaar gesteld voor de judge en kan bijvoorbeeld bestanden met de testcode bevatten.
- **Een optionele `workdir`-map**: de inhoud van deze map wordt beschikbaar gesteld tijdens het uitvoeren van de judge en kan bijvoorbeeld databestanden bevatten die nodig zijn tijdens het uitvoeren van de tests.
- **Een optionele `solution`-map**: bestanden in deze map zullen getoond worden op de oefening-informatiepagina als voorbeeldoplossing. Meerdere voorbeeldoplossingen zijn mogelijk, maar bestanden met een naam beginnend met *solution* zullen vooraan staan.

Dodona negeert elk ander bestand of elke andere map. Je kan dus vrijuit andere bestanden (bijvoorbeeld met oplossingen voor je oefeningen) aanmaken of een persoonlijke oefeningenhiërarchie maken. Het enige dat niet is toegelaten is oefeningenmappen in andere oefeningenmappen plaatsen.

## Voorbeeld van de structuur van een geldige oefeningmap

```
+-- intsum                     # Korte naam voor de oefening
|   +-- config.json            # Configuratie van de oefening
|   +-- evaluation             #
|   |   +-- intsum_test.hs     # Een Haskell testbestand
|   +-- description            #
|   |   +-- description.nl.md  # De beschrijving in het Nederlands
|   |   +-- description.en.md  # De beschrijving in het Engels
|   |   +-- media              #
|   |   |   +-- some_image.png # Een afbeelding die gebruikt wordt in de beschrijving
|   |   +-- boilerplate        #
|   |       +-- boilerplate    # Standaard boilerplate code
|   |       +-- boilerplate.en # Engelse boilerplate code
|   +-- solution               # Bestanden in deze map zullen getoond worden op de oefening-informatiepagina
|   |   +-- solution.nl.hs     #
|   |   +-- solution.en.hs     #
|   +-- workdir                # Huidige werkmap voor de code van de student
|       +-- intlines.txt       # Een bestand beschikbaar voor de student
:
```

## Voorbeeld van de structuur van een geldige leesactiviteitmap

```
+-- Aeneas                     # Korte naam voor de leesactiviteit
|   +-- config.json            # Configuratie van de leesactiviteit
|   +-- README.md              # Beschrijving van de leesactiviteit
|   +-- description            #
|   |   +-- description.nl.md  # De beschrijving in het Nederlands
|   |   +-- description.en.md  # De beschrijving in het Engels
|   |   +-- media              #
|   |   |   +-- some_image.png # Een afbeelding die gebruikt wordt in de beschrijving
:
```
