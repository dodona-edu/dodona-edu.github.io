---
title: "Een cursus verhuizen van Trinket"
description: "Tutorial: een Trinket-cursus verhuizen naar Dodona"
order: 12
---

# Een cursus verhuizen van Trinket

Trinket is gestopt, dus als je ermee lesgaf, hou je enkel nog een export van je cursus over: een zip-bestand. Deze handleiding leidt je van die zip naar een werkende cursus op Dodona.

We gaan ervan uit dat je Dodona nog nooit gebruikt hebt en ook nog nooit met git gewerkt hebt. We gaan er wel van uit dat je je export nog hebt, want Trinket zelf bestaat niet meer om op terug te vallen.

::: tip We doen dit ook voor jou

Je moet dit niet alleen doen. [Neem contact met ons op](https://dodona.be/nl/contact) en we zetten je cursus voor je om. We hebben dit al vaker gedaan en hebben er de tools voor.

:::

## Voor je begint

Voor je aan Dodona begint, breng eerst in kaart wat je precies hebt.

**Een export bevat wat Trinket bewaarde, niet waar je pagina's naar verwezen.** Je lespagina's zitten in de zip, en ook de code van elke trinket. Alles waar een pagina alleen maar naar verwees, zit er niet in: slides die via een viewer getoond werden, bestanden op Google Drive, afbeeldingen die van een andere site ingeladen werden, ingesloten video's.

Open enkele lespagina's in een teksteditor en zoek naar links. Alles wat buiten de zip leeft, moet je ergens anders verzamelen, en een deel daarvan is samen met Trinket verdwenen.

::: warning Doe dit eerst

Als pagina's linken naar bestanden die op Trinket zelf gehost stonden, download ze dan nu. Zodra die adressen niet meer werken, is die inhoud weg, tenzij je er zelf een kopie van hebt.

:::

Dit is ook een goed moment om te bepalen wat je wil behouden. Een cursus die over meerdere jaren gegroeid is, bevat meestal materiaal dat je vandaag niet meer op dezelfde manier zou schrijven. Je hoeft niet alles mee over te nemen.

## Wat zit er in de export

De zip bestaat uit drie delen.

```
course.json
0-introduction/
  00-welcome.md
  01-getting-started.md
1-loops/
  00-loops-slides.md
  01-loops-predict.md
  02-loops-make.md
trinkets/
  manifest.json
  python3/
    12-Loops-Predict_a1b2c3d4e5/
      main.py
```

`course.json` is de inhoudstafel. Het lijst je lessen op in volgorde, en per les het materiaal dat erin zit:

```json
{
  "name": "Introduction to programming",
  "lessons": [
    {
      "name": "1. Loops",
      "slug": "1-loops",
      "materials": [
        { "name": "1-Loops-Slides", "slug": "1-loops-slides", "type": "page" },
        { "name": "1.1-Loops-Predict", "slug": "1-1-loops-predict", "type": "assignment" }
      ]
    }
  ]
}
```

Het bruikbare gegeven is het `type` van elk stuk materiaal:

* `page` is een lespagina: enkel tekst, volledig terug te vinden in het bijhorende `.md`-bestand.
* `assignment` is een pagina met een trinket erbij. De tekst staat in het `.md`-bestand, en de code waar studenten van vertrokken staat in `trinkets/`.

Per les is er één map met de `.md`-bestanden, genummerd in de volgorde waarin ze in de cursus stonden. Onder `trinkets/` heeft elke assignment zijn eigen map met de startcode erin, meestal als `main.py`.

Lees de `.md`-bestanden door voor je iets plant. Trinket-cursussen houden de uitleg vaak in de slides en laten de pagina's zelf vrij beknopt, waardoor een export die klein oogt in de praktijk een pak groter kan zijn.

## Van Trinket naar Dodona

| In Trinket | Op Dodona |
| --- | --- |
| Een cursus | Een [cursus](../creating-a-course/) |
| Een les | Een [reeks](../exercise-series-management/) binnen die cursus |
| Materiaal van het type `page` | Een [leesactiviteit](/nl/guides/exercises/examples/content/) |
| Materiaal van het type `assignment` | Een [oefening](/nl/guides/exercises/creating-exercises/introduction/), of een leesactiviteit als er niets te verbeteren valt |
| De startcode van een trinket | De boilerplate van de oefening |

Eén ding gaat niet mee over: een trinket midden in een pagina, die studenten ter plekke konden uitvoeren en aanpassen. Op Dodona schrijven en draaien studenten code binnen een oefening, die ze vervolgens indienen en waar ze feedback op krijgen.

In de praktijk betekent dat twee dingen. Is het de bedoeling dat studenten code draaien en aanpassen, dan maak je er een oefening van. Is het de bedoeling om code te tonen terwijl je iets uitlegt, zet die dan in een codeblok in een leesactiviteit, gevolgd door een oefening waarin ze die code gebruiken.

## Bepalen wat een oefening wordt

Dodona verbetert automatisch: het voert het programma van de student uit en vergelijkt de uitvoer met wat jij als correct hebt opgegeven. Dat ene gegeven stuurt de meeste van je keuzes.

Maak er een **oefening** van zodra je exact kan opschrijven wat een correcte oplossing produceert. Maak er een **leesactiviteit** van als de taak bestaat uit lezen, voorspellen of uitleggen, want dan is er niets om uit te voeren en niets om te vergelijken.

Taken waarbij studenten iets moeten verzinnen, zitten daartussenin. "Print een bericht naar keuze" of "schrijf je eigen mop" kan niet automatisch verbeterd worden, want elk correct antwoord ziet er anders uit. Je hebt twee uitwegen:

* **Leg het resultaat vast.** Herschrijf de taak zodat iedereen dezelfde uitvoer produceert: geef het bericht zelf mee in plaats van "print je eigen bericht". De vaardigheid die geoefend wordt, blijft dezelfde, en de oefening kan nu wel verbeterd worden.
* **Verbeter het zelf.** Gebruik de [Markdown-judge](/nl/references/judges/#markdown): studenten dienen dan tekst in in plaats van een programma, en jij leest en beoordeelt die zelf.

Liep één taak in Trinket over meerdere pagina's, beslis dan per pagina. Een pagina waarop studenten iets indienen, is een activiteit op zich. Een pagina die enkel naar die taak toewerkt, hoort erbij.

## Een repository opzetten

Je activiteiten staan in een git-repository die Dodona uitleest. Zet die eenmalig op, voor je begint te schrijven.

[Oefeningen opstellen: installatie](/nl/guides/exercises/creating-exercises/setup/) neemt het hele proces met je door: een GitHub-account aanmaken, vertrekken van onze template-repository, de gebruiker `dodona-server` toegang geven tot je repository, de repository toevoegen aan Dodona, en een webhook instellen zodat Dodona je wijzigingen automatisch oppikt.

Je moet hiervoor geen git leren. Die handleiding toont je hoe je alles vanuit je browser doet.

## De activiteiten schrijven

Binnen de repository is elke activiteit een map met een `config.json`-bestand:

```
my-course/
  dirconfig.json
  01-loops/
    01-what-is-a-loop/
      config.json
      description/
        description.nl.md
    02-count-to-ten/
      config.json
      description/
        description.nl.md
      evaluation/
        suite.yaml
      solution/
        solution.py
```

::: tip Mappen zijn geen reeksen

De mapstructuur dient enkel om zelf overzicht te houden. Welke activiteiten in welke reeks terechtkomen, bepaal je later op Dodona zelf, niet de mapnamen.

:::

Om een **page** om te zetten, verhuis je de tekst naar `description/description.nl.md`. De [referentie over oefeningbeschrijvingen](/nl/references/exercise-description/) behandelt afbeeldingen, codeblokken, tabellen en callouts.

Om een **assignment** om te zetten, doe je hetzelfde met de tekst, gebruik je de startcode van de trinket als boilerplate, schrijf je een testplan dat de verwachte uitvoer beschrijft, en voeg je een eigen oplossing toe.

Deze pagina's helpen je verder:

* [Oefeningen opstellen: opgave en testplan schrijven](/nl/guides/exercises/creating-exercises/exercise/) voor een eerste volledige oefening.
* [Oefening met invoer-uitvoer](/nl/guides/exercises/examples/input-output/), de vorm die de meeste omgezette Trinket-assignments aannemen.
* [Leesactiviteit](/nl/guides/exercises/examples/content/) voor pagina's zonder taak.
* [Testplannen](/nl/guides/exercises/testsuites/) om te beschrijven wat een correct antwoord produceert.
* De [referentie over `config.json`](/nl/references/exercise-config/) voor de instellingen van één activiteit.

## De cursus opbouwen

Met activiteiten in je repository bouw je de cursus zelf op Dodona:

1. [Maak de cursus aan](../creating-a-course/).
2. [Maak per les een reeks aan en voeg er je activiteiten aan toe](../exercise-series-management/), in de volgorde waarin de export ze vermeldde.
3. [Stel de reeksopties in](../series-settings/), zoals zichtbaarheid en deadlines.

Materiaal dat je voor jezelf schreef in plaats van voor studenten, zoals lesvoorbereidingen of antwoordsleutels, kan gewoon in de cursus blijven staan: zet het in een eigen reeks en laat die reeks verborgen. Enkel wie de cursus mag beheren, ziet ze dan.

## Wat anders werkt dan in Trinket

Een paar gewoontes uit Trinket overleven de overstap niet. Geen daarvan is een probleem zodra je ze kent.

* **Verbeteren kijkt enkel naar de uitvoer.** Een regel als "los dit op met één print-statement" kan niet automatisch gecontroleerd worden, want een oplossing die de regel breekt, print nog altijd het juiste resultaat. Zet de regel in de beschrijving en controleer ze zelf wanneer je oplossingen bekijkt.
* **Vragen horen thuis in `input()`.** Stel je de vraag met een apart print-statement, dan telt die mee in de uitvoer die de tests vergelijken, en falen correcte oplossingen plots. Zet de tekst in de `input()`-oproep zelf.
* **Eén activiteit, één oplossing.** Een taak met een makkelijkere en een moeilijkere variant wordt twee activiteiten, zodat studenten elk apart indienen.
* **Studenten kunnen niet in de code zelf antwoorden.** Vroeg een taak om commentaar toe te voegen die uitlegt wat code doet, maak er dan een leesactiviteit van met het antwoord achter een [spoiler](/nl/references/exercise-description/#spoilers), of een Markdown-judge-oefening als je hun antwoorden zelf wil lezen en beoordelen.

## Voor je de cursus deelt met studenten

Drie dingen om te controleren.

Nieuwe activiteiten starten als [conceptactiviteit](/nl/faq/activities/#wat-is-een-conceptactiviteit), waardoor studenten ze nog niet kunnen zien. Ze blijven dat tot je zelf anders beslist, zodat je rustig kan werken.

Los elke oefening zelf op en dien je eigen oplossing in. Dat is de snelste manier om een testplan te vinden dat het verkeerde verwacht, en het kost je maar een minuutje per oefening.

Controleer ten slotte de zichtbaarheid van elke reeks. Alles waar je nog niet klaar voor bent om te tonen, inclusief de reeks met je eigen notities, blijft verborgen tot je het publiceert.

Ziet alles er goed uit? Dan publiceer je de reeksen en deel je de cursus met je studenten.
