---
title: "Een cursus verhuizen van Trinket"
description: "Tutorial: een Trinket-cursus verhuizen naar Dodona"
order: 12
---

# Een cursus verhuizen van Trinket

Trinket is gestopt. Als je je cursus exporteerde voor het zover was, heb je een zip-bestand met je materiaal. Deze handleiding leidt je van die zip naar een werkende cursus op Dodona.

We gaan ervan uit dat je Dodona nog nooit gebruikt hebt en ook nog nooit met git gewerkt hebt.

## Voor je begint

Breng eerst in kaart wat je precies hebt.

**Een export bevat wat Trinket bewaarde, niet waar je pagina's naar verwezen.** Je lespagina's zitten in de zip, samen met de code van elke trinket en de afbeeldingen die je uploadde. Wat ontbreekt, is alles waar een pagina alleen maar naar verwees: documenten die je via Trinkets viewer toevoegde, zoals pdf's en presentaties, bestanden op Google Drive, afbeeldingen die van een andere site ingeladen werden, ingesloten video's.

Open enkele lespagina's in een teksteditor en zoek naar links, zodat je weet wat ontbreekt voor je begint met herbouwen. Alles op die lijst moet je apart verzamelen en handmatig overzetten, van waar je het nog hebt. Later komt het in je eigen repository terecht, naast de pagina's die het gebruiken.

::: warning Links naar Trinket zelf werken niet meer

trinket.io geeft nu op elk adres een melding dat de dienst gestopt is. Alles wat daar gehost stond, is dus enkel nog beschikbaar als je er zelf een kopie van hebt. Links naar andere diensten, zoals Google Drive of Google Slides, blijven wel gewoon werken.

:::

Dit is ook een goed moment om te bepalen wat je wil behouden. Een cursus die over meerdere jaren gegroeid is, bevat meestal materiaal dat je vandaag niet meer op dezelfde manier zou schrijven. Je hoeft niet alles mee over te nemen.

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

Dat zijn de enige twee materiaaltypes die Trinket had. Een video, een presentatie of een quiz was nooit een type op zich: het was een `page` met dat element ingesloten in de tekst, en daarom zie je ze hier niet apart terug.

Per les is er één map met de `.md`-bestanden, genummerd in de volgorde waarin ze in de cursus stonden. Onder `trinkets/` heeft elke assignment zijn eigen map met de startcode erin. De map ertussen is genoemd naar het soort trinket: in dit voorbeeld `python3`, maar ook `python`, `html`, `java`, `blocks`, `console`, `pygame`, `glowscript`, `glowscript-blocks`, `music` en `R` zijn mogelijk. `assets/` bevat de afbeeldingen die je uploadde, en is afwezig als een cursus geen afbeeldingen gebruikte.

::: warning Ongepubliceerde pagina's zitten er ook tussen

Afhankelijk van wanneer je de export maakte, heeft `course.json` een `isDraft`-vlag op elke les en elk stuk materiaal. Pagina's die je nooit publiceerde, staan naast de gepubliceerde en zien er identiek uit, dus controleer die vlag voor je een les omzet waarvan je dacht dat ze af was. Oudere exports hebben die vlag helemaal niet.

:::

Lees de `.md`-bestanden door voor je iets plant. Hoeveel van de uitleg in de pagina's zelf zit, verschilt sterk van cursus tot cursus, en dat bepaalt hoeveel je moet herschrijven.

## Van Trinket naar Dodona

