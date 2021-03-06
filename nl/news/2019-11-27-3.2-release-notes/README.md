---
title: "Dodona 3.2"
description: "Release notes Dodona 3.2"
permalink: '/news/:year/:month/:day/:slug'
date: "2019-11-28"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="nl" />

> Dodona 3.2 brengt een handig navigatiemenu naar de oefeningpagina, biedt een compleet vernieuwde manier om oplossingen te downloaden en haalt het statusoverzicht voor een cursus terug.

## Navigatie voor oefeningen

Als je een oefening uit een oefeningenreeks bekijkt, dan verschijnt er vanaf nu in de rechtermarge een menu waarmee je gemakkelijk naar de andere oefeningen binnen die reeks kan navigeren, zonder dat je daarvoor eerst moet terugkeren naar de hoofdpagina van de cursus.

![Navigatie voor oefeningen](./exercise-navigation-nl.png)


## Exporteren van oplossingen

Het exporteren van oplossingen werd volledige herwerkt. Via een wizard kan je nu eenvoudig per cursus, per reeks, of gewoon al je oplossingen downloaden. Als cursusbeheerder kan dit voor alle gebruikers uit je cursus. Deze nieuwe tool heeft enkele opties zodat je meteen aan de slag kan met het archief dat je downloadt.

![Opties voor het exporteren van oplossingen](./export-nl.png)

## Statusoverzicht van cursus

Vroeger kon je als cursusbeheerder op het niveau van een cursus een CSV-bestand downloaden om de status van de studenten binnen een cursus te bekijken. Om deze functionaliteit meer zoals het statusoverzicht van een reeks te doen werken, hebben we hiervoor ook een pagina binnen Dodona voorzien. De vroegere optie om het statusoverzicht te downloaden is er uiteraard weer bij. We hebben er dan ook ineens voor gezorgd dat dit overzicht sneller gegenereerd wordt en dat de pagina een stuk bruikbaarder wordt.

![Nieuwe statusoverzicht pagina](./scoresheet-nl.png)

## Inline annotaties op ingediende code

De annotaties die automatisch door een [linter](https://en.wikipedia.org/wiki/Lint_(software)) worden aangebracht op een ingediende oplossing, worden nu inline weergegeven op de broncode in de feedback. Daarvoor zijn we ook afgestapt van de ACE editor voor de weergave van de ingediende oplossing in de feedback. De kleur van de linkerrand bepaalt het type van de annotatie: fout (rood), waarschuwing (geel) of informatie (blauw).

![Inline annotaties](./code_annotations-nl.png)

## Volledige lijst van veranderingen

Naast deze vier grotere uitbreidingen zijn er natuurlijk ook een hoop andere kleine dingen verbeterd. Voor een volledige lijst van veranderingen verwijzen we naar [onze GitHub release](https://github.com/dodona-edu/dodona/releases/tag/3.2), maar hieronder lijsten we ook kort de belangrijkste wijzigingen op.

 * navigatiemenu voor oefeningen
 * _Content Security Policy_ toevoegen
 * statusoverzicht van een cursus
 * ingediende code weergeven in feedback zonder gebruik van ACE editor
 * enkele toegangsproblemen oplossen met privé oefeningen in gemodereerde cursussen
