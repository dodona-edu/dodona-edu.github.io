---
title: "Dodona 2.9"
description: "Release notes Dodona 2.9"
permalink: '/news/:year/:month/:day/:slug'
date: "2019-03-27"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="nl" />

Release 2.9 brengt heel veel kleine aanpassingen aan de gebruikersinterface van Dodona, met als blikvanger de visuele weergave de voortgang van alle cursusgebruikers voor een reeks oefeningen. Omdat we de bescherming van persoonsgegevens en vertrouwelijke informatie ontzettend belangrijk vinden, geven we ook volledige transparantie over de gegevens die we bijhouden, waarom we deze gegevens bijhouden, wie toegang heeft tot de gegevens en hoe we die gegevens gebruiken om het leerplatform nog beter te maken.  

## Opsmukken van gebruikersinterface  

In deze release hebben we heel veel aandacht geschonken aan het opsmukken van de Dodona web interface. De opzet hierbij was om de gebruikersinterface nog consistenter, informatiever, meer responsief, intuïtiever en attractiever te maken, zonder daarbij de essentie van Dodona uit het oog te verliezen. Veel aanpassingen aan de gebruikersinterface zullen niet meteen in het oog springen, maar één van de meest zichtbare veranderingen is wellicht dat de voortgang van alle cursusgebruikers voor een reeks oefeningen nu op een visuele manier wordt weergegeven. Als de muis over de visuele weergave beweegt dan worden de absolute aantallen weergegeven in een tekstballon.

![voortgang](./voortgang.png)

## Verwerking van persoonsgegevens en vertrouwelijke informatie in Dodona

Voor de correcte werking van Dodona is het noodzakelijk dat we gegevens over onze gebruikers bijhouden. Op [deze pagina](https://dodona.ugent.be/data/) geven we volledige transparantie over de gegevens die we bijhouden, waarom we deze gegevens bijhouden, wie toegang heeft tot de gegevens en hoe we die gegevens gebruiken om het leerplatform nog beter te maken. Als leerplatform ontwikkeld aan de Universiteit Gent (België) is Dodona ook conform aan de [privacyverklaring van de Universiteit Gent](https://www.ugent.be/nl/univgent/privacy/privacyverklaring). Heb je toch nog vragen over de verwerking van persoonsgegevens en vertrouwelijke informatie in Dodona? Aarzel dan zeker niet om [ons te contacteren](https://dodona.ugent.be/contact/).  

## Volledige lijst van veranderingen  

Voor een volledige lijst van veranderingen verwijzen we naar [onze GitHub release](https://github.com/dodona-edu/dodona/releases/tag/2.9), maar hieronder lijsten we ook kort de belangrijkste dingen op.

*   gebruikersinterface op verschillende plaatsen verfijnen
*   informatie over datagebruik en privacyverklaring toevoegen aan voettekst
*   Python-specifieke vergelijking van resultaten volledig omzetten naar nieuwe weergave
*   strategie voor het invalideren van de cache verder optimaliseren
*   prioriteit van zoekopdrachten sorteren op tijdstip van opstarten in plaats van beantwoorden
*   tekstuele annotaties toevoegen aan feedback over programmeerstijl (_linting_)
*   status van ingediende oplossingen behandelen als label waarnaar kan gezocht worden
*   toelaten om zoekopties aan en uit te schakelen
*   bug oplossen waardoor oefeningen die net uit reeks verwijderd werden niet meer konden toegevoegd worden
*   bug oplossen waardoor lesgevers hun eigen profiel niet konden aanpassen
