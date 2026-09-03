---
title: "Een cursus verhuizen van Trinket"
description: "Tutorial: een Trinket-cursus verhuizen naar Dodona"
order: 12
---

# Een cursus verhuizen van Trinket

Trinket is gestopt. Heb je je cursus nog geëxporteerd voor het platform sloot, dan zit al je materiaal in één zip-bestand. Deze handleiding brengt je van die zip naar een werkende cursus op Dodona.

We gaan ervan uit dat je nog nooit met Dodona of met git gewerkt hebt.

## Voor je begint

Breng eerst in kaart wat je precies hebt.

**Een export bevat wat Trinket zelf bewaarde, niet waar je pagina's naar verwezen.** Je lespagina's zitten in de zip, net als de code van elke trinket en de afbeeldingen die je uploadde. Alles waar een pagina enkel naar verwees, zit er niet in: documenten die je via de viewer van Trinket toevoegde, zoals pdf's en presentaties, bestanden op Google Drive, afbeeldingen van een andere site, ingesloten video's.

Open daarom een paar lespagina's in een teksteditor en zoek naar links. Zo weet je wat er ontbreekt nog voor je begint. Wat op die lijst staat, moet je zelf bij elkaar zoeken en mee verhuizen, van waar je het ook nog vindt. Later zet je die bestanden in je eigen repository, bij de pagina's waarin je ze gebruikt.

::: warning Links naar Trinket zelf werken niet meer

Elke link naar trinket.io komt nu uit bij een melding dat de dienst gestopt is. Wat daar stond, heb je dus enkel nog als je er zelf een kopie van bewaarde. Links naar andere diensten, zoals Google Drive of Google Slides, blijven gewoon werken.

:::

Meteen ook een goed moment om te beslissen wat je wil meenemen. Een cursus die over meerdere jaren gegroeid is, bevat vaak materiaal dat je vandaag anders zou aanpakken. Je hoeft niet alles mee te verhuizen.

## Wat zit er in de export

De zip ziet er zo uit. Dit voorbeeld komt uit een Python-cursus:

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
assets/
  60f1a2b3c4d5e6f7/
    diagram.png
