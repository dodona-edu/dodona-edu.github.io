---
title: TESTed opgavesjablonen
description: "TESTed opgavesjablonen"
---

# Documentatie opgavesjablonen
Opgavesjablonen worden gebruikt om één keer een opgave op te stellen.
Deze opgave kan dan geïnstantieerd worden per programmeertaal die nodig is met de juiste benamingen van datatypes
en stijlconventies.

De opgavesjabloon worden geschreven met het Mako-sjablonensysteem.
TESTed ondersteunt twee opmaaktalen voor de opgaven: Markdown en HTML.
De opgaven kunnen zowel in het Nederlands, als in het Engels geschreven worden.

Wat moet er per programmeertaal gegenereerd worden?
- **Functienamen**:
  De stijlconventies voor functienamen zijn afhankelijk van de programmeertaal.
  Bijvoorbeeld: Python gebruikt de `snake_case`-conventie, Java gebruikt de `camelCase`-conventie.
- **Typenamen**:
  Een van de grotere verschillen tussen programmeertalen is de benaming voor hetzelfde datatype.
  Voorbeeld 8-bit gehele getallen: Java gebruikt hiervoor de naam `byte`,
  Haskell gebruikt hiervoor de naam `Data.Int.Int8`.
- **Natuurlijke typenamen**:
  De natuurlijke typenamen, meer specifiek deze voor collecties van gegevens, kunnen ook variëren per programmeertaal.
  Zo spreek je voor JavaScript over arrays, terwijl Python spreekt over lijsten,
  hoewel je het voor beide talen over dezelfde soort datastructuur hebt.
- **Codevoorbeelden**:
  Het grootste verschil tussen de programmeertalen is de syntaxis die gebruikt wordt om de code te schrijven.

## Constanten
We zullen eerst een overzicht zien van de constanten die gebruikt kunnen worden in de sjablonen.
- **prompt**:
  Deze constante bevat de console-prompt-prefix.
  Deze zal voor HTML geëscaped worden.
  Bijvoorbeeld: `>>>` voor Python.
- **language en language_html**:
  Deze constanten bevatten de naam van de programmeertaal waarvoor een instantie gegenereerd wordt. 
  `language_html` is de HTML-veilige versie van `language`.
- **namespace en namespace_html**:
  Deze constanten bevatten de `namespace` van de code.
  Deze kan meegegeven worden als parameter aan het conversieprogramma.
  `namespace_html` is de HTML-veilige versie van `namespace`.

De constanten en functieoproepen in Mako moeten tussen `${...}` genoteerd worden.

### Voorbeelden
Een eerste voorbeeld is in Markdown voor Java en Python, met namespace 'solution'.
Een tweede voorbeeld is in HTML voor JavaScript, met namespace 'submission'.

#### Markdown

Sjabloon:
```mako
De prompt voor **${language}** is `${prompt}`.
De namespace is '${namespace}'.
```

Instantie Java:
```markdown
De prompt voor **java** is `>`.
De namespace is 'Solution'.
```

Instantie Python:
```markdown
De prompt voor **python** is `>>>`.
De namespace is 'solution'.
```

#### HTML
Sjabloon:
```mako
<p>
    De prompt voor <span style="font-weight: bold">${language_html}</span> is <code>${prompt}</code>.
    De namespace is '${namespace_html}'.
</p>
```

Instantie JavaScript:
```html
<p>
    De prompt voor <span style="font-weight: bold">javascript</span> is <code>&gt;</code>.
    De namespace is 'submission'.
</p>
```

