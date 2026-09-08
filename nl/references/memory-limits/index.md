---
title: "Geheugenlimieten"
description: "Hoe Dodona de geheugenlimiet van een evaluatie bepaalt"
order: 7
---

# Geheugenlimieten

Elke oplossing die op Dodona ingediend wordt, wordt geëvalueerd in een container met een geheugenlimiet. Op deze pagina lees je hoe Dodona die limiet bepaalt, hoeveel geheugen elke judge echt nodig heeft, en waarom een limiet die lager ligt dan de standaardwaarde problemen geeft die heel moeilijk te herkennen zijn.

Het veld `memory_limit` zelf is gedocumenteerd in de [referentie over oefeningconfiguratie](/nl/references/exercise-config/).

::: tip Kort samengevat
Je moet `memory_limit` bijna nooit instellen. De standaardwaarde volstaat al voor elke judge op Dodona. Als je oefening een waarde instelt die lager ligt dan de standaardwaarde, verwijder die dan.
:::

## Hoe de limiet bepaald wordt

Dodona bouwt de geheugenlimiet op in lagen. Elke laag overschrijft de vorige:

1. **De standaardwaarde van Dodona**: 256 MB.
2. **De waarde van de judge**, als de judge er een instelt.
3. **De `dirconfig.json`-bestanden** van je repository, van de hoofdmap van de repository tot in de map van de oefening.
4. **De `config.json` van de oefening** zelf.

De waarde die daaruit volgt, wordt beperkt tot het bereik van 10 MB tot 1000 MB. Een waarde buiten dat bereik wordt vervangen door de dichtstbijzijnde grens.

## De limieten van vandaag

De meeste judges stellen zelf geen geheugenlimiet in en gebruiken dus de standaardwaarde. Deze judges stellen wel een eigen waarde in:

| Judge | Geheugenlimiet |
| --- | --- |
| Haskell | 512 MB |
| Scheme | 512 MB |
| R | 256 MB |
| TESTed | 512 MB, behalve 750 MB voor Kotlin en 1000 MB voor Haskell |
| alle andere judges | 256 MB (de standaardwaarde) |

## Hoeveel geheugen een judge nodig heeft

De tabel hieronder toont hoeveel geheugen één evaluatie effectief gebruikt. Elk getal is de piek van één evaluatie op een productieserver, gemeten in het slechtste geval waarin de bestanden van de judge nog niet in het geheugen zaten.

| Judge | Piekgeheugen |
| --- | --- |
| Python (`judge-pythia`) | 50 MB |
| Bash | 29 MB |
| HTML | 46 MB |
| Prolog | 52 MB |
| SQL | 133 MB |
| Java | meer dan 100 MB |
| C# | 162 MB |
| R | 155 MB |
| Scheme | 220 MB |
| Haskell | 250 MB |

Oefeningen die TESTed gebruiken hebben wat meer nodig, omdat TESTed testcode genereert en compileert:

| Programmeertaal in TESTed | Piekgeheugen |
| --- | --- |
| Python | 105 MB |
| C# | 215 MB |
| C++ | 300 MB |
| Kotlin | 433 MB |

Elk van deze waarden ligt ruim onder de limiet die erop van toepassing is. Voor een gewone oefening moet je dus niets instellen.

## Waarom een lagere limiet onbetrouwbaar is

De limiet geldt voor alles wat de evaluatie inleest, niet alleen voor het programma van je student. Een judge starten betekent dat de runtime van de programmeertaal ingeladen wordt, dus de compiler, de interpreter en de standaardbibliotheek, en daarbovenop de judge zelf. Dat telt allemaal mee voor dezelfde limiet. In de praktijk heeft een evaluatie ongeveer twee tot drie keer zoveel geheugen nodig als wat de code van de student op zich gebruikt.

Als het totaal niet in de limiet past, wordt de evaluatie meestal **niet** afgebroken met een foutmelding. Het systeem gooit de bestanden van de judge weg om plaats te maken, en moet diezelfde bestanden daarna telkens opnieuw van schijf lezen. De student krijgt nog altijd de juiste beoordeling, maar de evaluatie duurt drie tot twintig keer langer, en nergens in de feedback staat dat de geheugenlimiet de oorzaak is.

