---
title: TESTed DSL
description: "TESTed DSL testplannen"
---

# Documentatie TESTed DSL
Een DSL-testplan voor TESTed wordt beschreven met behulp van de YAML-syntaxis.
Daarnaast volgt de DSL in grote mate de structuur waarmee Dodona de testen beschrijft.
Het volgende codefragment stelt de structuur van DSL-testplannen weer.
Hierbij stelt het gebruik van vierkante haakjes lijsten van objecten voor.

```text
. # Met top-level
├ namespace
├ config
│ ├ stdout
│ │ ├ ignoreWhitespace
│ │ ├ caseInsensitive
│ │ ├ tryFloatingPoint
│ │ ├ applyRounding
│ │ └ roundTo
│ └ stderr
│   └ ... # identiek aan stdout
├ disable_optimizations
└ tabs[]
  ├ config
  │ └ ... # identiek aan de config hierboven
  ├ tab
  └ contexts[]
    ├ config
    │ └ ... # identiek aan de config hierboven
    ├ files[]
    │ ├ name
    │ └ url
    ├ arguments
    ├ stdin
    ├ exception
    ├ exit_code
    ├ stderr
    ├ stdout
    └ testcases[] # Kan weggelaten worden wanneer de context maar één testgeval
      │           # bevat, dus ook geen contexttestgeval.
      ├ files[]
      │ └ ... # identiek aan de files hierboven
      ├ statement
      ├ exception
      ├ return     # ofwel 'return' ofwel 'return-raw'
      ├ return-raw # ofwel 'return' ofwel 'return-raw'
      ├ stderr
      └ stdout
      
[] # zonder top-level
└ ... # identiek aan de tabs hierboven
```

In de volgende paragrafen zullen we met behulp van voorbeelden de DSL beschrijven.

## Eenvoudige invoer-uitvoer
De eerste soort oefeningen zijn invoer-uitvoeroefeningen.
We zullen een voorbeeld testplan bekijken voor een oefening die één regel op standaardinvoer verwacht en deze terug wegschrijft naar standaarduitvoer.

```yaml
- tab: "Feedback"
  contexts:
  - stdin: "invoertekst-0"
    stdout: "invoertekst-0"
  - stdin: "invoertekst-1"
    stdout: "invoertekst-1"
```

De volgende figuur visualiseert het vorige codefragment op Dodona.
Deze figuur heeft extra annotaties van de vorm `[0].testcases[0].stdin`, deze annotaties stellen een pad voor naar een object uit het testplan.
Interpretatie: `[0]` het eerste tabblad, `contexts[0]` de eerste context, `stdin` de gegeven invoer op standaardinvoer en `stdout` de verwachte uitvoer op standaarduitvoer.

![Visualisatie Dodona echo oefening](./echo.png)

### Beschrijving

#### Objecten
`yaml` maakt gebruik van objecten om data weer te geven.
Er wordt gebruikgemaakt van **inspringsniveaus** om verschillende objecten in elkaar te kunnen **nesten**.
Objecten bestaan uit sleutel-waardeparen, waarbij de **sleutel** een string is zonder witruimte die moet **eindigen op een dubbelepunt**.
De waarden kunnen zowel andere objecten zijn alsook tekst, getallen, logische waarden en lijsten.

#### Lijsten
Wanneer je gebruik wilt maken van lijsten, moet de **eerste sleutel** van elk object in de lijst **voorafgegaan** worden door een **liggend streepje** gevolg door een **spatie**.

#### Testplan
De structuur van de testplannen is een lijst op het hoogste niveau waarin tabblad-objecten bevat zijn.

#### Tabblad
De eerste verplichte sleutel van een tabblad is `tab`.
Deze verwacht een string met de naam van het tabblad, zoals weergegeven op Dodona.
De tweede sleutel van een tabblad is `contexts`, deze verwacht een lijst met alle contexten die uitgevoerd moeten worden.

#### context
Een context is een onafhankelijk uitgevoerde testsequentie.
Voorlopig hebben we enkel een voorbeeld van invoer-uitvoer testen.

##### stdin
Het sleutelwoord `stdin` wordt gebruikt om de standaardinvoer op te geven voor een testgeval.

##### stdout
Het sleutelwoord `stdout` wordt gebruikt om de verwachte standaarduitvoer op te gegeven voor een testgeval.
Voor deze uitvoer raden we aan om strings te gebruiken.
Getallen en booleaanse waarden worden ook ondersteund, maar zullen worden vertaald naar strings.
We zullen naar deze datatypes refereren als tekstuele datatypes.

