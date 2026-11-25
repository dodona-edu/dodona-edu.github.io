---
title: "Toetsen en examens"
description: "Handleiding: neem een toets of examen af op Dodona met een toetsreeks"
order: 8
---

# Toetsen en examens

Wil je Dodona gebruiken voor een toets of examen op punten, dan kan je een reeks omvormen tot een **toetsreeks**. Een toetsreeks gedraagt zich helemaal anders dan een gewone reeks:

* Studenten moeten expliciet op start klikken op de reeks om toegang te krijgen tot de oefeningen.
* De toegang is beperkt tot de browser waarmee ze de toets starten. Aanmelden op een tweede toestel of browser geeft geen toegang tot de toets.
* API-toegang wordt geblokkeerd tijdens de toets, waardoor IDE-plugins zoals de VS Code-extensie en de JetBrains-plugin niet werken.
* Nadat ze de toets afronden, hebben studenten geen toegang meer tot de oefeningen en hun oplossingen, tot jij de toets achteraf vrijgeeft.
* Elke relevante actie van een student wordt bijgehouden in een toetslog die je kan raadplegen en exporteren.

Deze handleiding overloopt het volledige traject: de reeks instellen, wat je studenten zien, sessies opvolgen en stoppen tijdens de toets, de resultaten achteraf vrijgeven, en wat er precies gelogd wordt.