```

`course.json` is de inhoudstafel. Daarin staan je lessen in volgorde, en per les het materiaal dat erbij hoort:

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

Waar het je vooral om te doen is, is het `type` van elk stuk materiaal:

* `page` is een lespagina met enkel tekst. Die tekst staat volledig in het bijbehorende `.md`-bestand.
* `assignment` is zo'n pagina met een trinket erbij. De tekst staat weer in het `.md`-bestand, de code waarmee studenten vertrokken in `trinkets/`. Bij elke assignment hoort ook een `trinket`-object, en de `shortCode` daarin zegt je welke map je moet hebben: de mapnaam eindigt op diezelfde code.

In diezelfde trinket staan de datums van de assignment: wanneer het werk af moest zijn, wanneer indienen niet meer kon, en vanaf wanneer de pagina zichtbaar was. Trinket legde die per assignment vast, terwijl je op Dodona een deadline per reeks zet. Assignments met dezelfde datum horen hier dus vanzelf in één reeks thuis.

Per les is er één map met de `.md`-bestanden, genummerd in de volgorde waarin ze in de cursus stonden. Onder `trinkets/` krijgt elke assignment een eigen map met de startcode erin. De map daartussen draagt de naam van het soort trinket: `python3` in dit voorbeeld, maar evengoed `python` (dat zowel Python 2 als 3 aanvaardde), `html`, `java`, `blocks`, `console`, `pygame`, `glowscript`, `glowscript-blocks`, `music` of `R`. In `assets/` zitten de afbeeldingen die je uploadde; gebruikte je er geen, dan ontbreekt die map.

::: info Ook je concepten zitten in de export

Afhankelijk van wanneer je exporteerde, staat er in `course.json` bij elke les en elk stuk materiaal een `isDraft`-vlag. Die duidt de pagina's aan die je nooit publiceerde. Oudere exports hebben ze niet.

Op Dodona werkt dat net zo: elke activiteit begint als [conceptactiviteit](/nl/faq/activities/#wat-is-een-conceptactiviteit) en blijft onzichtbaar voor studenten tot jij ze publiceert. Een pagina die nog niet af is, mag dus gerust mee, en je publiceert ze zodra ze klaar is.

:::

Lees de `.md`-bestanden door voor je iets plant. Hoeveel uitleg er in de pagina's zelf staat, verschilt sterk van cursus tot cursus, en dat bepaalt hoeveel werk je nog voor de boeg hebt.

## Van Trinket naar Dodona

| In Trinket | Op Dodona |
| --- | --- |
| Een cursus | Een [cursus](../creating-a-course/) |
| Een les | Een [reeks](../exercise-series-management/) binnen die cursus |
| Materiaal van het type `page` | Een [leesactiviteit](/nl/guides/exercises/examples/content/) |
| Materiaal van het type `assignment` | Een [oefening](/nl/guides/exercises/creating-exercises/introduction/), of een leesactiviteit als er niets te verbeteren valt |
| De startcode van een trinket | De [boilerplate](/nl/references/exercise-directory-structure/#oefening-specifieke-configuratie) van de oefening |
| Een trinket ingesloten in een pagina | Een code playground in een leesactiviteit, hieronder beschreven |
| De uiterste datum op een assignment | De [deadline](../series-settings/#deadline) van de reeks waarin ze terechtkomt |

### Uitvoerbare code binnen een pagina

Een trinket midden in een pagina, die studenten ter plaatse konden uitvoeren en aanpassen, bestaat ook op Dodona: de code playground. Dat is een stuk code in een leesactiviteit dat studenten zelf kunnen aanpassen en uitvoeren, zonder iets in te dienen.

Je maakt er een door de code in een `<pre>` te zetten, binnen een `<dw-code-playground>`-element:

```html
<dw-code-playground>
<pre>
name = input("Wat is je naam? ")
print("Hallo, " + name + "!")
</pre>
</dw-code-playground>
```

Die code wordt uitgevoerd in de browser van de student en kan invoer lezen, dus een programma dat iets vraagt, werkt gewoon.

::: warning Code playgrounds zijn nog een vroege versie

Dit is een proof of concept. Zowel het uitzicht als de manier waarop je ze schrijft, verandert wellicht nog, dus reken erop dat je pagina's met een playground later nog moet bijwerken. Voorlopig draaien ze enkel Python.

:::

In een playground kunnen studenten dus wel experimenteren, maar er wordt niets ingediend en niets verbeterd. Om te experimenteren hoef je trouwens niet te kiezen tussen de twee. Elke Python-oefening heeft ook een [sandbox](/nl/guides/students/scratchpad/), achter de knop `Naar sandbox`, waar studenten hun code kunnen uitvoeren, testen en debuggen voor ze indienen. Moeten studenten feedback krijgen op wat ze schreven, maak er dan een oefening van.

## Bepalen wat een oefening wordt

Dodona verbetert door het programma van een student uit te voeren en het resultaat te vergelijken met wat jij opgaf. Vraag je bij elk stuk materiaal dus af of je op voorhand kan zeggen wat een correcte oplossing doet.

Kan dat, maak er dan een **oefening** van. Bestaat de taak uit lezen, voorspellen of uitleggen, maak er dan een **leesactiviteit** van, want dan valt er niets uit te voeren.

Bij taken waarin studenten zelf iets verzinnen, moet jij eerst een keuze maken. "Print een bericht naar keuze" valt niet automatisch te verbeteren, want elk correct antwoord ziet er anders uit. Meestal los je dat op door het bericht zelf in de beschrijving te zetten, zodat elke correcte oplossing dezelfde uitvoer geeft. Studenten oefenen precies hetzelfde, en de oefening valt nu wel te verbeteren.

Stond één taak in Trinket verspreid over meerdere pagina's, dan beslis je per pagina. Een pagina waarop studenten iets indienen, wordt een activiteit op zich. Een pagina die daar enkel naartoe werkt, hoort erbij.

## Een repository opzetten

Je activiteiten staan in een git-repository die Dodona uitleest. Zet die eerst op, voor je begint te schrijven.

Op dat vlak werkt Dodona anders dan Trinket. Je materiaal zit niet in het platform: het staat in een repository die van jou is, en Dodona leest er enkel uit. Je kan die kopiëren, ergens anders onderbrengen of aan een collega geven, en ze blijft van jou, wat er ook met het platform gebeurt. Je hoeft later ook niets meer te exporteren, want die repository ís al je kopie.

[Oefeningen opstellen: installatie](/nl/guides/exercises/creating-exercises/setup/) neemt het hele proces met je door: een GitHub-account aanmaken, vertrekken van onze template-repository, de gebruiker `dodona-server` toegang geven tot je repository, de repository toevoegen aan Dodona, en een webhook instellen zodat Dodona je wijzigingen automatisch oppikt.

Je moet daarvoor geen git leren. Die handleiding toont je hoe je alles vanuit je browser doet.

## De activiteiten schrijven

In de repository is elke activiteit een map met een `config.json`-bestand:

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
        boilerplate/
          boilerplate
      evaluation/
        suite.yaml
      solution/
        solution.py
```

::: tip Mappen zijn geen reeksen

De mappenstructuur dient enkel om zelf overzicht te houden. Welke activiteiten in welke reeks terechtkomen, kies je later op Dodona; je mapnamen bepalen dat niet.

:::

Om een **page** om te zetten, verhuis je de tekst naar `description/description.nl.md`. De [referentie over oefeningbeschrijvingen](/nl/references/exercise-description/) behandelt afbeeldingen, codeblokken, tabellen en callouts.

