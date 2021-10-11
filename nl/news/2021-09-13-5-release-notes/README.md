---
title: "Dodona 5"
description: "Release notes Dodona 5"
permalink: '/news/:year/:month/:day/:slug'
date: "2021-09-13"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="nl" />

> Dodona werkt doorheen het jaar steeds met kleinere releases. Deze post zal telkens aangevuld worden met nieuwe features voor het jaar 2021-2022.

## Dodona 5.0 - 13/09/2021

Dodona 5.0 is de grootste release van Dodona tot nu toe en bevat de volgende grote features:

### Design refresh

De meest zichtbare verandering is een visuele opfrissing van het design van de home page. Het doel was om een vriendelijker en minder zakelijke pagina te maken. Dit hebben we gedaan door zachtere kleuren te gebruiken in combinatie met meer afgeronde hoeken.

![Design refresh](./design-refresh.png)


### Punten geven

In een vorige versie van Dodona was het geven van punten al beschikbaar als preview. Deze functionaliteit is nu beschikbaar voor alle gebruikers. We hebben verschillende aanpassingen gedaan om het geven van punten nog gebruiksvriendelijker te maken. Meer informatie kan je vinden in [deze handleiding](/nl/guides/teachers/grading).

### Learning analytics

Lesgevers kunnen nu nog beter hun studenten opvolgen. Aan elke reeks op een cursuspagina hebben we verschillende grafieken toegevoegd die je meer inzicht geven in hoe studenten leren.

![Learning analytics](./learning-analytics.png)

### Kalenderintegratie
Studenten kunnen nu eenvoudig de deadlines van een Dodonacursus toevoegen aan hun persoonlijke kalender zoals Google Calendar. Hiervoor klikken ze op de link die beschikbaar is in het menu bovenaan de cursuspagina.

Alle details over deze Dodona versie kan je vinden in onze [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3102).

## Dodona 5.1 - 11/10/2021

Dodona 5.1 voegt een nieuwe manier toe om tabulaire uitvoer weer te geven in de feedback tabel. De diff zal hierbij rekening houden met de rijen en kolommen uit het csv formaat en het resultaat weergeven als tabel. Deze weergave zal gebruikt worden door de nieuwe SQL judge.
![csv diff](./csv-diff.png)

Studenten stellen soms een vraag als ze vast zitten op een oefening, maar slagen er dan toch in om zelf verder te raken. Om te verhinderen dat lesgevers tijd verspillen aan het beantwoorden van zo'n vragen, geven we nu met een info icoontje weer als de student nog oplossingen heeft ingediend na het stellen van de vraag.
![image](./info-question.png)

Dodona 5.1 voegt ook ondersteuning toe voor *identity providers* die aanmelden via OpenID Connect.

Alle details over deze Dodona versie kan je vinden in onze [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3155).
