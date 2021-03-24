---
title: Configureren nieuwe programmeertaal TESTed
description: "Configureren nieuwe programmeertaal TESTed"
---

::: warning Sorry
For now, this page is only available in Dutch. Sorry!
:::

# Configuratie van een programmeertaal
In deze handleiding wordt in detail uitgelegd hoe een nieuwe programmeertaal aan TESTed kan toegevoegd worden.
We doen dat door te beschrijven hoe de programmeertaal C toegevoegd is.
Enkele nuttige links die hierbij kunnen helpen zijn:

- Bestaande configuraties: <https://github.com/dodona-edu/universal-judge/tree/master/tested/languages>
- Testoefeningen: <https://github.com/dodona-edu/universal-judge/tree/master/exercise>

In deze referentie worden regelmatig codebestanden getoond, verspreid over meerdere codefragmenten
(bijvoorbeeld eerst `n` regels, daarna wat tekst en dan pas de rest van de regels).

## TESTed lokaal uitvoeren
Tijdens het configureren van een programmeertaal is het nuttig om lokaal uit te voeren,
zonder daarvoor het volledige Dodona-platform te moeten uitvoeren.
Buiten de _dependencies_ voor de bestaande programmeertalen is TESTed een Python-package,
dat op de normale manier uitgevoerd kan worden.

### De broncode
Na het klonen van de repository van beschikken we over volgende mappenstructuur:
```text
universal-judge
├── docker/ # Een Docker-image om TESTed uit te voeren.
├── exercise/ # De map met oefeningen die dienen als voorbeeld en voor de tests.
├── tested/ # Broncode van TESTed.
├── tests/ # Testcode van TESTed.
├── workdir/ # De uitvoer van TESTed bij manuele uitvoer.
├── config.json # Configuratiebestand voor gebruik in Dodona.
└── run # Wordt gebruikt door Dodona om TESTed uit te voeren.
```

### Dependencies
De dependencies van zelf zijn opgelijst in een `requirements.txt`-bestand, zoals gebruikelijk is bij Python-projecten.
Vereisten voor het uitvoeren van tests staan in `requirements-test.txt`.
TESTed gebruikt Python 3.9 of later.
Het installeren van deze vereisten gebeurt op de gebruikelijke manier:
```shell
> pip install -r requirements.txt
```

Voor de programmeertalen die momenteel reeds geconfigureerd zijn, zijn volgende dependencies nodig:

- **Python**: vereist Python 3.9.
  Indien de linter gebruikt wordt, is `pylint` een dependency.
  Daarnaast moet `python` beschikbaar zijn in het `PATH`.
  Door optimalisaties is het momenteel aan te raden om dezelfde Python-versie te gebruiken voor TESTed als voor de
  Python-oefeningen.

- **Java**: vereist Java 11, maar heeft verder geen dependencies.
  De commando's `javac` en `java` moeten beschikbaar zijn in het `PATH`.

- **JavaScript**: vereist NodeJS v10, maar heeft verder geen dependencies.
  Het commando `node` moet beschikbaar zijn in het `PATH`.

- **Kotlin**: vereist Kotlin 1.4.10, maar heeft verder geen dependencies.
  De commando's `kotlinc` en `kotlin` moeten beschikbaar zijn in het `PATH`.

- **Haskell**: Voor Haskell is GHC 8.6 (`ghc`) of later nodig.
  Daarnaast is `aeson` nodig.
  Beiden moeten globaal beschikbaar zijn in het `PATH`.

Merk op dat de dependencies voor de programmeertalen optioneel zijn.
Om bijvoorbeeld enkel Python-oplossingen te beoordelen zijn geen andere dependencies nodig.

Voor de programmeertaal C gaan we gebruikmaken van GCC, waarbij versie 8.1 of later nodig is.

TESTed werkt op elk besturingssysteem dat ondersteund wordt door Python.
Sommige dependencies, zoals GCC, vragen wel meer moeite om te installeren op Windows.

::: tip Windows tip
Gebruikers op Windows kunnen MingW of MSYS2 proberen.
:::

### Uitvoeren
We gaan er voor de rest van het hoofdstuk van uit dat commando's uitgevoerd worden in de map `./`.

Er zijn twee manieren om TESTed uit te voeren.
Ten eerste is er de "gewone" manier; dit is ook hoe Dodona TESTed uitvoert.
Bij het uitvoeren op deze manier zal een configuratie lezen van `stdin` en zal TESTed het resultaat van de beoordeling
in Dodona-formaat uitgeschreven worden naar `stdout`.

```shell
> python -m tested
```

Bij het configureren van een programmeertaal of het werken aan is het echter nuttiger om meer uitvoer te zien en
is het vervelend om telkens een configuratie te lezen vanop `stdin`. Daarom is er een tweede manier:

```shell
> python -m tested.manual
```

Deze uitvoer verschilt op een aantal vlakken van de gewone uitvoering:

1.  Er wordt geen configuratie gelezen van `stdin`.
    De configuratie is gedefinieerd in de code zelf en gebruikt een van de oefeningen die in de map `exercise` zitten.
2.  Er worden, naast de resultaten van de beoordeling, logs uitgeschreven naar `stdout` die aangeven wat TESTed doet.
    Als er bijvoorbeeld een fout optreedt tijdens het compileren zullen deze logs nuttig zijn: zo wordt uitgeschreven
    welk commando TESTed exact uitvoert voor de compilatie en ook in welke map dat gebeurt.
3.  De configuratie is zo opgesteld dat de werkmap van de judge de map `workdir` zal zijn. Dit laat toe om de
    gegenereerde code te inspecteren.

## Globaal stappenplan voor het configureren van een programmeertaal
Het configureren van een programmeertaal in TESTed bestaat uit drie grote onderdelen:

1.  Het configuratiebestand, met enkele opties voor de programmeertaal.
    Het typeconfiguratiebestand, met de benaming van de datatypes.
2.  De configuratieklasse, met de meer dynamische opties, zoals het compilatiecommando.
3.  De sjablonen, die gebruikt worden om code te genereren.

TESTed voorziet een hulpmiddel om de bestanden op de juiste plaats te genereren.
Op basis van enkele vragen worden _stubs_ gegenereerd voor het configuratiebestand,
de configuratieklasse en de sjablonen.
Dit hulpmiddel kan als volgt uitgevoerd worden:
```shell
> python -m tested.generation
```