Om een **assignment** om te zetten, begin je met diezelfde tekst. Daarna komen de drie stukken die er een automatisch verbeterde oefening van maken:

* **De startcode** komt in `description/boilerplate/boilerplate`, zodat studenten de oefening openen met dezelfde code als in de trinket.
* **Een testplan** in `evaluation/` beschrijft wat een correcte oplossing doet. Zoiets bestond niet op Trinket: assignments werden ingediend en daarna door jou nagelezen. Er zit dus niets in je export dat je kan overnemen, je schrijft ze van nul. Meteen ook waar de rest van Dodona op steunt: studenten weten bij het indienen meteen of ze juist zitten, ze kunnen zichzelf bijsturen zonder op jou te wachten, en jij ziet wie waar vastloopt. Een oefening zonder testplan is niet veel meer dan een pagina met een editor eraan.
* **Een modeloplossing** in `solution/` bewijst dat je testplan klopt. Dien ze zelf één keer in. Slaagt je eigen oplossing niet, dan klopt je testplan niet, en dat weet je liever voor dertig studenten het ontdekken.

Gebruikte je de optionele zelftests van Trinket, dan zit die `tests.py` in de export als elk ander codebestand. Dodona kan hem niet zomaar uitvoeren, maar hij legt wel vast wat jij toen al de moeite vond om te controleren, en dat scheelt je werk.

[Testplannen](/nl/guides/exercises/testsuites/) legt het formaat uit, en [een oefening met invoer en uitvoer](/nl/guides/exercises/examples/input-output/) leunt het dichtst aan bij een typische Trinket-assignment: een programma dat invoer leest en een resultaat print.

Deze pagina's behandelen de rest:

* [Oefeningen opstellen: opgave en testplan schrijven](/nl/guides/exercises/creating-exercises/exercise/) voor een eerste volledige oefening, van begin tot einde.
* [Leesactiviteit](/nl/guides/exercises/examples/content/) voor pagina's zonder taak.
* De [referentie over `config.json`](/nl/references/exercise-config/) voor de instellingen van één activiteit.
* De [structuur van een oefeningmap](/nl/references/exercise-directory-structure/) voor waar elk bestand thuishoort.

## De cursus opbouwen

Staan je activiteiten in de repository, dan bouw je de cursus zelf op Dodona:

1. [Maak de cursus aan](../creating-a-course/).
2. [Maak per les een reeks aan en voeg er je activiteiten aan toe](../exercise-series-management/), in de volgorde waarin ze in de export stonden.
3. [Stel de reeksopties in](../series-settings/), zoals zichtbaarheid en deadlines.

Materiaal dat je voor jezelf schreef en niet voor je studenten, zoals lesvoorbereidingen of antwoordsleutels, mag gerust in de cursus blijven. Zet het in een eigen reeks en houd die verborgen: enkel wie de cursus beheert, ziet ze dan.

## Voor je de cursus deelt met studenten

Nieuwe activiteiten beginnen als [conceptactiviteit](/nl/faq/activities/#wat-is-een-conceptactiviteit), dus studenten zien ze nog niet. Zo kan je alles nog eens nalezen en je activiteiten zelf uitproberen op het platform, voor er iets naar buiten gaat.

Los elke oefening zelf op en dien je eigen oplossing in. Zo vind je het snelst een testplan dat iets anders verwacht dan het zou moeten, en het kost je een minuutje per oefening.

Overloop daarna je reeksen en kijk na of elke reeks de zichtbaarheid heeft die je wil.

Daarna is het een gewone Dodona-cursus. [Gebruikersbeheer](../user-management/) gaat over studenten die zich inschrijven, [verbeteren](../grading/) over feedback en punten, en [statistieken](../statistics/) tonen je hoe je studenten het doen. De [handleidingen voor lesgevers](../) behandelen de rest.

## Een AI-assistent het eerste werk laten doen

Alles hierboven is handwerk: een beschrijving en een testplan voor elke activiteit apart. Bij een cursus van enige omvang loont het om die eerste ronde te verkorten.

We hebben goede ervaringen met een codeassistent die dat eerste werk doet. Wijs hem je export aan, deze handleiding met de referentiepagina's waar ze naar linkt, en [universal-judge](https://github.com/dodona-edu/universal-judge), de repository achter TESTed, waarin het formaat van een testplan volledig beschreven staat. Vraag hem daarna om de mappenstructuur, de beschrijvingen en per oefening een eerste testplan te maken.

Wat je terugkrijgt is een eerste versie, geen afgewerkte cursus. Lees elke beschrijving na, en dien bij elke oefening je eigen oplossing in. Een testplan kan er prima uitzien en toch net iets anders verwachten, en dat zie je niet door het te lezen.