## Multi-tab en multi-line
We zullen nu het testplan uitbreiden met multi-line strings en meerdere tabbladen.
Hiervoor zullen we gebruikmaken van de oefening [Boeketje rozen](https://dodona.ugent.be/nl/courses/27/activities/1047652305/).

```yaml
- tab: "Kleiner dan"
  contexts:
  - stdin: |
      100
      53
      <
    stdout: |
      2
      51
      49
- tab: "Groter dan"
  contexts:
  - stdin: "34\n4\n>\n"
    stdout: "2\n2\n32\n"
```

Door een weergave probleem op Dodona, zijn de newlines in de beschrijvingen in de volgende figuren vervangen door spaties.
<p float="left">
  ![Boeketje rozen Kleiner Dan](./boeketje_rozen_KleinerDan.png)
  ![Boeketje rozen Groter Dan](./boeketje_rozen_GroterDan.png)
</p>

### Beschrijving

#### Multi-line
Zoals zichtbaar in het testplan uit het codefragment, heeft YAML verschillende manieren om multi-line strings te ondersteunen.
Ten eerste de klassieke escape-string en een tweede notatie met ‘|’.
De klassieke escape-string biedt de meeste controle aan de gebruiker in verband met het gebruik van witruimte in de tekst.

::: tip Tip
Voor meer informatie over multi-line zie paragraaf [Bekende valkuilen](#bekende-valkuilen).
:::

#### Multi-tab
Zoals uit het voorbeeld duidelijk is, kun je dus ook meerdere tabbladen gebruiken.

## Commandolijn-argumenten, standaardfout en exitcode
We zullen nu commandolijn-argumenten, standaardfout en de exitcode toevoegen aan het testplan.
Hierbij zullen we een testplan bekijken voor een fictieve oefening van een simpele rekenmachine voor gehele getallen.

```yaml
- tab: "Som"
  contexts:
  - arguments: [ "-a", "5", "20" ]
    stdout: "25"
  - arguments: [ "-a", "alpha", "beta" ]
    stderr: "'alpha' en 'beta' zijn geen geldige getallen"
    exit_code: 1
- tab: "Verschil"
  contexts:
  - arguments: [ "-s", "5", "20" ]
    stdout: "-15"
  - arguments: [ "-s", "5", "20" ]
    stdin: "Willekeurige invoer"
    stderr: "Er wordt geen invoer verwacht op stdin"
    exit_code: 1
- tab: "Product"
  contexts:
  - arguments: [ "-m", "25", "5" ]
    stdout: "125"
- tab: "Deling"
  contexts:
  - arguments: [ "-d", "25", "5" ]
    stdout: "5"
  - arguments: [ "-d", "25", "0" ]
    stderr: "Gehele deling door nul"
    exit_code: 2
```

### Beschrijving

#### arguments
Dit is een lijst met de commandolijn-argumenten die meegegeven moet worden aan het programma voor het testgeval.

:::tip Tip
We raden aan om strings te gebruiken voor deze argumenten maar ook de tekstuele types worden ondersteund.
:::

#### stderr
Hierbij wordt de verwachte standaardfout opgegeven voor een testgeval.
Dit is analoog aan `stdout`.

#### exit_code
Hierbij wordt de verwachte exitcode van het programma opgegeven voor een testgeval.
Dit is een geheel getal.

## Configuratieopties
De volgende stap is het toevoegen van configuratieopties voor standaarduitvoer en standaardfout.
Hiervoor zullen we gebruikmaken van de oefening [Hoe slim ben jij?](https://dodona.ugent.be/nl/courses/392/series/3920/activities/726249058/).

```yaml
namespace: "solution"
disable_optimizations: true
tabs:
- tab: "Hoe slim ben jij?"
  config:
    stdout:
      ignoreWhitespace: true
      tryFloatingPoint: true
  contexts:
  - stdin: "8809"
    stdout: "6"
  - config:
      stdout:
        caseInsensitive: false
    stdin: 7111
    stdout: 0
  - stdin: "2172"
    stdout:
      data: "0"
      config:
        applyRounding: true
        roundTo: 10
```

### Beschrijving

#### namespace
Standaard gebruikt TESTed `submission` als namespace voor een oplossing.
Dit is bijvoorbeeld in Java echter ook de naam van de klasse die gebruikt moet worden. 
Wanneer je echter als lesgever wilt dat de studenten een klasse schrijven, zal je meestal de namespace zelf willen bepalen.
Hiervoor kun je dus de namespace instellen.
Voor de namespace gebruikt je best `snake_case` zodat voor elke programmeertaal de juiste stijlconventie gevolgd kan worden.

#### disable_optimizations
TESTed gebruikt standaard aan aantal optimalisatie technieken om de uitvoertijd in te korten.
Deze optimalisatie technieken kunnen echter tot gevolg hebben dat de geoptimaliseerde code tot ongewenste resultaten kan leiden.
Daarom kan de gebruiker deze optimalisaties uitschakelen voor het volledige testplan, moest dit nodig zijn.

#### tabs
Wanneer je de `namespace`, `disable_optimizations` of globale configuratie wenst op te geven, moet je verplicht het sleutelwoord `tabs` gebruiken om de tabbladen op te lijsten.

#### Tekstuele types
Het tweede testgeval in het testplan voor __Hoe slim ben jij?__, illustreert dat standaardinvoer en standaarduitvoer niet noodzakelijk strings moeten zijn.
In dit geval zijn het gehele getallen maar ook logische waarden en vlottende kommagetallen zijn mogelijk (de tekstuele types).

::: warning Opmerking
Om problemen te vermijden raden we aan om strings te gebruiken voor standaardinvoer, standaarduitvoer en standaardfout.
Dit komt omdat de tekstuele types omgezet zullen worden naar strings.
Voor meer informatie over de vertaling van tekstuele types zie paragraaf [Bekende valkuilen](#bekende-valkuilen).
:::

#### Configuratie
De mogelijkheid bestaat om configuratieopties mee te geven voor de verwerking van standaarduitvoer en standaardfout.
Deze opties zijn:

- **ignoreWhitespace**:
  Negeer witruimte voor- en achteraan de tekst bij het vergelijken van de uitvoer.
- **caseInsensitive**:
  Vergelijk de uitvoer hoofdletterongevoelig.
  Dus zonder een onderscheid te maken tussen hoofdletters en kleine letters.
- **tryFloatingPoint**:
  Probeer de uitvoer te vergelijken als vlottende kommagetallen.
- **applyRounding**:
  Pas afronding toe bij het vergelijken van de uitvoer als vlottende kommagetallen.
- **roundTo**:
  Het aantal getallen na de komma dat je wenst te behouden na afronding.
  Verplicht op te geven wanneer je afronding wenst toe te passen.

Je kunt een configuratie opgeven globaal, per tabblad, per context en/of specifiek per uitvoer.
Deze configuratieopties worden geaccumuleerd, waarbij telkens de optie op de meeste specifieke positie (globaal < tabblad < context < testcase) behouden wordt.

- **Globaal**:
  Globaal worden de opties per uitvoerstroom opgegeven in het object horende bij de optionele sleutel `config`.
  Dit object heeft twee sleutels `stdout` (opties voor standaarduitvoer) en `stderr` (opties voor standaardfout), waarbij minstens één sleutel opgegeven moet worden.
- **Tabblad**:
  Identiek aan __globaal__.
- **Context**:
  Identiek aan __globaal__.
- **Specifiek**:
  Wanneer je voor één test een specifieke configuratie wil gebruiken, geef je in plaats van de waarde een object op.
  Testgeval 3 uit het codefragment is hier een voorbeeld van.
  Dit object heeft twee verplichte sleutels:
  - **data**:
    De waarde waarmee vergeleken moet worden.
  - **config**:
    Het object met de configuratieparameters.

## Eenvoudige functieoproepen
We zullen nu eerst een testplan bekijken voor eenvoudige functieoproepen.
Het testplan dat we zullen bekijken is voor de oefening [Spoorhekcodering](https://dodona.ugent.be/nl/courses/392/series/3922/activities/444829407/).

```yaml
- tab: "Encode"
  contexts:
  - expression: 'encode("And now for something completely different.", 4)'
    return: "Awsimlf.no  ohnopeyfetdnfrmtgclt irn oe ede"
  - expression: 'encode("Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", 1)'
    return-raw: '"Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present."'
- tab: "Decode"
  contexts:
  - expression: 'decode("Awsimlf.no  ohnopeyfetdnfrmtgclt irn oe ede", 4)'
    return: "And now for something completely different."
  - expression: 'decode("Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", 1)'
    return: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present."
```

![Spoorhekcodering Encode](./spoorhekcodering_encode.png)
![Spoorhekcodering Decode](./spoorhekcodering_decode.png)

### Beschrijving

#### Expressie
Bij functieoproeptesten is de invoer een statement of expressie (beiden kunnen gebruik maken van één van de twee sleutelwoorden: `expression` of `statement`) in een testgeval uit een context.

::: tip Tip
Statements en expressies worden uitvoerig besproken in paragraaf [Statements, expressies en return-raw](#statements-expressies-en-return-raw).
:::

#### Returnwaarden
We hebben twee verschillende manieren om de verwachte waarde van een expressie te noteren.
Ofwel gebruikt je het `return`, ofwel gebruik je `return-raw`.

- **return**:
  Hierbij wordt de verwachte waarde van de expressie genoteerd met behulp van YAML-objecten.
  De YAML-datatypes zullen vertaald worden naar de basisdatatypes van TESTed.
- **return-raw**:
  Hierbij wordt de verwachte waarde van de expressie genoteerd met behulp van dezelfde grammatica als voor statements en expressies (zie paragraaf [Statements, expressies en return-raw](#statements-expressies-en-return-raw)).

::: warning Opmerking
Wanneer je een functie wil testen die geen returnwaarde heeft (niet de waarde `null`,
bijvoorbeeld `void` in Java),
mag je geen `return` of `return-raw` opgeven.
:::

## Variabeletoekenningen
We zullen nu een testplan bekijken waarbij we ook waarden aan een variabele toekennen.
Hiervoor maken we gebruik van de voorbeeld oefening [Objects](https://github.com/dodona-edu/universal-judge/tree/master/exercise/objects) van TESTed.

```yaml
namespace: "equal_checker"
tabs:
- tab: "Feedback"
  contexts:
  - testcases:
    - statement: 'instance = new EqualChecker(5)'
    - expression: 'instance.check(25)'
      return: false
    - expression: 'instance.check(5)'
      return: true
```

![Objects](./equal_checker.png)

### Beschrijving
Binnen een context kunnen we verschillende testgevallen definiëren die afhankelijk zijn van elkaar.
In dit voorbeeld creëren we eerste een object, waarna er functies op dat object kunnen opgeroepen worden.

Dit is de belangrijkste reden om een onderscheid te maken tussen contexten en testgevallen.
Waarbij contexten onafhankelijk van elkaar uitgevoerd kunnen worden, kunnen testgevallen binnen één context afhankelijk van elkaar zijn.

#### Testcases
Om meerdere testgevallen in context te kunnen plaatsen, moet er gebruik gemaakt worden van het sleutelwoord `testcases`.
Deze lijst bevat de sequentieel afhankelijke testgevallen.

Wanneer je naast de code zelf (of `main`-methode), ook een/meerdere functieoproeptest(en) wenst te evalueren, moet er ook gebruik gemaakt worden van de lijst van testgevallen.

## Foutboodschappen
Een concept dat vaak gebruikt wordt in programmeertalen zijn fouten die opgegooid kunnen worden.
Onze testplannen kunnen foutboodschappen verwachten, niet te verwarren met fouttypes (die programmeertaalafhankelijk zijn).
Hiervoor bekijken we een testplan voor de functie ‘division’.

```yaml
- tab: "Delen"
  contexts:
  - statement: 'division(9, 0)'
    exception: "Deling door nul"
```

### Beschrijving

#### exception
Hier wordt de verwachte foutboodschap opgegeven als tekstueel type.

## Linken bestanden
Bij sommige programmeeroefeningen moeten de studenten invoer lezen vanuit bestanden.
Bij de evaluatie feedback wil je de student vaak de mogelijkheid bieden om de inhoud van deze bestanden te kunnen bekijken.
Hiervoor kun je op het niveau van een context en/of testgeval een lijst meegeven van alle bestanden die gelinkt moeten worden.

```yaml
- tab: "Count"
  contexts:
  - statement: 'count_valid_passports("passports01.txt")'
    return: 2
    files:
    - name: "passports01.txt"
      url: "media/workdir/passports01.txt"
```

![Linken bestanden](./link_files.png)

### Beschrijving

#### files
Op het niveau van een context en/of testgeval kun je een lijst opgeven met de gelinkte bestanden.

#### name
Naam van het bestand.

#### url
Relatief pad naar het bestand, in de description map van de oefening.

## Verborgen tabbladen
Dodona biedt ondersteuning om tabbladen te verbergen.
Deze is echter wel zichtbaar wanneer dit tabblad fouten bevat.
Hiervoor kun je de optie `hidden` meegeven aan een tabblad die een booleaanse waarde verwacht.

```yaml
- tab: "Hidden"
  hidden: true
  contexts:
  - stdin: "zero"
    stdout: "0\n"
- tab: "Visible"
  hidden: false
  contexts:
  - stdin: "one"
    stdout: "1\n"
```

![Fout in verborgen tabblad](./hidden.png)

## Combinatie van functieoproepen en invoer-uitvoer
We hebben nu telkens testplannen bekeken voor ofwel invoer-uitvoer ofwel functieoproepen.
We kunnen deze echter combineren in één testplan.
We zullen hiervoor een basisrekenmachine bekijken.
YAML ondersteunt ook commentaar.
Hierbij wordt de regel voorafgegaan door een hekje (#).

```yaml
# Testen som van twee getallen
- tab: "Som"
  contexts:
  - arguments: [ "-a", "5", "20" ]
    stdout: "25"
    testcases:
    - statement: 'add(4, 16)'
      return: 20
# Testen verschil van twee getallen
- tab: "Verschil"
  contexts:
  - arguments: [ "-s", "5", "20" ]
    stdout: "-15"
    testcases:
    - statement: 'sub(4, 16)'
      return: -12
# Testen product van twee getallen
- tab: "Product"
  contexts:
  - arguments: [ "-m", "25", "5" ]
    stdout: "125"
    testcases:
    - statement: 'mul(4, 16)'
      return: 64
# Testen deling van twee getallen
- tab: "Deling"
  contexts:
  - arguments: [ "-d", "25", "5" ]
    stdout: "5"
    testcases:
    - statement: 'div(32, 8)'
      return: 4
  - arguments: [ "-d", "25", "0" ]
    stderr: "Gehele deling door nul"
    exit_code: 1
    testcases:
    - statement: 'div(1, 0)'
      exception: "Gehele deling door nul"
```

## Statements, expressies en return-raw
Hieronder zullen we de grammatica voor de statements, expressies en returnwaarden bespreken.

### Naamgeving
Constructor-, functie- en variabelenamen kunnen enkel bestaan uit kleine en hoofdletters uit het alfabet (zonder accenten), cijfers en een liggend streepje en mogen niet beginnen met een cijfer.

### Datatypes
Onze grammatica biedt ondersteuningen voor alle datatypes van tested, zie onderstaande tabel.

| datatype | Uitleg |
| -------- | ------ |
| nothing  | Datatype nullwaarden |
| boolean  | Datatype booleaanse waarden |
| text     | Standaard datatype voor tekst |
| char     | Datatype enkel karakter |
| integer  | Standaard datatype voor gehele getallen  |
| uint8    | Datatype 8 bit natuurlijke getallen |
| int8     | Datatype 8 bit gehele getallen |
| uint16   | Datatype 16 bit natuurlijke getallen |
| int16    | Datatype 16 bit gehele getallen |
| uint32   | Datatype 32 bit natuurlijke getallen |
| int32    | Datatype 32 bit gehele getallen |
| uint64   | Datatype 64 bit natuurlijke getallen |
| int64    | Datatype 64 bit gehele getallen |
| bigint   | Datatype grote gehele getallen (>64 bit) |
| rational | Standaard datatype voor rationale getallen |
| single   | Datatype 32-bit vlottende kommagetallen |
| double   | Datatype 64-bit vlottende kommagetallen |
| extended | Datatype hoge precisie vlottende kommagetallen |
| fixed    | Datatype rationale getallen met vaste precisie |
| sequence | Standaard datatype voor sequenties |
| list     | Datatype lijsten (sequentie, dynamische lengte) |
| array    | Datatype arrays (sequentie, vaste lengte) |
| tuple    | Datatype tuples |
| set      | Datatype verzamelingen |
| map      | Datatype dictionaires (afbeeldingen) |

### Waarden
De grammatica ondersteunt getallen, booleaanse waarden, nullwaarden en strings.

#### Getallen
Zowel gehele getallen als rationale getallen worden ondersteund.
Gehele getallen gebruiken altijd de decimale notatie (bv: `2020`, `+5`, `−2`).
Rationale getallen kunnen zowel de decimale (bv: `2.5`) als exponentiële (bv: `27.15e2`, `−2e−2`) notatie gebruiken.

#### Booleaanse waarden
De twee booleaanse waarden zijn `true` (waarheidswaarde waar) en `false` (waarheidswaarde vals).

#### Nullwaarden
`null` en `undefined` stellen allebei nullwaarden voor.

#### Strings
Tekst of strings worden genoteerd met behulp van dubbele aanhalingstekens waarbij de speciale karakters ge-escaped worden met behulp van een backslash.
In onderstaande tabel is er overzicht van deze speciale karakters.

| Beschrijving | Escape sequentie |
| ------------ | ---------------- |
| Backslash | `\\` |
| Enkele quote | `\'` |
| Dubbele quote | `\"` |
| ASCII Bell | `\a` |
| ASCII Backspace | `\b` |
| ASCII Formfeed | `\f` |
| ASCII Linefeed | `\n` |
| ASCII Carriage Return | `\r` |
| ASCII Horizontal tab | `\t` |
| ASCII Vertical tab | `\v` |
| Octaal karakterwaarde | `\ooo` |
| Hexadecimale karakterwaarde | `\xhh` |
| 16-bit unicode karakterwaarde | `\uhhhh` |
| 32-bit unicode karakterwaarde | `\Uhhhhhhhh` |
| Genaamde unicode karakter | `\N{name}` |

#### Collecties
Er bestaan verschillende soorten collecties: sequenties, verzamelingen, tuples en dictionaires.
Wanneer collecties gebruikt worden in expressies en statements kunnen de gegevens in deze collecties zowel waarden als expressies bevatten.
Voor de **returnwaarden** kunnen collecties enkel waarden bevatten en **geen expressies**.
Daarnaast kunnen de waarden in deze collecties heterogeen (verschillende datatypes) zijn.

##### Sequenties
Een geordende veranderlijke collectie van objecten.
Deze worden genoteerd met behulp van vierkante haakjes en kunnen leeg zijn.
Enkele voorbeelden:
```javascript
[5, 7, 8]
[5, 7.5, true, "text", null]
[random()]
[]
```

##### Tuples
Een geordende onveranderlijke collectie van gegevens.
Deze worden genoteerd met behulp van ronde haakjes en kunnen leeg zijn.
Enkele voorbeelden:
```javascript
(5, 7, 8)
(5, 7.5, [true, "text"], null)
(random())
()
```

##### Verzamelingen
Een veranderlijke ongeordende collectie van unieke onveranderlijke objecten.
Deze worden genoteerd met behulp van accolades.
Lege verzamelingen moet op een specifieke manier genoteerd worden omdat de dictionairies ook accolades gebruiken voor de notatie.
Enkele voorbeelden:
```javascript
{5, 7, 8}
{5, 7.5, (true, "text")}
{random()}
```

::: warning Opmerking
Niet elke programmeertaal ondersteunt elke datatype als verzamelingselement.
:::

##### Dictionaries
Een veranderlijke ongeordende collectie van sleutel-waarde paren.
Waarbij de sleutels onveranderlijk zijn, de waarden kunnen zowel veranderlijk als onveranderlijk zijn.
Deze worden zoals verzamelingen genoteerd met behulp van accolades en kunnen leeg zijn.
Zowel de sleutels als de waarden van deze afbeeldingen zijn kunnen van elk datatype zijn.
Enkele voorbeelden:
```javascript
{}
{"first": 5}
{"size": 5, "precision": 0.75, "rounding active": true}
{0: random(), get_id(): get_username()}
```

::: warning Opmerking
Niet elke programmeertaal ondersteunt elke datatype als sleutelwaarde.
:::

#### Casten
Onze grammatica ondersteunt de mogelijkheid om de waarden (geen expressies) te ‘casten’ naar een specifiek datatype.
Hiervoor gebruiken we de notatie `<Waarde> :: <Datatype>`.
Een lege verzameling kunnen we bijvoorbeeld op de volgende manier noteren:
```haskell
[] :: set
() :: set
{} :: set
```

### Functies
De argumenten van een functieoproep worden genoteerd tussen ronde haakjes.
Een functieoproep kan zowel slaan op een globale functie of een objectfunctie.
Bijvoorbeeld:
```javascript
add(5, 2)
object.get_name()
get_element(4, ["first", 2, 3.4])
```

### Constructor
Constructors lijken sterk op functieoproepen, maar worden voorafgegaan door het sleutelwoord `new`.
Bijvoorbeeld:
```javascript
new Counter()
new object.Pair("Paar", 8.4e-5)
```

### Expressie
Onder expressies verstaan we waarden, functieoproepen, constructors en variabelen (en eigenschappen).

### Variabeletoekenning
Om variabelen te kunnen gebruiken, moeten we er natuurlijk waarden aan kunnen toewijzen.
Bij constructors en waarden kan het datatype afgeleid worden en moet het niet specifiek opgegeven worden.
Bij functieoproepen daarentegen moet het datatype expliciet opgegeven worden.
Bijvoorbeeld:
```javascript
Counter counter = new Counter()
pair = new object.Pair("Paar", 8.4e-5)
text value = get_value(0, pair)
number = 5 :: int8
```

## Bekende valkuilen

### Sleutels
Vergeten van het dubbelepunt na een sleutelnaam in de YAML-syntaxis.
Voorbeeld:

Fout:
```yaml
- tab "Feedback"
```

Gecorrigeerd:
```yaml
- tab: "Feedback"
```

### Lijsten
Hierbij is het vergeten van het liggend streepje en spatie bij lijstelementen.
Of teveel gebruiken van liggende streepjes waardoor er meer elementen in de lijst zitten dan gewenst.
Voorbeeld:

Fout:
```yaml
- tab: "Feedback"
- contexts:
  - stdin: "input-0"
    stdout: "output-0"
    stdin: "input-1"
    stdout: "output-1"
```

Gecorrigeerd:
```yaml
- tab: "Feedback"
  contexts:
  - stdin: "input-0"
    stdout: "output-0"
  - stdin: "input-1"
    stdout: "output-1"
```

### Tekst
De verschillende manieren om strings te noteren in YAML.
Dit komt doordat al deze notaties een andere manier hebben om te gaan met witruimte.
::: tip Tip
Om verwarring en problemen te vermijden raden we aan om de notatie van de dubbele aanhalingstekens te gebruiken wanneer je tekstuele waarden wilt opgegeven.
Hierbij kun je speciale karakters escapen om bijvoorbeeld regeleindes aan te geven.
Wanneer je statements, expressies en ruwe returnwaarden wilt opgegeven, raden we aan om enkele aanhalingstekens te gebruiken omdat deze geen escaping toepast.
:::
Wanneer je toch een andere notatie wilt gebruiken, vind je hieronder een overzicht van de verschillende notaties en de vertaling in JSON.

#### Enkele aanhalingstekens
Bij enkele aanhalingstekens worden er geen karakters ge-escaped.
Alleen de single quote moet ge-escaped worden door te herhalen.
Voorbeeld YAML:
```yaml
single: 'data''\ndata'
```

Vertaling JSON:
```json
{"single": "data'\\ndata"}
```

#### Dubbele aanhalingstekens
Bij dubbele aanhalingstekens worden karakters wel ge-escaped.
Voorbeeld YAML:
```yaml
double: "data\ndata"
```

Vertaling JSON:
```json
{"double": "data\ndata"}
```

#### Unquoted
Wanneer unquoted strings gebruikt worden, zullen er geen karakters ge-escaped worden.
Voorbeeld YAML:
```yaml
unquoted: data \ data
```

Vertaling JSON:
```json
{"unquoted": "data \\ data"}
```

#### Multi-line Unquoted
Bij multi-line unquoted strings wordt een enkele newline-karakter vervangen door een spatie en wordt de witruimte rond elke regel getrimd.
Een volledige lege regel wordt vervangen door een newline-karakter.
Voorbeeld YAML:
```yaml
multi unquoted:
  line1
    line2
  line3

  line4


  line5
```

Vertaling JSON:
```json
{"multi unquoted": "line1 line2 line3\nline4\n\nline5"}
```

#### Multi-line enkele aanhalingstekens
Dit lijkt sterk op de multi-line unquoted strings.
Voorbeeld YAML:
```yaml
multi single quoted: 'line1''\nline1a
    line2
  line3

  line4


  line5'
```

Vertaling JSON:
```json
{"multi single quoted": "line1'\\nline1a line2 line3\nline4\n\nline5"}
```

#### Multi-line dubbele aanhalingstekens
Dit lijkt sterk op de multi-line unquoted strings maar er kunnen karakters ge-escaped worden.
Voorbeeld YAML:
```yaml
multi double quoted: "line1\nline1a
    line2
  line3

  line4


  line5"
```

Vertaling JSON:
```json
{"multi double quoted": "line1\nline1a line2 line3\nline4\n\nline5"}
```

#### literal block
YAML ondersteunt verschillende bloknotaties waarbij nieuwe regels bewaard blijven.
Hierbij wordt de insprong, die afwijkt van de uitlijning niet weg getrimd.
Ook wordt er geen escaping toegepast.

##### Standaard (`|`)
Verwijdert elke lege regel op het einde van de string, maar behoudt één newline-karakter op het einde van de string.
Voorbeeld YAML:
```yaml
literal: |
  line1a\nline1b
    line2
  # not a comment
  end

# end of statement
```

Vertaling JSON:
```json
{"literal": "line1a\\nline1b\n  line2\n# not a comment\nend\n"}
```

##### Keep (`|+`)
Behoudt elke lege regel op het einde van de string.
Voorbeeld YAML:
```yaml
literal: |+
  line1a\nline1b
    line2
  # not a comment
  end

# end of statement
```

Vertaling JSON:
```json
{"literal": "line1a\\nline1b\n  line2\n# not a comment\nend\n\n"}
```

##### Trim (`|-`)
Verwijdert elke lege regel op het einde van de string en heeft ook geen newline-karakter op het einde van de string.
Voorbeeld YAML:
```yaml
literal: |-
  line1a\nline1b
    line2
  # not a comment
  end

# end of statement
```

Vertaling JSON:
```json
{"literal": "line1a\\nline1b\n  line2\n# not a comment\nend"}
```

#### Folded block
YAML ondersteunt verschillende bloknotaties waarbij een regeleinde vervangen wordt door een spatie, wanneer de volgende lijn de uitlijning respecteert.
Elke lege regel wordt wel geïnterpreteerd als een nieuwe regel.
Hierbij wordt de insprong, die afwijkt van de uitlijning niet weg getrimd.
Ook wordt er geen escaping toegepast.

##### Standaard (`>`)
Verwijdert elke lege regel op het einde van de string, maar behoudt één newline-karakter op het einde van de string.
Voorbeeld YAML:
```yaml
literal: >
  line1a
  line1b
    line2

  line3

# end of statement
```

Vertaling JSON:
```json
{"literal": "line1a line1b\n  line2\n\nline3\n"}
```

##### Keep (`>+`)
Behoudt elke lege regel op het einde van de string.
Voorbeeld YAML:
```yaml
literal: >+
  line1a
  line1b
    line2

  line3

# end of statement
```

Vertaling JSON:
```json
{"literal": "line1a line1b\n  line2\n\nline3\n\n"}
```

##### Trim (`>-`)
Verwijdert elke lege regel op het einde van de string en geen newline-karakter op het einde van de string.
Voorbeeld YAML:
```yaml
literal: >-
  line1a
  line1b
    line2

  line3

# end of statement
```

Vertaling JSON:
```json
{"literal": "line1a line1b\n  line2\n\nline3"}
```

### 'yes' en 'no'
`yes` en `no` zijn een extra notatie voor de booleaanse waarden `true` en `false`.

### Omzetting naar tekstuele types
Wanneer er bij `stdin`, `stdout` en `stderr` geen strings gebruikt worden, maar getallen en booleaanse waarden, dan kan de uiteindelijke tekstuele data afwijken van wat je bedoelde.
Bijvoorbeeld:
```yaml
stdin: 077
```

Interpreteren als een octaal getal: `7 ⋅ 8 + 7 = 63`.
```yaml
stdin: "63"
```

### Functienaam
De stijlconventie voor functienamen in de DSL is `snake_case`.
Wanneer er hiervan afgeweken wordt kan de stijlconventie van een specifieke programmeertaal niet gegarandeerd worden.

## Omzetten
Om DSL-testplannen te vertalen naar de JSON-testplannen voor TESTed, kan er gebruikgemaakt worden van een Python script, dat deel uitmaakt van TESTed.
Dit script kan terug gevonden op [GitHub repository](https://github.com/dodona-edu/universal-judge) van TESTed.
Het script kan uitgevoerd worden met één van de 4 volgende commando’s (en combinaties) in de root directory van de GitHub repository:
```bash
# Standaardinvoer - standaarduitvoer
$ python3 -m tested.translate_dsl < testplan.yaml > testplan.json
# Korte opties
$ python3 -m tested.translate_dsl -i testplan.yaml -o testplan.json
# Lange optienamen
$ python3 -m tested.translate_dsl --dsl testplan.yaml --json testplan.json
# Positionele argumenten
$ python3 -m tested.translate_dsl testplan.yaml testplan.json
```