## Functies
Zoals reeds aangegeven in de sectie [Constanten](#constanten) ondersteunt Mako ook functies.

We zullen terug een overzicht geven van de beschikbare functies die gebruikt kunnen worden met enkele voorbeelden.

- **function_name**:
  Deze functie dient om de correcte stijlconventie voor de functienamen te kunnen renderen per programmeertaal.
  Deze functie verwacht een string als argument.
  ::: tip Tip
  Wanneer een functienaam in het sjabloon opgegeven wordt, gebruikt men best de `snake_case`-stijlconventie.
  Dit zorgt ervoor dat de functienamen per taal correct gegenereerd kunnen worden.
  :::
- **type_name**:
  Deze functie dient gebruikt te worden om de datatypes van te vertalen in de datatypes die gebruikt worden in de
  programmeertalen.
  Deze functie verwacht ofwel een string ofwel een paar als typeargument.
  Het eerste argument van het paar is een collectiedatatype string,
  het tweede ofwel één typeargument ofwel een lijst met typeargumenten.
- **natural_type_name**:
  Deze functie zoekt de natuurlijke naam voor een collectiedatatype en/of het string-datatype van TESTed voor een
  gegeven programmeertaal.
  Deze functie verwacht een string als argument.

### Voorbeeld
We zullen een voorbeeld bekijken van een Markdown-opgave voor Python en JavaScript.

Sjabloon:
```mako
The function ${function_name("characterize_string")} takes one
${type_name("text")} as argument and returns the ${natural_type_name("sequence")}
of characters of type ${type_name(("sequence", "char"))}.
```

Instantie JavaScript:
```markdown
The function `characterizeString` takes one
`string` as argument and returns the array
of characters of type `array<string>`.
```

Instantie Python:
```markdown
The function `characterize_string` takes one
`str` as argument and returns the list
of characters of type `List[str]`.
```

## Codevoorbeelden
De sjablonen hebben de mogelijkheid om de codevoorbeelden in een _DOCTEST_-stijl te noteren.

### Codefragmenten
De codefragmenten worden genoteerd met behulp van de mini-programmeertaal van TESTed
(zie [Statements, expressies en return-raw](../dsl/#statements-expressies-en-return-raw)),
op een Python doctest-achtige manier.
De invoerstatements en -expressies moeten worden voorafgegaan door het groter dan teken (`>`), de returnwaarden niet.

Om meerdere regels te kunnen gebruiken wordt er gekeken naar het balanceren van de haakjes.
Daarnaast kun je ook expliciet aanduiden dat een statement/expressie verder loopt op de volgende regel,
wanneer het laatste symbool op de regel een backslash (`\`) is.

:::warning Belangrijk
De codefragmenten worden verwerkt in de voorbereidende stap voor het renderen van de template.
Bij deze verwerking worden de statements en expressies vertaald naar de bijhorende functieoproepen.
Bijgevolg kunnen er geen Mako-directieven gebruikt worden in deze codefragmenten.
:::

#### Voorbeeld
```javascript
> heir(8, 10)
[10, 4, 15, 11, 7, 5, 3,
 2, 16, 12, 1, 6, 13, 9, 14, 8]
```

### Hoofding
De codefragmenten die geanalyseerd moeten worden in Markdown starten met de hoofding ` ```tested` zonder witruimte voor.
Deze sluit af met ` ``` ` zonder witruimte voor.
De enige beperking in de Markdown-codefragmenten is dat de regels niet mogen starten met ` ``` `.

De codefragmenten die geanalyseerd moeten worden in HTML bevinden zich in de tag `code` en
moeten lid zijn van de klasse `tested`.
De enige beperking in de codefragmenten is dat deze geen inwendige `code` tags mogen bevatten, ook niet in de strings.

### Voorbeelden
Een eerste voorbeeld is in Markdown met een Kotlin-instantie.
Een tweede voorbeeld is in HTML met een Haskell-instantie.

#### Markdown
Sjabloon:
````mako
```tested
> heir(8, 10)
[10, 4, 15, 11, 7, 5, 3,
 2, 16, 12, 1, 6, 13, 9, 14, 8]
```
````

Instantie Kotlin:
````markdown
```console?lang=kotlin&prompt=>
> heir(8, 10)
listOf(10, 4, 15, 11, 7, 5, 3, 2, 16, 12, 1, 6, 13, 9, 14, 8)
```
````

#### HTML
Sjabloon:
```mako
<div class="highlighter-rouge language-${language}">
<pre class="highlight"><code class="color tested code" id="code">\
> encode("And now for something completely different.",
         1)
"And now for something completely different."\
</code></pre>
</div>
```

Instantie Haskell:
```html
<div class="highlighter-rouge language-haskell">
<pre class="highlight"><code class="color tested code" id="code">&gt; <span class="nf">encode</span> <span class="p">(</span><span class="s">&quot;And now for something completely different.&quot;</span><span class="p">)</span> <span class="p">(</span><span class="mi">1</span> <span class="ow">::</span> <span class="kt">Int</span><span class="p">)</span>
<span class="s">&quot;And now for something completely different.&quot;</span></code></pre>
</div>
```

## Taalspecifieke informatie
De Mako-sjablonen hebben ook conditionele constructies,
hierdoor kun je informatie toevoegen alleen voor een specifieke programmeertaal.

### Voorbeeld
We zullen een voorbeeld zien in Markdown voor Java en C, maar een gelijkaardige structuur kan worden gebruikt in HTML.

Sjabloon:
```mako
Gemeenschappelijke tekst

% if language == 'java':
De functies moeten statisch gedefinieerd worden in de klasse ${namespace}.
% endif
```

Instantie Java:
```markdown
Gemeenschappelijke tekst

De functies moeten statisch gedefinieerd worden in de klasse Solution.
```

Instantie C:
```markdown
Gemeenschappelijke tekst
```

## Eigen variabelen
Voor vaak gebruikte benamingen kun je zelf variabelen definiëren in Mako,
om niet telkens de functies te moeten oproepen.

### Voorbeeld
We zullen een voorbeeld in Markdown bekijken zonder instanties.
```mako
<% lijst = natural_type_name("list") %>\
Schrijf een functie ${function_name("heir")}, waaraan de waarden $k$ en $n$,
van het type ${type_name("integer")}, moeten doorgegeven worden,
waarbij je er mag van uitgaan dat $k >= 2$
De functie moet een ${lijst}, van het type ${type_name(("list", "integer"))}
teruggeven die de volgorde aangeeft waarin de kinderen uit de cirkel
verwijderd werden.
Het eerst verwijderde kind staat daarbij als eerste in de ${lijst},
en de uiteindelijke erfgenaam als laatste in de ${lijst}.
Gebruik de volgnummers waarmee de kinderen in de ${lijst} genummerd
werden als elementen in de ${lijst}.
```

## Volledige opgave in HTML
Hieronder volgt een volledige opgavesjabloon in HTML.
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
    <li>Write a function <code>${function_name("encode")}</code> that takes two
    arguments:
        <ol>
            <li>a text string (${type_name("text")}) and</li>
            <li>the number (${type_name("integer")}) of rails used in the rail
            fence cipher.</li>
        </ol>
        The function must return a string (${type_name("text")}) containing the
        encoded message of the given text, according to the rail fence cipher with
        the given number of rails.
    </li>
    <li>Write a function <code>${function_name("decode")}</code> that takes two
    arguments:
        <ol>
            <li> a text (${type_name("text")}) encoded according to the rail fence
            cipher and</li>
            <li>the number (${type_name("integer")}) of rails used in the coding
            scheme.</li>
        </ol>
        The function must return a string (${type_name("text")}) containing the
        original text after decoding.
    </li>
</ul>

% if language == 'java':
<p> The functions must be static declared in the class ${namespace_html}.</p>
% endif

<h3>Example</h3>

<div class="highlighter-rouge language-${language}">
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

## Instantiëren van een sjabloon
Om de sjablonen te instantiëren voor een programmeertaal, kan er gebruikgemaakt worden van een Python-script, 
dat deel uitmaakt van TESTed.
Dit script kan terug gevonden op [GitHub repository](https://github.com/dodona-edu/universal-judge) van TESTed.
Het script kan uitgevoerd worden met één van de volgende commando's (en combinaties) in de root directory van de
GitHub repository:
```bash
# Standaard instantiëring engelstalige HTML voor python met namespace 'submission'
$ python3 -m tested.description_instance < template.html.mako > description.html
# Korte opties
$ python3 -m tested.description_instance -d template.html.mako -o description.html
# Lange optienamen
$ python3 -m tested.description_instance --description template.html.mako --output description.html
# Positionele argumenten
$ python3 -m tested.description_instance template.html.mako description.html
```

De extra opties zijn:
| **Kort** | **Lang** | **Beschrijving** |
| -------- | -------- | -----------------|
| `-l` | `--language` | Programmeertaal, standaard 'python' |
| `-i` | `--i18n` | Natuurlijke taal, standaard 'en' |
| `-n` | `--namespace` | Namespace van de oefening, standaard 'submission' |
| `-M` | `--markdown` | Markdown sjabloon |
| `-H` | `--html` | HTML Sjabloon, standaard |
