---
title: Testplannen
order: 3
---

# Testplannen voor oefeningen

Om te controleren of dat een ingediende oplossing juist is, gebruikt Dodona testplannen.
Dat testplan bevat een reeks testgevallen, die ervoor zorgen dat je redelijk zeker bent of een oplossing juist is of niet.

In deze handleiding bespreken we kort de structuur, gevolgd door de verschillende mogelijkheden.
Hier gebruiken we TESTed: de aanbevolen manier om oefeningen te maken voor **Python**, **JavaScript**, **Java**, **Kotlin**, **C**, **C#**, **Haskell** en **Bash**.
Moest je iets willen doen dat TESTed niet kan of je wilt een andere programmeertaal gebruiken, kijk dan eerst naar het [overzicht van alle judges](/nl/references/judges).

Deze handleiding bevat geavanceerdere concepten.
Er bestaan ook volledige voorbeelden voor eenvoudigere scenarios:

- [Oefening met input-output](/nl/guides/exercises/examples/input-output): een oefening waarbij er invoer gelezen wordt en een resultaat uitgeschreven wordt
- [Oefening met functies](/nl/guides/exercises/examples/function): hier moet een functie geschreven worden die een returnwaarde geeft
- [Oefening met klassen](/nl/guides/exercises/examples/class): hier moet een klassen geschreven worden
- [Oefening met argumenten](/nl/guides/exercises/examples/command-line): hier moet een programma geschreven worden dat argumenten aanvaard

Deze handleiding bevat ook enkel een aantal veelvoorkomende gevallen.
In de [referentiegids](/nl/references/tested/dsl) staat het volledige formaat voor testplannen uitgelegd.

## Structuur

Een testplan bestaat uit een hiërarchie van drie niveaus:

1. _Tabbladen_, die ook als apart tabblad getoond worden op Dodona.
2. _Contexten_, die een onafhankelijke eenheid van testgevallen voorstellen.
3. _Testgevallen_, die één test en zijn resultaten bevatten.

Een voorbeeld van een testplan met alle niveaus is:

```yaml
- tab: "Tabblad 1"
  contexts:
    - testcases:
        - expression: 'echo("hello")'
          return: !v "hello"
    - testcases:
        - expression: 'echo("world")'
          return: !v "world"
- tab: "Tabblad 2"
  contexts:
    - testcases:
        - expression: 'echo("4")'
          return: !v "4"
    - testcases:
        - expression: 'echo("2")'
          return: !v "2"
```

In dit testplan zijn twee analoge tabbladen.
Elk tabblad bevat twee contexten, die elk één testgeval hebben.
Elk testgeval roept de functie `echo` op met een andere parameter en bepaalt ook de verwachte returnwaarde.
Elk testgeval zit in een eigen context omdat elke functieoproep onafhankelijk van elkaar is.

Een context met één testgeval komt veel voor.
Daarom is het mogelijk om de contexten weg te laten:

```yaml
- tab: "Tabblad 1"
  testcases:
    - expression: 'echo("hello")'
      return: !v "hello"
    - expression: 'echo("world")'
      return: !v "world"
- tab: "Tabblad 2"
  testcases:
    - expression: 'echo("4")'
      return: !v "4"
    - expression: 'echo("2")'
      return: !v "2"
```

## Formaat

