---
title: Referentie voor DSL-testplannen
description: "Schrijf eenvoudig testplannen voor TESTed"
order: 2
---

# Referentie voor DSL-testplannen

Een testplan voor TESTed legt vast welke testgevallen uitgevoerd worden op een ingediende oplossing.
TESTed verschilt van andere judges doordat testplannen niet afhankelijk zijn van één bepaalde programmeertaal.
Derhalve volstaat één testplan om ingediende oplossingen in verschillende programmeertalen van dezelfde oefening te evalueren.

Naast het [geavanceerde formaat](/nl/references/tested/json) voor testplannen hebben we ook een kleine domeinspecifieke taal (_domain-specific language_, DSL) ontwikkeld om het schrijven van testplannen makkelijker te maken.
Dit document is de referentiegids voor het formaat van DSL-testplannen en bevat alle opties en mogelijkheden.

[//]: # (We hebben ook een reeks tutorials waar we uitleggen hoe een bepaalde soort oefening opgesteld moet worden.)

DSL-testplannen worden geschreven in YAML.
Een JSON Schema van het formaat is beschikbaar in de repository van TESTed.
Dit schema kan zorgen voor automatische controles en automatisch aanvullen in uw tekstverwerker.

## Structuur en opbouw

De structuur van een DSL-testplan volgt de algemene structuur van testen in Dodona, en bestaat uit drie niveaus:

1. [Tabs](#tabs)
2. [Contexten](#contexten)
3. [Testgevallen](#testgevallen)

In de rest van de paragraaf beschrijven we elk niveau.
Verplichte attributen worden aangeduid met een ster (*).
Op het [eind van dit document](#volledig-voorbeeld) staat een volledig voorbeeld.

### Top van het testplan

Een testplan start met ofwel een lijst van [tabs](#tabs), ofwel een object.
Dat object heeft drie attributen:

- `tabs`*: een lijst van [tab](#tabs)-objecten
- `namespace`: de "namespace" voor de code van de ingediende oplossing, zoals de klassennaam in Java.
- `config`: de globale [configuratieopties](#configuratieopties)
- `language`: de [programmeertaal van de expressies en statements](#taalspecifieke-expressies-en-statements). Als dit attribuut niet op `"tested"` staat, zullen alle expressies en statements (uitgezonderd returnwaarden) een programmeertaalspecifieke expressie of statement zijn.

### Tabs

Een tab-object komt overeen met een tab in de uitvoer op Dodona.
Het heeft vier mogelijke attributen:

- `tab`*: de naam van de tab die getoond wordt in Dodona
- `contexts`*: een lijst van [contexten](#contexten) (als dit gebruikt wordt, mag het attribuut `testcases` niet
  gebruikt worden)
- `testcases`*: een lijst van [testgevallen](#testgevallen) (als dit gebruikt wordt, mag het attribuut `contexts` niet
  gebruikt worden)
- `config`: de [configuratieopties](#configuratieopties) voor deze tab en al zijn kinderen

In veel oefeningen is er precies een testgeval per context.
Dat is exact wat het attribuut `testcases` toelaat: achter de schermen zal elk testgeval in een eigen context geplaatst worden.

:::tip Hint
Hoewel er vier mogelijke attributen zijn, zal elk tab-object hoogstens drie attributen hebben, want `contexts` en `testcases` kunnen niet samen gebruikt worden.
:::

### Contexten

Een context is een groep testgevallen die afhankelijk zijn van elkaar.
Het context-object heeft drie attributen:

- `testcases`*: een lijst van [testgevallen](#testgevallen)
- `config`: de [configuratieopties](#configuratieopties) voor deze context en al zijn kinderen
- `context`: een optionele beschrijving van de context
- `files`: een optionele lijst van [bestanden](#bestanden)

In de meeste gevallen is aangewezen om de beschrijving leeg te laten.

Elke context heeft minstens één testgeval.
Omdat elke context apart wordt uitgevoerd, zijn de volgende beperkingen van toepassing:

- Enkel het eerste testgeval mag de "_main
  call_" bevatten, bijvoorbeeld met argumenten voor de commandoregel of standaardinvoer.
- Enkel het laatste testgeval met de test bevatten voor de exitcode.

Merk op dat het eerste en laatste testgeval wel hetzelfde testgeval kunnen zijn:
als er maar een testgeval is, kan het zowel de _main call_ als de test voor de exitcode bevatten.

### Testgevallen

Testgevallen zijn de bouwstenen van een testplannen, en bevatten de invoer en de verwachte uitvoer (de _testen_).
Binnen dezelfde context zijn de volgende beperkingen van toepassing:

- Enkel het eerste testgeval mag de _main call_ bevatten, bijvoorbeeld met argumenten voor de commandoregel of standaardinvoer.
- Enkel het laatste testgeval met de test bevatten voor de exitcode.

Merk op dat het eerste en laatste testgeval wel hetzelfde testgeval kunnen zijn:
als er maar een testgeval is, kan het zowel de _main call_ als de test voor de exitcode bevatten.

Een testgeval-object kan de volgende attributen hebben:

- `config`: de [configuratieopties](#configuratieopties) voor dit testgeval en al zijn kinderen
- `files`: een optionele lijst van [bestanden](#bestanden)

Daarnaast kan een testgeval ook de attributen die hieronder beschreven worden hebben, maar merk op:

- Een testgeval kan slechts één "invoer" hebben, wat betekent dat de attributen `arguments`/`stdin`, `expression` en `statement` niet tegelijk gebruikt kunnen worden.
- Het attribuut `return` werkt enkel met een `expression`.

#### `stdin`

De gegevens voor [standaardinvoer](https://nl.wikipedia.org/wiki/Standaardstromen).

Als dit attribuut gebruikt wordt, kunnen `expression` en `statement` niet meer gebruikt worden als invoer,
noch kan `return` als test gebruikt worden.

#### `arguments`

Een lijst van strings die als argumenten via de [commandoregel](https://nl.wikipedia.org/wiki/Command-line-interface) aan het programma doorgegeven worden.

Als dit attribuut gebruikt wordt, kunnen `expression` en `statement` niet meer gebruikt worden als invoer,
noch kan `return` als test gebruikt worden.

#### `expression` / `statement`

Deze attributen kunnen twee waarden aannemen: een string of een object.

Bij een string bevat het de te evalueren expressie of het uit te voeren statement in dit testgeval.
Bij een statement wordt de eventuele returnwaarde genegeerd, bij een expressie niet.
Expressies en statements gebruiken de syntaxis van Python, met een aantal beperkingen, die we [hier](#expressies-en-statements) beschrijven.

Is de waarde een object, dan moet het een object zijn met als sleutel een programmeertaal en als waarde een [taalspecifieke expressie of statement](#taalspecifieke-expressies-en-statements).

```yaml
return:
  python: "submission.the_function()"
  java: "Submission.theFunction()"
```

#### `stdout` / `stderr`

Specifieert het verwachte resultaat op respectievelijk standaarduitvoer (_stdout_) en standaardfout (_stderr_).

De waarde van het attribuut is ofwel een string (dat dan het verwachte resultaat is), of een object voor meer complexe situaties.
Het object heeft volgende attributen:

- `data`: het verwachte resultaat, zoals bij het gebruik van een string
- `config`: the [configuratieopties](#testopties)

#### `exception`

Specifieert het verwachte bericht van een verwachte uitzondering of fout (een _exception_).
Merk op dat TESTed momenteel niet kan oordelen over het soort of type van de fout.
Het is bijvoorbeeld niet mogelijk om te controleren of een _assertion error_ gebruikt is.

#### `return`

Specifieert de verwachte returnwaarde.

Standaard wordt de returnwaarde beschouwd als een YAML-waarde.
Een string in het testplan zal dus ook een string worden in de testcode.

Voor geavanceerde returnwaarden zijn er twee opties:

- Een string met de tag `!expression` gebruikt het dezelfde Python-syntaxis te gebruiken als voor de [expressies en statements](#expressies-en-statements).
- Een object met de tag `!oracle` is het object voor een eigen orakel.

#### `exit_code`

Specifieert de verwachte exitcode van het programma.

Enkel het laatste testgeval in een context kan dit attribuut hebben, maar het laatste testgeval kan ook het eerste zijn als er maar één testgeval is.

### Eigen checkfuncties (orakels)

De volgende attributen kunnen een eigen checkfunctie gebruiken: `return`, `stdout` en `stderr`.

Een object voor een checkfunctie bestaat uit de volgende attributen:

- `oracle`: het soort checkfunctie. Momenteel kan dit enkel `custom_check` of `builtin` zijn. `builtin` gebruikt de ingebouwde checkfuncties.
- `value` (bij `return`) of `data` (bij `stdout`/`stderr`): de verwachte waarde
- `file`: de naam van het bestand waarin de checkfunctie zit (relatief ten opzichte van de map `evaluation`)
- `name`: de naam van de checkfunctie (in snake case)
- `language`: de programmeertaal waarin de checkfunctie geschreven is. `python` is hier de beste keuze door performantieredenen.
- `arguments`: een lijst van [waarden](#expressies-en-statements) die als argumenten aan de checkfunctie gegeven worden

Voor een returnwaarde:

```yaml
return:
  value: "'27-08-2023'"
  oracle: "custom_check"
  language: "python"
  file: "test.py"
  name: "evaluate_test"
  arguments: [5, 6]
```

De checkfunctie moet de volgende signatuur hebben:

```python
def checkfunctie(verwacht, gegenereerd, *) -> EvaluationResult
```

- Het eerste argument bevat de verwachte waarde (van het attribuut `value`/`data` uit het testplan).
- Het tweede argument bevat de gegenereerde waarde.
- De overige argumenten zijn dezelfde als in het attribuut `arguments` uit het testplan.

De returnwaarde is een klasse van het type `EvaluationResult` (of een struct of object, afhankelijk van de programmeertaal).
De constructor van deze klasse heeft zes mogelijke parameters:

1. `result`: Een boolean die aangeeft of de waarde uit de oplossing juist is of niet.
2. `readable_expected`, optioneel: De verwachte waarde om te tonen op Dodona.
3. `readable_actual`, optioneel: De gegenereerde waarde om te tonen op Dodona.
4. `messages`, optioneel: Een lijst van berichten (`Message`s of strings). Deze berichten worden ook getoond op Dodona en kunnen gebruikt worden om bijkomende feedback of uitleg aan de studenten te geven.
5. `dsl_expected`, optioneel: De verwachte waarde als [stringwaarde](#expressies-en-statements). TESTed zal dit omzetten naar de programmeertaal van de oplossing bij het tonen op Dodona.
6. `dsl_actual`, optioneel: De eigenlijke waarde als [stringwaarde](#expressies-en-statements). TESTed zal dit omzetten naar de programmeertaal van de oplossing bij het tonen op Dodona.

In de meeste gevallen, en zeker bij het opstellen van programmeertaalonafhankelijke oefeningen, is het beter om `dsl_expected` en `dsl_actual` te gebruiken: anders is de checkfunctie zelf verantwoordelijk om de verwachte en eigenlijke waarde in de juiste programmeertaal te tonen.

De lijst van berichten moet een lijst van strings of `Message`s zijn.
Een `Message` heeft de volgende waarden:

1. `description`: het bericht om te tonen.
2. `format`: het formaat van het bericht, zoals `text`, `code` en `html`.
3. `permission`: wie het bericht kan zien: `staff`, `student` of `zeus`.

Concreet in Python wordt dit:

```python
def evaluate_test(expected, actual):
    return EvaluationResult(
      result=True,
      dsl_expected=repr("hallo"),
      dsl_actual=repr("hallo"),
      messages=[Message(
        description="Hallo",
        format="html",
        permission="staff"
      )]
    )
```

### Bestanden

Soms zijn parameters of andere strings de naam van een bestand.
Als die bestanden een snelkoppeling naar het eigenlijke bestand moeten worden, dan moet er een lijst van bestanden meegegeven worden.
Elk object in die lijst heeft twee attributen:

- `name`: de naam van het bestand zoals het voorkomt in de invoer
- `url`: de locatie waar de snelkoppeling naar moet wijzen, relatief ten opzicht van de map van de oefening.

## Configuratieopties

Het configuratie-object kan op elk niveau gebruikt worden en zal ook van toepassing zijn op alle onderliggende niveaus.
Een configuratie-object op tabniveau gebruiken zal er bijvoorbeeld voor zorgen dat die configuratie ook van toepassing is op alle contexten, en uiteindelijk ook op alle testgevallen in die tab.

Een configuratie-object kan volgende attributen hebben:

- `stdout`: de [configuratieopties](#testopties) voor standaarduitvoer (_stdout_)
- `stderr`: de [configuratieopties](#testopties) voor standaardfout (_stderr_)
- `return`: de [configuratieopties](#testopties) voor de verwachte returnwaarde

### Testopties

Dit object bevat een aantal configuratieopties die invloed hebben op hoe de testresultaten beoordeeld worden door TESTed.
De volgende opties zijn beschikbaar:

- `applyRounding`: pas afronding toe als waarden als vlottendekommagetal vergeleken worden
- `roundTo`: het aantal cijfers om op af te ronden, als `applyRouding` gebruikt wordt
- `caseInsensitive`: negeer hoofdletters en kleine letters bij het vergelijken van strings
- `ignoreWhitespace`: negeer witruimte aan het begin en einde
- `tryFloatingPoint`: probeer tekst eerst als vlottendekommagetal te vergelijken

## Expressies en statements

In een testplan worden expressies en statements als YAML-strings geschreven, gebruik makende van de syntaxis van Python.
Een functieoproep met het argument `"hello"` wordt bijvoorbeeld:

```yaml
expression: "a_function_name('hello')"
```

Aangezien de syntaxis van Python voor een aantal zaken van TESTed geen aparte syntaxis heeft, zijn er aantal conventies:

- Functieoproepen wier naam begint met een hoofdletters worden beschouwd als
  _constructors_, bijvoorbeeld `Constructor(56)`.
- Identifiers die volledig in hoofdletters geschreven zijn worden beschouwd als globale constanten, bijvoorbeeld `VERY_LONG_NAME`.
- Het casten van waarden gebeurt op de gebruikelijke manier van Python. Het casten van een getal naar `int64` wordt bijvoorbeeld `int64(56)`.

Bijkomend worden grote delen van de syntaxis niet ondersteund, daar TESTed enkel beperkte ondersteuning heeft voor expressies en statements.
Volgende zaken worden ondersteund:

- Eenvoudige waarden, zoals `5`, `-9.3` of `"Hello world"`.
- Complexe waarden, zoals `[5, 6, 7]`, `{5, "Hello"}` of `{"key": "value"}`.
- Functieoproepen, inclusief _named parameters_, zoals `the_function(5, named=6)`.
  Merk op dat de _named
  parameters_ omgezet worden naar normale parameters op basis van hun positie in programmeertalen die geen ondersteuning hebben voor
  _named parameters_.
- Constructors (middels onze conventie).
- Declareren en toewijzen van variabelen (_assignments_), zoals `some_variable = 5`.
- Refereren naar variabelen, zoals `the_function(some_variable)`.

Noemenswaardige weglatingen zijn alle soorten van functie- of klassendefinities, alsook alle operatoren.

## Taalspecifieke expressies en statements

Als taalspecifieke expressies of statements gebruikt worden (hetzij door globaal de taal in te stellen, hetzij door een object te gebruiken bij een attribuut `expression` of `statement`), zal de string letterlijk in de testcode geplakt worden.

Dit heeft als voordeel dat alle taalfaciliteiten van de programmeertaal gebruikt kunnen worden.
Anderzijds zorgt dit ervoor dat een oefening niet meer programmeertaalonafhankelijk is, moet je zelf de juiste namespace gebruiken en zal dit niet werken bij functies met returntype `void`.

Aangezien TESTed geen analyse van deze strings kan doen, is het nodig om zelf de `namespace` te gebruiken.
Dit is de naam van de ingediende oplossing of klasse (instelbaar met het attribuut [`namespace`](#top-van-het-testplan)).
Deze naam is programeertaalafhankelijk:

```yaml
- tab: "My tab"
  testcases:
  - expression:
      c: "to_string(1+1)"
      haskell: "Submission.toString (1+1)"
      runhaskell: "Submission.toString (1+1)"
      java: "Submission.toString(1+1)"
      javascript: "submission.toString(1+1)"
      kotlin: "toString(1+1)"
      python: "submission.to_string(1+1)"
      csharp: "Submission.toString(1+1)"
    return: "2"
```


## Ondersteunde tags

TESTed ondersteunt de volgende standaardtypes van YAML:

- `!!set` om een verzameling te definiëren.

Tot slot kan ook de naam van elk [TESTed-type](/nl/references/tested/types) gebruikt worden als tag.
Voorbeelden zijn `!int64` of `!double`.
Merk op dat eigen types één uitroepteken gebruiken, terwijl standaardtypes er twee gebruiken.


## Spiekbriefje voor YAML

Deze paragraaf bevat een heel kort overzicht van het deel van functionaliteit van YAML die we gebruiken in de DSL.

### Objecten

Objecten in YAML zijn sleutel-waardeparen, waarbij de sleutel (het attribuut) en de waarde gescheiden worden door een dubbelpunt:

```yaml
key: value
```

Geneste objecten worden aangeduid door een insprong:

```yaml
root:
  child0:
    subchild0: "leaf"
    subchild1: "leaf"
  child1:
    subchild0: "leaf"
```

### Lijsten

Lijsten kunnen in YAML geschreven worden ofwel op één regel (gebruik makende van de JSON-syntaxis) ofwel met een waarde per regel.
Bijvoorbeeld, een lijst op een regel:

```yaml
[ "Item 0", "Item 1", "Item 2", "Item 3" ]
```

Bij de notatie van één waarde per regel moet elke regel voorafgegaan worden door een liggend streepje (-) en spatie:

```yaml
- "Item 0"
- "Item 1"
- "Item 2"
- "Item 3"
```

Lijsten en objecten kunnen ook gecombineerd worden:

```yaml
list:
  - name: "Item 0"
    items: 5
  - name: "Item 1"
  - name: "Item 2"
    items: 3
  - name: "Item 3"
```

### Strings

Gewone strings worden in YAML geschreven tussen dubbele aanhalingstekens:

```yaml
description: "Hello"
```

Een string met regeleindes wordt op dergelijke wijze nogal lelijk:

```yaml
description: "Hello\nWorld"
```

YAML ondersteunt een speciale notatie voor strings met regeleindes.
Dezelfde string als het laatste voorbeeld geschreven in die notatie wordt dan:

```yaml
description: |
  Hello
  World
```

Het omgekeerde is ook mogelijk, namelijk de "gevouwen strings" (_folded strings_).
Bij deze notatie zal YAML de regeleindes verwijderen:

```yaml
description: >
  Hello
  World
```

Dit is equivalent aan:

```yaml
description: "Hello World"
```

### Tags

YAML ondersteunt tags om waarden een ander type te geven:

```yaml
!!set [1, 2, 3]
```

## Volledig voorbeeld

Hieronder staat een testplan waar alle opties gebruikt worden:

```yaml
# Een tab op Dodona.
- tab: "Naam van de tab"
  contexts:
    # De bestanden gebruikt in deze context.
    - files:
        - name: "file.txt"
          url: "media/workdir/file.txt"
      testcases:
        # Een assignment van de variable "data".
        - statement: 'data = ["list\nline", "file.txt"]'
          # Functieoproep waarbij de variabele gebruikt wordt.
        - statement: 'function(data, 0.5)'
          # Verwachte returnwaarde van die functie.
          return: [ 0, 0 ]
    - testcases:
        # Een functieoproep waarbij de waarde gecast wordt naar "uint8".
        - statement: 'echo(uint8(5))'
          # De verwachte returnwaarde wordt ook gecast naar "uint8".
          return: "uint8(5)"

# Een tweede tab in hetzelfde testplan.
- tab: "Exception"
  contexts:
    - testcases:
        # Opnieuw een functieoproep.
        - statement: 'function_error()'
          # De verwachte tekst op stdout.
          stdout: "Invalid"
          # De verwachte tekst op stderr.
          stderr: "Error"
          # We verwachten ook een fout of exception met de boodschap "Unknown".
          exception: "Unknown"

# Een derde tab.
- tab: "Arguments"
  testcases:
    # Dit programma krijgt invoer mee via stdin
    - stdin: "Alice"
      # Er zijn ook argumenten voor de commandoregel.
      arguments: [ "stdin" ]
      # We verwachten deze tekst op stdout.
      stdout: "Hello Alice"

# Een vierde tab.
- tab: "Config"
  # We configureren alles op het niveau van de tab.
  config:
    stdout:
      # Tekst op stdout proberen we eerst als getal te vergelijken.
      tryFloatingPoint: true
      # Als we een getal vergelijken, ronden we af op 2 cijfers.
      applyRounding: true
      roundTo: 2
    # Op stderr negeren we witruimte en
    # het verschil met hoofdletters en kleine letters
    stderr:
      ignoreWhitespace: true
      caseInsensitive: true
  contexts:
    - config:
        stdout:
          # In deze context overschrijven de configuratie van de tab.
          roundTo: 0
      testcases:
        - statement: 'diff(5, 2)'
          stdout: "2"
        - statement: 'diff(5, 2)'
          stdout:
            data: "2.5"
            # In deze test overschrijven we de configuratie van de context.
            config:
              roundTo: 4

```
