---
title: "[nl] Python judge"
description: "Python judge"
order: 5
---

::: warning Sorry
For now, this page is only available in Dutch. Sorry!
:::

# Python judge

Alle Python judges zijn in Python geschreven en delen een gemeenschappelijke basisklasse `Judge`. De basisklasse voor master judges heet `MasterJudge`. De basisklasse voor interactieve judges heet `TestcaseJudge`. Twee generieke interactieve judges zijn al geïmplementeerd:

-   The **`OutputJudge`** klasse implementeert een judge die de ingediende broncode evalueert gebaseerd op de output die naar `stdout` wordt geschreven gebaseerd op input die via `stdin` wordt ingelezen. Deze judge is dus geschikt voor oefeningen die input vragen via `input()` en de resultaten uitprinten via `print()`.
-   De **`DoctestJudge`** klasse implementeert een judge die de ingediende broncode evalueert door er een serie *unit tests* op uit te voeren die beschreven worden aan de hand van een uitgebreide versie van het format van de Python `doctest` module. Deze judge is geschikt om Python **functies** te testen.

Zodat de Python judge weet welk van deze twee mogelijkheden je wil gebruiken, moet je dit ook instellen in het [`config.json`](/en/references/exercise-config/)-bestand van je oefening. Onder `evaluation` voeg je daarvoor de sleutel `pythia_judge` toe met als waarde `output` of `doctest`, afhankelijk van welk type oefening je aan het maken bent.