| In Trinket | Op Dodona |
| --- | --- |
| Een cursus | Een [cursus](../creating-a-course/) |
| Een les | Een [reeks](../exercise-series-management/) binnen die cursus |
| Materiaal van het type `page` | Een [leesactiviteit](/nl/guides/exercises/examples/content/) |
| Materiaal van het type `assignment` | Een [oefening](/nl/guides/exercises/creating-exercises/introduction/), of een leesactiviteit als er niets te verbeteren valt |
| De startcode van een trinket | De [boilerplate](/nl/references/exercise-directory-structure/#oefening-specifieke-configuratie) van de oefening |
| Een trinket ingesloten in een pagina | Een code playground in een leesactiviteit, hieronder beschreven |

### Uitvoerbare code binnen een pagina

Een trinket midden in een pagina, die studenten ter plekke konden uitvoeren en aanpassen, heeft op Dodona een tegenhanger: een code playground. Dat is een uitvoerbaar, bewerkbaar blok binnen een leesactiviteit, en studenten kunnen het uitvoeren zonder iets in te dienen.

Je schrijft er een door de code in een `<pre>` te verpakken:

```html
<dw-code-playground>
<pre>
name = input("Wat is je naam? ")
print("Hallo, " + name + "!")
</pre>
</dw-code-playground>
```

Het blok draait in de browser van de student en kan invoer lezen, dus een programma dat een vraag stelt, werkt zoals verwacht.

::: warning Code playgrounds zijn een vroege preview

Dit is een proof of concept. Zowel het uiterlijk van playgrounds als de manier waarop je ze schrijft, zal wellicht nog veranderen, dus houd er rekening mee dat je pagina's die ze gebruiken later moet aanpassen. Op dit moment draaien ze enkel Python.

:::

Een playground is om te verkennen, niet om te evalueren: er wordt niets ingediend en niets verbeterd. Wil je dat studenten feedback krijgen op wat ze schreven, gebruik dan een oefening.

## Bepalen wat een oefening wordt

Dodona verbetert door het programma van een student uit te voeren en het resultaat te vergelijken met wat jij hebt opgegeven. Vraag je dus voor elk stuk materiaal af of je op voorhand kan zeggen wat een correcte oplossing doet.

Maak er een **oefening** van wanneer dat kan. Maak er een **leesactiviteit** van wanneer de taak bestaat uit lezen, voorspellen of uitleggen, want dan is er niets om uit te voeren.

Taken waarbij studenten iets moeten verzinnen, vragen om een keuze vooraf. "Print een bericht naar keuze" kan niet automatisch verbeterd worden, want elk correct antwoord ziet er anders uit. De gangbare oplossing is om het bericht zelf in de beschrijving te geven, zodat elke correcte oplossing dezelfde uitvoer produceert. Studenten oefenen exact dezelfde vaardigheid, en de oefening kan nu wel verbeterd worden.

Liep één taak in Trinket over meerdere pagina's, beslis dan per pagina. Een pagina waarop studenten iets indienen, is een activiteit op zich. Een pagina die enkel naar die taak toewerkt, hoort erbij.

## Een repository opzetten

Je activiteiten staan in een git-repository die Dodona uitleest. Zet die eenmalig op, voor je begint te schrijven.

Dodona werkt hier anders dan Trinket. Je materiaal staat niet binnen het platform opgeslagen: het staat in een repository die je zelf bezit, en Dodona leest die enkel uit. Je kan ze kopiëren, elders onderbrengen of aan een collega doorgeven, en ze blijft van jou wat er ook met het platform gebeurt. Er is ook geen exportstap meer nodig later, want de repository is al je eigen kopie.

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
        boilerplate/
          boilerplate
      evaluation/
        suite.yaml
      solution/
        solution.py
```

::: tip Mappen zijn geen reeksen

De mapstructuur dient enkel om zelf overzicht te houden. Welke activiteiten in welke reeks terechtkomen, bepaal je later op Dodona zelf, niet de mapnamen.

:::

Om een **page** om te zetten, verhuis je de tekst naar `description/description.nl.md`. De [referentie over oefeningbeschrijvingen](/nl/references/exercise-description/) behandelt afbeeldingen, codeblokken, tabellen en callouts.

Om een **assignment** om te zetten, begin je met de tekst, en voeg je vervolgens de drie dingen toe die er een oefening van maken die automatisch verbeterd wordt:

* **De startcode** komt in `description/boilerplate/boilerplate`, zodat studenten de oefening openen met dezelfde code die de trinket hen gaf.
* **Een testplan** in `evaluation/` beschrijft wat een correcte oplossing doet. Trinket had hier geen equivalent voor: assignments werden ingediend en dan door jou nagekeken, dus er zit geen verbeterlogica in de export om over te nemen en je schrijft deze van nul. Het is ook waar de rest van Dodona op gebouwd is: studenten weten meteen bij het indienen of ze het goed hebben, ze kunnen zichzelf bijsturen zonder op jou te wachten, en jij ziet wie waar vastzit. Een oefening zonder testplan is gewoon een pagina met een editor eraan.
* **Een modeloplossing** in `solution/` bewijst dat het testplan klopt. Dien ze zelf één keer in. Slaagt je eigen oplossing niet, dan klopt het testplan niet, en dat wil je weten voor dertig studenten het ontdekken.

Testplannen schrijven is het nieuwe onderdeel van de overstap, dus neem de tijd voor het eerste en hergebruik daarna die vorm. [Testplannen](/nl/guides/exercises/testsuites/) legt het formaat uit, en [een oefening met invoer en uitvoer](/nl/guides/exercises/examples/input-output/) komt het dichtst bij een typische Trinket-assignment: een programma dat invoer leest en een resultaat print.

Deze pagina's behandelen de rest:

* [Oefeningen opstellen: opgave en testplan schrijven](/nl/guides/exercises/creating-exercises/exercise/) voor een eerste volledige oefening, van begin tot einde.
* [Leesactiviteit](/nl/guides/exercises/examples/content/) voor pagina's zonder taak.
* De [referentie over `config.json`](/nl/references/exercise-config/) voor de instellingen van één activiteit.
* De [oefeningmap-structuur](/nl/references/exercise-directory-structure/) voor waar elk bestand thuishoort.

## De cursus opbouwen

Met activiteiten in je repository bouw je de cursus zelf op Dodona:

1. [Maak de cursus aan](../creating-a-course/).
2. [Maak per les een reeks aan en voeg er je activiteiten aan toe](../exercise-series-management/), in de volgorde waarin de export ze vermeldde.
3. [Stel de reeksopties in](../series-settings/), zoals zichtbaarheid en deadlines.

Materiaal dat je voor jezelf schreef in plaats van voor studenten, zoals lesvoorbereidingen of antwoordsleutels, kan gewoon in de cursus blijven staan: zet het in een eigen reeks en laat die reeks verborgen. Enkel wie de cursus mag beheren, ziet ze dan.

## Wat anders werkt dan in Trinket

Twee dingen zijn de moeite waard om te weten voor je je testplannen schrijft.

**Tests voeren het programma van je studenten uit, ze lezen het niet.** Dodona kan controleren wat een programma print, wat een functie teruggeeft, welke uitzondering het opwerpt, met welke exitcode het stopt, en welke bestanden het wegschrijft. Wat Dodona niet kan controleren, is hoe de code geschreven is. Een regel zoals "los dit op met één print-statement" wordt niet door de tests afgedwongen, want een oplossing die de regel negeert, gedraagt zich nog steeds correct. Zet de regel in de beschrijving, en controleer ze zelf wanneer je oplossingen leest.

**Studenten dienen één oplossing per activiteit in.** Een taak met een makkelijkere en een moeilijkere variant wordt twee activiteiten in plaats van één.

::: tip Prompts en verwachte uitvoer

Stel je een vraag met `input("Wat is je naam? ")`, dan komt die prompt niet terug in de uitvoer die de tests vergelijken. Stel je dezelfde vraag met een apart `print`-statement, dan wel. Beide werken, zolang je testplan overeenkomt met wat het programma echt print. De prompt binnen `input()` houden is meestal de eenvoudigste van de twee.

:::

## Een AI-assistent het eerste werk laten doen

Een cursus omzetten is veel handwerk: een beschrijving en een testplan voor elke afzonderlijke activiteit.

We hebben goede ervaringen met een codeassistent die de eerste versie maakt. Wijs de assistent naar je export, naar deze handleiding en de referentiepagina's waar die naar linkt, en naar [universal-judge](https://github.com/dodona-edu/universal-judge), de repository achter TESTed, die het testplanformaat volledig documenteert. Vraag de assistent vervolgens om de mapstructuur, de beschrijvingen en een eerste testplan per oefening te maken.

Wat je terugkrijgt, is een eerste ontwerp, geen afgewerkte cursus. Lees elke beschrijving, en dien voor elke oefening je eigen oplossing in. Een testplan kan er prima uitzien en toch net iets verkeerd verwachten, iets wat je niet ziet door het gewoon te lezen.

## Voor je de cursus deelt met studenten

Nieuwe activiteiten starten als [conceptactiviteit](/nl/faq/activities/#wat-is-een-conceptactiviteit), waardoor studenten ze nog niet kunnen zien. Dat geeft je ruimte voor een laatste redactieronde, en de kans om je activiteiten zelf op het platform uit te proberen voor er iets gepubliceerd wordt.

Los elke oefening zelf op en dien je eigen oplossing in. Dat is de snelste manier om een testplan te vinden dat het verkeerde verwacht, en het kost je ongeveer een minuutje per oefening.

Controleer daarna de zichtbaarheid van elke reeks, ook die met je eigen notities.

Daarna is het een gewone Dodona-cursus. [Gebruikersbeheer](../user-management/) behandelt studenten die zich registreren en aansluiten, [verbeteren](../grading/) behandelt feedback en scores, en [statistieken](../statistics/) toont je hoe je studenten het doen. De [handleidingen voor lesgevers](../) behandelen de rest.
