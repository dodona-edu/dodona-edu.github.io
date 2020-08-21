---
title: Oplossingen automatisch beoordelen
description: "Tutorial: oplossingen automatisch beoordelen"
---

# Oplossingen automatisch beoordelen

Voor elke judge in Dodona is er een git repository. Deze git repository moet aan een [voorgeschreven structuur ](#structuur-van-de-judge-repository) voldoen en de judge moet een [interface ](#judge-interface) aanbieden om in Dodona te passen. Een lijst van werkende judges kan [hier ]() gevonden worden. Wanneer je judge geschreven is moet deze [toegevoegd ](#een-judge-toevoegen) worden aan Dodona voor deze gebruikt kan worden voor oefeningen.

## Structuur van de judge repository

Het enige dat een judge repository moet hebben is een uitvoerbaar bestand `run` in de *root* van de repository. Dit bestand zal uitgevoerd worden in een docker container waar het de rest van de bestanden in de repository kan gebruiken. Optioneel kan de repository ook een `config.json` bestand bevatten in de *root*, [dat gebruikt wordt om configuratie opties te overschrijven ](#input)

## Judge interface

Een judge is in feite het `run` programma en interageert met Dodona door zijn standaard input en standaard output.

### Input

Het `run` programma moet JSON object accepteren waar de volgende waarden zullen inzitten:

**`memory_limit`**

<div class="indent">
Een geheel getal dat de geheugenlimiet in bytes voorstelt. De docker container zal afgesloten worden wanneer de interne processen deze limiet overschrijden. De judge kan deze waarde gebruiken om de testen vroegtijdig te stoppen, zodat er meer feedback naar de student kan gegeven worden dan de standaard boodschap "Geheugenlimiet overschreden".
</div>

**`time_limit`**

<div class="indent">
Een geheel getal dat de tijdslimiet in seconden voorstelt. Zoals voor de geheugenlimiet zal de docker container afgesloten worden wanneer deze tijdslimiet overschreden wordt. Ook hier kan deze waarde gebruikt worden om meer feedback te geven naar de student dan de standaard boodschap "Tijdslimiet overschreden".
</div>

Deze twee waarden kunnen overschreven en uitgebreid worden met andere *key-value* paren in de configuratie van de judge (de waarden in het `config.json` bestand). Daarna worden de waarden in het JSON object overschreven/uitgebreid met het `evaluation` subobject in de configuratie van de oefening.

Ten laatste wordt de waarden van het object nog uitgebreid/overschreven met de volgende *key-value* paren:

**`programming_language`**

<div class="indent">

De volledige naam van de programmeertaal (bvb. `"python"` of `"haskell"`) waarin de student haar code heeft geschreven.

</div>

**`natural_language`**

<div class="indent">

De natuurlijke taal waarin de student haar code heeft ingediend (bvb. `"nl"` of `"en"`).

</div>

**`resources`**

<div class="indent">

Volledig pad naar een map die extra bestanden bevat voor de evaluatie.

</div>

**`source`**

<div class="indent">

Volledig pad naar het bestand dat de code bevat dat de student heeft ingediend.

</div>

**`judge`**

<div class="indent">

Volledig pad naar een map die een kopie bevat van de judge repository.

</div>

**`workdir`**

<div class="indent">

Volledig pad naar de map waarin alle ingediende code zou moeten uitgevoerd worden.

</div>

Zie `creating_an_exercise`{.interpreted-text role="ref"} voor meer info over deze laatste mappen en bestanden.

### Output

Het `run` programma moet JSON uitschrijven (naar de standaard output). Deze
JSON zal door de feedback renderer geïnterpreteerd worden om de feedback tabel
te vormen. Er zijn twee output schemas beschikbaar. Het *full* output schema
moet een enkel JSON object schrijven na het beëindigen van de evaluatie. Het
tweede *partial* output schema moet meerdere kleine JSON objecten uitschrijven
tijdens de evaluatie die de voortgang beschrijven.

#### *Full* output

Het *full* output format wordt gespecifieerd door een
[JSON schema ](). Een meer beknopte beschrijving kan
hieronder gevonden worden. Merk op dat alle items gerenderd worden in de
volgorde zoals hieronder beschreven. Alle *keys* die een lijst voorstellen zijn
optioneel en hebben standaard de lege lijst als waarde.

Het *full* output schema schrijft een enkel JSON object uit na afloop van de
evaluatie. Deze feedback moet uitgeschreven worden voor de docker container geen
tijd of geheugen meer over heeft.

Een feedback JSON moet de volgende velden bevatten:
<div class="indent">

**`accepted`**

  <div class="indent">
  Een boolean die aangeeft of deze ingediende oplossing geslaagd is voor alle tests.
  </div>

 **`status`**

  <div class="indent">
  Een `Status` object.
  </div>

 **`description`**

  <div class="indent">
  Een string die de status iets vrijer kan beschrijven.
  </div>

 **`messages`**

  <div class="indent">
  Een lijst van `Message` objecten. Dit is het eerste dat aan de gebruiker zal getoond worden.
  </div>

 **`groups`**

  <div class="indent">
  Een lijst van `Tab` objecten die de zichtbare tabs definieren. Onafhankelijk van deze lijst zal er een "code" tab getoond worden die de ingediende oplossing bevat.
  </div>

  **`annotations`**

  <div class="indent">
  Een lijst van `Annotation` objects die gerbuikt worden om de ingediende code te annoteren.
  </div>
</div>

Een `Tab` object bevat de volgende velden:

<div class="indent">

**`description`**

<div class="indent">

Dit veld is optioneel. Deze string zal gebruikt worden als titel voor de tab (met als standaardwaard "Test").

</div>

**`badgeCount`**

<div class="indent">

Dit veld is optioneel. Dit geheel getal wordt getoond naast de titel als het aanwezig is en niet nul is. Gebruik dit enkel om het aantal fouten te tonen (falende testen/testcases, stijlproblemen, \...). Bij geen fouten (waarde 0 of het ontbreken van dit veld) zal er geen badge getoond worden om te vermijden dat de aandacht van de gebruiker getrokken wordt.

</div>

**`messages`**

<div class="indent">

Een lijst van `Message` objecten die in volgorde getoond worden bovenaan de tab als het veld aanwezig is.

</div>

**`groups`**

<div class="indent">

Een lijst van `Context` objecten die in volgorde getoond worden onderaan de tab als het veld aanwezig is.

</div>
</div>

Een `Context` object bevat de volgende velden:

<div class="indent">

**`accepted`**

<div class="indent">

Een boolean die aangeeft of deze context (dit kan een groepering zijn van testcases die in dezelfde context werden uitgevoerd) als correct beschouwd wordt. Dit wordt in de feedback getoond als een groene of rode bar links van de groep testscases.

</div>

**`description`**

<div class="indent">

Dit veld is optioneel. Dit moet een `Message` object zijn.

</div>

**`messages`**

<div class="indent">

Een lijst van `Message` objecten.

</div>

**`groups`**

<div class="indent">

Een lijst van `Testcase` objecten.

</div>
</div>

Een `Testcase` object bevan de volgende velden:

<div class="indent">

**`accepted`**

<div class="indent">

Een boolean die aangeeft of deze testcase (dit kan bijvoorbeeld een enkel statement zijn of een expressie) als correct beschouwd wordt. Dit wordt in de feedback getoond met een groen vinkje of een rood kruis aan de rechterkant van de testcase.

</div>

**`description`**

<div class="indent">

Dit veld is optioneel. Dit moet in de vorm van een `Message` object (waarschijnlijk een statement geformateerd als code).

</div>

**`tests`**

<div class="indent">

Een lijst van `Test` objecten.

</div>

**`messages`**

<div class="indent">

Een lijst van `Message` objecten.

</div>
</div>

Een `Test` object bevat de volgende velden:

<div class="indent">

**`description`**

<div class="indent">

Dit veld is optioneel. Dit moet een `Message` object zijn.

</div>

**`accepted`**

<div class="indent">

Een boolean die aangeeft of de test correct is. Bij `true` wordt enkel de `generated` string getoond, bij `false` wordt een diff tussen de `generated` en `expected` strings getoond.

</div>

**`generated`**

<div class="indent">

Een string die de output van de gebruiker bevat.

</div>

**`expected`**

<div class="indent">

Een string die de output bevat die de gebruiker had moeten genereren. Deze string wordt enkel gebruikt wanneer de oefening niet `accepted` is.

</div>

**`messages`**

<div class="indent">

Een lijst van `Message` objecten.

</div>
</div>

Een `Annotation` object bevat de volgende velden:

<div class="indent">

**`row`**

<div class="indent">

Een nul-gebaseerde index die de (eerste) geannoteerde lijn aangeeft.

</div>

**`column`**

<div class="indent">

Dit veld is optioneel. Het bevat een nul-gebaseerde index voor het (eerste) geannoteerde karakter op `row`.

</div>

**`text`**

<div class="indent">

Een string die de annotatie bevat.

</div>

**`type`**

<div class="indent">

Een string die de prioriteit van de annotatie aangeeft. Dit moet `"info"`, `"warning"` of `"error"` zijn.

</div>

**`rows`**

<div class="indent">

Dit veld is optioneel. Dit is de nulgebaseerde index van de laatste lijn van de annotatie.

</div>

**`columns`**

<div class="indent">

Dit veld is optioneel. Dit is de nulgebaseerde index van het laatste karakter van de annotatie.

</div>
</div>

Een `Message` object is oftewel gewoon een string of een object met de volgende velden:

<div class="indent">

**`format`**

<div class="indent">

Dit beschrijft het format waarin de boodschap gerenderd moet worden. Dit format moet een van de volgende waarden zijn:

-   `"plain"`: Dit zal de boodschap als normale tekst renderen.
-   `"html"`: Dit zal de boodschap als HTMl injecteren.
-   `"markdown"`: Dit zal de string als markdown interpreteren en naar HTML converteren.
-   `"code"`: Dit zal de boodschap in monospace renderen en alle witruimte behouden.
-   `"python"`: Dit is hetzelfde als `"code"` maar dan met Python syntax highlighting.
-   `"javascript"`: Dit is hetzelfde als `"code"` maar dan met JavaScript syntax highlighting.

</div>

**`description`**

<div class="indent">

De eigenlijke tekst van de boodschap als een string.

</div>

**`permission`**

<div class="indent">

Een string die specifieert wie deze boodschap kan zijn. Dit moet een van de volgende waarden zijn:

-   `"student"`: Dit maakt de boodschap zichtbaar voor iederen.
-   `"staff"`: Dit maakt de boodschap zichtbaar voor medewerkers (voor bijvoorbeeld judge debug output)
-   `"zeus"`: Dit maakt de boodschap enkel zichtbaar voor de administrator (voor bijvoorbeeld applicatie debug output)

</div>
</div>

Een `Status` string geeft de status van de ingediende oplossing aan. Deze status kan opgedeeld worden in twee categorieën:

<div class="indent">
- Beschikbaar voor output door de judge:

  <div class="indent">

  `"compilation error"`

   <div class="indent">

   De ingediende code compileerde niet.

   </div>

  `"runtime error"`

   <div class="indent">

   De ingediende code crasht tijdens het testen.

   </div>

  `"time limit exceeded"`

   <div class="indent">

   De ingediende code kon de testen niet afwerken tijdens de tijdslimiet.

   </div>

  `"wrong"`

   <div class="indent">

   De ingediende code heeft de testen kunnen afmaken maar gaf niet altijd het juiste antwoord.

   </div>

  `"correct"`

   <div class="indent">

   De ingediende code heeft de testen kunnen afmaken en gaf telkens het juiste antwoord.

   </div>
  </div>
</div>

-   Waarden die enkel door Dodona gebruikt worden:

<div class="indent">

**`"queued"`**

<div class="indent">

De ingediende code staat in de wachtrij om getest te worden.

</div>

**`"running"`**

<div class="indent">

De judge is de testen momenteel aan het uitvoeren.

</div>

**`"internal error"`**

<div class="indent">

De judge is gestopt met een niet-nul status code.

</div>

**`"unknown"`**

<div class="indent">

Er is iets misgelopen.

</div>
</div>

![image](./judge-output.png)

#### *Partial* output

De *partial* output bestaat uit meerdere kleinere JSON objecten, gevalideerd
door [dit JSON schema ](). Elk JSON
object beschrijft een deel van het testen. Een voorbeeld kan hieronder gevonden
worden.
:

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

Omdat het format in kleinere berichten is opgesplitst kan het gedeeltelijk geparsed worden. Dit betekent dat een judge die afgesloten wordt door de tijds-of geheugenlimiet voor een deel van de oefening nog feedback kan geven.

Merk op dat het nesten van tabs, contexts, testcases en testen afgedwongen wordt. `Message` objecten kunnen op elk niveau gezonden worden.

## Een judge toevoegen

Als medewerker van Dodona kan je een Judge toevoegen. Ga naar de "Judges" pagina via de adminstrator dropdown. Klik op de `+` knop om een nieuwe judge toe te voegen. Geef een naam, de naam van de Docker image waar de judge in gedraaid moet worden, de git clone url, de feedback renderer en de submission runner in.

## Feedback renderers

Momenteel zijn er twee mogelijke feedback renderers beschikbaar: de *FeedbackRenderer* en de *PythiaFeedbackRenderer*. De eerste wordt aangeraden aangezien de tweede enkele features bevat specifiek voor de Pythia judge.

## Submission renderers

Momenteel zijn er twee mogelijke submission renderers beschikbaar: de *SubmissionRunnner* en de *PythiaSubmissionRenderer*. De eerste wordt aangeraden aangezien de tweede enkele features bevat specifiek voor de Pythia judge.
