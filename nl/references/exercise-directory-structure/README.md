---
title: "Oefeningmap-structuur"
description: "Oefeningmap-structuur Dodona"
---

# Oefeningmap-structuur

Binnenin een oefeningmap behandelt Dodona elke map met een `config.json`-bestand als een aparte leeractiviteit: dit kan een programmeeroefening zijn of een leesactiviteit. We verwachten dat deze folder de volgende structuur heeft: 

- **Een `config.json`-bestand**: dit bestand bevat de[oefening-specifieke configuratie](../exercise-config). Deze configuratie zal samengevoegd worden met alle `dirconfig.json`-bestanden in de bovenliggende folder van de oefeningfolder. Je kan altijd configuratiewaarden die ingesteld werden door een bovenliggende folder overschrijven. 
- **Een optioneel `readme.md`-, `readme.en.md`- en/of `readme.nl.md`-bestand:** De inhoud van deze bestanden zal getoond worden op de oefening-infopagina.Deze bestanden hebben als doel extra informatie geven aan leerkrachten die deze oefening misschien willen gebruiken in een cursus. Als er een bestand beschikbaar is in de taal van de gebruiker (`readme.<taal>.md`), dan zal deze getoond worden in plaats van het generieke `readme.md`-bestand. Dit is nuttig omdat `readme.md` getoond wordt door GitHub in de oefeningfolder. We suggereren om een `readme.md`-bestand te maken in de taal van je doelpubliek en dit optioneeel te vertalen door `readme.nl.md` of `readme.en.md` te voorzien. Neem een kijkje in de [voorbeeldoefeningenrepository](https://github.com/dodona-edu/example-exercises) om een voorbeeld te vinden van hoe je deze bestanden gebruikt.
- **Een `description`-folder**: deze folder bevat de volgende bestanden die de oefening beschrijven:
  - **Een `description.en.md`- en/of `description.nl.md`-bestand**: deze bestanden bevatten de Engelse en/of Nederlandse beschrijving van de oefening.


## Oefening-specifieke configuratie

Deze folders zijn enkel relevant voor programmeeroefeningen
Binnenin de `description`-folder kan je volgende folders specifiëren:
- **Een optionele `media`-folder**: deze folder bevat statische bestanden zoals afbeeldingen die gebruikt worden in de oefeningbeschrijving.
- **Een optionele `boilerplate`-folder**: deze folder bevat de bestanden `boilerplate.en`, `boilerplate.nl`, en/of `boilerplate`. De inhoud van deze bestanden worden automatisch ingeladen in het inzendingstekstveld van de gebruikers. Je kan deze bestanden gebruiken om startcode of structuur te voorzien voor de studenten.
- **Een `evaluation`-folder**: de inhoud van deze folder wordt beschikbaar gesteld voor de judge en kan bijvoorbeeld bestanden met de testcode bevatten.
- **Een optionele `workdir`-folder**: de inhoud van deze folder worddt beschikbaar gesteld tijdens het uitvoeren van de judge en kan bijvoorbeeld databestanden bevatten die nodig zijn tijdens het uitvoeren van de tests.
- **Een optionele `solutions`-folder**: bestanden in deze folder zullen getoond worden op de oefening-informatiepagina als voorbeeldoplossing. Meerdere voorbeeldoplossingen zijn mogelijk, maar bestanden met een naam beginnend met 'solution' zullen vooraan staan.

Dodona negeert elk ander bestand of elke andere folder. Je kan dus vrijuit andere bestanden (bijvoorbeeld met oplossingen voor je oefeningen) aanmaken of een persoonelijke oefeningenhiërarchie maken. Het enige dat niet is toegelaten is oefeningenfolders in andere oefeningenfolders plaatsen.

## Voorbeeld van de structuur van een geldige oefeningfolder

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
|   +-- workdir                # Huidige werkfolder voor de code van de student
|       +-- intlines.txt       # Een bestand beschikbaar voor de student
:
```

## Voorbeeld van de structuur van een geldige leesactiviteitfolder

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