Merk op dat dit enkel bestanden genereert.
De stappen in [Registratie](#registratie) voor het registreren van de nieuwe programmeertaal in zijn nog steeds nodig.

We overlopen nu elk onderdeel in functie van de programmeertaal C.
We gaan er telkens vanuit dat bovenstaande hulpmiddel niet gebruikt is en dat de bestanden dus nog gemaakt moeten worden.
Is bovenstaande hulpmiddel wel gebruikt, dan kunnen de instructies voor het maken van bestanden genegeerd worden.

## De programmeertaal C
Voor we beginnen aan de configuratie, overlopen we kort welke functionaliteit we willen ondersteunen:
welke functionaliteit uit C kunnen we aanbieden in TESTed en welke functionaliteit uit kunnen we implementeren in C?
Uiteraard willen we zoveel mogelijk ondersteunen, maar vooral op het vlak van gegevenstypes zijn er momenteel beperkingen.

##### Welke basistypes gaan we niet ondersteunen?
- `sequence`:
  Arrays zijn een speciaal geval in C: statische arrays kunnen bijvoorbeeld niet als returnwaarde dienen, en ook als
  functieargument zijn ze niet ideaal.
  Dynamische arrays nemen de vorm aan van een pointer en een grootte.
  TESTed heeft momenteel geen ondersteuning voor datatypes die als twee waarden geïmplementeerd moeten worden,
  dus worden arrays momenteel niet ondersteund.
- `set`:
  C heeft geen ingebouwde verzamelingen.
- `map`:
  C heeft geen ingebouwde map of dict.
  Er zijn wel structs, maar daarvan is het niet mogelijk om de velden at runtime op te vragen,
  waardoor we ze niet kunnen serialiseren.

##### Welke geavanceerde types gaan we niet ondersteunen?
- `big_int`:
  C heeft geen ingebouwd type voor getallen van arbitraire grootte.
- `fixed_precision`:
  C heeft geen ingebouwd type voor kommagetallen met willekeurige precisie.
- **Andere datastructuren**:
  Het gaat hier om datastructuren zoals `array` en `list` (om dezelfde redenen als hierboven).
  Ook `tuple` wordt niet ondersteund, omdat het niet bestaat in C.

### Locatie van de code
De eerste stap in het configureren van een programmeertaal is het aanmaken van een map waarin we de code voor de
programmeertaal zullen zetten.
Deze map moet de naam van de programmeertaal krijgen en op de juiste plaats binnen TESTed aanwezig zijn.
Maak een nieuwe map `tested/languages/c`.
Na het aanmaken van de map moet de mappenstructuur er zo uitzien:
```text
universal-judge/
├─ tested/
│ ├─ languages/
│ │ ├── c/ <- nieuwe map
│ │ ├── haskell/
│ │ ├── java/
│ │ ├── python/
│ │ ├── config.py
│ │ ...
│ ...
...
```

### Configuratiebestanden
Het configuratiebestand is een JSON-bestand met enkele eigenschappen van de programmeertaal.
Dit configuratiebestand maakt het implementeren van de configuratieklasse een stuk eenvoudiger, omdat de implementatie
van die klasse daardoor veel minder lang zal zijn.
Maak eerst het configuratiebestand aan: `tested/languages/c/config.json`.

Merk op dat het configuratiebestand slechts een hulpmiddel is: indien gewenst kunnen al deze opties ook ingesteld worden
door de juiste methodes te implementeren in de configuratieklasse, maar we verwachten dat dit in veel gevallen niet
nodig zal zijn.

#### Algemene opties
- `general.dependencies`:
  Dit zijn bestanden die beschikbaar zullen zijn tijdens het compileren en tijdens het uitvoeren van de beoordeling.
  Dit betekent dat deze dependencies gebruikt kunnen worden in de testcode voor de contexten en de evaluatiecode voor de
  geprogrammeerde en programmeertaalspecifieke code.
  In het geval van C is dit de `values`-module, waarvan we de implementatie later bespreken.
  Deze dependencies zijn bedoeld om gebruikt te worden in de code gegenereerd door de sjablonen, niet in de ingediende
  oplossing (hoewel dat momenteel technisch mogelijk is).
- `general.selector`:
  Dit geeft aan of de programmeertaal gebruikmaakt van een selector tijdens het uitvoeren van code die gecompileerd is
  in batchcompilatie.
  Voor de meeste talen met compilatie zal dit `true` zijn.
  Zo ook bij C.
- `extensions.file`:
  Geeft de voornaamste bestandsextensie aan van de bestanden.
  Met voornaamste bedoelen we de extensie van de bestanden die gegenereerd worden.
  Bijvoorbeeld in C bestaan zowel `.h` en `.c`, maar de gegenereerde code gebruikt `.c`.
- `extensions.templates`:
  \- wordt gebruikt om aan te geven welke extensies gebruikt worden voor de sjablonen.
  Standaard is dit de bestandsextensie van hierboven en `.mako`.
  Het is vaak niet nodig om dit op te geven.

```json
"general": {
  "dependencies": [
    "values.h",
    "values.c",
    "evaluation_result.h",
    "evaluation_result.c"
  ],
  "selector": true
},
"extensions": {
  "file": "c",
  "templates": ["c", "mako"]
},
```

#### Codestijl
Programmeertaalelementen zoals functies en namespaces worden omgezet in functie van de codestijl die gebruikelijk is in
de programmeertaal:
```json
"naming_conventions": {
  "namespace": "snake_case",
  "function": "snake_case"
},
```

De mogelijke waarden zijn:
- `snake_case`:
  Tussen elk woord staat een underscore: `dit_is_een_voorbeeld`.
- `camel_case`:
  Elk woord, buiten het eerste, start met een hoofdletter: `ditIsEenVoorbeeld`.
  Deze variant wordt ook wel *lowerCamelCase* genoemd.
- `pascal_case`:
  Elk woord, ook het eerste, start met een hoofdletter: `DitIsEenVoorbeeld`.
  Deze variant wordt ook wel *UpperCamelCase* genoemd.

Standaard wordt `snake_case` gebruikt, dus bij C is het niet strikt nodig om deze optie in de configuratie op te nemen.

#### Functionaliteit
De laatste twee blokken in de configuratie geven aan welke constructies en gegevenstypes de programmeertaal ondersteunt.
We hebben reeds besproken welke functionaliteit we willen ondersteunen en welke niet.
We beginnen met de taalconstructies vast te leggen:
```json
"constructs": {
  "objects": false,
  "exceptions": false,
  "function_calls": true,
  "assignments": true,
  "heterogeneous_collections": false,
  "heterogeneous_arguments": false,
  "evaluation": false,
  "named_arguments": false,
  "default_parameters": false
},
```

Hier kan voor elke taalconstructie opgegeven worden of ze ondersteund wordt of niet (met een `boolean`).
Standaard wordt geen enkele taalconstructie ondersteund.
Dit zorgt ervoor dat alle ondersteunde constructies expliciet in het configuratiebestand staan en dat nieuwe
taalconstructies toegevoegd kunnen worden zonder dat bestaande configuraties van programmeertalen aangepast moeten
worden.

De mogelijke taalconstructies zijn deze uit de enum `tested.features.Construct`.
Hieronder volgt een lijst van elke taalconstructie en een korte beschrijving:
- `objects`:
  Objectgeoriënteerde zaken zoals klassen.
- `exceptions`:
  Exceptions en uitzonderingen.
- `function_calls`:
  Functieoproepen.
  Merk op dat constructors in het testplan een speciale soort functie zijn,
  maar deze hangen af van de taalconstructie `objects`.
- `assignments`:
  Het toekennen van een waarde aan een variabele.
  Een "assignment" moet ruim geïnterpreteerd worden als ondersteuning voor iets dat neerkomt op een assigment.
  Zo kent Haskell bijvoorbeeld geen assignments: `x = 5` definieert technisch gezien een functie met een constante
  returnwaarde `5`.
  Dit moet ook onder `assignments` gerekend worden.
- `heterogeneous_collections`:
  Hiermee bedoelen we collecties met elementen met verschillende gegevenstypes.
  Dit is bijvoorbeeld geen probleem in Python (`[5, 52.23]`),
  gaat al iets moeilijker in Java (`List<Object> = List.of(1, 52.23)`), maar zal niet lukken in Haskell.
- `heterogeneous_arguments`:
  Hiermee bedoelen we functieoproepen waarbij dezelfde functie meerdere keren wordt opgeroepen met argumenten met
  verschillende datatypes (bijvoorbeeld eerst `check(True)` daarna `check('hallo')`).
  Dit zal lukken in Python en Java, maar niet in Haskell en C.
- `evaluation`:
  Of een geprogrammeerde evaluatie mogelijk is in deze programmeertaal.
  Dit is technisch gezien geen taalconstructie, maar dezelfde infrastructuur wordt gebruikt om dit te controleren.
- `named_arguments`:
  Of benoemde argumenten ondersteund worden.
  Dit betekent dat de argumenten voor een functie niet enkel positioneel, maar ook op naam meegegeven kunnen worden.
- `default_parameters`:
  Of de programmeertaal standaardwaarden voor parameters ondersteunt, wat betekent dat ze kunnen weggelaten worden.

Dan moeten we nu de ondersteuning voor de gegevenstypes vastleggen:
```json
"datatypes": {
  "integer": "supported",
  "rational": "supported",
  "char": "supported",
  "text": "supported",
  "boolean": "supported",
  "sequence": "unsupported",
  "set": "unsupported",
  "map": "unsupported",
  "nothing": "supported",
  "int8": "supported",
  "uint8": "supported",
  "int16": "supported",
  "uint16": "supported",
  "int32": "supported",
  "uint32": "supported",
  "int64": "supported",
  "uint64": "supported",
  "bigint": "reduced",
  "single_precision": "supported",
  "double_precision": "supported",
  "double_extended": "supported",
  "fixed_precision": "unsupported",
  "array": "unsupported",
  "list": "unsupported",
  "tuple": "unsupported"
},
```

Er zijn twee soorten gegevenstypes in TESTed: de basistypes en de geavanceerde types.
De basistypes zijn abstracte types voor concepten (zoals een sequentie of een geheel getal),
terwijl de geavanceerde types concreter zijn (zoals een geheel getal van 8 bits).
Een gegevenstype kan drie niveaus van ondersteuning hebben:
- `supported`:
  volledige ondersteuning
- `reduced`:
  wordt ondersteund, maar wordt herleid tot een basistype
  (bijvoorbeeld een `list` wordt geïnterpreteerd als een `sequence`)
- `unsupported`:
  geen ondersteuning, dit is de standaardwaarde

Een opmerking hierbij is dat de status `reduced` voor de basistypes equivalent is aan `supported`: een basistype
reduceren tot een basistype blijft hetzelfde type.

Het is de bedoeling dat de meeste programmeertalen voor het merendeel van de datatypes ten minste `reduced` hebben.
Toch is gekozen om `unsupported` als standaardwaarde te nemen;
dit zorgt ervoor dat de ondersteunde datatypes expliciet uitgeschreven zijn.
Dit laat ook toe om datatypes toe te voegen aan zonder bestaande configuraties van programmeertalen te moeten aanpassen.
Ter illustratie vermelden we hier voor C alle datatypes, ook de niet-ondersteunde.

#### Restricties verzamelingselementen en map-sleutels
Sommige talen leggen restricties op met betrekking tot de datatypes voor verzamelingselementen en map-sleutels.
Hiervoor moeten er twee lijsten worden opgegeven worden: `restrictions.map_key` en `restrictions.set`.
De inhoud van de lijsten zijn de `supported` datatypes van TESTed die gebruikt kunnen worden, daarnaast kun je opgeven
of functieoproepen (`function_calls`) en variabelen (`identifiers`) gebruikt kunnen worden.
De `reduced` geavanceerde datatypes zullen afgeleid worden, als de basisdatatypes ondersteund worden.

C ondersteunt geen collecties, dus zijn beide lijst leeg.
```json
"restrictions": {
  "map_key": [],
  "set": []
}
```

### Typeconfiguratiebestand
Het typeconfiguratiebestand is een JSON-bestand met de benamingen van datatypes en gebruikte conventies voor het
visualiseren van een codeprompt.
Dit configuratiebestand wordt gebruikt om sjabloonopgaven te instantiëren voor de programmeertaal.
Maak eerst het configuratiebestand aan: `tested/languages/c/types.json`.

#### Console informatie
- `console.name`:
  De gebruikt naam van de programmeertaal in de console prompt.
  Bijvoorbeeld: `python` voor Python en `c` voor C.
- `console.prompt`:
  Het prompt symbool voor de programmeertaal.
  Bijvoorbeeld: `>>>` voor Python en `>` voor C.

```json
"console": {
  "name": "c",
  "prompt": ">"
},
```

#### Haakjes
De gebruikte haakjes voor collectie datatypes.
Bijvoorbeeld: `[]` voor de python collecties, `<>` voor de generieke Java objecten behalve arrays die `[]` gebruiken.
C in TESTed ondersteund geen collecties, dus zullen Java en Haskell als voorbeeld nemen.
- `brackets.open`: Generiek openingshaakje
- `brackets.clase`: Generiek sluitingshaakje

> Voorbeeld Java lijst: `List<?>`

- `brackets.<collection>.open`: Specifiek openingshaakje voor de gegeven collectie
- `brackets.<collection>.close`: Specifiek sluitingshaakje voor de gegeven collectie

> Voorbeeld Java integer array: `int[]`
>
> Voorbeeld Haskell integer lijst: `[Int]`

#### Datatypes
Naast de console informatie en haakjes moeten ook de benaming van de ondersteunde datatypes worden opgegeven.
```json
"integer": "int",
"rational": "double",
"char": "char",
"text": "char*",
"boolean": "bool",
"nothing": "void",
"int8": "signed char",
"uint8": "unsigned char",
"int16": "short",
"uint16": "unsigned short",
"int32": "int",
"uint32": "unsigned int",
"int64": "long",
"uint64": "unsigned long",
"bigint": "long long",
"single_precision": "float",
"double_precision": "double",
"any": "void*",
"inner": {
},
```

Ondersteunde waarden:
- **string**: Naam van het TESTed datatype in de programmeertaal.
- **boolean**: Alleen voor collectie datatypes waarbij de notatie van het collectietype uitsluitend met haakjes gebeurt.
  - `true`: Het datatype van de gegevens in de collectie bevindt zich tussen de haakjes.
    Hierbij moeten de haakjes van het collectie type expliciet worden opgeven.
    Bijvoorbeeld Haskell lijst: `[Int]`
  - `false`: De haakjes bevinden zich achter het datatype van de gegevens in de collectie.
    Hierbij moeten de haakjes van het collectie type expliciet worden opgeven.
    Bijvoorbeeld Java array: `int[]`

`inner` is het object waarbij elk datatype, die een andere naam moet krijgen in een collectie, moet opgegeven worden.
Dit geldt niet voor datatypes waarbij de haakjes achter het datatype geplaatst worden.
Bijvoorbeeld Java: `Integer` in plaats van `int` voor `int32`.

#### Natuurlijke taal constructies
De benaming in de natuurlijke taal voor de collectie datatypes en tekst, is afhankelijk van de programmeertaal.
Hiervoor wordt gevraagd om deze benaming op te geven in zowel het Engels als het Nederlands.
De vereiste velden zijn alle collectie datatypes die ondersteund worden in TESTed door de programmeertaal,
alsook de benaming voor tekst.

Bijvoorbeeld: in JavaScript spreekt men over *array* voor een `sequence`,
terwijl in Python men spreekt over een *lijst*.

```json
"natural": {
  "en": {
    "text": "string"
  },
  "nl": {
    "text": "string"
  }
}
```

### Configuratieklasse
De configuratieklasse is de schakel tussen de generieke aspecten van TESTed en het programmeertaalafhankelijke gedrag.
Omdat TESTed in Python geschreven is, moet deze klasse ook in Python geïmplementeerd worden.

Maak een nieuw Python-bestand `tested/languages/c/config.py` aan.
Hierin moet een klasse komen die van `Language` overerft:

```python
class C(Language):
```

In de rest van deze paragraaf overlopen we de verschillende methodes die geïmplementeerd moeten worden in deze klasse.
In de superklasse, `Language`, zijn de abstracte methodes voorzien van uitgebreide documentatie.

#### Compileren van de code
Een eerste en belangrijke methode is de callback voor de compilatiestap:
```python
def compilation(self, config: Config, files: List[str]) -> CallbackResult:
    main_file = files[-1]
    exec_file = Path(main_file).stem
    result = executable_name(exec_file)
    return (["gcc", "-std=c11", "-Wall", "evaluation_result.c", "values.c",
             main_file, "-o", result], [result])
```

De eerste parameter van deze methode is een klasse met enkele configuratie-opties, zoals de tijdslimiet, geheugenlimiet
en de programmeertaalspecifieke opties.
Dit zou bijvoorbeeld gebruikt kunnen worden om de versie van C mee te geven (zoals C11 of C99).
Dit wordt momenteel niet gedaan in C, want TESTed vereist C11, maar de mogelijkheid bestaat.
Wel moeten we opmerken dat de tijdslimiet zelden nuttig zal zijn, daar TESTed de uitvoeringstijd bijhoudt.
In de configuratieklasse is het dus niet nodig om daar rekening mee te houden.

De andere parameter van deze methode is een lijst van bestanden waarvan vermoedt dat ze nuttig kunnen zijn voor de
compilatiestap.
Het bevat onder andere de dependencies uit het configuratiebestand,
de ingediende oplossing en de uit de sjablonen gegenereerde bestanden.
Die laatste bestanden zijn bijvoorbeeld de verschillende contexten bij een batchcompilatie,
maar kunnen ook de evaluator zijn bij een geprogrammeerde evaluatie.
De bestanden bestaan uit de naam en een bestandsextensie.

De conventie is om het bestand met de main-functie als laatste te plaatsen.

Al deze bestanden zullen zich in de map bevinden waarin de compilatie plaatsvindt.
Het is niet verplicht om al deze bestanden ook effectief te gebruiken:
sommige programmeertalen hebben zelf een detectiesysteem voor bestanden.
Zo is het in C voldoende om enkel het laatste bestand met de main-functie te gebruiken:
alle andere bestanden worden gevonden door GCC.

Concreet ziet een argument voor deze parameter er bijvoorbeeld als volgt uit:
```python
['values.py', 'evaluation_utils.py', 'context_0_0.py']
```

Als returnwaarde moet deze methode een tuple met twee element teruggeven:
het compilatiecommando en een lijst van resulterende bestanden of een filter.

Het compilatiecommando neemt de vorm aan van een lijst van de elementen waaruit het commando bestaat.
Bij het uitvoeren van dit commando zal deze lijst aan de Python-module `subprocess` gegeven worden.

Na het uitvoeren van het compilatiecommando moet TESTed weten welke bestanden relevant zijn om mee te nemen naar een
volgende stap in de beoordeling.
Daarom moet een lijst van resulterende bestanden teruggegeven worden.
Enkel bestanden in deze lijst zullen bijvoorbeeld beschikbaar zijn bij het uitvoeren van de runs.
Een lijst van bestanden teruggeven is mogelijk indien op voorhand geweten is in welke bestanden de compilatie
resulteert.
Dit is bijvoorbeeld hier het geval (in C resulteert de compilatie in één uitvoerbaar bestand), of ook bij Python,
waar de compilatie voor elk `.py`-bestand resulteert in een `.pyc`-bestand.
Ook hier moet de conventie gerespecteerd worden dat het bestand met de `main`-functie als laatste komt.

Het is echter niet altijd mogelijk om op voorhand te weten in welke bestanden de code zal resulteren.
Zo resulteert compilatie van één `.java`-bestand mogelijk in meerdere `.class`-bestanden,
afhankelijk vande inhoud van de bestanden.
Om dit op te lossen kan in plaats van een lijst ook een filterfunctie teruggegeven worden.

Nadat de compilatie uitgevoerd is,
zal TESTed deze filter toepassen op elk bestand in de map waarin de compilatie uitgevoerd is.
De filterfunctie krijgt als argument de naam van een bestand en moet `True` of `False` teruggeven als het bestand
respectievelijk wel of niet moet meegenomen worden naar een volgende stap.

Een voorbeeld van de in- en uitvoer van de compilatiemethode:
```python
>>> compilation(['submission.c', 'evaluation_result.c', 'context_0_0.c', 'selector.c'])
(
    ['gcc', '-std=c11', '-Wall', 'evaluation_result.c', 'values.c', 'selector.c',
     '-o', 'selector.exe'], ['selector.exe']
)
```

Als een leeg compilatiecommando wordt teruggegeven, dan wordt er geen compilatie gedaan.
Dit is ook de standaardimplementatie van deze methode.
Voor programmeertalen waar geen compilatie nodig is, moet deze methode niet geïmplementeerd worden.

#### Uitvoeren van de testcode
Na het compileren moeten we een methode implementeren om de gecompileerde code uit te voeren:
```python
def execution(self, config: Config,
              cwd: Path, file: str, arguments: List[str]) -> Command:
    local_file = cwd / executable_name(Path(file).stem)
    return [str(local_file.absolute()), *arguments]
```

Deze functie heeft vier parameters:

- `config`:
  Dezelfde configuratie-opties als bij de compilatiemethode.
  Bij Java wordt dit bijvoorbeeld gebruikt om de geheugenlimiet van de juist in te stellen.
- `cwd`:
  de map waarin het uitvoeren plaatsvindt
- `file`:
  het uitvoerbaar bestand dat moet uitgevoerd worden
- `arguments`:
  argumenten die aan het proces moeten meegegeven worden

Als resultaat moet het commando teruggegeven worden, dat ook aan `subprocess` doorgegeven wordt.

In het geval van C is dit commando eenvoudig:
we geven het absolute pad naar het uitvoerbare bestand mee en geven ook de argumenten mee.
Het absolute pad is nodig omdat de executable die we willen uitvoeren
(en gemaakt hebben in de compilatiestap) niet in het `PATH` zit.

Een voorbeeld van deze functie in werking is:
```python
>>> execution('/test/path', 'executable.exe', ['arg1', 'arg2'])
['/test/path/executable.exe', 'arg1', 'arg2']
```

De basisimplementatie van de configuratie is nu klaar.
Voor de meeste programmeertalen kan nu overgegaan worden naar de sjablonen,
maar in C moeten we nog een extra methode implementeren.

#### Aanpassen van de ingediende oplossing
De testcode die door TESTed gegenereerd wordt, kan meerdere `main`-functies bevatten:
- De ingediende oplossing kan een `main`-functie hebben.
- Zowel de contexten als de selector kunnen `main`-functies hebben.

In C kan er slechts één `main`-functie per compilatie zijn.

Een ander probleem is dat de selector elke run insluit (zoals we later zullen zien bij de sjablonen),
en elke run ook de oplossing insluit.

Om deze redenen moeten we de code van de ingediende oplossing een beetje aanpassen:

- We voegen aan `guard` toe, zodat de oplossing slechts eenmaal geladen wordt.
- We hernoemen de `main`-functie naar `solution_main` indien die bestaat.
  Als de `main`-functie geen argumenten had dan voegen we die ook toe.

Vertaald naar de configuratieklasse wordt dit:
```python
def solution(self, solution: Path, bundle: Bundle):
    with open(solution, "r") as file:
        contents = file.read()
    # We use regex to find the main function.
    # First, check if we have a no-arg main function.
    # If so, replace it with a renamed main function that does have args.
    no_args = re.compile(r"(int|void)(\s+)main(\s*)\((\s*)\)(\s*{)")
    replacement = r"int\2solution_main\3(\4int argc, char** argv)\5"
    contents, nr = re.subn(no_args, replacement, contents, count=1)
    if nr == 0:
        # There was no main function without arguments. Now we try a main
        # function with arguments.
        with_args = re.compile(r"(int|void)(\s+)main(\s*)\((\s*)int")
        replacement = r"int\2solution_main\3(\4int"
        contents = re.sub(with_args, replacement, contents, count=1)
    with open(solution, "w") as file:
        header = "#pragma once\n\n"
        file.write(header + contents)
```

### Sjablonen
De derde stap bestaat uit het schrijven van de sjablonen.
We hebben uiteraard de verplichte sjablonen nodig,
maar om code te hergebruiken kiezen we ervoor om enkele bijkomende sjablonen te schrijven:

- `run.c`: het sjabloon voor run (**verplicht**)
- `selector.c`: het sjabloon voor de selector voor batchcompilatie (**verplicht** bij batchcompilatie)
- `declaration.mako`: vertaalt de declaratie van een variabele naar code
- `function.mako`: vertaalt een functieoproep naar code
- `statement.mako`: vertaalt een statement of een expressie naar code (**verplicht**)
- `value.mako`: vertaalt een letterlijke waarde naar code
- `value_arguments.mako`:
  hulpsjabloon voor `value.mako` (opsomming van recursieve gegevenstypes, zoals lijsten, maar ook van functieargumenten)
- `value_basic.mako`: hulpsjabloon voor `value.mako` (vertaalt de basistypes)

Al deze sjablonen komen in de map `tested/languages/c/templates`.

Het is vrij om de bestandsextensie van de sjablonen te kiezen, zolang het een extensie is uit de configuratie.
Standaard zijn de toegelaten extensies `.mako` en een programmeertaalafhankelijke extensie, hier `.c`.
Een conventie die gebruikt wordt binnen TESTed, is de volgende:
- Sjablonen eindigen op de programmeertaalafhankelijke extensie (`.c`)
  indien het sjabloon resulteert in een op zichzelf staand bestand.
  Voorbeelden zijn het contextsjabloon en de selector.

- Sjablonen die resulteren in een codefragment en dus vooral gebruikt worden als onderdeel van andere sjablonen eindigen
  op `.mako`.
  Dit zijn bijvoorbeeld de sjablonen om functies en statements om te zetten.

Dit wordt niet afgedwongen door TESTed; alle sjablonen hadden de extensie `.c` of `.mako` kunnen krijgen,
of een mengeling.
Dit geldt voornamelijk voor de verplichte sjablonen.
De andere sjablonen (die als hulpmiddel gebruikt worden door de verplichte sjablonen) kunnen eender welke
extensie krijgen, want bij het gebruiken van een sjabloon in Mako moet de bestandsextensie opgegeven worden.

#### Het runsjabloon
Dit is veruit het grootste en het meest ingewikkelde sjabloon.
Het is verantwoordelijk voor het genereren van de testcode voor één run.

We importeren de values-module (hierover later meer) en de ingediende oplossing.
De variabele `submission_name` zal de naam van het oplossingsbestand bevatten.
Een overzicht van alle beschikbare variabelen in het runsjabloon is te vinden in de klasse
`_ExecutionArguments` uit de module `tested.languages.generator`.

We importeren ook alle programmeertaalspecifieke evaluatoren die we nodig zullen hebben.
De variabele `evaluator_names` bevat een verzameling van deze namen.

```c
#include <stdio.h>

#include "values.h"
#include "${submission_name}.c"

% for name in evaluator_names:
    #include "${name}.c"
% endfor
```

##### Witruimte in Mako
Nuttig om weten is dat TESTed een extensie heeft toegevoegd aan Mako,
waardoor de indentatie van Mako-gerelateerde taalconstructies zal verdwijnen.
De `for`-loop in het fragment hierboven resulteert bijvoorbeeld in deze code:
```c
#include "context_0_0.c"
#include "context_0_1.c"
```

##### Regeleindes in Mako
Ook nuttig om weten is dat een regeleinde in een sjabloon in Mako resulteert in een regeleinde in het
geproduceerde bestand.
Mako voorziet hier een oplossing voor:
door een _backslash_ op het einde van de regel te plaatsen zal er geen regeleinde komen in het geproduceerde bestand.
Volgende codefragment (let op de `\`):
```c
int test = \⏎
"test";⏎
```

Zal bijvoorbeeld resulteren in deze code:
```c
int test = "test";⏎
```

Vervolgens maken we twee variabelen aan waarin de bestanden komen die dienst doen als return- en exception-channel.
We noemen deze bestanden de uitvoerbestanden.
Merk op dat C geen exceptions ondersteunt, maar TESTed verwacht toch een bestand voor het exception-channel.
Anders zal TESTed ervan uitgaan dat er iets verkeerd liep tijdens het uitvoeren.
We definiëren direct ook een functie om de separator naar alle uitvoerkanalen te schrijven.

In onderstaand codefragment en in de rest van het runsjabloon wordt regelmatig de naam van de context als prefix
gebruikt voor functies en variabelen.
Dit is omdat het in C niet mogelijk is om in meerdere bestanden functies met dezelfde naam te hebben.
Als we dus meerdere runs samen compileren en elke run heeft zijn eigen `write_separator`-functies,
dan zou het compileren mislukken.

```c
static FILE* ${execution_name}_value_file = NULL;
static FILE* ${execution_name}_exception_file = NULL;

static void ${execution_name}_write_separator() {
    fprintf(${execution_name}_value_file, "--${secret_id}-- SEP");
    fprintf(${execution_name}_exception_file, "--${secret_id}-- SEP");
    fprintf(stdout, "--${secret_id}-- SEP");
    fprintf(stderr, "--${secret_id}-- SEP");
}

static void ${execution_name}_write_context_separator() {
    fprintf(${execution_name}_value_file, "--${context_secret_id}-- SEP");
    fprintf(${execution_name}_exception_file, "--${context_secret_id}-- SEP");
    fprintf(stdout, "--${context_secret_id}-- SEP");
    fprintf(stderr, "--${context_secret_id}-- SEP");
}
```

Als een resultaat geproduceerd wordt voor de return- of exception-channel,
dan moet dat resultaat geserialiseerd worden en naar de uitvoerbestanden geschreven worden.
TESTed verwacht dat volgende functies beschikbaar zijn:
- `send_value(value)` schrijf een waarde naar een bestand.
- `send_exception(exception)` schrijf een exception naar een bestand.
- `send_specific_value(value)` schrijf het resultaat van een programmeertaalspecifieke evaluatie naar de return-channel.
- `send_specific_exception(exception)` schrijf het resultaat van een programmeertaalspecifieke evaluatie naar de
  exception-channel.

Bij het implementeren moeten de conventies voor naamgeving van de programmeertaal toegepast worden
zo zal TESTed in Java een oproep naar een functie met naam `sendValue` genereren.

We zullen later zien dat we zelf de oproepen naar deze functies in het sjabloon schrijven.
Toegepast op C zijn er wat wijzigingen, omdat C geen exceptions ondersteunt.
Als gevolg daarvan zullen we de exception-functies niet implementeren en zullen we ook geen oproep naar deze functies
genereren.
In C gebruiken we ook een macro in plaats van een functie: dit opnieuw omdat we niet dezelfde functie in meerdere
bestanden kunnen definiëren.

```c
#undef send_value
#define send_value(value) write_value(${execution_name}_value_file, value)

#undef send_specific_value
#define send_specific_value(value) write_evaluated(${execution_name}_value_file, value)
```

We zien ook dat de implementatie eenvoudig is: we geven de gekregen waarde of exception door aan de juiste functie uit
de `values`-module en geven ook het bestand mee waarin de waarde of exception moet komen.

De lezer zal zich misschien afvragen waarom het nodig is om deze functies te gebruiken:
als TESTed een functieoproep naar deze functies kan definiëren,
waarom kan TESTed dan niet direct de `values`-module gebruiken, zonder daar deze functies tussen te plaatsen?

Het antwoord is dat de `values`-module niet verplicht is.
Dit is een conventie die in alle ondersteunde programmeertalen gebruikt wordt,
maar het is evengoed mogelijk om bij de implementatie van bijvoorbeeld `send_value` de waarde rechtstreeks naar het
bestand te schrijven.
Deze functies moeten beschouwd worden als de "interface" tussen TESTed en de programmeertaal:
TESTed verwacht dat deze functies bestaan en de waarde of exception naar het juiste bestand schrijven,
maar hoe dat gebeurt maakt voor TESTed niet uit.

Nu zijn we aangekomen bij het uitvoeren van de contexten zelf.
Hiervoor wordt er per context een functie gegenereerd.
Deze print eerst de `before`-code.
De `before`-code is een fragment code dat uitgevoerd wordt voor het uitvoeren van de context.
Deze kan opgegeven worden in het testplan.

Verder schrijven we de *separator* naar de uitvoerbestanden door gebruik te maken van de functie die we eerder
gedefinieerd hebben in ons sjabloon.
Zoals we reeds bespraken, komt de uitvoer van de return- en exception-channel van alle testgevallen in dezelfde
bestanden terecht.
Het is nodig om de waarden van elkaar te kunnen onderscheiden, om goed te weten waar de resultaten van een testgeval
stoppen en waar de resultaten van het volgende testgeval beginnen.
Hiervoor gebruiken we de *separator*.

Het is belangrijk om de separator altijd vóór aanvang van een testgeval naar de uitvoerbestanden te schrijven.
TESTed is daar zo op voorzien: de separator na het testgeval uitschrijven zal tot verkeerde resultaten leiden.

We genereren de code voor alle normale testgevallen.
Omdat C geen exceptions ondersteunt, is deze implementatie eenvoudig:
we schrijven de separator naar de uitvoerbestanden en voeren het invoerstatement uit.

Dat invoerstatement is `testcase.input_statement()`, wat een geserialiseerd statement zal teruggeven.
Wat dat statement juist is, is eigenlijk niet relevant voor het sjabloon, maar het kan toch geen kwaad om het te weten:
- Als de invoer van het testgeval een assignment is, zal dit resulteren in code die er zo uitziet:
  `int variable = functieoproep();`
- Is de invoer een uitdrukking () en zijn we geïnteresseerd in de returnwaarde (het is dus niet van het type `void`),
  dan zal de gegenereerde code er als volgt uitzien: `send_value(functieoproep());`

Als afsluiter zetten we de `after`-code en sluiten we de bestanden. De
`after`-code is analoog aan de `before`-code.

```c
% for i, ctx in enumerate(contexts):
    void ${execution_name}_context_${i}(void) {
        ${ctx.before}
        % for testcase in ctx.testcases:
            ${execution_name}_write_separator();
            <%include file="statement.mako" args="statement=testcase.input_statement()" />;
        % endfor
        ${ctx.after}
    }
% endfor
```

Nu zijn we aangekomen bij het uitvoeren van de run zelf.
In C gebeurt dit in een functie die de naam van de run (`execution_name`) krijgt.
Als eerste stap maken we de bestanden voor de return- en exception-channel aan.

```c
int ${execution_name}() {

    ${execution_name}_value_file = fopen("${value_file}", "w");
    ${execution_name}_exception_file = fopen("${exception_file}", "w");
```

Verder schrijven we de *context_separator* naar de uitvoerbestanden door gebruik te maken van de functie die we eerder
gedefinieerd hebben in ons sjabloon.
Zoals we reeds bespraken, komt de uitvoer van de return- en exception-channel van alle contexten in dezelfde
bestanden terecht.
Het is nodig om de waarden van elkaar te kunnen onderscheiden, om goed te weten waar de resultaten van een context
stoppen en waar de resultaten van het volgende context beginnen.
Hiervoor gebruiken we de *context_separator*.

Het is belangrijk om de separator altijd vóór aanvang van een context naar de uitvoerbestanden te schrijven.
TESTed is daar zo op voorzien: de separator na het context uitschrijven zal tot verkeerde resultaten leiden.

We roepen eerst de `main`-functie van de oplossing op indien het testplan dat vereist.
Oefeningen waar geen `main`-functie opgeroepen wordt zijn bijvoorbeeld deze waarbij de student een functie moet
implementeren.

In het codefragment hieronder wordt een oproep gedaan naar de functie `solution_main` uit de ingediende oplossing.
Deze functie hebben we zelf gemaakt door de gewone `main`-functie te hernoemen
(zie [Configuratieklasse](#configuratieklasse)).
Als de ingediende oplossing geen `main`-functie bevatte, maar het testplan verwachtte die wel,
dan zal de compilatie falen.

```c
    ${execution_name}_write_context_separator();
    % if run_testcase.exists:
        char* args[] = {\
        % for argument in ["solution"] + run_testcase.arguments:
            "${argument}", \
        % endfor
        };
        int exit_code = solution_main(${len(run_testcase.arguments) + 1}, args);
        if (exit_code != 0) {
            return exit_code;
        }
    % endif
```

Vervolgens genereren we de code die nodig is om de verschillende context uit te voeren.
```c
    % for i, ctx in enumerate(contexts):
        ${execution_name}_write_context_separator();
        ${execution_name}_context_${i}();
    % endfor

    fclose(${execution_name}_value_file);
    fclose(${execution_name}_exception_file);
    return 0;
}
```

Omdat zowel runcompilatie als batchcompilatie ondersteunt, moet elke run een `main`-functie hebben.
C laat slechts 1 `main`-functie toe.
Indien we in batchcompilatie zitten, zal de selector gebruikt worden, en zal `INCLUDED` op `TRUE` staan.
In dat geval voegen we geen `main`-functie toe.

```c
#ifndef INCLUDED
int main() {
    return ${execution_name}();
}
#endif
```

#### Het selectorsjabloon
Het is nuttig om er meteen het selectorsjabloon bij te halen: dit wordt gebruikt als TESTed in batchcompilatie werkt en
is verantwoordelijk om de juiste context uit te voeren op basis van een argument.
Het is in dit sjabloon dat de macro `INCLUDED` op `true` gezet wordt,
waardoor de `main`-functies in andere contexten niet gebruikt worden.

```c
#include <string.h>
#include <stdio.h>

#define INCLUDED true

% for cont in contexts:
    #include "${cont}.c"
% endfor

int main(int argc, const char* argv[]) {

    if (argc < 1) {
        fprintf(stderr, "No run context selected.");
        return -2;
    }
    
    const char* name = argv[1];
    % for cont in contexts:
        if (strcmp("${cont}", name) == 0) {
            return ${cont}();
        }
    % endfor
    fprintf(stderr, "Non-existing run context '%s' selected.", name);
    return -1;
}
```

#### Het statementsjabloon
Dit sjabloon wordt door TESTed gebruikt om statements te vertalen naar code.
Dit omvat onder andere assignments, functieoproepen en waarden:

```c
## Convert a statement and/or expression into Java code.
<%! from tested.utils import get_args %>\
<%! from tested.serialisation import Value, Identifier, FunctionCall, Assignment %>\
<%page args="statement,full=False"/>\
% if isinstance(statement, Identifier):
    ## If the expression is an identifier, just echo it.
    ${statement}\
% elif isinstance(statement, FunctionCall):
    ## Delegate to the function template for function calls.
    <%include file="function.mako" args="function=statement"/>\
% elif isinstance(statement, get_args(Value)):
    ## We have a value, delegate to the value template.
    <%include file="value.mako", args="value=statement" />\
% else:
    <% assert isinstance(statement, get_args(Assignment)) %>\
    % if full:
        <%include file="declaration.mako" args="tp=statement.type, value=statement.expression" /> \
    % endif
    ${statement.variable} = <%include file="statement.mako" args="statement=statement.expression"/>\
% endif
```

De implementatie van dit sjabloon komt conceptueel neer op een grote `switch`,
waarbij we delegeren naar het juiste sjabloon op basis van welk soort statement of expressie het is.

Een aspect dat wat meer uitleg vraagt, is de `full`-parameter.
Dit geeft aan dat het gegevenstype van de variabele bij een assignment ook nodig is.
Het verschil is duidelijk met een voorbeeld:

```c
int variabele = 5; // met declaration
variabele = 6; // zonder declaration
```

In C is deze parameter minder relevant omdat de tweede variant zelden nodig is,
maar deze is vooral nodig in talen zoals Java.

Wat ook nuttig kan zijn, is de functie `get_args`, geïmporteerd uit `tested.utils`.
We willen op verschillende plaatsen in het sjabloon een andere actie doen op basis van het soort statement.
Normaliter zou een eenvoudige oproep met `isinstance` volstaan.
Nu zijn verschillende types, zoals `Value`, `Expression` en `Statement` geen echt type:
ze zijn geïmplementeerd als een `Union`.
Zo luidt de definitie van `Expression` als volgt: `Expression = Union[Identifier, FunctionCall, Value]`.
`Union`-types kunnen niet gebruikt worden in `isinstance`.
De `get_args`-functie lost dit probleem op door de `Union` om te zetten naar een `tuple` van echte types.
Het is beter de functie `get_args` te veel dan te weinig te gebruiken: de functie werkt ook voor gewone types.

```python
>>> isinstance('string', Expression)
TypeError
>>> isinstance('string', get_args(Expression))
False
>>> isinstance('string', get_args(str))  # Ook gewone types
True
```

#### Overige
De overige sjablonen vertalen elk een taalelement op een gelijkaardige wijze als het statementsjabloon.
Het gaat om volgende sjablonen:
- `declaration.mako`
- `function.mako`
- `value.mako`
- `value_arguments.mako`
- `value_basic.mako`

We hebben ze niet opgenomen in deze handleiding, omdat ze sterk lijken op het statementsjabloon.
De implementatie van deze sjablonen is te bekijken in de repository.

### Hulpmodules
Zoals we in het begin van dit hoofdstuk vermeld hebben, zijn er twee bestanden die als "dependency" opgegeven zijn:
`values.c` en `values.h`.
Deze bestanden implementeren het serialiseren van data naar het serialisatieformaat en vormen samen de `values`-module.
De elementen die geserialiseerd moeten worden:
- Waarden, zoals returnwaarden.
- Exceptions (niet het geval in C, want die bestaan niet in C).
- Resultaten van geprogrammeerde en programmeertaalspecifieke evaluaties.

Hier nemen we de implementatie opnieuw niet op, daar de implementatie van deze module volledig
programmeertaalafhankelijk is.
In Python is de implementatie eenvoudig door de ingebouwde module `json`,
terwijl de implementatie in C een stuk langer is.

### Registratie
Als laatste rest nu nog om de nieuwe programmeertaal te registreren bij TESTed.
Hiervoor volstaat het om de programmeertaal en de bijhorende configuratieklasse toe te voegen aan het bestand
`tested/languages/__init__.py`, in de dictionary `LANGUAGES`:
```python
LANGUAGES = {
  'c': C,
  'haskell': Haskell,
  'java': Java,
  'javascript': JavaScript,
  'kotlin': Kotlin,
  'python': Python,
  'runhaskell': RunHaskell,
}
```

Om de programmeertaal manueel te testen is volgend stappenplan aanbevolen:
1. Implementeer oplossingen voor een of meerdere oefeningen uit de map `exercises` in de nieuwe programmeertaal.
2. Wijzig `tested/manual.py` zodat dit bestand de oefening gebruikt waarvoor een oplossing bestaat
   (en stel ook de juiste programmeertaal in).
3. Voer uit, zoals we in het begin van het hoofdstuk besproken hebben:
   ```bash
   > python -m tested.manual
   ```

TESTed heeft ook een testsuite met verschillende oefeningen en scenario's.
Om de nieuwe programmeertaal hieraan toe te voegen, moeten de juiste oplossingen geïmplementeerd worden.
Hiervoor wordt best gekeken naar `tests/test_functionality.py`.
In dat bestand staan de verschillende testen.
Bij elke test staat welke oplossing gebruikt wordt; indien het niet duidelijk zou zijn wat de oplossing voor een
bepaalde test moet doen, kunnen de bestaande oplossingen in de bestaande programmeertalen een grote hulp zijn.
