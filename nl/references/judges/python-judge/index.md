---
title: Python judge
description: "Python judge"
order: 5
---

# Python judge

::: danger Verouderd
We raden af om nieuwe oefeningen te maken voor deze judge.
Deze judge wordt niet meer actief ontwikkeld.

Gebruik in plaats daarvan [TESTed](/nl/guides/exercises/) om nieuwe Python-oefeningen te maken.
:::

De Python judge kan een indiening op twee manieren beoordelen:

-   De [**output judge**](#output-judge) voert de ingediende code uit met de invoer die je op `stdin` meegeeft, en vergelijkt wat ze naar `stdout` schrijft met de verwachte uitvoer. Deze judge is geschikt voor oefeningen die invoer vragen via `input()` en de resultaten uitschrijven via `print()`.
-   De [**doctest judge**](#doctest-judge) voert een reeks testen uit op de ingediende code, beschreven in een uitgebreide versie van het formaat van de Python `doctest` module. Deze judge is geschikt om Python **functies** en klassen te testen.

Je moet de Python judge laten weten welk van deze twee mogelijkheden je wil gebruiken door dit in te stellen in het [`config.json`](/nl/references/exercise-config/)-bestand van je oefening. Onder `evaluation` voeg je daarvoor het veld `pythia_judge` toe met als waarde `output` of `doctest`, afhankelijk van welk type oefening je aan het maken bent.

De testen van een oefening staan in haar `evaluation` map, als paren van bestanden met hetzelfde nummer: `0.in` en `0.out`, `1.in` en `1.out`, enzovoort. Elk paar wordt een tab in de feedback.

::: tip Voorbeelden
Neem een kijkje in de [voorbeeldoefeningenrepository](https://github.com/dodona-edu/example-exercises) en [voorbeeldcursus](https://dodona.be/en/courses/358/) om een voorbeeld te vinden van hoe je deze judges gebruikt.
:::

## Algemene instellingen

De volgende instellingen kunnen zowel voor de output judge als voor de doctest judge gebruikt worden. Instellingen die specifiek zijn aan een judge zullen hierna apart behandeld worden in [Output judge](#output-judge) en [Doctest judge](#doctest-judge).

- **`time limit`**:   De tijdslimiet voor de testen van dit bestand, als een natuurlijk getal in seconden. Standaard verdeelt de judge de tijdslimiet van de oefening over haar testbestanden.

- **`continue upon wrong answer`**:   Boolean die aangeeft of er moet verdergegaan worden met het uitvoeren van testen wanneer er een fout antwoord gegenereerd wordt. Standaard `true`.

- **`continue upon failure`**:   Boolean die aangeeft dat er moet verdergegaan worden met het uitvoeren van testen wanneer een runtime error optreedt. Standaard `true`.

- **`tab name`**:   String die de naam aangeeft van de tab in de feedback. Namen van tabs worden ook blootgesteld aan de vertalingen die door de judge worden uitgevoerd maar alle types van names worden los vertaald, wat betekent dat namen van functies, methodes, klassen en sleutelwoordargumenten als tokens gedetecteerd worden.

- **`show expected output`**:   Boolean die aangeeft of de feedback de verwachte uitvoer naast de gegenereerde uitvoer toont. Standaard `true`.

Deze standaard instellingen kan je wijzigen onderaan een `.out` bestand, voorafgegaan door een lijn die opgebouwd is door (minstens 3) koppeltekens. Bijvoorbeeld:

    ----------------------------------------
    tab name: Echo
    continue upon wrong answer: false
    continue upon failure: false

## Output judge

De normale werking van de judge bestaat per geüploade testcase uit een aantal stappen:

- Parsen van de invoer en verwachte uitvoer in samenhangende blokken
- Per blok wordt uitvoer gegenereerd aan de hand van de ingediende code en de invoer uit het blok.
- De verwachte en gegenereerde uitvoer per blok worden met elkaar vergeleken.

Als er fouten (of runtime-errors/time limit exceeded) tegengekomen worden stopt de judge daar en wordt feedback teruggegeven (in de vorm van een tabel met aangeduide verschillen tussen verwachte en gegenereerde uitvoer). Als daarentegen alle blokken correct waren, wordt ook nog eens voor de volledige input gekeken of de gegenereerde output overeenkomt met de verwachte uitvoer en wordt daarna feedback teruggegeven over deze laatste vergelijking.

De default werking van de judge kan veranderd worden aan de hand van een aantal parameters. Deze moeten onderaan toegevoegd worden aan het bestand met verwachte uitvoer na één enkele regel die enkel bestaat uit koppeltekens (minstens 3).

### Parameters om de werking van de judge aan te passen

- **`python input without prompt`**:   Boolean die aangeeft of de prompt van de ingebouwde functie `input` naar standaard uitvoer moet geschreven worden of niet. Standaard `false` (waarbij het prompt dus **wel** naar standaard uitvoer geschreven wordt).

- **`block count`**:   String die aangeeft hoeveel blokken input de judge mag verwachten.

  - **`one`** (standaard): De input wordt als één blok beschouwd
  - **`multi`**: De input bestaat uit een aantal blokken na elkaar (waardoor bij bepaalde vragen maar 1 testcase met meerdere testinputs nodig is).
  - **`first line`**: De eerste regel van de invoer geeft het aantal blokken aan
  - **`ends with <string>`**: De invoer wordt afgesloten met een regel die gelijk is aan `<string>`. Dus als bijvoorbeeld `ends with STOP` ingesteld wordt moet de invoer afgesloten worden met een regel die enkel `STOP` bevat.

- **`input block size`**:   String die aangeeft hoe elk blok uit de invoer er uit ziet.

  - **`first line`** (standaard): De eerste regel van het blok geeft aan hoeveel regels er daarna nog in het blok komen; deze eerste regel maakt ook deel uit van de invoer die door de ingediende code moet verwerkt worden.
  - **`ends with <string>`**: Elk blok wordt afgesloten met een regel die gelijk is aan `<string>`. Als er geen string wordt opgegeven dan wordt een lege regel beschouwd als terminator/separator. Als het laatste blok eindigt met `<string>` dan wordt de `<string>` beschouwd als terminator en maakt die deel uit van de eigenlijke invoer die door de ingediende code verwerkt moet worden. In het geval dat het laatste blok niet eindigt met `<string>` wordt `<string>` beschouwd als separator en maakt die geen deel uit van die invoer die door de ingediende code verwerkt moet worden.
  - **`<integer>`**: Elk blok bestaat uit `<integer>` regels.

- **`output block size`**:   String die aangeeft hoe elk blok van de verwachte uitvoer er uit ziet. Deze instelling neemt dezelfde waarden aan als `input block size`, plus één extra:

  - **`first line`** (standaard), **`ends with <string>`** en **`<integer>`**: zoals bij `input block size`.
  - **`input block size`**: Elk blok verwachte uitvoer heeft evenveel regels als het overeenkomstige blok invoer.

- **`blockwise execution`**:   Boolean die aangeeft of de output bloksgewijs vergeleken moet worden of niet.
    Dit is standaard `true` en dan wordt er per blok uitvoer gegenereerd en
    vergeleken met de verwachte uitvoer. Als `false` ingesteld wordt zal er
    enkel globaal de gegenereerde en de verwachte output vergeleken worden.

### Parameters om de manier van vergelijken te veranderen

- **`comparison`**:   String die aangeeft hoe de gegenereerde en de verwachte uitvoer vergeleken moet worden

  - **`exact match`**: De twee output moeten exact gelijk zijn.
  - **`ignore extra whitespace`** (standaard): De verwachte en gegenereerde uitvoer moeten gelijk zijn, maar opeenvolgende witruimtekarakters worden gereduceerd tot één enkel witruimtekarakter.
  - **`ignore whitespace`**: De verwachte en gegenereerde uitvoer moeten gelijk zijn maar witruimte wordt genegeerd voor de vergelijking.

- **`ignore fp rounding`**:   Een geheel getal $e$ dat bepaalt hoe floating point getallen vergeleken worden. Met deze instelling zijn de getallen $n$ en $m$ gelijk als $|n-m| < 10^e$; met andere woorden, met `ignore fp rounding: -2` moeten de twee getallen gelijk zijn tot op twee cijfers na de komma. Zonder deze instelling worden getallen karakter per karakter vergeleken, net als de rest van de uitvoer.

- **`case sensitive`**:   Boolean die aangeeft of er bij de vergelijking van de gegenereerde en de verwachte uitvoer rekening gehouden moet worden met het verschil tussen hoofdletters en kleine letters. Standaard `true`.

- **`field order sensitive`**:   Boolean die aangeeft of er bij de vergelijking van de gegenereerde en de verwachte uitvoer rekening gehouden moet worden met de volgorde van de velden op een regel. Velden worden gescheiden door witruimte. Standaard `true`.

- **`line order sensitive`**:   Boolean die aangeeft of er bij de vergelijking van de gegenereerde en de verwachte uitvoer rekening gehouden moet worden met de volgorde van de regels. Standaard `true`.

### Definiëren van een eigen evaluatie functie

In het bestand met verwachte uitvoer is er ook de mogelijkheid om een eigen functie te definiëren die evalueert of de oplossing juist of fout is. Zet ze in een `<DEFINITION>` tag na de regel met koppeltekens, met de `def`-regel van de functie als eerste regel van de tag. De functie krijgt de verwachte en gegenereerde uitvoer als lijsten van regels, en geeft `True` of `False` terug naargelang de correctheid. Ze kan ook een paar teruggeven: het oordeel en een lijst van boodschappen die de student te zien krijgt. Als er een eigen evaluatiefunctie is, worden de vergelijkingsinstellingen hierboven niet gebruikt.

In het volgende voorbeeld wordt er per lijn een andere toegelaten floating point marge gebruikt:

    2.04e+13
    136.365577302
    68.1827886512
    ---------
    <DEFINITION>
    def customEvaluate(expected_output, generated_output):
        if len(generated_output) != 3:
             return False
        ignore_rounding = [9, -2, -2]
        for i, rounding in zip([0, 1, 2], ignore_rounding):
            if abs(float(expected_output[i].strip('\n')) - float(generated_output[i])) > 10 ** rounding:
                return False
        return True
    </DEFINITION>

#### Voorbeeld 1

Bij opgave [Dierenriem](https://dodona.be/nl/exercises/1178427390/) schrijft de ingezonden code voor een datum (op 2 regels) het juiste sterrenbeeld uit (op 1 regel). We gebruiken `block count: multi` om meerdere testen te kunnen definiëren in één bestand.

Input bestand (`0.in`):

    1
    januari
    12
    november
    23
    april
    25
    december

Output bestand (`0.out`):

    Steenbok
    Schorpioen
    Stier
    Steenbok
    ---------------------------------------------------------
    python input without prompt: true
    block count: multi
    input block size: 2
    output block size: 1
    blockwise execution: true
    continue upon wrong answer: false

#### Voorbeeld 2

Bij opgave [Delers](https://dodona.be/nl/exercises/1581119193/) moeten voor een gegeven getal alle delers uitgeschreven worden. Opnieuw kan hier gebruik gemaakt worden van `block count: multi`. Deze keer wordt de verwachte uitvoer beëindigd door een lege regel (`output block size: ends with`).

Input bestand (`0.in`):

    298
    299

Output bestand (`0.out`):

    1
    2
    149
    298

    1
    13
    23
    299

    ---------------------------------------------
    python input without prompt: true
    block count: multi
    input block size: 1
    output block size: ends with
    blockwise execution: true
    continue upon wrong answer: false

## Doctest judge

De doctest judge gebruikt doctests om de oplossingen van studenten te checken. Elk `.in` bestand bevat een doctest, en het bijhorende `.out` bestand bevat enkel de instellingen (na de regel met koppeltekens) en de vertalingen (zie [Doctests in meerdere talen](#doctests-in-meerdere-talen)).

### Parameters

- **`used output channel`**:   Zet het output kanaal voor de volledige doctest. Zie [Outputkanalen](#outputkanalen) voor de uitleg rond output kanalen. Standaard gebruiken alle doctests `return` als enige output kanaal. Mogelijke waarden zijn `stdout`, `return` en `stdout return`. Met `stdout return` is de eerste regel van de verwachte output de returnwaarde en zijn de andere regels de geprinte output.

- **`independent examples`**:   Boolean die aangeeft of alle doctests als afhankelijk of onafhankelijk van elkaar beschouwd moeten worden. (Zie [Uitvoeringscontext](#uitvoeringscontext) voor meer info over uitvoeringscontexten voor de debugger van Dodona.) Standaard is deze parameter `true` en vormt dus elk statement zijn eigen uitvoeringscontext. Bij `false` worden de statements gebundeld om een uitvoeringscontext te vormen.

### Outputkanalen

De output van een uitvoering wordt gesplitst in kanalen (standaard uitvoer en returnwaarden). Dit verschilt van het standaard doctest gedrag.

Standaard zal de doctest judge enkel returnwaarden vergelijken. Met de parameter `used output channel` vermeld in [Parameters](#parameters) en optievlaggen (`STDOUT` en `RETURN`) voor individuele testen kan dit veranderd worden. Zie het volgende voorbeeld:

``` python
>>> def my_return(value):
...     return value
...
>>> def my_print(value):
...     print(value)
...
>>> def my_combination(value):
...     print(value)
...     return value
...
>>> def my_multiline(value):
...     return '{0}\n{0}\n{0}'.format(value)
...
>>> # Het standaard gedrag verwacht een return waarde
>>> my_return(5)
5
>>> # Het volgende zal dus als incorrect geëvalueerd worden
>>> # De waarde wordt namelijk geprint, niet teruggegeven
>>> my_print(5)
5
>>> # Als we willen dat de student print in haar functie voegen we de 'STDOUT' optie vlag toe
>>> # Het volgende is correct:
>>> my_print(5) #doctest: +STDOUT
5
>>> # Als we de 'STDOUT' optievlag toevoegen zal er gecontroleerd worden dat None teruggegeven wordt.
>>> # Als we zowel de prints als de returnwaarde willen, voegen we beide vlaggen expliciet toe.
>>> # De eerste lijn van de verwachte output is dan de returnwaarde,
>>> # en de andere lijnen zijn de geprinte output:
>>> my_print(5) #doctest: +STDOUT, +RETURN
None
5
>>> my_combination(5) #doctest: +STDOUT, +RETURN
5
5
>>> # Met enkel de 'RETURN' vlag is de volledige verwachte output de returnwaarde,
>>> # en toont de feedback de verwachte en gegenereerde waarde over meerdere lijnen
>>> my_multiline(5) #doctest: +RETURN
5
5
5
>>>
>>> # Tracebacks worden gewoon in de verwachte output geplaatst. Geindenteerde lijnen worden genegeerd
>>> # net als de outputkanalen.
>>> 1/0
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  These lines are completely ignored
  They don't even appear in the feedback.
ZeroDivisionError: division by zero
```

Er bestaat één speciale optie vlag (`REPR`) die gebruikt wordt wanneer de representatie van een zelf-gedefinieerd object gebruikt wordt. Dit is enkel het geval wanneer deze representatie werd overschreven. Wanneer de vlag geactiveerd wordt zal de (representatie van het object) van de returnwaarde vergeleken worden met de verwachte output. Merk op dat dit enkel nuttig is (en zal werken) wanneer de `__repr__(self)` methode overschreven is. Anders zal het adres van het object opgenomen worden in de representatie (wat voor elke uitvoering zal verschillen).

``` python
>>> class MyObject(object):
...     def __repr__(self):
...         return 'I present to you:\nthe representation of myself'
...
>>> MyObject() #doctest: +REPR
I present to you:
the representation of myself
```

De `REPR` vlag kan niet gecombineerd worden met andere vlaggen (de vlag overschrijft alle andere vlaggen).

### Vergelijking van output

De hoofdreden voor het opsplitsen van de verschillende output is om toe te laten dat ze op een andere manier vergeleken worden. Returnwaarden worden vergeleken met type en inhoud. Standaard uitvoer (en dus ook tracebacks) worden gecontroleerd door de strings te vergelijken. De vergelijkingsmethode kan veranderd worden met de `OUTPUTPROCESSOR` optie tag. Het verwachte type voor de returnwaarden wordt afgeleid uit het type van de returnwaarde. Alleen als deze types overeenkomen zal de inhoud vergeleken worden. De vergelijking van de inhoud kan nu typespecifiek gebeuren.

Om de vergelijking van de output aan te passen wordt de `OUTPUTPROCESSOR` tag gebruikt. Dit laat toe om een eigen processor te maken. Bijvoorbeeld, voor floats wordt standaard 2 decimalen vergeleken, maar dit kan aangepast worden naar het volgende:

``` python
>>> 0.001 # standaard precisie is 2, dus correct
0.002
>>> 0.001 # precisie wordt op 5 ingesteld, dus incorrect
<OUTPUTPROCESSOR>
OutputProcessor(expected_type=float, precision=5)
</OUTPUTPROCESSOR>
0.002
```

Merk op dat alle outputprocessors *sticky* gemaakt kunnen worden. Het zou vervelend zijn als er 20 testen waren, telkens met precisie 6 en er voor elk testgeval opnieuw de processor gedefinieerd zou moeten worden. Dit werkt als volgt:

``` python
>>> 0.001 # standaard precisie is 2
0.002
>>> 0.001 # zet precision op 6 en houd dit zo, dus dit zal falen
<OUTPUTPROCESSOR sticky="sticky">
OutputProcessor(expected_type=float, precision=6)
</OUTPUTPROCESSOR>
0.002
>>> 0.003 # dit zal nog steeds falen
0.004
>>> 0.005 #doctest: +CLEARSTICKY
0.006
>>> # De test hierboven is geslaagd: +CLEARSTICKY heeft de sticky processor gewist
>>> 0.007 # en deze ook
0.008
```

Een *sticky* outputprocessor definiëren voegt hem toe aan de lijst van stickies. Elke volgende test wordt dan ook door de sticky processors gecontroleerd, naast een eventuele processor die de test zelf definieert. De `CLEARSTICKY` vlag maakt de lijst van *stickies* leeg, te beginnen bij de test met de vlag.

`OutputProcessor` heeft deze parameters:

- **`expected_type`**:   Het type dat de returnwaarde moet hebben, zoals `float`, `[int]` (een lijst van gehele getallen), `(int, str)` (een tuple van een geheel getal en een string), `{str: int}` (een dictionary) of `{float}` (een set). Standaard wordt het type afgeleid uit de verwachte returnwaarde.
- **`expected_types`**:   Een lijst van types die de returnwaarde mag hebben.
- **`precision`**:   Het aantal decimalen tot waarop floating point getallen vergeleken worden. Standaard `2`.

Voor specifieke gevallen zijn er nog twee standaard processors:

- **`FileContentChecker`**:   Kijkt of de indiening een bestand met de verwachte inhoud geschreven heeft. Het eerste argument is de naam van het bestand dat de indiening moet schrijven. De verwachte inhoud komt uit een `FILE` tag met `src="memory"` en dezelfde naam, of anders uit het bestand dat de parameter `expectedFileName` opgeeft (standaard een bestand met dezelfde naam).

  -   `ignoreTrailingNewlines`: Boolean die aangeeft of extra newlines op het einde van het gegenereerde (en het verwachte) bestand genegeerd moeten worden. Standaard `true`.

- **`ImageRenderer`**:   Kijkt of de returnwaarde een matrix van pixels is en toont die als afbeelding in de feedback. Een matrix is een lijst van rijen: gehele getallen van 0 tot 255 of floats van 0 tot 1 voor een grijswaardenafbeelding, of lijsten van drie zulke getallen voor een kleurenafbeelding.

### Outputprocessors definiëren

Om een eigen outputprocessor te definiëren gebruik je de `DEFINITION` tag. Deze tag laat toe om wat dan ook te definiëren in de scope van de doctest.

```python
>>> my_new_function() #doctest: +STDOUT
<DEFINITION>
def my_new_function():
    print('hello world')
</DEFINITION>
hello world
```

Dit voorbeeld zou uiteraard verwarrend zijn voor studenten, aangezien zij de definities niet kunnen zien, maar wel de test zelf. De tag wordt vooral gebruikt om nieuwe outputprocessors te definiëren: een subklasse van `OutputProcessor` die een of meer van deze methodes overschrijft. Elke methode geeft terug of de output correct is.

-   **`checkReturnValue(self, expected, generated, **kwargs)`**: vergelijkt de returnwaarde, nadat het type ervan gecontroleerd werd.
-   **`checkStdout(self, expected, generated, **kwargs)`**: vergelijkt de standaard uitvoer (als strings).
-   **`checkReturnType(self, generated, expected_types=None, **kwargs)`**: controleert het type van de returnwaarde.

Binnen deze methodes kan je het volgende gebruiken:

-   **`self.addMessage(message)`**: toont een boodschap aan de student bij deze test.
-   **`self.executeStatement(channels=['return'], expected_type=...)`**: voert het statement van de test opnieuw uit en geeft de gevraagde output terug, bijvoorbeeld om een functie te controleren die een willekeurige waarde teruggeeft.
-   **`self.setExpectedOutput(channel='return', output=...)`** en **`self.setGeneratedOutput(channel='return', output=...)`**: veranderen de verwachte of gegenereerde output die de feedback toont. Het kanaal is `return`, `stdout` of `stderr`.
-   **`self.getTranslator()`**: de vertaler van de oefening, waarvan `translate(text)` een tekst naar de taal van de student vertaalt.

Het voorbeeld hieronder maakt de standaard processor vriendelijker. Het roept de methode op die het overschrijft om de eigenlijke vergelijking te doen, en voegt een boodschap toe aan het resultaat:

```python
>>> 'hello'
<DEFINITION>
class FriendlyProcessor(OutputProcessor):

    def checkReturnValue(self, expected, generated, **kwargs):
        correct = super().checkReturnValue(expected, generated, **kwargs)
        if correct:
            self.addMessage('You return it just the way I like it!')
        else:
            self.addMessage('Nice try, but that is not the right return value.')
        return correct
</DEFINITION>
<OUTPUTPROCESSOR>
FriendlyProcessor()
</OUTPUTPROCESSOR>
'hello'
```

Het volgende voorbeeld controleert een functie `roll_die()` die een willekeurig aantal ogen teruggeeft. De verwachte waarde `4` wordt enkel als voorbeeld getoond: de processor voert het statement opnieuw uit tot elk getal van 1 tot 6 een keer gegooid werd.

```python
>>> roll_die()
<DEFINITION>
class DieChecker(OutputProcessor):

    def checkReturnValue(self, expected, generated, **kwargs):
        # the first roll must be a valid number of eyes
        if generated not in range(1, 7):
            self.addMessage('Error: a die only has the numbers 1 to 6')
            return False
        # roll again until every number has come up (at most 1000 times)
        seen = {generated}
        for _ in range(1000):
            generated = self.executeStatement(channels=['return'], expected_type=int)
            if generated not in range(1, 7):
                self.addMessage('Error: a die only has the numbers 1 to 6')
                return False
            seen.add(generated)
            if len(seen) == 6:
                break
        if len(seen) < 6:
            missing = ', '.join(str(eyes) for eyes in sorted(set(range(1, 7)) - seen))
            self.addMessage(f'Error: these numbers never came up: {missing}')
            return False
        return True
</DEFINITION>
<OUTPUTPROCESSOR>
DieChecker(expected_type=int)
</OUTPUTPROCESSOR>
4
```

Enkele opmerkingen:

-   Vergeet niet terug te geven of de output correct is. `continue upon wrong answer` hangt hiervan af.
-   Een klasse of functie die in een `DEFINITION` tag gedefinieerd wordt, blijft beschikbaar in de volgende testen van hetzelfde bestand. Je moet een processor dus maar één keer definiëren.
-   De methodes die je niet overschrijft, behouden hun standaard controles. Een processor die enkel `checkReturnValue` overschrijft, meldt bijvoorbeeld nog steeds geprinte output als de test er geen verwacht.

### Verborgen en niet uitgevoerde testgevallen

In het geval dat je een testgeval wil tonen aan de studenten maar niet uitvoeren kan je de `NOEXEC` vlag gebruiken. Omgekeerd (om een test uit te voeren maar niet te tonen) kan met de `NOSHOW` vlag.

```python
>>> 1/0 #doctest: +NOEXEC
"Dit testgeval werd niet uitgevoerd"
>>> get_password() #doctest: +NOSHOW
"hunter2"
```

### Doctests in meerdere talen

Het is mogelijk meerdere talen te ondersteunen in doctests. Er moet niets veranderd worden aan het input bestand; bijna alles moet in het outputbestand gebeuren. Tussen de parameters onder de horizontale lijn moet er een `LANGUAGE` tag geplaatst worden. De geteste broncode en een voorbeeldvertaling volgt. Hier gaan we er van uit dat de originele doctest in het Engels is.

``` python
def show_usage():
    print("usage")
    print("    just use it.")

class HtmlParagraph(object):
    def __init__(self, content):
        self.content = content
    def to_html(self):
##         return '<p>{}</p>'.format(self.content)
<LANGUAGE code="nl">
    <function from="show_usage" to="toon_gebruiksaanwijzing" />
    <class from="HtmlParagraph" to="HtmlParagraaf" />
    <method from="to_html" to="naar_html"/>
    <fixed from="&quot;usage&quot;" to="&quot;gebruik&quot;" />
    <fixed from="&quot;    just use it.&quot;" to="&quot;    gebruik het dan toch gewoon.&quot;"/>
</LANGUAGE>
```

De mogelijke types substitutie zijn `function`, `method`, `class`, `kwarg`, `token`, `fixed` en `regex`. Bij `kwarg` zullen de namen van keyword argumenten vervangen worden. `token` vervangt een volledig woord. `fixed` zorgt voor letterlijke substituties zonder extra grenzen, ook binnen woorden. Bij `regex` is `from` een reguliere expressie en kan `to` naar de groepen ervan verwijzen met `\1`, `\2`, enzovoort.

Elke substitutie tag heeft ook een optionele parameter `detect` die standaard `true` is. Dit betekent dat de `to` parameter van de tag ook gebruikt wordt om de taal te detecteren. Als `detect` echter op `false` ingesteld staat wordt de substitutie genegeerd om de taal te detecteren. Een `<detect token="..." />` tag voegt een woord toe dat enkel gebruikt wordt om de taal te detecteren.

Zodra de taal gedetecteerd wordt is het vertalen volledig automatisch. De taal moet echter wel gedetecteerd worden. De gedetecteerde taal is de taal met de meeste woorden in de globale scope als er een met meer dan 0 is. Als er geen woorden gevonden worden, wordt er geen vertaling of selectie uitgevoerd.

Selectie is het proces dat er rekening mee houdt dat niet alles met korte zinnetjes vertaald kan worden. Of soms wil je sommige dingen enkel uitvoeren voor gebruikers van een bepaalde taal. Het volgende voorbeeld brengt meer duidelijkheid:

``` python
<LANGUAGE code="nl">
    <fixed from="english" to="nederlands" />
    <fixed from="&quot;This is seen translated by everyone.&quot;" to="&quot;Dit wordt door iedereen gezien en is vertaald.&quot;" />
    <fixed from="&quot;This should appear for everyone and be translated.&quot;" to="&quot;Dit zou aan iedereen moeten verschijnen en vertaald zijn.&quot;" />
    <fixed from="&quot;And back to translating for everyone&quot;" to="&quot;En terug voor iedereen vertalen&quot;" />
    <fixed from="&quot;This should appear for everyone and be translated.&quot;" to="&quot;Dit zou vertaald aan iedereen moeten verschijnen.&quot;" />
    <fixed from="&quot;Now, we're going into an untranslated part.&quot;" to="&quot;Nu beginnen we aan een onvertaald gedeelte.&quot;" />
    <fixed from="&quot;This is shown to everyone, but not translated.&quot;" to="&quot;Dit wordt aan iedereen getoond, maar niet vertaald.&quot;" />
</LANGUAGE>
>>> "This is seen translated by everyone." and None
>>> "This is seen only be Dutch users." and None
<LANGUAGE code="nl" />
>>> "This is seen by both Dutch and French users." and None
<LANGUAGE code="nl fr" />
>>> "This is seen by anyone but Dutch and French users." and None
<LANGUAGE code="!nl fr" />
>>> "This is only seen by users of the default language (and undetected
languages)" and None
<LANGUAGE code="notdetected" />
>>> "This is seen by anyone but users of the default language" and None
<LANGUAGE code="!notdetected" />
>>> "Starting a whole block for Dutch users only" and None
<LANGUAGE code="nl" sticky="sticky" />
>>> "Gegroet, Kees!" and None
>>> "Starting a whole block for anyone but the Dutch" and None
<LANGUAGE code="!nl" sticky="sticky" />
>>> "What's a fascia?" and None
>>> "And back to translating for everyone" and None
<LANGUAGE code="" sticky="sticky" />
>>> "This should appear for everyone and be translated." and None
>>> "Now, we're going into an untranslated part." and None
<LANGUAGE code="!" sticky="sticky" />
>>> "This is shown to everyone, but not translated." and None
```

### Bestanden

De `FILE` tag heeft vier vormen. De eerste drie zorgen er voor dat de naam van het bestand als link naar de inhoud van het bestand in de feedbacktabel terechtkomt. Als de optionele `href` parameter niet is ingevuld zal de inhoud van het bestand getoond worden met een pop-up. Dit kan voor grote bestanden tot lange wachttijden leiden, aangezien de inhoud twee keer in de feedbacktabel verwerkt zit. Voor grote bestanden kan dus de `href` parameter gebruikt worden. Dit zal er voor zorgen dat de naam van het bestand een link is naar een download van het bestand. Als de `href` parameter leeg is zal er geen link zijn naar de inhoud van het bestand.

-   Ingebed

    ``` python
    >>> filestring = open('text.txt', 'r').read()
    <FILE name="text.txt">
    This will be the content of text.txt.
    </FILE>
    ```

    Met de eerste vorm, zoals hierboven getoond, kan je je bestanden inbedden in
    de testdefinities. In plaats van deze code zal `filestring = StringIO("""This is the content of text.txt""").read()` uitgevoerd worden. Voor de student
    wordt de originele code nog getoond.

-   Open bestaand bestand

    Deze vorm zorgt voor bestaande bestanden. Zo kan de inhoud gelinkt worden aan
    de pop-up.

    ``` xml
    <FILE name="text.txt" src="/temp/text.txt" />
    ```

    Het `src` attribuut bevat de eigenlijke locatie van het bestand. Als dit
    leeg is gebruiken we `name` als pad naar het bestand.

-   Maak en open nieuw bestand

    Deze vorm maakt een bestand aan met als inhoud de tekst van de tag. Dan wordt het op dezelfde manier als hierboven gebruikt.

    ``` python
    >>> print_out_file('text.txt') # this would be a function doing print(open(file).read())
    <FILE name="text.txt" src="/temp/text.txt">
    This is the content of text.txt.
    </FILE>
    <OUTPUTPROCESSOR>
    OutputProcessor(expected_type=str)
    </OUTPUTPROCESSOR>
    This is the content of text.txt.
    ```

-   Verwacht bestand

    Met `src="memory"` geeft de tag de inhoud van een bestand dat de indiening moet schrijven. De `FileContentChecker` outputprocessor vergelijkt dan het bestand dat de indiening schreef met deze inhoud.

    ``` python
    >>> write_greeting('greeting.txt')
    <FILE name="greeting.txt" src="memory">
    Hello world!
    </FILE>
    <OUTPUTPROCESSOR>
    FileContentChecker('greeting.txt')
    </OUTPUTPROCESSOR>
    ```

Om het gebruik van de debugger van Dodona toe te laten voor oefeningen met bestanden moet een `FILE` tag gebruikt worden. Als het geen ingebed bestand is moet er ook een (geldig) `href` attribuut aanwezig zijn. In dit laatste geval zal de debugger ook enkel werken als de oefening publiek is.

### Uitvoeringscontext

Wanneer een student de debugger van Dodona opstart voor een test, kan de uitvoering van het statement afhankelijk zijn van vroeger uitgevoerde statements. Daarom hebben we het concept van een uitvoeringscontext geïntroduceerd. De uitvoeringscontext kan op twee manieren aangepast worden.

De parameter `independent examples` geeft aan of elk statement zijn eigen uitvoeringscontext vormt. Als deze parameter `True` is (de standaardwaarde) dan zal elk statement apart uitgevoerd worden en enkel het huidige statement zal aan de broncode toegevoegd worden wanneer de debugger opgestart wordt. Als de parameter `False` is zullen standaard alle statements een uitvoeringscontext vormen. Met de vlag `NEWCONTEXT` kan een een nieuwe context gestart worden.

``` python
# first context
>>> statement1
>>> statement2

# second context
>>> statement3 #doctest: +NEWCONTEXT
>>> statement4

# third context
>>> statement5 #doctest: +NEWCONTEXT
>>> statement6
```
