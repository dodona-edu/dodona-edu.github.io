---
title: "Dodona 3.1"
description: "Release notes Dodona 3.1"
slug: "dodona-3.1"
date: "2019-10-07"
lang: nl
---

De Dodona 3.1 release maakt Dodona een stuk veiliger en sneller.

## Veiligheid

Tot nu toe konden oefeningen de volledige layout van Dodona aanpassen en ook _scripts_ uitvoeren. Deze _scripts_ zouden alles kunnen doen hebben op Dodona dat je zelf ook kan, zoals bijvoorbeeld oplossingen indienen. Voor leerkrachten betekende dat dus ook dat deze _scripts_ gebruikt zouden kunnen worden om data te extraheren van leerlingen. Voor alle duidelijkheid: dit is nog nooit gebeurd, maar aangezien steeds meer mensen oefeningen aan het platform kunnen toevoegen werd het wel tijd om dit op te lossen.

Dit hebben we gedaan door oefeningenbeschrijvingen in een _iframe_ te plaatsen. Dit zorgt er voor dat je browser niet toelaat dat de inhoud van dit _iframe_ dingen doet buiten het _iframe_. Daarnaast hebben we er ook voor gezorgd dat de feedbacktabel van oplossingen en de beschrijvingen van reeksen en cursussen opgekuist worden voor ze aan gebruikers getoond worden.

## Snelheid

Voor echt grote feedbacktabellen kon het soms lang duren voor de feedbacktabel getoond werd nadat de oplossing geevalueerd werd (soms wel tot 40 seconden!). Door een aantal slimme trucjes toe te passen en waar nodig een iets simpelere weergave te tonen hebben we er voor gezorgd dat het nooit meer als een seconde duurt om een feedbacktabel in te laden.

We hebben het ook visueler gemaakt wanneer de feedbacktabel ingeladen wordt. We tonen nu een loading icon dat vervangen wordt op het moment dat de feedbacktabel geladen is.

## Volledige lijst van veranderingen

Naast deze twee grote items zijn er natuurlijk ook een hoop andere kleine dingen verbeterd. Voor een volledige lijst van veranderingen verwijzen we naar [onze GitHub release](https://github.com/dodona-edu/dodona/releases/tag/3.1), maar hieronder lijsten we ook kort de belangrijkste dingen op.

* Kuis de feedbacktabel op voor die aan de gebruiker getoond wordt
* Toon de oefeningbeschrijvingen binnen een iframe
* Voeg de scoresheet op cursusniveau en het statusoverzicht op reeksniveau samen
* Zorg ervoor dat gestreepte tabellen er goed uit zien in donkere modus
* Zorg ervoor dat gebruikers kunnen inschrijven in verborgen cursussen die voor iedereen openstaan
* Gebruik enkel ingediende oplossingen die al geevalueerd zijn om de status van een oefening of een reeks te bepalen
* Los enkele kleine problemen in donkere modus op
* Breng het verdwenen icoon voor oplossingen in de wachtrij of die geevalueerd worden terug
* Update naar Ruby 2.6.5