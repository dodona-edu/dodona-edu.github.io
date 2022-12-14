---
title: "Dodona 6"
description: "Release notes Dodona 6"
permalink: '/news/:year/:month/:day/:slug'
date: "2022-08-18"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="nl" />

> Dodona werkt doorheen het jaar steeds met kleinere releases. Deze post zal telkens aangevuld worden met nieuwe features voor het jaar 2022-2023.

## Dodona 6.0 - 18/08/2022

Gebruikers met een persoonlijke Google (Gmail) of Microsoft (Hotmail, Outlook, ...) account kunnen nu ook aanmelden op Dodona! Voorheen moesten die accounts steeds gekoppeld zijn met een Office 365 of Google Workspace abonnement van een onderwijsinstelling. Deze beperking werd nu opgeheven.

Om te voorkomen dat studenten hun persoonlijke account gebruiken om te registreren voor cursussen (in plaats van hun schoolaccount), moeten cursusbeheerder expliciet aangeven dat ook niet-schoolaccounts toegelaten zijn in hun cursus.

Onze privacy policy werd aangepast om dergelijke accounts toe te laten. Er zijn geen wijzigingen voor gebruikers met een schoolaccount.

Alle details over deze Dodona versie kan je vinden in onze [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/3900).

## Dodona 6.1 - 19/09/2022

Dodona 6.1 bevat een beta versie van een nieuwe feature om opmerkingen gemakkelijk te hergebruiken als je een reeks manueel aan het evalueren bent. Deze feature is voorlopig slechts beschikbaar voor een zeer beperkte groep gebruikers.

Tussen versie 6.0 en 6.1 zijn er verschillende aanpassingen gedaan om het aanmelden robuuster te maken:
- Een betere afhandeling als er al een Dodona-account bestaat met een bepaald emailadres
- Meer leesbare gebruikersnamen waar mogelijk
- Private accounts werden hernoemd naar persoonlijke accounts
- Inloggen met smartschool gebruikt intern nu identifiers in plaats van gebruikersnamen
- Het gebruik van smartschool co-accounts werd uitgeschakeld
- Verschillende foutmeldingen werden opgelost.

Alle details over deze Dodona versie kan je vinden in onze [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/4007).

## Dodona 6.2 - 25/11/2022

Dodona 6.2 bevat weinig zichtbare veranderingen voor gewone gebruikers. De grootste aanpassing is een functie om gemakkelijker scholen samen te voegen voor de Dodonabeheerders.

Alle details over deze Dodona versie kan je vinden in onze [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/4192).

## Dodona 6.3 - 13/12/2022
Dodona 6.3 brengt twee grote aanpassingen aan de user interface!

### Filters voor oefeningen
Leerkrachten kunnen zelf oefeningen aan Dodona toevoegen die iedereen vervolgens kan gebruiken. Op deze manier verzamelden we al elfduizend oefeningen. Een nadeel hiervan is dat het moeilijk werd om oefeningen van hoge kwaliteit te vinden. In plaats van te beperken wie oefeningen kan aanmaken, voegen we in Dodona 6.3 extra filters toe.

Ten eerste wordt de lange lijst van oefeningen nu opgesplitst in meerdere tabs:
- Een tab die alle oefeningen bevat uit je eigen repositories of waarvoor je speciale toegangsrechten kreeg.
- Een tab die all oefeningen bevat die door jou of je collega's werden toegevoegd.
- Een tab met "uitgelichte oefeningen". Dit zijn oefeningen waarvan wij denken dat ze van hoge kwaliteit zijn.
- Een tab met alle oefeningen.

Daar bovenop hebben we ook een populariteitsindicator en -filter toegevoegd aan de tabel. Het idee hierachter is dat veelgebruikte oefeningen een grote kans hebben om van hoge kwaliteit te zijn.

Op deze manier proberen we een betere balans te vinden tussen het vindbaar maken van kwalitatieve oefeningen zonder beperkingen in te voeren op het experimenteren met eigen oefeningen.

![image](https://user-images.githubusercontent.com/481872/207433739-0fa48ea1-db06-4982-99ab-2c76538fc66f.png)

### Herwerken van de home page
Dodona 6.3 bevat ook de eerste stap in een groter project om onze home page nuttiger te maken. We zullen proberen om meer nuttige info weer te geven.

De eerste stap is het toevoegen actiekaartjes bovenaan de home page. Het eerste kaartje is steeds "Ga verder". Afhankelijk van je recente activiteit op Dodona gidst dit kaartje je naar een onafgewerkte oefening, de volgende oefening in een reeks waar je laatst aan werkte of zelfs de volgende oefeningenreeks.

Naast "Ga verder" tonen we nu ook je voortgang voor komende deadlines. De kleur en voortgangsbalk op dat kaartje geven je huidige status weer.

![image](https://user-images.githubusercontent.com/481872/207435965-5c147754-fd39-4c20-bdac-784b0e1ac8f6.png)

Alle details over deze Dodona versie kan je vinden in onze [GitHub release discussion](https://github.com/dodona-edu/dodona/discussions/4234).
