---
title: "Dodona 3.0"
description: "Release notes Dodona 3.0"
permalink: '/news/:year/:month/:day/:slug'
date: "2019-09-26"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="nl" />

Gelukkige verjaardag Dodona! Vandaag is het exact drie jaar geleden dat we de allereerste versie uitgerold hebben. Uiteraard vieren we geen verjaardagsfeest zonder geschenkje voor al onze gebruikers: Dodona versie 3.0 met demo modus, visuele weergave van voortgang voor alle cursusgebruikers, ondersteuning voor de programmeertaal R en als orgelpunt is Dodona vanaf nu ook _open source_. Daarnaast vonden achter de schermen heel wat veranderingen plaats om het platform nog robuuster te maken. Zo gebruiken we bijvoorbeeld opnieuw de meeste recente versies van Ruby en Ruby on Rails.

![Dodona in numbers](./3-jaar.png)

## Open source

Onder de [dodona-edu](https://github.com/dodona-edu) organisatie op GitHub werden tal van _repositories_ met broncode voor verschillende componenten van Dodona gepubliceerd: de [webapplicatie](https://github.com/dodona-edu/dodona), de [API](https://github.com/dodona-edu/dodona-api-typescript), de [gebruikershandleiding](https://github.com/dodona-edu/dodona-edu.github.io), de configuratie van [_docker images_](https://github.com/dodona-edu/docker-images) voor het uitvoeren van ingediende oplossingen, een aantal _judges_ voor het beoordelen van ingediende oplossingen in verschillende programmeertalen, en een specifieke tool voor plagiaatdetectie op software ([dolos](https://github.com/dodona-edu/dolos)). Laat die _pull requests_ maar komen!  

Met dank aan [Rien Maertens](https://github.com/rien) kunnen we ook een [script](https://github.com/dodona-edu/github-migrate) aanbieden voor al wie _code repositories_ met al hun _issues_, _pull requests_, _releases_, ... wil verplaatsen van GitHub Enterprise naar [github.com](https://github.com).  

## Demo modus

Gebruik demo modus als je klassikaal een demonstratie wil geven met _learning analytics_ of broncode uit Dodona zonder de identiteit van studenten prijs te geven. In demo modus worden alle gegevens waarmee individuele gebruikers kunnen geïdentificeerd worden (gebruikersnamen, e-mailadressen, ...) onherkenbaar vervangen door willekeurig gegenereerde pseudoniemen. Om identificatie te bemoeilijken worden elke dag nieuwe pseudoniemen gegenereerd.  

![demo modus](./demo-modus.png)

## Ondersteuning voor programmeertaal R

Dodona biedt vanaf nu ook een _judge_ aan voor het automatisch beoordelen van ingediende oplossingen in de programmeertaal R. Wie graag oefeningen wil opstellen voor deze programmeertaal kan in deze [GitHub repository](https://github.com/dodona-edu/judge-r) alvast de broncode van de _judge_ en de bijhorende documentatie vinden. De _judge_ is open source beschikbaar en dus hoef je ook niet te aarzelen om _issues_ aan te maken als je hulp nodig hebt of functionaliteit wil toegevoegd zien die momenteel ontbreekt.  

## Visuele weergave van voortgang voor alle cursusgebruikers

Na alle positieve reacties op de visuele weergave van de voortgang voor oefeningen in een reeks, hebben we dezelfde visualisatie ook toegevoegd aan het overzicht met alle cursusgebruikers. Daar visualiseren we het aantal oefeningen waaraan een gebruiker begonnen is en het aantal correct opgeloste oefeningen. Het maximum aantal correspondeert met het totaal aantal oefeningen in de cursus.  

![user progress](./user-progress.png)

## Volledige lijst van veranderingen  

Voor een volledige lijst van veranderingen verwijzen we naar [onze GitHub release](https://github.com/dodona-edu/dodona/releases/tag/3.0).

*   demo modus beschikbaar maken voor cursusbeheerders
*   ondersteuning voor programmeertaal R
*   visuele weergave van voortgang in overzicht met alle cursusgebruikers
*   icoon weergeven aan cursusbeheerders als visuele weergave van voortgang voor oefeningen in reeks uitgeschakeld is voor cursusgebruikers
*   links verduidelijken in overzicht met ingediende oplossingen binnen cursus
*   breedte behouden bij verslepen (_drag-and-drop_) van tabelrijen
*   alle iconen omzetten naar [Material Design Icons](https://material.io/resources/icons/)
*   overzicht met alle ingediende oplossingen voor een bepaalde judge
*   sneller filteren op onderwijsinstelling in overzicht van cursusgebruikers
*   automatische e-mail versturen als _repository_ met foute configuratiebestanden aangemaakt wordt
*   knop toevoegen voor rechtstreeks uitschrijven van cursusbeheerders
*   interne fout oplossen bij opvragen van 0-de pagina uit overzicht
*   aantal zoekopdrachten reduceren bij weergave van cursusgebruikers
*   cursusbeheerders toelaten om weergave van oefeningen in reeks uit te schakelen
*   volledige periode waarin oplossingen in cursus ingediend werden weergeven in heatmap
*   inschakelen van donkere modus afstemmen op systeeminstelling als nog niet expliciet ingesteld werd in Dodona
*   enkel ingeschreven cursusgebruikers weergeven in statusoverzicht van reeks
*   stabiele volgorde aanhouden voor oefeningen in reeks
*   probleem oplossen bij weergave van _legacy_ feedback voor Python judge
*   judges toelaten om toegangsniveau in te stellen voor individuele feedback tabs
*   tijdens bijwerken van reeks worden links naar geselecteerde oefeningen gescoped binnen cursus
*   gebruikers altijd op pagina houden bij verwijderen van reeks uit cursus