Of dat gebeurt, hangt bovendien af van wat de server er net daarvoor deed. Als een andere student kort daarvoor een oplossing indiende voor dezelfde judge, dan zitten de bestanden van die judge nog in het geheugen en verloopt de evaluatie snel. Zo niet, dan verloopt ze traag. Dezelfde oefening met dezelfde oplossing kan dus snel zijn voor de ene student en traag voor de andere.

Dit zijn metingen van correcte oplossingen die enkel verschillen in hun geheugenlimiet:

* Een correcte Haskell-oplossing duurde 50 seconden bij 100 MB en liep tegen de tijdslimiet aan. Bij 500 MB duurde diezelfde oplossing 3,7 seconden.
* Een Java `hello world` duurde 20,3 seconden bij 100 MB op een server die niet recent Java uitgevoerd had, en 6,3 seconden op een server die dat wel gedaan had.
* Een Kotlin-oefening op TESTed duurde 108 seconden bij 300 MB en 13 seconden bij 500 MB.

::: warning Een te lage limiet kan ook de feedback stukmaken
Bij een van de Haskell-evaluaties met 100 MB werd de uitvoer van de judge afgekapt zonder enige foutmelding. De student kreeg een onvolledige feedbacktabel te zien, zonder uitleg.
:::

## Kan ik de geheugenlimiet gebruiken om geheugengebruik te testen?

Nee. De geheugenlimiet meet niet hoe efficiënt je student zijn oplossing geschreven heeft.

De limiet wordt gedomineerd door de runtime van de programmeertaal, niet door de data van de student. Bij de meeste judges nemen de compiler, de interpreter en de standaardbibliotheek het grootste deel van het geheugen in, waardoor het verschil tussen een efficiënte en een inefficiënte oplossing wegvalt in de ruis. Daarbovenop hangt het resultaat af van de toestand van de server: dezelfde oplossing slaagt of faalt afhankelijk van welke oefeningen andere studenten net daarvoor indienden.

Wat wel werkt:

* **Test de efficiëntie in je testplan.** Als je oefening over efficiëntie gaat, test dat dan expliciet, bijvoorbeeld door de oplossing te testen op een grote invoer en het resultaat daarvan te controleren. Zo krijgt je student een duidelijke boodschap in plaats van een trage evaluatie.

## Wanneer je wel een hogere limiet nodig hebt

De limiet verhogen is de juiste keuze als je oefening echt meer geheugen nodig heeft dan de judge standaard voorziet, bijvoorbeeld omdat de evaluatie een grote dataset inleest. Je stelt de limiet in bytes in in de `config.json` van de oefening:

```json
{
  "evaluation": {
    "memory_limit": 750000000
  }
}
```

Het maximum is 1000 MB. Hou er rekening mee dat een server verschillende evaluaties tegelijk uitvoert, waardoor een hoge limiet niet gratis is: ze verlaagt het aantal oplossingen dat Dodona tegelijk kan evalueren. Verhoog de limiet dus enkel voor de oefeningen die het nodig hebben, en niet voor een hele repository.

## We verwijderen limieten die te laag zijn

De standaardwaarde lag vroeger lager, en de voorbeelden in onze documentatie bevatten vroeger een expliciete `memory_limit`. Daardoor namen veel oefeningen een waarde over die lager ligt dan wat hun judge nodig heeft. Dodona verwijdert die expliciete limieten nu uit de betrokken repositories, omdat de standaardwaarde al voor elke judge volstaat.

Als je niet bewust een waarde gekozen hebt, heb je geen `memory_limit` nodig in je configuratie. Als je wel bewust een waarde gekozen hebt omdat je oefening meer geheugen nodig heeft, dan blijft die waarde behouden.

Heb je vragen over de geheugenlimiet van een van je oefeningen? Neem gerust contact met ons op via <a href="mailto:support@dodona.be">support@dodona.be</a>.