::: tip Voorbeelden
Neem een kijkje in de [voorbeeldoefeningenrepository](https://github.com/dodona-edu/example-exercises) en [voorbeeldcursus](https://dodona.be/en/courses/358/) om een voorbeeld te vinden van hoe je deze judges gebruikt.
:::

De hiërarchie van de judge klassen die binnen het Python project ontwikkeld
werden is als volgt:

    Judge -> MasterJudge
          -> TestcaseJudge -> OutputJudge
                           -> DoctestJudge

## Algemene instellingen

De volgende instellingen kunnen zowel voor de output judge als voor de doctest judge gebruikt worden. Instellingen die specifiek zijn aan een judge zullen hierna apart behandeld worden in [Output judge](#output-judge) en [Doctest judge](#doctest-judge).

- **`time limit`**:   Deze instelling geeft de tijdslimiet aan als een natuurlijk getal in seconden.

- **`continue upon wrong answer`**:   Boolean die aangeeft of er moet verdergegaan worden met het uitvoeren van testen wanneer er een fout antwoord gegenereerd wordt. Standaard `true`.

- **`continue upon failure`**:   Boolean die aangeeft dat er moet verdergegaan worden met het uitvoeren van testen wanneer een runtime error optreedt.

- **`tab name`**:   String die de naam aangeeft van de tab in de feedback. Namen van tabs worden ook blootgesteld aan de vertalingen die door de judge worden uitgevoerd maar alle types van names worden los vertaald, wat betekent dat namen van functies, methodes, klassen en sleutelwoordargumenten als tokens gedetecteerd worden.

## Output judge

De normale werking van de judge bestaat per geüploade testcase uit een aantal stappen:

- Parsen van de invoer en verwachte uitvoer in samenhangende blokken
- Per blok wordt uitvoer gegenereerd aan de hand van de ingediende code en de invoer uit het blok.
- De verwachte en gegenereerde uitvoer per blok worden met elkaar vergeleken.

Als er fouten (of runtime-errors/time limit exceeded) tegengekomen worden stopt de judge daar en wordt feedback teruggegeven (in de vorm van een tabel met aangeduide verschillen tussen verwachte en gegenereerde uitvoer). Als daarentegen alle blokken correct waren, wordt ook nog eens voor de volledige input gekeken of de gegeneerde output overeenkomt met de verwachte uitvoer en wordt daarna feedback teruggegeven over deze laatste vergelijking.

De default werking van de judge kan veranderd worden aan de hand van een aantal parameters. Deze moeten toegevoegd worden aan het bestand met verwachte uitvoer na één enkele regel die enkel bestaat uit koppeltekens (minstens 3).

### Parameters om de werking van de judge aan te passen

- **`python input without prompt`**:   Boolean die aangeeft of de prompt van de ingebouwde functies `input` en `raw_input` naar standaard uitvoer moeten geschreven worden of niet. Standaard `false` (waarbij het prompt dus **wel** naar standaard uitvoer geschreven wordt).

- **`block count`**:   String die aangeeft hoeveel blokken input de judge mag verwachten.

  - **`one`** (standaard): De input wordt als één blok beschouwd
  - **`multi`**: De input bestaat uit een aantal blokken na elkaar (waardoor bij bepaalde vragen maar 1 testcase met meerdere testinputs nodig is).
  - **`first line`**: De eerste regel van de invoer geeft het aantal blokken aan
  - **`ends with <string>`**: De invoer wordt afgesloten met een regel die gelijk is aan `<string>`. Dus als bijvoorbeeld `ends with STOP` ingesteld wordt moet de invoer afgesloten worden met een regel die enkel `STOP` bevat.

- **`input block size`**:   String die aangeeft hoe elk blok uit de invoer er uit ziet.

  - **`first line`** (standaard): De eerste regel van het blok geeft aan hoeveel regels er daarna nog in het blok komen; deze eerste regel maakt ook deel uit van de invoer die door de ingediende code moet verwerkt worden.
  - **`ends with <string>`**: Elk blok wordt afgesloten met een regel die gelijk is aan `<string>`. Als er geen string wordt opgegeven dan wordt een lege regel beschouwd als terminator/separator. Als het laatste blok eindigt met `<string>` dan wordt de `<string>` beschouwd als terminator en maakt die deel uit van de eigenlijke invoer die door de ingediende code verwerkt moet worden. In het geval dat het laatste blok niet eindigt met `<string>` wordt `<string>` beschouwd als separator en maakt die geen deel uit van die invoer die door de ingediende code verwerkt moet worden.
  - **`<integer>`**: Elk blok bestaat uit `<integer>` regels.

- **`blockwise execution`**:   Boolean die aangeeft of de output bloksgewijs vergeleken moet worden of niet.
    Dit is standaard `true` en dan wordt er per blok uitvoer gegenereerd en
    vergeleken met de verwachte uitvoer. Als `false` ingesteld wordt zal er
    enkel globaal de gegenereerde en de verwachte output vergeleken worden.

### Parameters om de manier van vergelijken te veranderen

- **`comparison`**:   String die aangeeft hoe de gegenereerde en de verwachte uitvoer vergeleken moet worden

  - **`exact match`**: De twee output moeten exact gelijk zijn.
  - **`ignore extra whitespace`** (standaard): De verwachte en gegenereerde uitvoer moeten gelijk zijn, maar opeenvolgende witruimtekarakters worden gereduceerd tot één enkel witruimtekarakter.
  - **`ignore whitespace`**: De verwachte en gegenereerde uitvoer moeten gelijk zijn maar witruimte wordt genegeerd voor de vergelijking.

- **`ignore fp rounding`**:   Bepaalt hoe floating point getallen vergeleken worden.

  -   `default`: Getallen worden karakter per karakter vergeleken en moeten in alle karakters overeenstemmen.
  -   `getal <e>`: De getallen $n$ en $m$ zijn gelijk als $|n-m| < 10^e$; met andere woorden als $e = -2$ moeten de twee getallen gelijk zijn tot op twee cijfers na de komma.

- **`case sensitive`**:   Boolean die aangeeft of er bij de vergelijking van de gegenereerde en de verwachte uitvoer rekening gehouden moet worden met het verschil tussen hoofdletters en kleine letters. Standaard `true`.

- **`field order sensitive`**:   Boolean die aangeeft of er bij de vergelijking van de gegenereerde en de verwachte uitvoer rekening gehouden moet worden met de volgorde van de velden op een regel. Standaard `true`.

- **`field separator`**:   Veldscheidingsteken dat gebruikt wordt voor de `field order sensitive` instelling. Standaard wordt een opeenvolgende reeks witruimtekarakters als veldscheidingsteken gebruikt.

- **`line order sensitive`**:   Boolean die aangeeft of er bij de vergelijking van de gegenereerde en de verwachte uitvoer rekening gehouden moet worden met de volgorde van de regels. Standaard `true`.

### Definiëren van een eigen evaluatie functie

In het bestand met verwachte uitvoer is er ook de mogelijkheid om een eigen functie te definiëren die evalueert of de oplossing juist of fout is. Deze functie moet als argumenten de verwachte en gegenereerde uitvoer ontvangen en op basis daarvan `True` of `False` teruggeven naargelang de correctheid.

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

De doctest judge gebruikt doctests om de oplossingen van studenten te checken.

### Parameters

- **`used output channel`**:   Zet het output kanaal voor de volledige doctest. Zie [Outputkanalen](#outputkanalen) voor de uitleg rond output kanalen. Standaard gebruiken alle doctests `return` als enige output kanaal. Mogelijke waarden zijn `stdout`, `return` ene `stdout return`.

- **`independent examples`**:   Boolean die aangeeft of alle doctests als afhankelijk of onafhankelijk van elkaar beschouwd moeten worden. (Zie [Uitvoeringscontext](#uitvoeringscontext) voor meer info over uitvoeringscontexten voor de Python Tutor.) Standaard is deze parameter `true` en vormt dus elk statement zijn eigen uitvoeringscontext. Bij `false` worden de statements gebundeld om een uitvoeringscontext te vormen.

### Outputkanalen

De output van een uitvoering wordt gesplitst in kanalen (standaard uitvoer en returnwaarden). Dit verschilt van het standaard doctest gedrag.

Standaard zal de doctest judge enkel returnwaarden vergelijken. Met de parameter vermeld in [Parameters](#parameters) en optievlaggen voor individuele testen kan dit veranderd worden. Zie het volgende voorbeeld:

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
>>> # Als we de 'STDOUT' optievlag toevoegen zal er gecontroleerd worden dat None terugegeven worden.
>>> # Als we zowel de prints als de returnwaarde willen voegen we ze beide expliciet toe:
>>> my_print(5) #doctest: +STDOUT, +RETURN
5
None
>>> my_combination(5) #doctest: +STDOUT, +RETURN
5
5
>>> # Merk op dat de laatste lijn in de verwachte output geïnterpreteerd wordt als de returnwaarde
>>> my_multiline(5) #doctest: +RETURN
5
5
5
>>> # Merk op dat in dit geval de volledige output als de returnwaarde wordt beschouwd,
>>> # en dat de feedback tabel de verwachte en gegenereerde output over meerdere lijnen
>>> # zal tonen
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

Er bestaat één speciale optie vlag die gebruikt wordt wanneer de representatie van een zelf-gedefinieerd object gebruikt wordt. Dit is enkel het geval wanneer deze representatie werd overschreven. Wanneer de vlag geactiveerd wordt zal de (representatie van het object) van de returnwaarde vergeleken worden met de verwachte output. Merk op dat dit enkel nuttig is (en zal werken) wanneer de `__repr__(self)` methode overschreven is. Anders zal het adres van het object opgenomen worden in de representatie (wat voor elke uitvoering zal verschillen).

``` python
>>> class MyObject(object):
...     def __repr__(self):
...         return 'I present to you:\nthe representation of myself'
...
>>> MyObject() #doctest: +REPR
I present to you:
the representation of myself.
```

De `REPR` vlag kan niet gecombineerd worden met andere vlaggen (de vlag overschrijft alle andere vlaggen).

### Vergelijking van output

De hoofdreden voor het opsplitsen van de verschillende output is om toe te laten dat ze op een andere manier vergeleken worden. Returnwaarden worden vergeleken met type en inhoud. Standaard uitvoer (en dus ook tracebacks) worden gecontroleerd door de strings te vergelijken. De vergelijkingsmethode kan veranderd worden met de `OUTPUTPROCESSOR` optie tag. Het verwachte type voor de returnwaarden wordt afgeleid uit het type van de returnwaarde. Alleen als deze types overeenkomen zal de inhoud vergeleken worden. De vergelijking van de inhoud kan nu typespecifiek gebeuren.

Om de vergelijking van de output aan te passen wordt de `OUTPUTPROCESSOR` tag gebruikt. Dit laat toe om een eigen processor te maken. Bijvoorbeeld, voor floats wordt standaard 2 decimalen vergeleken, maar dit kan aangepast worden aar het volgende:

``` python
>>> 0.001 # standaard precisie is 2, dus correct
0.002
>>> 0.001 # precisie wordt op 5 ingesteld, dus incorrect
<OUTPUTPROCESSOR>
DefaultProcessor(expected_type=float, precision=5)
</OUTPUTPROCESSOR>
0.002
```

Merk op dat alle outputprocessors *sticky* gemaakt kunnen worden. Het zou vervelend zijn als er 20 testen waren, telkens met precisie 6 en er voor elk testgeval opnieuw de processor gedefinieerd zou moeten worden. Dit werkt als volgt:

``` python
>>> 0.001 # standaard precisie is 2
0.002
>>> 0.001 # zet precision op 6 en houd dit zo, dus dit zal falen
<OUTPUTPROCESSOR sticky="sticky">
DefaultProcessor(expected_type=float, precision=6)
</OUTPUTPROCESSOR>
0.002
>>> 0.003 # dit zal nog steeds falen
0.004
>>> 0.005 #doctest: +NOSTICKY
0.006
>>> # Deze test was correct, de sticky werd voor een testgeval gecleared met +NOSTICKY
>>> 0.007 # deze test zal opnieuw falen
0.008
>>> 0.005 #doctest: +CLEARSTICKY
0.006
>>> # De test hierboven is geslaagd
```

Een *sticky* outputprocessor definiëren voegt het toe aan de lijst van stickies. Deze stickies zullen toegevoegd worden aan een outputprocessor de expliciet in de tags gedefinieerd werd voor elke test behalve als de `NOSTICKY` vlag gebruikt werd. De `CLEARSTICKY` vlag maakt de lijst van *stickies*\* leeg.

Er zijn nog meer standaard processors, maar deze zijn nogal specifiek. Ze worden allemaal gedefinieerd in `output_processors.py` samen met genoeg documentatie om hun werking en parameters uit te leggen. In het algemeen:

- **`FileContentChecker`**:   Kijkt of een bestand met een gegeven naam bestaat op het lokale file system en of de inhoud correspondeert met dat van een ander bestand. Dit tweede bestand kan zich in het lokale file system bevinden of de inhoud kan van het block gehaald worden (waarbij deze laatste optie voorrang heeft).

  -   `ignoreTrailingNewlines`: Boolean die aangeeft of extra newlines op het einde van de gegenereerde (en de verwachte) uitvoer weggehaald moeten worden.

- **`ImageRenderer`**:   Deze output processor rendert 2-dimensionale matrices als gekleurde afbeeldingen. Als de output correct is zal de matrix getoond worden in de feedbacktabel.

### Outputprocessors definiëren

Om een eigen ouput processor te definiëren introduceren we de `DEFINITION` tag. Deze tag laat toe om wat dan ook te definiëren in de scope van de doctest.

```python
>>> my_new_function() #doctest: STDOUT
<DEFINITION>
def my_new_function():
    print('hello world')
</DEFINITION>
hello world
```

Dit voorbeeld zou uiteraard verwarrend zijn voor studenten, aangezien zij de definities niet kunnen zien, maar wel de test zelf. De tag kan echter gebruikt worden om nieuwe output processors te definiëren. De onderstaande voorbeelden maken de standaard processors vriendelijker. Eerst kort nog een overzicht van de structuur van de standaard processoren:

-   `BasicProcessor`: Zowel het verwerken van standaard uitvoer (`process_stdout`) en de returnwaarde (`process_return`) zetten de status van het block op \"WA\" (*wrong answer*).
-   `OutputComparator(BasicProcessor)`: Overschrijft `process_stdout` en zet de status op \"AC\" (*answer correct*) als de verwachte en de gegenereerde uitvoer gelijk zijn (met het vergelijken van strings). Voegt ook de verwachte en de gegenereerde output toe aan het block zodat ze met een diff kunnen getoond worden in de feedbacktabel.
-   `TypedContentChecker(BasicProcessor)`: Overschrijft `process_return` en zet de status op \"AC\" als het type en de waarden van de verwachte return en de gegenereerde return gelijk zijn. Voegt ook de verwachte en de gegenereerde return toe aan het block na ze te annoteren zodat ze in de feedbacktabel getoond kunnen worden.
-   `DefaultProcessor(OutputComparator, TypedContentChecker)`: Erft over van de vorige twee output processoren en combineert hun functionaliteit: `process_stdout` roept `OutputComparator.process_stdout` op en `process_return` roept `TypedContentChecker.process_return` op.

```python
>>> print('hello') #doctest: STDOUT
<DEFINITION>
class FriendlyOutputComparator(OutputComparator):
    def process_stdout(self, block, expected_output, generated_output, **kwargs):
        retval = super().process_stdout(self, block, expected_output, generated_output, **kwargs)
        if block.status == 'AC':
            block.addMessage("That's a job nice done!")
        else:
            block.addMessage("Nice try, but it's not entirely correct.")
        return retval
</DEFINITION>
hello
>>> 'hello'
<DEFINITION>
class FriendlyTypedContentChecker(TypedContentChecker):
    def process_return(self, block, expected_output, generated_output, expected_type=None, **kwargs):
        retval = super().process_return(self, block, expected_output, generated_output, expected_type=None, **kwargs)
        if block.status == 'AC':
            block.addMessage('That's a job nice done!')
        else:
            block.addMessage('Nice try, but it's not entirely correct.')
        return retval
</DEFINITION>
'hello'
>>> print('hello') or 'hello'
<DEFINITION>
class FriendlyProcessor(DefaultProcessor):
    def process_stdout(self, block, expected_output, generated_output, **kwargs):
        retval = super().process_stdout(self, block, expected_output, generated_output, **kwargs)
        if block.status == 'AC':
            block.addMessage('My God, I love that printing of yours!')
        else:
            block.addMessage('Nice try, but you printed not entirely correct.')
        return retval
    def process_return(self, block, expected_output, generated_output, expected_type=None, **kwargs):
        retval = super().process_return(self, block, expected_output, generated_output, expected_type=None, **kwargs)
        if block.status == 'AC':
            block.addMessage('You return it the way I like!')
        else:
            block.addMessage('I gave you everything, and you return it wrong?')
        return retval
</DEFINITION>
hello
'hello'
```

Enkele opmerkingen:

-   Als de inhoud met een eigen methode vergeleken moet worden kan de `content_check=False` parameter doorgegeven worden aan `super().process_return`. De functie zal dan enkel bepalen of de types overeen komen (en de block status instellen op \"AC\" of \"WA\"). Als de types niet overeenkwamen zal het block ook al annotaties bevatten. Als de types wel overeenkwamen moeten `setExpectedReturn` en `setGeneratedReturn` opgeroepen worden met geannoteerde string als de returns getoond moeten worden. Het is echter ook mogelijk om bijvoorbeeld de feedback te limiteren tot een bericht berekend uit de returns.
-   Gebruik enkel de functionaliteit die je nodig hebt. Als er geen printing verwacht wordt, overschrijf dan `TypedContentChecker`. Elke onverwacht standaard uitvoer zal dan opgevangen worden en juist aan de gebruiker getoond worden. Met de `DefaultProcessor` zou er nog steeds een diff getoond worden, maar de \"onverwachte output\" boodschap zou niet getoond worden.
-   Vergeet niet terug te geven of het antwoord geaccepteerd wordt of niet. `continueUponWrongAnswer` hangt hier van af.
-   Zet de verwacht/gegenereerd paren met `Feedbacktable.setOutputPair(channel, exp, gen)`, waarbij `channel` een van `return`, `stderr` en `stdout` is. Voeg berichten toe aan elk paar met `Feedbacktable.addOutputMessage(channel, message, ...)`.

### Verborgen en niet uitgevoerde testgevallen

In het geval dat je een testgeval wil tonen aan de studenten maar niet uitvoeren kan je de `NOEXEC` vlag gebruiken. Omgekeerd (om een test uit te voeren maar niet te tonen) kan met de `NOSHOW` vlag.

```
>>> 1/0 #doctest: +NOEXEC
"Dit testgeval werd niet uitgevoerd"
>>> get_password() $doctest: +NOSHOW
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
    <fixed from="&quot;    just use it.&quot;" to="&quot;    gebruik het dan toch gewoon.&quot"/>
</LANGUAGE>
```

De mogelijke types substitutie zijn `function`, `method`, `class`, `kwarg`, `fixed` en `regex`. Bij `kwarg` zullen de namen van keyword argumenten vervangen worden. `fixed` zorgt voor letterlijke substituties zonder extra grenzen.

Elke substitutie tag heeft ook een optionele parameter `detect` die standaard `true` is. Dit betekent dat de `to` parameter van de tag ook gebruikt wordt om de taal te detecteren. Als `detect` echter op `false` ingesteld staat wordt de substitutie genegeerd om de taal te detecteren.

Zodra de taal gedetecteerd wordt is het vertalen volledig automatisch. De taal moet echter wel gedetecteerd worden. De gedetecteerde taal is de taal met de meeste woorden in de globale scope als er een met meer dan 0. Als er geen woorden gevonden worden wordt er geen vertaling of selectie uitgevoerd.

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

Deze tag heeft drie vormen. Elke vorm zal er voor zorgen dat de naam van het bestand als link naar de inhoud van het bestand in de feedbacktabel terechtkomt. Als de optionele `href` parameter niet is ingevuld zal de inhoud van het bestand getoond worden met een popup. Dit kan voor grote bestanden tot lange wachttijden leiden, aangezien de inhoud twee keer in de feedbacktabel verwerkt zit. Voor grote bestanden kan dus de `href` parameter gebruikt worden. Dit zal er voor zorgen dat de naam van het bestand een link is naar een download van het bestand. Als de `href` parameter leeg is zal er geen link zijn naar de inhoud van het bestand.

-   Ingebed

    ``` python
    >>> filestring = open('text.txt', 'r').read()
    <FILE name="text.txt">
    This will be the content of text.txt.
    </FILE>
    ```

    Met de eerste vorm, zoals hierboven getoond, kan je je bestanden inbedden in
    de testdefinities. In plaats van deze code zal `filestring = StringIO("""This is the content of text.txt""").read()` uitgevoerd worden. Voor de student
    wordt de originele code nog getoond worden.

-   Open bestaand bestand

    Deze vorm zorgt voor bestaande bestanden. Zo kan de inhoud gelinkt worden aan
    de popup.

    ``` xml
    <FILE name="text.txt" src="/temp/text.txt" />
    ```

    Het `src` attribuut bevat de eigenlijke locatie van het bestand. Als dit
    leeg is gebruiken we `name` als pad naar het bestand.

-   Open nieuw bestand

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

Om het gebruik van de Python Tutor toe te laten voor oefeningen met bestanden moet een `FILE` tag gebruikt worden. Als het geen ingebed bestand is moet er ook een (geldig) `href` attribuut aanwezig zijn. In dit laatste geval zal de Python Tutor ook enkel werken als de oefening publiek is.

### Uitvoeringscontext

Wanneer een sessie wordt opgestart van de Online Python Tutor voor het huidige statement, kan de uitvoering van het statement afhankelijk zijn van vroeger uitgevoerde statements. Daarom hebben we het concept van een uitvoeringscontext geïntroduceerd. De uitvoeringscontext kan op twee manieren aangepast worden.

De parameter `independent examples` geeft aan of elk statement zijn eigen uitvoeringscontext vormt. Als deze parameter `True` is (de standaardwaarde) dan zal elk statement apart uitgevoerd worden en enkel het huidige statement zal aan de broncode toegevoegd worden wanneer de Python Tutor opgestart wordt. Als de parameter `False` is zullen standaard alle statements een uitvoeringscontext vormen. Met de vlag `NEWCONTEXT` kan een nieuwe context gestart worden.

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

### Namespaces

Doctests kunnen conditioneel uitgevoerd worden afhankelijk van of sommige namen gedefinieerd zijn in de globale namepace of sommige namespaces in de globale namespace. Dit kan door een (enkele) `NAMESPACE` tag aan de doctest toe te voegen.

De elementen van de `NAMESPACE` tag beschrijven condities op meerdere benoemde objecten. Elk element heeft een verplicht `name` attribuut, resulterend in een test of de naam bestaat in de ingesloten namespace (`NAMESPACE` of `CLASS`) en het correcte type heeft (zoals gegeven door de naam van de tag).

De namespace testen worden uitgevoerd in de volgorde zoals ze in de `NAMESPACE` tag staan. Vanaf er een test faalt stopt de uitvoering van doctest en de volgende namespace testen. Maar één block zal getoond worden met de foutboodschap van het blok dat faalde.

Namespace testen zijn altijd *sticky* in dat een gefaalde namespace test de huidige doctest en alle volgende doctesten niet uitvoert toet er een doctest wordt gevonden met een eigen `NAMESPACE` tag (en deze tag het `extend` attribuut niet op `true` heeft staan).

De `arg` attributen van `FUNCTION` en `METHOD` zijn op een generieke manier geïmplementeerd en refereren naar de suffixen van de `function.__code__.co_` attributen. Bijvoorbeeld `names` kan gebruikt worden om te controleren dat de functie zelf alle verplichte functie oproept. De waarde in het argument wordt geëvalueerd als een python object.

``` xml
<NAMESPACE extends="true|false">
    <FUNCTION name="function_name" args="arg1,arg2" names="function1,function2"/>
    <CLASS name="Classname1">
        <METHOD name="method_name" args="arg5" names="function3"/>
    </CLASS>
</NAMESPACE>
```

De attributen zijn als volgt:

- **`extends`**: Wanneer een nieuwe namespace tag aangetroffen wordt met `extends="true"` worden de testen in de nieuwe namespace tag enkel uitgevoerd als er geen vorige namespace fouten waren.
- **`name`**: Naam van de functie/methode/klasse die aanwezig moet zijn in de namespace. Dit veld is verplicht.
- **`args`**: De verplichte argumenten die aanwezig moeten zijn in de definitie
- **`names`**: De verplichte functies/methoden die moeten opgeroepen worden in de functie/methode.
