---
title: Testplannen
order: 3
---

# Testplannen voor oefeningen

Om te controleren of dat een ingediende oplossing juist is, gebruikt Dodona testplannen.
Dat testplan bevat een reeks testgevallen, die ervoor zorgen dat je redelijk zeker bent of een oplossing juist is of niet.

In deze handleiding bespreken we kort de structuur, gevolgd door de verschillende mogelijkheden.
Hier gebruiken we TESTed: de aanbevolen manier om oefeningen te maken voor **Python**, **JavaScript**, **Java**, **Kotlin**, **C**, **C#**, **C++**, **Haskell** en **Bash**.
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

1. `tab`: **Tabbladen**, die ook als apart tabblad getoond worden op Dodona.
2. `contexts`: **Contexten**, die een onafhankelijke eenheid van testgevallen voorstellen.
3. `testcases`: **Testgevallen**, die één test en zijn resultaten bevatten.

Een voorbeeld van een testplan met alle niveaus is:

```yaml
- tab: "Tabblad 1"
  contexts:
    - testcases:
        - expression: 'echo("hello")'
          return: "hello"
    - testcases:
        - expression: 'echo("world")'
          return: "world"
- tab: "Tabblad 2"
  contexts:
    - testcases:
        - expression: 'echo("4")'
          return: "4"
    - testcases:
        - expression: 'echo("2")'
          return: "2"
```

In dit testplan zijn er twee gelijkaardige tabbladen.
Elk tabblad bevat twee contexten, die elk één testgeval hebben.
Elk testgeval roept de functie `echo` op met een andere parameter en bepaalt ook de verwachte returnwaarde (_return_).
Elk testgeval zit in een eigen context omdat elke functieoproep onafhankelijk van elkaar is.

Een context met één testgeval komt veel voor.
Daarom is het mogelijk om de contexten weg te laten:

```yaml
- tab: "Tabblad 1"
  testcases:
    - expression: 'echo("hello")'
      return: "hello"
    - expression: 'echo("world")'
      return: "world"
- tab: "Tabblad 2"
  testcases:
    - expression: 'echo("4")'
      return: "4"
    - expression: 'echo("2")'
      return: "2"
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

Een returnwaarde wordt geïnterpreteerd als een YAML-waarde.
Een string is een string, een getal wordt een getal, enzovoort.

Als je geavanceerde returnwaarden nodig hebt, zijn er twee opties:

- Een string met de tag `!expression` betekent dat de string de Python-syntaxis kan gebruiken.
- Een object met de tag `!oracle` wordt als een [eigen orakel](#eigen-orakelfunctie-custom-check) gezien.

Een voorbeeld van een geavanceerde returnwaarde (hier een verzameling getallen) is:

```yaml
- expression: 'unique(1, 1, 2, 3)'
  return: !expression "set([1, 2, 3])"
```

Een returnwaarde met een YAML-waarde:

```yaml
- expression: 'unique(1, 1, 2, 3)'
  return: 5.5
```

Om een string als returnwaarde te hebben zijn er dus twee mogelijkheden:

```yaml
- expression: 'echo("hello")'
  return: "hallo"  # Een gewone string
- expression: 'echo("hello")'
  return: !expression "'hallo'"  # Een string in Python-syntaxis
```


## Variabelen (assignments)

Je kan ook assignments (het toekennen van een waarde aan een variabele) gebruiken.
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

- Functieoproepen waarvan de naam begint met een hoofdletter worden beschouwd als
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

## Eigen orakelfunctie (custom check)

Soms zijn de ingebouwde controles niet voldoende, zoals bij functies die niet-deterministisch zijn.
Stel, als voorbeeld, dat leerlingen een functie moeten schrijven die de huidige datum uitschrijft.
Als we dat in een testplan willen schrijven, wordt dat:

```yaml
- tab: "Vandaag"
  testcases:
    - expression: 'vandaag()'
      return: "??????"  # Wat moet er hier komen?
```

De oplossing daarvoor is een eigen orakelfunctie schrijven.
Deze functie zal de returnwaarde krijgen en bepaalt of deze juist is of niet.
In het testplan wordt dit dan:


```yaml
- tab: "Vandaag"
  testcases:
    - expression: 'vandaag()'
      return: !oracle
        # Het soort orakel, hier altijd "custom_check"
        oracle: "custom_check"
        # De verwachte waarde
        value: "'27-08-2023'"
        # De naam van het bestand 
        file: "test.py"
        # De naam van de orakelfunctie
        name: "evaluate_test"
        # Een lijst van bijkomende argumenten voor de orakelfunctie
        arguments: [5, 6]
