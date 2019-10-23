---
title: "Dodona 3.1"
description: "Release notes Dodona 3.1"
slug: "dodona-3.1"
date: "2019-10-07"
lang: nl
---

De Dodona 3.1 release maakt Dodona een stuk veiliger en sneller.
{: .fs-6 .fw-300 }
 
## Veiligheid

Tot nu toe konden oefeningen de volledige layout van Dodona aanpassen en ook _scripts_ uitvoeren. Deze _scripts_ konden, in theorie, alles op Dodona doen wat je zelf ook kan, zoals bijvoorbeeld oplossingen indienen. Dit is een potentieel beveiligingsprobleem. Alhoewel we de opstellers van oefeningen volledig vertrouwen en we geen enkele indicatie hebben dat deze mogelijkheid misbruikt werd, is het toch beter om problemen in de toekomst te vermijden.

Dit hebben we opgelost door de opgaven van oefeningen in een _iframe_ te plaatsen. Hierdoor zal je browser verhinderen dat de inhoud van dit _iframe_ ongewenste dingen uitvoert buiten het _iframe_. Daarnaast hebben we er ook voor gezorgd dat er geen kwaadwillige code meer kan voorkomen in de feedbacktabel van oplossingen en de beschrijvingen van reeksen en cursussen.

## Snelheid

Voor echt grote feedbacktabellen kon het soms lang duren voor de feedbacktabel getoond werd nadat de oplossing geevalueerd werd (soms tot wel 40 seconden!). Door een aantal slimme trucjes toe te passen en waar nodig een iets simpelere weergave te tonen hebben we er voor gezorgd dat het nooit meer dan een seconde duurt om een feedbacktabel in te laden.

We hebben ook een visuele indicator toegevoegd om aan te geven dat de feedbacktabel wordt ingeladen.

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