Een testplan wordt geschreven in YAML.
Dit is een intuïtief formaat, waarvoor er in veel tekstverwerkers ondersteuning is.
Een goed overzicht is op [deze pagina](https://quickref.me/yaml.html) te vinden.
Je favoriete zoekmachine vindt er ongetwijfeld nog veel meer.

Als jouw tekstverwerker JSON Schema ondersteunt, kan je deze toevoegen om validatie en automatische aanvulling in de testplannen te krijgen: gebruik dit [JSON Schema](https://github.com/dodona-edu/universal-judge/blob/master/tested/dsl/schema.json).
Gebruik je VS Code, kan je ook onze [extensie](https://marketplace.visualstudio.com/items?itemName=dodona.dodona-exercise-plugin) gebruiken.
Die zal vanzelf JSON Schema configureren.

## Functieoproepen en returnwaarden

Functieoproepen worden in een testplan genoteerd met een stringvoorstelling die gebruik maakt van de Python-syntaxis.
Een testgeval met een aantal functieoproepen is:

```yaml
- expression: 'min(5, min(4, min(3, min(2, 1))))'
  return: 1
```

Voor returnwaarden zijn er twee opties:

1. Als je een string als returnwaarde opgeeft, gaan we ervan uit dat die string ook de Python-syntaxis gebruikt.
2. Als je iets anders dan een string (of object) opgeeft, interpreteren we het als een YAML-waarde. Met de tag `!v` of `!value` kan je ook een string laten interpreteren als een YAML-waarde.

Een voorbeeld van een returnwaarde (hier een verzameling getallen) is:

```yaml
- expression: 'unique(1, 1, 2, 3)'
  return: "set([1, 2, 3])"
```

Een returnwaarde met een YAML-waarde:

```yaml
- expression: 'unique(1, 1, 2, 3)'
  return: 5.5
```

Om een string als returnwaarde te hebben zijn er dus twee mogelijkheden:

```yaml
- expression: 'echo("hello")'
  return: !v "hallo"  # Een gewone string met als tag !v
- expression: 'echo("hello")'
  return: "'hallo'"  # Een string in Python-syntaxis
```


## Variabelen (assignments)

Je kan ook assignments (of variabeletoekeningen) gebruiken.
Een voorbeeld is:

```yaml
- statement: 'a = 5'
- statement: 'b = calculate(a, 56)'
- expression: 'calculate(b, 10)'
  return: 10
```

Hier wordt eerst de waarde 5 toegekend aan een variabele `a`.
Vervolgens wordt de returnwaarde van een functieoproep, die de variabele `a` gebruikt, opgeslagen in `b`.
Tot slot wordt `b` gebruikt bij een nieuwe functieoproep, waarvan de returnwaarde gecontroleerd wordt.

Merk op dat alle testgevallen die variabelen gebruiken in dezelfde context moeten zitten.

## De Python-syntaxis

Hoewel de Python-syntaxis gebruikt wordt, wijken de conventies in een testplan soms af van gewone Python.
Een testplan gebruikt de Python-syntaxis, maar is geen Python.
De gebruikte conventies zijn:

- Functieoproepen wier naam begint met een hoofdletters worden beschouwd als
  _constructors_, bijvoorbeeld `Constructor(56)`.
- Identifiers die volledig in hoofdletters geschreven zijn worden beschouwd als globale constanten, bijvoorbeeld `VERY_LONG_NAME`.
- Het casten van waarden gebeurt op de gebruikelijke manier van Python. Het casten van een getal naar `int64` wordt bijvoorbeeld `int64(56)`. Er is wel geen ondersteuning voor Python-constructors. Een verzameling moet je noteren als `set([1, 2, 3, 5])`, niet als `set(1, 2, 3, 5)`.

Bijkomend worden grote delen van de syntaxis niet ondersteund, daar TESTed enkel beperkte ondersteuning heeft voor expressies en statements.
Volgende zaken worden ondersteund:

- Eenvoudige waarden, zoals `5`, `-9.3` of `"Hello world"`.
- Complexe waarden, zoals `[5, 6, 7]`, `{5, "Hello"}` of `{"key": "value"}`.
- Functieoproepen, inclusief _named parameters_, zoals `the_function(5, named=6)`.
- Constructors (middels onze conventie).
- Declareren en toewijzen van variabelen (_assignments_), zoals `some_variable = 5`.
- Refereren naar variabelen, zoals `the_function(some_variable)`.

Noemenswaardige weglatingen zijn alle soorten van functie- of klassendefinities, alsook alle operatoren (zoals plus, minus, gedeeld, maal).

## Datatypes

Voor een overzichtstabel van de ondersteunde datatypes en hun vertaling in de verschillende programmeertalen, verwijzen we naar de [referentiegids](/nl/references/tested/types).

## Eigen checkfunctie (eigen orakelfunctie)

Soms zijn de ingebouwde controles niet voldoende, zoals bij functies die niet-deterministisch zijn.
Stel, als voorbeeld, dat leerlingen een functie moeten schrijven die de huidige datum uitschrijft.
Als we dat in een testplan willen schrijven, wordt dat:

```yaml
- tab: "Vandaag"
  testcases:
    - expression: 'vandaag()'
      return: !v "??????"  # Wat moet er hier komen?
```

De oplossing daarvoor is een eigen orakelfunctie schrijven.
Deze functie zal de returnwaarde krijgen en bepaalt of deze juist is of niet.
In het testplan wordt dit dan:


```yaml
- tab: "Vandaag"
  testcases:
    - expression: 'vandaag()'
      return:
        value: "'27-08-2023'"
        oracle: "custom_check"
        language: "python"
        file: "test.py"
        name: "evaluate_test"
        arguments: [5, 6]
```

We specifiëren dat er een bestand `test.py` is, waarin een functie `evaluate_test` bestaat.
Deze functie schrijf je best altijd in Python, en moet voldoen aan een bepaalde structuur.

Bijvoorbeeld:

```python
# We importeren wat hulpklassen uit TESTed.
from evaluation_utils import EvaluationResult, Message
from datetime import datetime

def evaluate_test(expected, actual, five, six):
    # expected is de waarde uit "value" uit het testplan
    # actual is de returnwaarde van de functie uit de ingediende oplossing
    # de overige argumenten zijn hetzelfde als de `arguments` uit het testplan
    today = datetime.today().strftime('%d-%m-%Y')
    return EvaluationResult(
      result=today == actual,  # Boolean of dat het resultaat juist is
      dsl_expected=repr(today),  # De "verwachte waarde" om te tonen op Dodona
      dsl_actual=repr(actual),  # De eigenlijke waarde uit de oplossing om te tonen op Dodona
      messages=[Message("Hallo")]  # Optionale lijst van berichten om te tonen op Dodona
    )
```

Wat we doen in deze functie is de datum van vandaag berekenen.
We geven vervolgens een `EvaluationResult` terug met vier parameters:

1. Een eerste boolean die aangeeft of de waarde uit de oplossing juist is of niet. In dit geval vergelijken we die gewoon met de datum van vandaag.
2. De verwachte waarde om te tonen op Dodona. We overschijven hier de verwachte waarde uit het testplan met de datum van vandaag.
3. De eigenlijke waarde om te tonen op Dodona. We geven hier de eigenlijke waarde gewoon door.
4. Een optionele lijst van berichten. Deze berichten worden ook getoond op Dodona en kunnen gebruikt worden om bijkomende feedback of uitleg aan de studenten te geven.

Ook `stderr` en `stdout` kunnen een eigen checkfunctie gebruiken.
Hiervoor wordt dezelfde notatie gebruikt, maar met `data` in plaats van `value`:

```yaml
- tab: "Vandaag"
  testcases:
    - stdin: '1 + 1'
      stdout:
        data: "2"
        oracle: "custom_check"
        language: "python"
        file: "test.py"
        name: "evaluate_stdout"
```

## Argumenten, invoer en exitcode

De argumenten van een programma, de standaardinvoer (`stdin`) en de exitcode kunnen slechts éénmaal per context gebruikt worden.
Een context is namelijk onafhankelijk van de andere contexten, en dus een eigen uitvoering van het programma.

Er zijn dus twee speciale "testgevallen" in een context:

1. In het eerste testgeval kunnen argumenten en `stdin` gegeven worden.
2. In het laatste testgeval kan de exitcode gecontroleerd worden.

Het eerste en laatste testgeval kunnen ook hetzelfde testgeval zijn, bijvoorbeeld:

```yaml
- tab: "sum"
  testcases:
  - arguments: ["spam", "eggs", "bacon"]
    stderr: "invalid arguments"
    exit_code: 1
```

Een uitgebreider (fictief) voorbeeld is:

```yaml
- tab: "sum"
  contexts:
    - testcases:
        - arguments: [ "spam", "eggs", "bacon" ]  # De argumenten
          stdin: "today"  # Standaardinvoer
          stdout: "Hello"  # Het programma moet stdout genereren
        - expression: "some_function()"
          return: "hello"
        - statement: "exit_the_program(25)"
          exit_code: 25 
```

Je kan ook `stdin` combineren met een expressie.
Het is niet verplicht om argumenten te gebruiken:

```yaml
- tab: "example"
  testcases:
  - stdin: "Jan"
    expression: "greet()"
    return: !v "Hello, Jan."
```

## Taalspecifieke expressies en statements

In bepaalde gevallen wil je iets doen waarvoor er in TESTed nog geen ondersteuning is.
Een voorbeeld is het gebruik van lambda's in Python (of Java), of het gebruik van operatoren.

In dat geval is het mogelijk om taalspecifieke expressies en statements te schrijven.
In onderstaande voorbeeld wordt een functie opgeroepen met als argument de som van twee getallen.


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
    return: !v "2"
```

::: warning
Bij het gebruik van taalspecifieke expressies en statements ben je zelf verantwoordelijk om de juiste prefix van functies te gebruiken (de `(S|s)ubmission` in het voorbeeld).
Bovendien zullen expressies niet werken bij functies met returnwaarde `void`.

Meer informatie en discussie op <https://github.com/dodona-edu/universal-judge/issues/423>
:::

Als je slechts één programmeertaal wilt ondersteunen, kan je de taal van de expressies en statements ook globaal instellen:


```yaml
- tab: "My tab"
  language: "java"
  testcases:
  - expression: "Submission.toString(1+1)"
    return: !v "2"
```

## Bestanden koppelen aan expressies

Bij het opstellen van een oefening op bestanden raden we de volgende werkwijze aan:

1. Plaats de bestanden die je wilt gebruiken tijdens de evaluatie in de map `workdir/` in de oefeningenmap.
2. Geef de naam van het bestand als parameter mee tijdens een functieoproep of als argument bij het uitvoeren.
3. Link de oefeningen aan de bestandsnaam in het testplan. Hierdoor kunnen studenten in de feedback klikken op de naam van het bestand en dit bestand downloaden.

Om dat laatste te doen, is het nodig om de bestanden ook in de map `description/media/` van de oefeningenmap te steken.
In het testplan geef je vervolgens het attribuut `files` mee:

```yaml
- tab: "Voorbeeld met bestanden"
  testcases:
  - expression: "lees_het_bestand('bestand.txt')"
    return: !v "Dit is de inhoud van het bestand"
    files:
      - name: "bestand.txt"
        url: "media/bestand.txt"
```

De structuur van de oefeningenmap zal er dus als volgt uitzien:

```
repository/  # De repo met oefeningen
└── example/ # De eigenlijke oefening
   ├── evaluation/
   |  └── suite.yaml
   ├── description/
   |  ├── media/
   |  |   └── bestand.txt  # Het bestand om te linken
   |  └── description.nl.md
   ├── solution/
   |  └── solution.py
   ├── workdir/
   |  └── bestand.txt  # Het bestand om te evalueren
   └── config.json
```