```

We leggen vast dat er een bestand `test.py` is, waarin een functie `evaluate_test` (de orakelfunctie) bestaat.
Deze orakelfunctie schrijf je altijd in Python, ongeacht de programmeertaal waarin de oefening opgelost kan worden.
De orakelfunctie voldoet aan een bepaalde signatuur, zoals:

```python
# We importeren wat hulpklassen uit TESTed.
from evaluation_utils import EvaluationResult, Message
from datetime import datetime

# De orakelfunctie heeft altijd minstens één argument:
# - de "context", een object met wat metadata (zie hieronder)
# - de overige argumenten zijn die uit het testplan
#   (de getallen 5 en 6 in dit geval)
def evaluate_test(context, five, six):
    today = datetime.today().strftime('%d-%m-%Y')
    return EvaluationResult(
      # Boolean of dat het resultaat juist is
      result=today == context.actual,
      # De "verwachte waarde" om te tonen op Dodona
      dsl_expected=repr(today),
      # De eigenlijke waarde uit de oplossing om te tonen op Dodona
      dsl_actual=repr(context.actual),
      # Optionale lijst van berichten om te tonen op Dodona
      messages=[Message("Hallo")]
    )
```

Wat we doen in deze functie is de datum van vandaag berekenen.

Het eerste argument van de functie is altijd een object met de volgende velden:
- `expected`: de verwachte waarde van het orakel zoals gedefinieerd door de sleutel `value` in het testplan
- `actual`: de waarde gegeneerd door de oplossing van de student
- `execution_directory`: het pad van de map waarin de oplossing beoordeeld is
- `evaluation_directory`: het pad van de map `evaluation` uit de oefening (waar dus het testplan in zit)
- `programming_language`: de programmeertaal van de oplossing van de student
- `natural_language`: de natuurlijke taal van de student die de oplossing indiende

We geven vervolgens een `EvaluationResult` terug met vier parameters:

1. `result`: Een boolean die aangeeft of de waarde uit de oplossing juist is of niet. In dit geval vergelijken we die gewoon met de datum van vandaag.
2. `dsl_expected`: De verwachte waarde om te tonen op Dodona. We overschrijven hier de verwachte waarde uit het testplan met de datum van vandaag. Dit gebruikt de Python-syntaxis.
3. `dsl_actual`: De eigenlijke waarde om te tonen op Dodona. We geven hier de eigenlijke waarde gewoon door. Dit gebruikt de Python-syntaxis.
4. `messages`: Een optionele lijst van berichten. Deze berichten worden ook getoond op Dodona en kunnen gebruikt worden om bijkomende feedback of uitleg aan de studenten te geven.

Ook `stderr` en `stdout` kunnen een eigen checkfunctie gebruiken.
Hiervoor wordt dezelfde notatie gebruikt, maar met `data` in plaats van `value`:

```yaml
- tab: "Vandaag"
  testcases:
    - stdin: '1 + 1'
      stdout:
        data: "2"
        oracle: "custom_check"
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
    return: "Hello, Jan."
```

## Taalspecifieke expressies en statements

::: warning Geavanceerde materie
Taalspecifieke expressies en statements heb je voor de meeste oefeningen niet nodig.

Als je toch denkt taalspecifieke expressies en statements nodig te hebben, dan horen we graag waarom: aarzel niet om ons een [e-mail te sturen](mailto:dodona@ugent.be?subject=Taalspecifieke%20expressies) om je gebruik te melden.
Zo kunnen we TESTed misschien uitbreiden met nieuwe functionaliteit, of jouw specifieke use-case gemakkelijker maken.
:::

In bepaalde gevallen wil je iets doen waarvoor er in TESTed nog geen ondersteuning is.
Een voorbeeld is het gebruik van lambda's in Python (of Java), of het gebruik van operatoren.

In dat geval is het mogelijk om taalspecifieke expressies en statements te schrijven.
In onderstaande voorbeeld wordt een functie opgeroepen met als argument de som van twee getallen.


```yaml
- tab: "My tab"
  testcases:
  - expression:
      c: "to_string(1+1)"
      cpp: "to_string(1+1)"
      haskell: "Submission.toString (1+1)"
      runhaskell: "Submission.toString (1+1)"
      java: "Submission.toString(1+1)"
      javascript: "submission.toString(1+1)"
      kotlin: "toString(1+1)"
      python: "submission.to_string(1+1)"
      csharp: "Submission.toString(1+1)"
    return: "2"
```

::: info Merk op
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
    return: "2"
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
    return: "Dit is de inhoud van het bestand"
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
