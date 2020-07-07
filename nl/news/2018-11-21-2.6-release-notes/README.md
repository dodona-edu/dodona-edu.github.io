---
title: "Dodona 2.6"
description: "Release notes Dodona 2.6"
permalink: '/news/:year/:month/:day/:slug'
date: "2018-11-21"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="nl" />

Release 2.6 bevat een verbeterde diff view op de feedbackpagina, herwerkte caching waardoor pagina’s sneller worden geladen, een pagina met nieuwsberichten over Dodona (waar onder andere de release notes zullen op verschijnen), de mogelijkheid voor cursusbeheerders om de volgorde van reeksen aan te passen in een cursus en de mogelijkheid voor judges om tabs te maken die enkel zichtbaar zijn voor cursusbeheerders (niet voor studenten).

## Verbeterde diff view

Als er voor een bepaalde oefeningen een oplossing wordt ingediend, dan wordt die automatisch beoordeeld door een **judge** die aan de oefening gekoppeld is. Als resultaat van die beoordeling produceert de judge gedetailleerde feedback, waarbij de mogelijkheid bestaat om voor individuele testen een waarde die gegenereerd werd aan de hand van de ingediende oplossing te koppelen aan een verwachte waarde. Om duidelijk de verschillen te zien tussen de gegenereerde en de verwachte waarde, worden deze twee waarden tekstueel met elkaar vergeleken op de feedbackpagina in een zogenaamde _diff view_. In de nieuwe release werd visuele weergave van deze _diff view_ verbeterd, waarbij het voor gebruikers nog duidelijker geworden is om onderscheid te maken tussen welke waarde gegenereerd werd door hun oplossing en wat de verwachte waarde is. Er worden nu ook regelnummers weergegeven naast de gegenereerde en de verwachte waarde om de vergelijking tussen de twee resultaten te bevorderen.

![split diff](./diff-split.png)

Bovenaan de feedbackpagina is er ook een knop bijgekomen waarmee gebruikers kunnen kiezen om de gegenereerde en de verwachte waarde naast elkaar (“split” mode) of door elkaar (“unified” mode) weer te geven. Deze feedback die hierboven naast elkaar werd weergegeven ziet er dan als volgt uit als die door elkaar wordt weergegeven.

![unified diff](./diff-unified.png)

## Herwerkte caching

Om pagina’s zo snel mogelijk weer te gegeven, probeert Dodona berekende waarden te onthouden zodat ze niet opnieuw moeten berekend worden als ze later opnieuw nodig zijn. Dit trucje wordt _caching_ genoemd. Het caching-mechanisme van Dodona werd herschreven, waardoor Dodona nu meer controle heeft om te beslissen welke waarden moeten onthouden worden en wanneer het wel nodig is om de waarden opnieuw te berekenen. Dit zorgt er voor dat sommige pagina's nu sneller geladen worden.

## Dodona blog

Klik op “Nieuws” in het menu aan de linkerkant van elke Dodona-pagina om naar de blog te navigeren. Als je deze release notes aan het lezen bent dan heb je de blog van Dodona dus al gevonden. Vanaf nu kan je nieuwsberichten over Dodona volgen in de blog: release notes, nieuwe onderwijs- of onderzoeksinstellingen die Dodona gebruiken, events rond Dodona, … Kortom, alles wat de Dodona-community zou kunnen interesseren.

## Volgorde van reeksen aanpassen

Dit moet zowat de meest gevraagde functionaliteit zijn onder lesgevers, en nu is die er. Onderaan de pagina waar je de eigenschappen van een cursus kan bewerken, vind je een overzicht met de reeksen van de cursus. Door in dit overzicht de reeksen te verslepen, kan je de volgorde aanpassen waarin de reeksen weergegeven worden.

![reeks volgorde](./series-order.png)

## Verborgen tabs

Dodona geeft judges de kans om feedback te groeperen in verschillende tabs. Nu is er de mogelijkheid om een tab enkel zichtbaar te maken voor lesgevers en niet voor studenten. Dit maakt het bijvoorbeeld mogelijk om een reeks testen uit te voeren waarover de studenten feedback krijgt, maar ook een reeks “verborgen” testen waarover de student geen feedback krijgt. De judge kan zelf bepalen of de resultaten van deze verborgen testen in rekening gebracht worden (bijvoorbeeld in de globale beoordeling van de oplossing, of een korte rapportering in de top-level feedback). Op die manier kan bijvoorbeeld de mogelijkheid geboden worden om een aantal verborgen testen te hebben, waarvoor de student geen kans krijgt om die te gamen (code schrijven die er specifiek voor zorgt dat bepaalde testen slagen).

Bestaande judges en oefeningen kunnen vanaf nu aangepast worden om de mogelijkheid van verborgen tabs uit te buiten. Specifieke vragen hierover kan je richten aan de auteurs van de judges en de oefeningen.

## Nieuwe onderwijs- en onderzoeksinstellingen

Bij deze release verwelkomen we twee nieuwe onderwijsinstellingen die Dodona gebruiken: [Scheppersinstituut](https://www.scheppers-wetteren.be/) (Wetteren, België) en [UC Leuven Limburg](https://www.ucll.be/) (Hasselt, België).  

## Volledige lijst van veranderingen

Voor een volledige lijst van veranderingen verwijzen we naar [onze GitHub release](https://github.com/dodona-edu/dodona/releases/tag/2.6), maar hieronder lijsten we ook kort de belangrijkste dingen op.

*   diff view herwerken
*   caching herwerken
*   mindere lege waarden naar configuratiebestanden schrijven
*   tooltip toevoegen aan status van reeks
*   blog toevoegen
*   visuele weergave feedbackpagina herwerken
*   verborgen tabs ondersteunen in feedbackpagina
*   cursusbeheerders toelaten om volgorde van reeksen aan te passen
*   polling interval gradueel verlengen voor status-update van niet-verwerkte oplossingen
*   bugfixes en kleine verbeteringen
