---
title: Oefeningen beschrijven met sjablonen
description: "Oefeningen beschrijven met sjablonen"
---

# Oefeningen beschrijven met sjablonen

Als je een oefening wil aanbieden voor meerdere programmeertalen, dan moet de 
beschrijving van de oefening idealiter ook aangepast worden aan de gangbare
terminologie en conventies in elk van de programmeertalen. Dit zijn een aantal
zaken die kunnen verschillen naargelang de programmeertaal:

- **conventies voor naamgeving**: Verschillende programmeertalen hanteren andere 
  conventies voor het benoemen van variabelen, functies of klassen. Zo is het in 
  Python bijvoorbeeld [pythonic](https://stackoverflow.com/questions/25011078/) 
  om *snake case* te gebruiken voor namen van variabelen en functies, waar Java 
  de voorkeur geeft aan *camel case*.
- **formele namen voor ingebouwde types**: Verschillende programmeertalen 
  hebben verschillende ingebouwde gegevenstypes. Ondanks soms subtiele 
  verschillen qua interne voorstelling van data kunnen we toch parallellen 
  trekken tussen de gegevenstypes van verschillende programmeertalen. Zo stelt 
  het gegevenstype `byte` in Java in essentie hetzelfde soort data voor als 
  `Data.Int.Int8` in Haskell: 8-bit gehele getallen. 
- **informele namen voor ingebouwde types**: Als men het informeel heeft over 
  gegeventypes van een programmeertaal, dan is het gangbaar om informele namen
  te gebruiken in plaats van de formele namen voor de gegevenstypes. Zo heeft 
  men het in Python bijvoorbeeld informeel over een *dictionary* als men spreekt
  over het ingebouwde gegevenstype `dict`. Maar net zoals de formele namen voor
  (quasi) dezelfde gegevenstypes kunnen verschillen tussen programmeertalen, 
  geldt hetzelfde ook voor hun informele namen. Zo spreekt men in JavaScript 
  over *arrays* (`Array`), waar men het in Python heeft over *lijsten* (`list`).
- **grammatica voor code**: De beschrijving van veel oefeningen bevat 
  codevoorbeelden. Maar code die hetzelfde doet, moet in verschillende 
  programmeertalen op een andere manier geschreven worden.

Het doel van TESTed is om al die verschillen tussen programmeertalen weg te 
werken bij het opstellen van oefeningen, ook in het beschrijven van de opgave 
zelf. Qua formaat kan je in Dodona al kiezen om de beschrijving op te stellen in 
Markdown (`.md`) of HTML (`.html`). Bovendien kan je ook afzonderlijke 
beschrijvingen opstellen in het Nederlands (`.nl`) en het Engels (`.en`). TESTed 
voegt daar nog aan toe dat je **MAKO-sjablonen** kunt gebruiken om generieke 
beschrijvingen op te stellen die de verschillen tussen programmeertalen 
wegwerken. 

In die MAKO-sjablonen gebruik je *placeholders* op plaatsen waar de 
beschrijving verschilt per programmeertaal. TESTed kan dan automatisch die 
*placeholders* invullen voor elke programmeertaal die ondersteund wordt. Zo 
krijg je een beschrijving die zich aanpast aan de gekozen programmeertaal. 
Hierna bespreken we de verschillende soorten *placeholders* die je in 
Mako-sjablonen kan gebruiken.

## Constanten

In een MAKO-sjabloon kan je de volgende **constanten** tussen `${...}` plaatsen:

- `prompt`: De prompt die typisch als prefix gebruikt wordt bij een 
  interactieve sessie. Bij Python wordt bijvoorbeeld typische de prompt `>>>`
  gebruikt in interactieve sessies.
- `programming_language`: De naam van de programmeertaal (bv. Kotlin).
- `natural_language`: De naam van de natuurlijke taal (bv. Nederlands) waarin de
  beschrijving is opgesteld.
- `natural_language_iso639`: De [ISO 639-1 code](https://nl.wikipedia.org/wiki/Lijst_van_ISO_639-codes)
  van de natuurlijke taal waarin de beschrijving is opgesteld.
- `namespace`: De namespace voor de ingediende oplossing. In Java is dit 
  bijvoorbeeld de naam van de klasse waarin statische methoden moeten 
  geïmplementeerd worden, voor oefeningen waar in andere programmeertalen 
  gevraagd wordt om functies in de (onbenoemde) global scope te implementeren.

In Markdown en HTML wordt automatisch escaping toegepast op de waarde waardoor 
deze constanten vervangen worden. 

Daarnaast is er ook nog een constante `programming_language_raw` die op dezelfde 
manier wordt vervangen als de constante `programming_language`, maar dan 
zonder extra escaping. Dit is de aanbevolen constante om te gebruiken in 
voorwaardelijke fragmenten van een MAKO-sjabloon die enkel in de beschrijving 
moeten opgenomen worden voor een specifieke programmeertaal (zie verder).

### Markdown voorbeeld

Dit MAKO-sjabloon in Markdown met namespace `solution`

```mako
## Data
De prompt voor **${programming_language}** is `${prompt}`.
De namespace is '${namespace}'.
```

wordt voor Java omgezet naar

```markdown
De prompt voor **java** is `>`.
De namespace is 'Solution'.
```

en voor Python naar

```markdown
De prompt voor **python** is `>>>`.
De namespace is 'solution'.
```

#### HTML voorbeeld

Dit MAKO-sjabloon in HTML met namespace `submission`

```mako
<p>
    De prompt voor <span style="font-weight: bold">${programming_language}</span> is <code>${prompt}</code>.
    De namespace is '${namespace}'.
</p>
```

wordt voor JavaScript omgezet naar

```html
<p>
    De prompt voor <span style="font-weight: bold">javascript</span> is <code>&gt;</code>.
    De namespace is 'submission'.
</p>
```

## Functies

In een MAKO-sjabloon kan je de volgende **functies** tussen `${...}` plaatsen:

- **function**: Aan deze MAKO-functie moet de naam van een functie 
  (`string`) doorgegeven worden. De MAKO-functie geeft de naam van de functie 
  terug, opgemaakt volgens de conventie voor functienamen zoals die gangbaar is
  in de programmeertaal (bijvoorbeeld *snake case* of *camel case*).
  ::: tip Tip
  De omzetting naar de conventie van een programmeertaal is het meest accuraat 
  als er aan de MAKO-functie een naam in *snake case* wordt doorgegeven.
  :::
- **variable**: Aan deze MAKO-functie moet de naam van een variabele 
  (`string`) doorgegeven worden. De MAKO-functie geeft de naam van de variabele 
  terug, opgemaakt volgens de conventie voor variabelenamen zoals die gangbaar is
  in de programmeertaal (bijvoorbeeld *snake case*, *macro case* of *camel case*).
  Standaard zal deze functie een globale variabelenaam teruggeven. De MAKO-functie
  heeft een tweede optionele parameter `global` waaraan een Booleaanse waarde
  (`bool`) kan door gegeven worden, die aangeeft of het een lokale variabele
  (`False`) of globale variabele (`True`) is.
  
  ::: tip Tip
  De omzetting naar de conventie van een programmeertaal is het meest accuraat 
  als er aan de MAKO-functie een naam in *snake case* wordt doorgegeven.
  :::
- **property**: Aan deze MAKO-functie moet de naam van een eigenschap
  (`string`) doorgegeven worden. De MAKO-functie geeft de naam van de eigenschap
  terug, opgemaakt volgens de conventie voor een naam van de eigenschap zoals die
  gangbaar is in de programmeertaal (bijvoorbeeld *snake case* of *camel case*).
  ::: tip Tip
  De omzetting naar de conventie van een programmeertaal is het meest accuraat
  als er aan de MAKO-functie een naam in *snake case* wordt doorgegeven.
  :::
- **datatype**: Aan deze MAKO-functie moet een [TESTed-gegevenstype](../json/#datatypes-tested)
  (`string`) doorgegeven worden. Als het TEST-gegevenstype een collectietype is,
  dan moet als tweede argument ook nog het gegevenstype van de elementen 
  (`string`) of een lijst (`list`) met de gegevenstypes van de elementen 
  (`string`) van de collectie doorgegeven worden. De MAKO-functie geeft de 
  formele naam van het gegevenstype terug zoals die ingebouwd is in de 
  programmeertaal.
  
  Naast de TESTed-gegevenstypes kunnen er ook eigen klassennamen gebruikt worden
  voor de gegevenstypes.
  ::: tip Tip
  De omzetting naar de conventie van een programmeertaal is het meest accuraat
  als er aan de MAKO-functie een naam in *snake case* wordt doorgegeven.
  :::
- **datatype_common**: Aan deze MAKO-functie moet een [TESTed-gegevenstype](../json/#datatypes-tested)
  (`string`) doorgegeven worden. De MAKO-functie geeft de informele naam van het 
  gegevenstype terug zoals die in geschreven taal voor de programmeertaal 
  gebruikt wordt. Standaard wordt die naam in het enkelvoud teruggegeven. De 
  MAKO-functie heeft een tweede optionele parameter `plural` waaraan een 
  Booleaanse waarde (`bool`) kan doorgegeven worden, die aangeeft of de naam in 
  het enkelvoud (`False`) of in het meervoud (`True`) moet teruggegeven worden.

### Voorbeeld

Dit MAKO-sjabloon in Markdown

```mako
Aan de functie ${function("splits_in_woorden")} moet een ${datatype_common("text")} 
(${datatype("text")}) doorgegeven worden. De functie geeft een ${datatype_common("sequence")} 
van ${datatype_common("char", plural=True)} (${datatype(("sequence", "char"))}) terug.
```

wordt voor JavaScript omgezet naar

```markdown
Aan de functie `splitsInWoorden` moet een string 
(`string`) doorgegeven worden. De functie geeft een array
van karakters (`array<string>`) terug.
```

en voor Python naar

```markdown
Aan de functie `splits_in_woorden` moet een string 
(`str`) doorgegeven worden. De functie geeft een lijst
van karakters (`List[str]`) terug.
```

## Codefragmenten

In een MAKO-sjabloon kan je generieke codefragmenten opnemen. Ze worden 
genoteerd in _DOCTEST_-stijl en gebruiken de 
[programmeertaal-onafhankelijke grammatica](../dsl/#statements-expressies-en-return-raw))
van TESTed. Vanuit die generieke notatie worden ze omgezet naar codefragmenten 
die de grammatica en stijlconventies van een specifieke programmeertaal 
respecteren.

In _DOCTEST_-stijl beginnen de statements en expressies van een codefragment 
met een groter-dan-teken (`>`) en een spatie. De evaluatie van een expressie
wordt onmiddellijk na de expressie weergegeven, op een regel die niet begint 
met een groter-dan-teken (`>`) en een spatie. Op die manier krijgt het 
codefragment het uitzicht van een read–eval–print loop (REPL) of een 
interactieve shell van een programmeertaal.

Als de haakjes op een regel die start met een groter-dan-teken (`>`) en een 
spatie niet gebalanceerd zijn, dan wordt verondersteld dat het statement of de
expressie verder loopt op de volgende regels. Een andere manier om aan te duiden
dat een statement of een expressie verder loopt op de volgende regel, is door
een backslash (`\`) op het einde van de regel te plaatsen.

:::warning Belangrijk
Bij het omzetten van een MAKO-sjabloon naar de beschrijving voor een specifieke
programmeertaal, worden de generieke codefragmenten afzonderlijk verwerkt, los 
van de MAKO-engine. Daardoor worden MAKO-directieven (constanten en functies 
tussen `${...}`) in codefragmenten niet verwerkt door MAKO.
:::

### Markdown voorbeeld

In Markdown moeten generieke codefragmenten voor TESTed voorafgegaan worden door
een regel met ` ```tested` zonder voorafgaande witruimte. Het codefragment 
eindigt bij de eerstvolgende regel met ` ``` ` zonder voorafgaande witruimte. Zo
wordt dit codefragment in een MAKO-sjabloon in Markdown

````mako
```tested
> heir(8, 10)
[10, 4, 15, 11, 7, 5, 3,
 2, 16, 12, 1, 6, 13, 9, 14, 8]
```
````

bijvoorbeeld voor Kotlin omgezet naar

````markdown
```console?lang=kotlin&prompt=>
> heir(8, 10)
listOf(10, 4, 15, 11, 7, 5, 3, 2, 16, 12, 1, 6, 13, 9, 14, 8)
```
````

### HTML voorbeeld

In HTML moeten generieke codefragmenten voor TESTed ingesloten worden in een 
`<code>`-tag van de klasse `tested`. Het codefragment mag zelf geen 
`<code>`-tags bevatten. Zo wordt dit codefragment in een MAKO-sjabloon in HTML

```mako
<div class="highlighter-rouge language-${programming_language_raw}">
<pre class="highlight"><code class="color tested code" id="code">\
> encode("And now for something completely different.",
         1)
"And now for something completely different."\
</code></pre>
</div>
```

bijvoorbeeld voor Haskell omgezet naar

```html
<div class="highlighter-rouge language-haskell">
<pre class="highlight"><code class="color tested code" id="code">&gt; <span class="nf">encode</span> <span class="p">(</span><span class="s">&quot;And now for something completely different.&quot;</span><span class="p">)</span> <span class="p">(</span><span class="mi">1</span> <span class="ow">::</span> <span class="kt">Int</span><span class="p">)</span>
<span class="s">&quot;And now for something completely different.&quot;</span></code></pre>
</div>
```

## Programmeertaal-specifieke fragmenten

De mogelijkheid om voorwaardelijke statements te gebruiken in MAKO-sjablonen, 
kan je gebruiken om tekstfragmenten op te nemen die slechts bij één of een 
selectie van programmeertalen zullen opgenomen worden. Zowel in de voorwaarden 
als in de tekstfragmenten zelf kan je MAKO-directieven (constanten en functies)
gebruiken. In een voorwaardelijke statement gebruik je ze als Python-variabelen
en -functies, en in een tekstfragment moet je ze insluiten tussen `${...}`.

### Voorbeeld

Dit MAKO-sjabloon in Markdown

```mako
Deze tekst wordt in de beschrijving van alle programmeertalen opgenomen.

% if programming_language_raw == 'java':
Deze tekst wordt enkel in de beschrijving van ${programming_language} opgenomen.
% endif
```

wordt voor Java omgezet naar

```markdown
Deze tekst wordt in de beschrijving van alle programmeertalen opgenomen.

Deze tekst wordt enkel in de beschrijving van java opgenomen.
```

en voor C naar

```markdown
Deze tekst wordt in de beschrijving van alle programmeertalen opgenomen.

```

## Zelf-gedefinieerde variabelen

In Mako-sjablonen kan je zelf ook variabelen definiëren. Je kan dit bijvoorbeeld
gebruiken om een MAKO-functie slechts één keer aan te roepen en het resultaat 
toe te kennen aan een variabele.

### Voorbeeld

```mako
<% lijst = datatype_common("list") %>\

Schrijf een functie ${function("heir")}, waaraan de waarden $k$ en $n$,
van het type ${datatype("integer")}, moeten doorgegeven worden, waarbij je er 
mag van uitgaan dat $k >= 2$. De functie moet een ${lijst} van het type 
${datatype(("list", "integer"))} teruggeven die de volgorde aangeeft waarin de 
kinderen uit de cirkel verwijderd werden.

Het eerst verwijderde kind staat daarbij als eerste in de ${lijst}, en de 
uiteindelijke erfgenaam als laatste in de ${lijst}. Gebruik de volgnummers 
waarmee de kinderen in de ${lijst} genummerd werden als elementen in de 
${lijst}.
```

## Volledige opgave

Dit is het MAKO-sjabloon in HTML voor de oefening
[Spoorhekcodering](https://dodona.ugent.be/nl/courses/392/#series-card-3922).

```mako
<p>
    In the <span style="font-style: italic;">rail fence cipher</span> (also called
    <span style="font-style: italic;">zigzag cipher</span>), the letters of the
    plaintext are initially written downwards and diagonally on successive "rails"
    of an imaginary fence, and then moving up after the bottom rail has been
    reached. When the top rail is reached, the message is again written downwards
    until the whole plaintext is written out. If the text "<code>And now for
    something completely different.</code>" is written as such across four rails,
    we get the following result
</p>
<% style_yellow = 'style="background-color:#ffff00; color:#000000;"' %>\
<% style_grey = 'style="color:#888888;"' %>\
<div class="highlighter-rouge language-python">
<pre class="highlight"><code><span ${style_grey}><span ${style_yellow}><strong
>A</strong></span>#####<span ${style_yellow}><strong>w</strong></span>#####<span
${style_yellow}><strong>s</strong></span>#####<span ${style_yellow}><strong
>i</strong></span>#####<span ${style_yellow}><strong>m</strong></span>#####<span
${style_yellow}><strong>l</strong></span>#####<span ${style_yellow}><strong
>f</strong></span>#####<span ${style_yellow}><strong>.</strong></span></span>
<span ${style_grey}>#<span ${style_yellow}><strong>n</strong></span>###<span
${style_yellow}><strong>o</strong></span>#<span ${style_yellow}> </span>###<span
${style_yellow}> </span>#<span ${style_yellow}><strong>o</strong></span>###<span
${style_yellow}><strong>h</strong></span>#<span ${style_yellow}><strong>n</strong
></span>###<span ${style_yellow}><strong>o</strong></span>#<span ${style_yellow}
><strong>p</strong></span>###<span ${style_yellow}><strong>e</strong></span>#<span
${style_yellow}><strong>y</strong></span>###<span ${style_yellow}><strong>f</strong
></span>#<span ${style_yellow}><strong>e</strong></span>###<span ${style_yellow}
><strong>t</strong></span>#</span>
<span ${style_grey}>##<span ${style_yellow}><strong>d</strong></span>#<span
${style_yellow}><strong>n</strong></span>###<span ${style_yellow}><strong>f</strong
></span>#<span ${style_yellow}><strong>r</strong></span>###<span ${style_yellow}
><strong>m</strong></span>#<span ${style_yellow}><strong>t</strong></span>###<span
${style_yellow}><strong>g</strong></span>#<span ${style_yellow}><strong>c</strong
></span>###<span ${style_yellow}><strong>l</strong></span>#<span ${style_yellow}
><strong>t</strong></span>###<span ${style_yellow}> </span>#<span ${style_yellow}
><strong>i</strong></span>###<span ${style_yellow}><strong>r</strong></span>#<span
${style_yellow}><strong>n</strong></span>##</span>
<span ${style_grey}>###<span ${style_yellow}> </span>#####<span ${style_yellow}
><strong>o</strong></span>#####<span ${style_yellow}><strong>e</strong></span
>#####<span ${style_yellow}> </span>#####<span ${style_yellow}><strong>e</strong
></span>#####<span ${style_yellow}><strong>d</strong></span>#####<span
${style_yellow}><strong>e</strong></span>###</span></code></pre>
</div>

<p>
    The encoded message is then formed by reading the letters on each rail from
    left to right, and going through the rails top to bottom. The encoded message
    for the above example thus reads as
    "<code>Awsimlf.no&nbsp; ohnopeyfetdnfrmtgclt irn oe ede</code>".
</p>

<h3>Assignment</h3>
<ul>
    <li>Write a function <code>${function("encode")}</code> that takes two
    arguments:
        <ol>
            <li>a text string (${datatype("text")}) and</li>
            <li>the number (${datatype("integer")}) of rails used in the rail
            fence cipher.</li>
        </ol>
        The function must return a string (${datatype("text")}) containing the
        encoded message of the given text, according to the rail fence cipher with
        the given number of rails.
    </li>
    <li>Write a function <code>${function("decode")}</code> that takes two
    arguments:
        <ol>
            <li> a text (${datatype("text")}) encoded according to the rail fence
            cipher and</li>
            <li>the number (${datatype("integer")}) of rails used in the coding
            scheme.</li>
        </ol>
        The function must return a string (${datatype("text")}) containing the
        original text after decoding.
    </li>
</ul>

% if programming_language_raw == 'java':
<p> The functions must be static declared in the class ${namespace}.</p>
% endif

<h3>Example</h3>

<div class="highlighter-rouge language-${programming_language_raw}">
<pre class="highlight"><code class="tested" id="code">\
> encode("And now for something completely different.", 1)
"And now for something completely different."
> encode("And now for something completely different.", 2)
"Adnwfrsmtigcmltl ifrn.n o o oehn opeeydfeet"

> decode("And now for something completely different.", 1)
"And now for something completely different."
> decode("Adnwfrsmtigcmltl ifrn.n o o oehn opeeydfeet", 2)
"And now for something completely different."\
</code></pre>
</div>
```

## MAKO-sjablonen omzetten

De [GitHub repository](https://github.com/dodona-edu/universal-judge) van TESTed
bevat een Python-script waarmee je een MAKO-sjablonen met een generieke 
beschrijving kunt omzetten naar de beschrijving voor een specifieke 
programmeertaal. Het Python-script kan op de volgende vier manieren uitgevoerd 
worden in de root directory van de GitHub repository:

```bash
# Standaard instantiëring Engelstalige HTML voor python met namespace 'submission'
$ python3 -m tested.description_instance < template.html.mako > description.html
# Korte opties
$ python3 -m tested.description_instance -d template.html.mako -o description.html
# Lange optienamen
$ python3 -m tested.description_instance --description template.html.mako --output description.html
# Positionele argumenten
$ python3 -m tested.description_instance template.html.mako description.html
```

Dit zijn de overige opties die het Python-script ondersteunt:

| **Kort** | **Lang**      | **Beschrijving**          | **Standaardwaarde** |
| -------- | ------------- | ------------------------- | ------------------- |
| `-l`     | `--language`  | Programmeertaal           | `python`            |
| `-i`     | `--i18n`      | Natuurlijke taal          | `en`                |
| `-n`     | `--namespace` | Namespace van de oefening | `submission`        |
| `-M`     | `--markdown`  | Markdown sjabloon         | -                   |
| `-H`     | `--html`      | HTML Sjabloon (standaard) | -                   |
