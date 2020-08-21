---
title: Een nieuwe judge maken
description: "Tutorial: een nieuwe judge maken"
---

# Een nieuwe judge maken

::: warning
Dit is een geavanceerde handleiding bedoeld voor developers. Je zal de informatie op deze pagina waarschijnlijk niet nodig hebben. Als je van plan bent op een judge te maken, neem alstublieft contact met ons op <a href="mailto:dodona@ugent.be">dodona@ugent.be</a>.
:::

Voor elke judge in Dodona is er een git repository. Deze git repository moet aan een [voorgeschreven structuur ](#_2-repository-structuur) voldoen en de judge moet een [interface ](#_3-judge-interface) aanbieden om in Dodona te passen. Wanneer je judge geschreven is moet deze [toegevoegd](#_1-een-judge-toevoegen) worden aan Dodona voor deze gebruikt kan worden voor oefeningen.

## 1. Een judge toevoegen

Als medewerker van Dodona kan je een Judge toevoegen. Ga naar de "Judges" pagina via de "Admin" hoofding in het hamburger menu. Klik op de `+` knop om een nieuwe judge toe te voegen. Geef een naam, de naam van de Docker image waarin de judge zou moeten runnen, de git clone url, het padnaam (waar de repository op de server relatief met de folder waarin alle judges zitten, meestal de naam van het repository, let wel op dat die uniek moet zijn) en de [feedback renderer](#_4-feedback-renderers).

## 2. Repository structuur

Het enige dat een judge repository moet hebben is een uitvoerbaar bestand `run` in de *root* van de repository. Dit bestand zal uitgevoerd worden in een docker container waar het de rest van de bestanden in de repository kan gebruiken. Optioneel kan de repository ook een `config.json` bestand bevatten in de *root*, [dat gebruikt wordt om configuratie opties te overschrijven ](#input)

## 3. Judge interface

Een judge is in feite het `run` programma en interageert met Dodona door zijn standaard input en standaard output.

### Input

Het `run` programma moet JSON object accepteren waar de volgende waarden zullen inzitten:

- **memory_limit**: Een geheel getal dat de geheugenlimiet in bytes voorstelt. De docker container zal afgesloten worden wanneer de interne processen deze limiet overschrijden. De judge kan deze waarde gebruiken om de testen vroegtijdig te stoppen, zodat er meer feedback naar de student kan gegeven worden dan de standaard boodschap "Geheugenlimiet overschreden".


- **time_limit**: Een geheel getal dat de tijdslimiet in seconden voorstelt. Zoals voor de geheugenlimiet zal de docker container afgesloten worden wanneer deze tijdslimiet overschreden wordt. Ook hier kan deze waarde gebruikt worden om meer feedback te geven naar de student dan de standaard boodschap "Tijdslimiet overschreden".


Deze twee waarden kunnen overschreven en uitgebreid worden met andere *key-value* paren in de configuratie van de judge (de waarden in het `config.json` bestand). Daarna worden de waarden in het JSON object overschreven/uitgebreid met het `evaluation` subobject in de configuratie van de oefening.

Ten laatste wordt de waarden van het object nog uitgebreid/overschreven met de volgende *key-value* paren:

- **programming_language**: De volledige naam van de programmeertaal (bvb. `"python"` of `"haskell"`) waarin de student haar code heeft geschreven.
- **natural_language**: De natuurlijke taal waarin de student haar code heeft ingediend (bvb. `"nl"` of `"en"`).
- **resources**: Volledig pad naar een map die extra bestanden bevat voor de evaluatie.
- **source**: Volledig pad naar het bestand dat de code bevat dat de student heeft ingediend.
- **judge**: Volledig pad naar een map die een kopie bevat van de judge repository.
- **workdir**: Volledig pad naar de map waarin alle ingediende code zou moeten uitgevoerd worden.

### Output

Het `run` programma moet JSON uitschrijven (naar de standaard output). Deze
JSON zal door de feedback renderer geïnterpreteerd worden om de feedback tabel
te vormen. Er zijn twee output schemas beschikbaar. Het *full* output schema
moet een enkel JSON object schrijven na het beëindigen van de evaluatie. Het
tweede *partial* output schema moet meerdere kleine JSON objecten uitschrijven
tijdens de evaluatie die de voortgang beschrijven.

#### *Full* output

Het *full* output format wordt gespecifieerd door een
[JSON schema](https://github.com/dodona-edu/dodona/tree/develop/public/schemas). Een meer beknopte beschrijving kan hieronder gevonden worden. Merk op dat alle items gerenderd worden in de volgorde zoals hieronder beschreven. Alle *keys* die een lijst voorstellen zijn optioneel en hebben standaard de lege lijst als waarde.

Het *full* output schema schrijft een enkel JSON object uit na afloop van de evaluatie. Deze feedback moet uitgeschreven worden voor de docker container geen tijd of geheugen meer over heeft.

- Een feedback JSON moet de volgende velden bevatten:
  - `accepted`: Een boolean die aangeeft of deze ingediende oplossing geslaagd is  voor alle tests.
  - `status`: Een `Status` object.
  - `description`: Een string die de status iets vrijer kan beschrijven.
  - `messages`: Een lijst van `Message` objecten. Dit is het eerste dat aan de  gebruiker zal getoond worden.
  - `groups`: Een lijst van `Tab` objecten die de zichtbare tabs definieren.  Onafhankelijk van deze lijst zal er een "code" tab getoond worden die de ingediende  oplossing bevat.
  - `annotations`: Een lijst van `Annotation` objects die gerbuikt worden om de ingediende code te annoteren.
  

- Een `Tab` object bevat de volgende velden:


- `description`: 
Dit veld is optioneel. Deze string zal gebruikt worden als titel voor de tab (met als standaardwaard "Test").

- `badgeCount`: Dit veld is optioneel. Dit geheel getal wordt getoond naast de titel als het aanwezig is en niet nul is. Gebruik dit enkel om het aantal fouten te tonen (falende testen/testcases, stijlproblemen, \...). Bij geen fouten (waarde 0 of het ontbreken van dit veld) zal er geen badge getoond worden om te vermijden dat de aandacht van de gebruiker getrokken wordt.

- `messages`: Een lijst van `Message` objecten die in volgorde getoond worden bovenaan de tab als het veld aanwezig is.

- `groups`: Een lijst van `Context` objecten die in volgorde getoond worden onderaan de tab als het veld aanwezig is.

Een `Context` object bevat de volgende velden:


- `accepted`: Een boolean die aangeeft of deze context (dit kan een groepering zijn van testcases die in dezelfde context werden uitgevoerd) als correct beschouwd wordt. Dit wordt in de feedback getoond als een groene of rode bar links van de groep testscases.

- `description`: Dit veld is optioneel. Dit moet een `Message` object zijn.

- `messages`: Een lijst van `Message` objecten.

- `groups`: Een lijst van `Testcase` objecten.

Een `Testcase` object bevan de volgende velden:


- `accepted`: Een boolean die aangeeft of deze testcase (dit kan bijvoorbeeld een enkel statement zijn of een expressie) als correct beschouwd wordt. Dit wordt in de feedback getoond met een groen vinkje of een rood kruis aan de rechterkant van de testcase.

- `description`: Dit veld is optioneel. Dit moet in de vorm van een `Message` object (waarschijnlijk een statement geformateerd als code).

- `tests`: Een lijst van `Test` objecten.

- `messages`: Een lijst van `Message` objecten.

Een `Test` object bevat de volgende velden:

- `description`: Dit veld is optioneel. Dit moet een `Message` object zijn.

- `accepted`: Een boolean die aangeeft of de test correct is. Bij `true` wordt enkel de `generated` string getoond, bij `false` wordt een diff tussen de `generated` en `expected` strings getoond.

- `generated`: Een string die de output van de gebruiker bevat.

- `expected`: Een string die de output bevat die de gebruiker had moeten genereren. Deze string wordt enkel gebruikt wanneer de oefening niet `accepted` is.

- `messages`: Een lijst van `Message` objecten.

- Een `Annotation` object bevat de volgende velden:


- `row`: Een nul-gebaseerde index die de (eerste) geannoteerde lijn aangeeft.
- `column`: Dit veld is optioneel. Het bevat een nul-gebaseerde index voor het (eerste) geannoteerde karakter op `row`.
- `text`: Een string die de annotatie bevat.
- `type`: Een string die de prioriteit van de annotatie aangeeft. Dit moet `"info"`, `"warning"` of `"error"` zijn.
- `rows`: Dit veld is optioneel. Dit is de nulgebaseerde index van de laatste lijn van de annotatie.
- `columns`: Dit veld is optioneel. Dit is de nulgebaseerde index van het laatste karakter van de annotatie.

- Een `Message` object is oftewel gewoon een string of een object met de volgende velden:


  - `format`: Dit beschrijft het format waarin de boodschap gerenderd moet worden. Dit format moet een van de volgende waarden zijn:

    -   `"plain"`: Dit zal de boodschap als normale tekst renderen.
    -   `"html"`: Dit zal de boodschap als HTMl injecteren.
    -   `"markdown"`: Dit zal de string als markdown interpreteren en naar HTML     converteren.
    -   `"code"`: Dit zal de boodschap in monospace renderen en alle witruimte behouden.
    -   `"python"`: Dit is hetzelfde als `"code"` maar dan met Python syntax highlighting.
    -   `"javascript"`: Dit is hetzelfde als `"code"` maar dan met JavaScript syntax     highlighting.

  - `description`: De eigenlijke tekst van de boodschap als een string.
  - `permission`: Een string die specifieert wie deze boodschap kan zijn. Dit moet een   van de volgende waarden zijn:

    -   `"student"`: Dit maakt de boodschap zichtbaar voor iederen.
    -   `"staff"`: Dit maakt de boodschap zichtbaar voor medewerkers (voor bijvoorbeeld     judge debug output)
    -   `"zeus"`: Dit maakt de boodschap enkel zichtbaar voor de administrator (voor     bijvoorbeeld applicatie debug output)

Een `Status` string geeft de status van de ingediende oplossing aan. Deze status kan opgedeeld worden in twee categorieën:

- Beschikbaar voor output door de judge:
  - `"compilation error"`: De ingediende code compileerde niet.
  - `"runtime error"`: De ingediende code crasht tijdens het testen.
  - `"time limit exceeded"`: De ingediende code kon de testen niet afwerken tijdens de tijdslimiet.
  - `"wrong"`: De ingediende code heeft de testen kunnen afmaken maar gaf niet altijd het juiste antwoord.
  - `"correct"` :De ingediende code heeft de testen kunnen afmaken en gaf telkens het juiste antwoord.


- Waarden die enkel door Dodona gebruikt worden:
  - `"queued"`: De ingediende code staat in de wachtrij om getest te worden.
  - `"running"`: De judge is de testen momenteel aan het uitvoeren.
  - `"internal error"`: De judge is gestopt met een niet-nul status code.
  - `"unknown"`: Er is iets misgelopen.

![image](./judge-output.png)

#### *Partial* output

De *partial* output bestaat uit meerdere kleinere JSON objecten, gevalideerd door [dit JSON schema ](). Elk JSON object beschrijft een deel van het testen. Een voorbeeld kan hieronder gevonden worden.

```json
    { "command": "start-judgement" }
    { "command": "append-message", "message": "will be added to the judgement" }
    { "command": "annotate", "row": 3, "column": 4, "text": "some info on the fourth line, fifth column of the source" }
    { "command": "start-tab", "title": "Tab One" }
    { "command": "start-context" }
    { "command": "start-testcase", "description": "case 1" }
    { "command": "start-test", "expected": "SOMETHING" }
    { "command": "append-message", "message": "some more info about the test" }
    { "command": "close-test", "generated": "SOMETHING", "status": { "enum": "correct", "human": "Correct" } }
    { "command": "close-testcase" }
    { "command": "close-context" }
    { "command": "start-context" }
    { "command": "start-testcase", "description": "case 2" }
    { "command": "start-test", "expected": "SOMETHING" }
    { "command": "close-test", "generated": "ELSE", "status": { "enum": "wrong", "human": "Wrong" } }
    { "command": "close-testcase" }
    { "command": "close-context" }
    { "command": "close-tab" }
    { "command": "close-judgement" }
```

Omdat het format in kleinere berichten is opgesplitst kan het gedeeltelijk geparsed worden. Dit betekent dat een judge die afgesloten wordt door de tijds-of geheugenlimiet voor een deel van de oefening nog feedback kan geven.

Merk op dat het nesten van tabs, contexts, testcases en testen afgedwongen wordt. `Message` objecten kunnen op elk niveau gezonden worden.

## Feedback renderers

Momenteel zijn er twee mogelijke feedback renderers beschikbaar: de *FeedbackRenderer* en de *PythiaFeedbackRenderer*. De eerste wordt aangeraden aangezien de tweede enkele features bevat specifiek voor de Pythia judge.

## Submission renderers

Momenteel zijn er twee mogelijke submission renderers beschikbaar: de *SubmissionRunnner* en de *PythiaSubmissionRenderer*. De eerste wordt aangeraden aangezien de tweede enkele features bevat specifiek voor de Pythia judge.