::: tip Belangrijk
Een toetsreeks regelt de toegang *binnen* Dodona: ze vergrendelt de computer van de student niet, neemt het scherm niet op en blokkeert geen andere websites. Beschouw ze als één laag van een examen onder toezicht, naast toezicht in het lokaal of de examenomgeving van je school. Wil je ook de computer van de student vergrendelen, dan kan je [Safe Exam Browser](#safe-exam-browser) verplichten (bèta).
:::

## Een toetsreeks aanmaken

Een toetsreeks maak je aan zoals elke andere reeks: navigeer naar je cursus, klik op `Reeksen beheren` en dan op `Reeks aanmaken`, zoals beschreven in [oefeningenreeksenbeheer](../exercise-series-management/#oefeningenreeks-aanmaken). Bovenaan het reeksformulier kies je `Toetsreeks` als type, daar omschreven als "Reeks met beperkte toegang en activiteitenlog".

![Reeksformulier met de soortkeuze, naam, deadline, beschrijvingseditor en zichtbaarheidsopties](../exercise-series-management/series-form-nl.png)

Je hoeft dit niet op voorhand te beslissen: het reekstype kan ook na het aanmaken van de reeks nog gewijzigd worden. Kies `Reekstype wijzigen…` in het reeks-actiemenu om een bestaande reeks om te zetten. Zolang de reeks nog geen ingediende oplossingen heeft, wordt ze rechtstreeks omgezet; anders maakt Dodona een kopie van de reeks met het nieuwe type, zodat een echte toets altijd met een schone lei begint. Hetzelfde geldt in de andere richting: zodra een toets sessies of gelogde gebeurtenissen heeft, levert een omzetting een niet-toets kopie op en blijft de oorspronkelijke toets onaangeroerd.

Als je het toetstype selecteert, verschijnt er een extra sectie `Toetsopties` op het formulier:

* `Vereis een wachtwoord om de toets te starten`: studenten moeten een wachtwoord invoeren voor ze kunnen starten. Zie [het toetswachtwoord](#het-toetswachtwoord) hieronder.

* `Beperk Dodona tot de inhoud van de toets`: eenmaal gestart kunnen studenten enkel deze toets bekijken en er oplossingen voor indienen. Al de rest van Dodona is onbeschikbaar tot ze hun toets afronden. Zonder deze optie behouden studenten tijdens de toets toegang tot de rest van Dodona (andere cursussen, eerdere oplossingen, …), en dat is zelden wat je wil voor een examen.

* `Toetssessies automatisch stoppen`: wanneer de deadline bereikt is, worden alle toetssessies automatisch gestopt. Studenten hebben dan geen toegang meer tot de oefeningen en hun oplossingen. Deze optie vereist dat de reeks een deadline heeft. Sessies die zo gestopt worden, tonen `Systeem` als uitvoerder in de tijdslijn van de toets.

* `Verplicht Safe Exam Browser` (bèta): studenten kunnen de toets enkel in Safe Exam Browser afleggen, dat hun computer vergrendelt tijdens de toets. Zie [Safe Exam Browser](#safe-exam-browser) hieronder.

![Sectie toetsopties van het reeksformulier, met een gegenereerd wachtwoord, de vinkjes bij "Beperk Dodona" en "automatisch stoppen" aangevinkt, en het vinkje bij "Verplicht Safe Exam Browser" niet aangevinkt](assessment-options-nl.png)

Alle andere eigenschappen van het formulier (naam, deadline, beschrijving, zichtbaarheid, …) werken zoals bij elke reeks en worden beschreven in de referentie over [reeksinstellingen](../series-settings/). De zichtbaarheidsinstellingen combineren mooi met een toets: met `Zichtbaar voor studenten na starttijd` verschijnt de reeks bijvoorbeeld pas op het moment dat het examen begint. Merk op dat zelfs een zichtbare toetsreeks haar oefeningen nooit toont aan studenten zolang ze hun sessie niet gestart hebben.

## Het toetswachtwoord

Het wachtwoord is een extra beveiliging bovenop de zichtbaarheidsinstellingen: het garandeert dat niemand de toets kan starten voor jij het wachtwoord bekendmaakt in het examenlokaal, en dat studenten die niet fysiek aanwezig zijn de toets helemaal niet kunnen starten.

Je schakelt het in met `Vereis een wachtwoord om de toets te starten` op het reeksformulier. In het veld `Wachtwoord` kies je zelf een wachtwoord of laat je het leeg om er een te laten genereren. Als leerkracht kan je het wachtwoord achteraf bekijken via de knop `Tonen` in het statuspaneel van de toets op de reeks, en het opnieuw instellen via het reeksformulier als het te vroeg zou uitlekken.

Het wachtwoord geldt per reeks en is hetzelfde voor alle studenten. Het wachtwoord op het bord of de projector tonen bij de start van het examen is dus de typische werkwijze.

## Wat je studenten zien

Voor de toets gestart is, zien studenten de reeks in de cursus met een uitleg getiteld `Hoe deze toets werkt` in plaats van de oefeningenlijst. Die legt uit hoe ze starten en afronden, waarschuwt dat ze na het afronden geen oplossingen meer kunnen wijzigen, dat de lesgever de toets op elk moment kan afsluiten, en dat API-toegang geblokkeerd wordt. Er staat ook een privacyvermelding bij: tijdens de toets worden hun acties geregistreerd, waaronder tijdstippen, interacties, hun IP-adres en browserinformatie, en die gegevens worden uitsluitend gebruikt om een correct en eerlijk verloop van de toets te garanderen.

![Reekskaart voor de toets gestart is, met de uitleg "Hoe deze toets werkt", een wachtwoordveld en de knop Start toets, zonder oefeningenlijst](assessment-start-nl.png)

Om te beginnen voert een student het wachtwoord in (indien vereist) en klikt op `Start toets`. Vanaf dat moment:

* De oefeningen worden zichtbaar en de student kan oplossingen indienen, enkel in die browser.
* Met `Beperk Dodona tot de inhoud van de toets` ingeschakeld, blijft de rest van Dodona verborgen tot de student klaar is.
* Een student kan maar aan één toets tegelijk deelnemen.

Wanneer een student klaar is, klikt die op `Toets afronden`. Na bevestiging eindigt de sessie: de ingediende oplossingen zijn opgeslagen en de student kan de oefeningen niet meer bekijken of wijzigen, tenzij jij de sessie heropent of de toets vrijgeeft.

::: warning Browser dichtgeklikt of van toestel gewisseld?
De toets is gekoppeld aan de browser waarmee de student ze startte. Meldt een student zich af, klikt die per ongeluk de browser dicht of wisselt die van toestel, dan komt die op een pagina met de titel `We kunnen je toets niet verderzetten in deze browser`. Er gaat geen voortgang verloren. De student keert best terug naar de oorspronkelijke browser; lukt dat niet, dan herstel jij de toegang via het toetsoverzicht door de sessie te stoppen en daarna te heropenen (zie hieronder). Op dezelfde pagina kan een student die al klaar is de toets ook gewoon afronden vanuit de nieuwe browser.
:::

## De toets opvolgen

Tijdens het examen is het toetsoverzicht je controlekamer. Je bereikt het via de knop `Toetsoverzicht` op de reeks. Op deze pagina kan je opvolgen wie de toets gestart of al afgerond heeft, en kan je de sessie van een student indien nodig handmatig stoppen of heropenen.

![Toetsoverzicht met het statuspaneel, de tellers voor nog niet gestart/bezig/gestopt, de tijdslijn-callout en de sessietabel met gestart- en gestoptijdstippen per student](assessment-overview-nl.png)

Bovenaan vind je het statuspaneel van de toets met de huidige fase (`Nog niet gestart`, `Bezig`, `Gestopt, klaar om vrij te geven` of `Vrijgegeven`) en de actieve instellingen: `Dodona-toegang` (`Beperkt` of `Onbeperkt`), `Wachtwoord` (`Vereist`, met de knop `Tonen`, of `Niet vereist`) en `Automatisch stoppen` (`Ingeschakeld` of `Uitgeschakeld`). Een toets die Safe Exam Browser vereist, toont ook een rij `Safe Exam Browser`, met een knop `Tonen` voor het [afsluitwachtwoord](#instellen). Daarnaast tonen drie tellers hoeveel studenten `Nog niet gestart`, `Bezig` en `Gestopt` zijn; klik op een teller om de tabel eronder te filteren.

De tabel toont elke student van de cursus met de tijdstippen `Gestart op` en `Gestopt op`. Je kan zoeken op naam, filteren op `Gebruikerlabels`, `Gestart` en `Gestopt`, en de kolommen sorteren. Per rij kan je:

* `Stop sessie`: beëindig de toets van de student onmiddellijk. Het werk blijft bewaard, maar de student kan de oefeningen niet meer bekijken en niets meer indienen. Voor een student die nog niet gestart is, sluit dezelfde knop de toets af nog voor die kan starten, weergegeven als `Afgesloten zonder te starten`; handig voor studenten die afwezig zijn of niet mogen deelnemen.
* `Heropen sessie`: maak een stop ongedaan. De student kan de toets opnieuw starten in een verse browsersessie en gaat verder met behoud van al het eerdere werk. Zo herstel je ook de toegang van een student van wie de browser crashte: eerst `Stop sessie`, daarna `Heropen sessie`.
* De persoonlijke tijdslijn van toetsgebeurtenissen van die student bekijken.

## De toets stoppen

Een toetssessie kan op verschillende manieren eindigen:

* De student rondt zelf de toets af met `Toets afronden`.
* Jij stopt een individuele sessie met `Stop sessie` op het toetsoverzicht.
* Jij stopt iedereen tegelijk. De knop `Stop sessies` boven de tabel op het toetsoverzicht stopt enkel de sessies die voldoen aan de huidige filters, waardoor je bijvoorbeeld één klasgroep kan stoppen door eerst op hun label te filteren. De knop `Toets stoppen` op de reeks zelf beëindigt alle lopende sessies, en studenten die nog niet gestart zijn, kunnen daarna niet meer starten.
* Dodona stopt alle sessies automatisch op de deadline, als je `Toetssessies automatisch stoppen` hebt ingeschakeld.

Zodra elke sessie gestopt is, verandert de fase van de toets naar `Gestopt, klaar om vrij te geven`. Studenten kunnen de oefeningen en hun oplossingen op dat moment niet bekijken; de reeks toont hun een melding dat hun oplossingen opgeslagen zijn.

## De resultaten vrijgeven

Na de toets beslis jij wanneer studenten de oefeningen en hun oplossingen opnieuw kunnen bekijken. Klik op `Toets vrijgeven` op de reeks en bevestig. De toets wordt dan voor iedereen afgesloten en studenten kunnen de opgaven en hun oplossingen in alleen-lezenmodus bekijken: ze kunnen geen nieuwe oplossingen indienen en geen activiteiten als gelezen markeren. Dit is het natuurlijke moment om studenten hun werk te laten inkijken, bijvoorbeeld terwijl je de oplossingen klassikaal bespreekt.

![Reekskaart nadat de toets is afgelopen, met de melding "Deze toets is afgelopen" en de knop Toets vrijgeven](assessment-publish-nl.png)

Te vroeg vrijgegeven? Met `Toets verbergen` in het reeks-actiemenu maak je de toets weer privé.

Vrijgeven staat los van verbeteren. Om de toets te verbeteren maak je een evaluatie aan voor de reeks en geef je optioneel feedback en punten; zie de handleiding over [taken en toetsen verbeteren](../grading/). Een evaluatie werkt op de oplossingen die studenten tijdens de toets indienden, dus je kan verbeteren voor of na het vrijgeven.

## De tijdslijn van de toets

Elke toets houdt een gedetailleerde log van gebeurtenissen bij. Vanuit het toetsoverzicht opent `Bekijk volledige tijdslijn` een chronologisch overzicht van alle toetsgebeurtenissen; de knop per student op elke rij van de tabel toont dezelfde tijdslijn gefilterd op één student.

De volgende gebeurtenissen worden geregistreerd, telkens met een tijdstip, de betrokken student, en waar relevant de uitvoerder van de actie (jij, de student, of `Systeem`):

* `Toets gestart`, `Toets afgerond` (door de student), `Toets gestopt` (door een lesgever of het systeem), `Toets heropend`, `Toets geannuleerd` (afgesloten voor de student startte)
* `Oplossing ingediend`, met een link naar de oplossing en de oefening
* `Leesactiviteit gelezen`
* `Aangemeld tijdens toets` en `Afgemeld tijdens toets`

Je kan de tijdslijn filteren op `Gebruiker`, `Actie`, `Uitvoerder`, `IP adres` en `Browser`. De knop `Exporteer` downloadt de log als CSV-bestand, inclusief het IP-adres en de browserinformatie bij elke gebeurtenis, zodat je ze kan archiveren of onregelmatigheden na het examen kan onderzoeken.

![Tijdslijn van de toets met de filters Gebruiker/Actie/Uitvoerder/IP adres/Browser, de knop Exporteer, en een mix van gebeurtenissen inclusief een rij met Systeem als uitvoerder](assessment-timeline-nl.png)

## Safe Exam Browser

::: info Bèta
Ondersteuning voor Safe Exam Browser is in bèta: de optie verschijnt enkel voor lesgevers die aan de bèta deelnemen. Wil je ze uitproberen? Meld je aan via de [aankondiging van de bèta](https://github.com/orgs/dodona-edu/discussions/208) op ons forum, waar je ook de laatste wijzigingen vindt en feedback kan achterlaten.
:::

[Safe Exam Browser](https://safeexambrowser.org) is een gratis browser die de computer van de student vergrendelt tijdens een examen: studenten kunnen niet naar andere programma's wisselen, en ze kunnen enkel Dodona en de websites die jij toelaat openen. Als een toets Safe Exam Browser vereist, start Dodona het voor je studenten en meldt het hen aan, zodat je geen `.seb`-bestand of link hoeft te verdelen.

### Instellen

Vink `Verplicht Safe Exam Browser` aan in de sectie `Toetsopties` van het reeksformulier. Safe Exam Browser laat heel Dodona toe: vink ook [`Beperk Dodona tot de inhoud van de toets`](#een-toetsreeks-aanmaken) aan om enkel de toets toe te laten.

![Toetsopties met Verplicht Safe Exam Browser aangevinkt, het afsluitwachtwoord en een opgeslagen configuratiebestand](assessment-safe-exam-browser-nl.png)

Met `Verplicht Safe Exam Browser` aangevinkt verschijnen er twee extra velden:

* `Afsluitwachtwoord`: sluit Safe Exam Browser af wanneer een student vastzit in Dodona en er niet op een andere manier uit kan. Kies zelf een wachtwoord, of behoud het gegenereerde; je kan het later wijzigen op het reeksformulier.
* `Configuratiebestand`: optioneel, zie [je eigen configuratiebestand](#je-eigen-configuratiebestand) hieronder.

Vink je `Verplicht Safe Exam Browser` later uit, dan bewaart Dodona het afsluitwachtwoord en het configuratiebestand voor wanneer je het opnieuw aanvinkt. Een kopie van de reeks vereist nog steeds Safe Exam Browser, met een nieuw afsluitwachtwoord maar zonder je configuratiebestand: upload het opnieuw in de kopie.

::: warning Het afsluitwachtwoord wijzigen tijdens een toets
Een nieuw afsluitwachtwoord geldt pas voor studenten die Safe Exam Browser daarna starten: studenten die al begonnen zijn, hebben nog het oude nodig. Wijzig het dus voor de toets begint, of noteer eerst het oude wachtwoord. Zonder dat wachtwoord kan een student van wie Safe Exam Browser Dodona niet meer bereikt, bijvoorbeeld omdat het netwerk uitvalt, er enkel uit door de computer opnieuw op te starten. Zolang Dodona bereikbaar is, kan je de sessie ook stoppen via het [toetsoverzicht](#de-toets-opvolgen): binnen ongeveer een minuut toont Safe Exam Browser een knop `Safe Exam Browser afsluiten`.
:::

### Je eigen configuratiebestand

Upload je eigen configuratiebestand wanneer je andere instellingen voor Safe Exam Browser wil dan de standaardinstellingen, bijvoorbeeld om een extra website toe te laten zoals de documentatie van een programmeertaal. Zonder bestand gelden de instellingen van Dodona zelf, en die laten enkel Dodona toe. Maak het bestand met de configuratietool van Safe Exam Browser, en let op deze punten:

* Stel geen instellingenwachtwoord in: Dodona kan een versleuteld bestand niet lezen.
* Mogen studenten enkel Dodona en de websites die jij toelaat openen, zet dan de URL-filter aan. De configuratietool zet die standaard uit, en Dodona behoudt je keuze: met de filter uit kunnen studenten elke website openen.
* Zet geen wachtwoorden of andere geheimen in het bestand: elke student die de toets start, krijgt het.

Dodona behoudt je instellingen en stelt enkel in wat de toets nodig heeft: de startpagina, de afsluitpagina en het afsluitwachtwoord, en regels in de URL-filter die `dodona.be` en `sandbox.dodona.be` toelaten. Een afsluitwachtwoord of startpagina in je eigen bestand wordt dus vervangen.

Dodona weigert een bestand, en behoudt het vorige, als het bestand:

* versleuteld is met een instellingenwachtwoord;
* groter is dan 1 MB;
* geen `.seb`-bestand is dat Dodona kan lezen;
* een blokkeerregel in de URL-filter heeft die Dodona kan blokkeren, zoals `*` of `dodona.be`. Een blokkeerregel met een reguliere expressie wordt altijd geweigerd, omdat Dodona die niet kan controleren: gebruik een regel zonder reguliere expressie, zoals `facebook.com`.

De melding onder het veld noemt het geweigerde bestand en de reden. Om je bestand te verwijderen, klik je op de prullenbak naast het veld en bewaar je het formulier.

### Wat je studenten nodig hebben en zien

Studenten installeren [Safe Exam Browser](https://safeexambrowser.org/download_en.html) voor de toets, op het toestel waarop ze de toets maken. Safe Exam Browser bestaat voor Windows, macOS en iPad; er is geen versie voor Linux of Chromebooks. Voor de toets start, vertelt `Hoe deze toets werkt` hen dat de toets in Safe Exam Browser loopt, met een link om het te downloaden.

![Reekskaart voor de toets gestart is, met de melding over Safe Exam Browser in "Hoe deze toets werkt" en de knop Start toets](assessment-start-safe-exam-browser-nl.png)

De toets verloopt daarna zoals beschreven in [wat je studenten zien](#wat-je-studenten-zien), met deze verschillen:

* Studenten vullen het toetswachtwoord in (indien vereist) in hun gewone browser. Na `Start toets` gaat Safe Exam Browser open en meldt het hen aan, en de toets opent vanzelf.
* Gaat Safe Exam Browser niet open, bijvoorbeeld omdat het nog niet geïnstalleerd is, dan klikt de student op `Start toets opnieuw`.
* `Toets afronden` sluit Safe Exam Browser vanzelf af.
* Wanneer jij een sessie stopt, of Dodona ze stopt op de deadline, toont Safe Exam Browser dat de toets afgelopen is, met een knop `Safe Exam Browser afsluiten`.

Zit een student vast in Safe Exam Browser, ga dan naar het toestel van de student, klik op de afsluitknop van Safe Exam Browser en geef het afsluitwachtwoord in, dat je in het [statuspaneel](#de-toets-opvolgen) vindt. De sessie van de student is dan nog bezig, dus die kan de toets niet zelf opnieuw starten: klik op `Stop sessie` en daarna op `Heropen sessie`, zoals bij een student die [de browser dichtklikte](#wat-je-studenten-zien). Hetzelfde geldt wanneer Safe Exam Browser om een andere reden afsluit, bijvoorbeeld omdat het crasht.

Met het afsluitwachtwoord ontgrendel je ook het scherm `SEB LOCKED`, dat Safe Exam Browser toont wanneer het start nadat een vorige sessie niet goed afgesloten werd, bijvoorbeeld omdat de computer tijdens de toets uitgezet werd.

::: tip Probeer het uit voor het examen
Cursusbeheerders kunnen niet zelf deelnemen aan een toets. Probeer het volledige verloop voor het examen uit met een account dat student is in de cursus, op het soort toestel dat je studenten zullen gebruiken. Met een korte oefentoets die Safe Exam Browser vereist, kunnen je studenten ook voor het echte examen nagaan of Safe Exam Browser werkt op hun eigen toestel.
:::

## Privacyoverwegingen

Vragen die je school (of je studenten) kunnen stellen over toetsen:

* **Wat wordt er gelogd?** De gebeurtenissen hierboven, met tijdstippen, het IP-adres van de student en browserinformatie. Het loggen start wanneer de student de toets start en is beperkt tot acties die met de toets te maken hebben.
* **Worden studenten geïnformeerd?** Ja. Het startscherm vertelt studenten expliciet dat hun acties geregistreerd worden, wat daarbij hoort, en dat die gegevens uitsluitend gebruikt worden om een correct en eerlijk verloop van de toets te garanderen. Een student start de toets pas na het zien van deze melding.
* **Wie kan de log inkijken?** Enkel de cursusbeheerders van de cursus (en Dodona-medewerkers). Studenten kunnen de tijdslijn van de toets niet zien.
* **Is dit proctoringsoftware?** Nee. Dodona neemt geen schermen, webcams of toetsaanslagen op. Zonder [Safe Exam Browser](#safe-exam-browser) kan Dodona niet verhinderen dat studenten andere programma's of websites openen. Het IP-adres en de browserinformatie in de log kunnen helpen om afwijkingen op te sporen (zoals een sessie die plots verdergaat vanaf een ander netwerk), maar fysiek toezicht blijft jouw verantwoordelijkheid.

Heb je vragen over het afnemen van een examen met Dodona waar deze handleiding geen antwoord op geeft, contacteer ons dan gerust via [support@dodona.be](mailto:support@dodona.be).
