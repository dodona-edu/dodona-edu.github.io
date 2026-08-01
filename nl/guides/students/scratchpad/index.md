---
title: "De Python-sandbox"
description: "Tutorial: Python-code uitvoeren en debuggen rechtstreeks in je browser"
order: 6
---

# De Python-sandbox
Voor Python-oefeningen heeft Dodona een ingebouwde **sandbox**: een venster waarin je Python-code kan schrijven en uitvoeren, rechtstreeks in je browser en zonder iets te installeren op je computer. De sandbox is ideaal om snel iets uit te proberen: experimenteer met enkele regels code, test je oplossing met je eigen invoer, of doorloop je programma stap voor stap met de ingebouwde debugger om precies te zien wat het doet. Code die je in de sandbox uitvoert, wordt **niet** ingediend op Dodona en wordt niet beoordeeld door de judge; ben je tevreden over je code, dan dien je ze op de gewone manier in, zoals uitgelegd bij [Oefeningen oplossen](../exercises/).

## De sandbox openen

De sandbox is beschikbaar op de pagina van elke Python-oefening. Onderaan het paneel waarmee je een oplossing indient, naast de indienknop, vind je de knop `Naar sandbox`. Als je erop klikt, opent de `Python sandbox` in een paneel bovenop de oefeningpagina.

De sandbox bestaat uit twee helften:

- Links vind je een **code-editor** met een knop `Uitvoeren`, een veld om **invoer** te geven en de **uitvoer** van je code.
- Rechts toont de tab `Beschrijving` de opgave van de oefening, zodat je de opgave kan blijven lezen terwijl je je code schrijft.

Had je al code geschreven in de editor van de oefeningpagina, dan start de sandbox automatisch met die code. Bevat de sandbox nog andere code van een vorige sessie, dan vraagt Dodona eerst of je die wil overschrijven met je laatste aanpassingen.

::: tip De eerste uitvoering kan even duren
De sandbox voert Python volledig in je browser uit. De eerste keer dat je code uitvoert, moet je browser de Python-omgeving nog downloaden en opstarten, waardoor het even kan duren voor je uitvoer ziet. Daarna gaat het een stuk sneller.
:::

## Code uitvoeren

Schrijf je code in de editor links en klik op `Uitvoeren`. De uitvoer van je programma verschijnt in het uitvoerpaneel eronder. Terwijl je code loopt, kan je ze op elk moment onderbreken met de knop `Stop`.

Nog enkele dingen die de sandbox kan:

- **Invoer**: als je programma invoer leest (bijvoorbeeld met `input()`), dan kan je je antwoord gewoon intypen in het invoerveld wanneer je programma erom vraagt, en op enter drukken. Geef je alle invoer liever vooraf in? Klik dan op `Geef invoer vooraf in` en typ alle invoerregels op voorhand; met `Wisselen naar interactieve invoer` keer je terug.
- **Turtle-tekeningen**: als je code tekent met de module `turtle`, dan verschijnt de tekening in een aparte tab `Turtle` naast de tekstuele uitvoer.
- **Packages**: importeert je code een package, dan probeert de sandbox die automatisch te installeren. De meeste veelgebruikte packages werken; packages die toegang tot je besturingssysteem nodig hebben, werken niet in de browser.
- **Bestanden van de oefening**: bestanden die bij de oefening horen, kunnen automatisch in de sandbox geladen worden, en je kan links of afbeeldingen uit de opgave naar de sandbox slepen om ze in je code te gebruiken.

## Je code indienen

Code in de sandbox wordt nooit automatisch ingediend. Doet je code wat je wil, klik dan op `Naar indienbox`: die knop kopieert je code van de sandbox naar de editor van de oefeningpagina, waar je ze een laatste keer kan nalezen en indienen. Pas dan wordt je oplossing beoordeeld door de judge, zoals beschreven bij [Feedback begrijpen](../feedback/).

::: warning Sandboxcode wordt niet bewaard
Dodona bewaart de code die je in de sandbox schrijft niet. Als je de pagina sluit zonder je code naar de editor te kopiëren en in te dienen, kan je je werk kwijt zijn. Dien regelmatig in!
:::

## Stap voor stap debuggen

De sandbox bevat ook een **debugger** (gebaseerd op de bekende Python Tutor) die je programma stap voor stap uitvoert. Dat is erg handig als je programma iets anders doet dan je verwachtte: in plaats van te gokken, kan je precies bekijken wat er bij elke stap gebeurt.

Klik op de knop `Debuggen` naast `Uitvoeren` om de debugger te starten. De rechterhelft van de sandbox schakelt over naar de tab `Debugger`, waarin je door je programma kan wandelen:

- Versleep de **schuifbalk** om door de stappen van je programma te bewegen, of gebruik de pijltjesknoppen om naar de vorige, volgende, eerste of laatste stap te gaan.
- Bij elke stap toont de debugger welke regel wordt uitgevoerd en hoe je programma informatie opbouwt en bewaart: de variabelen die op dat moment bestaan en hun waarden.
- Klik op `Stop debugger` om terug te keren naar de gewone modus.

### Een fout testgeval debuggen

Je kan de debugger ook rechtstreeks starten vanuit de feedback op een oplossing. Op de feedbackpagina van een Python-oefening staat bij testgevallen een knop `Debuggen`. Als je erop klikt, opent de sandbox met de code van je oplossing, wordt dat specifieke testgeval uitgevoerd met dezelfde invoer die de judge gebruikte, en opent de tab `Debugger`. Boven de debugger zie je onder `Testgeval dat gedebugd wordt` welk testgeval je aan het doorlopen bent. Zo kan je stap voor stap volgen waar je oplossing precies de mist ingaat bij een gefaalde test.

## Beperkingen

De sandbox is een hulpmiddel om te experimenteren, geen vervanging voor indienen:

- Je code loopt in je browser, niet in de omgeving die de judge gebruikt. Code uitvoeren in de sandbox levert nooit een ingediende oplossing op, en enkel de judge bepaalt of je oplossing correct is.
- Niet alle packages zijn beschikbaar in de browser, en zware berekeningen kunnen trager lopen dan bij de judge.
- Sandboxcode wordt niet bewaard door Dodona: kopieer je code naar de editor en dien ze in om ze bij te houden.

De sandbox is enkel beschikbaar voor **Python**-oefeningen. Voor andere programmeertalen raden we aan om in een [IDE](../exercises/#indienen-van-een-oplossing) te werken en je oplossing in te dienen op Dodona.
