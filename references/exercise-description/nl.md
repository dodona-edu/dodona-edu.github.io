---
layout: default
title: Oefeningbeschrijvingen
description: "Referentie features te gebruiken in oefeningbeschrijvingen"
permalink: /nl/references/exercise-description/
parent: Referenties
nav_order: 1
lang: nl
---

# Oefeningbeschrijvingen
{: .no_toc }

Dodona ondersteunt oefeningbeschrijvingen in HTML en Markdown met verschillende extra features zoals ondersteuning voor wiskundige formules.
{: .fs-6 .fw-300 }

## Inhoudsopgave
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Markdown

Voor oefeningen op Dodona raden we aan om de opgaven te schrijven in Markdown. Alhoewel Markdown veelgebruikt is op het Internet, is het formaat niet gestandaardiseerd. Dit heeft tot gevolg dat er verschillende Markdown varianten bestaan. Dodona gebruikt de [kramdown Syntax](http://kramdown.gettalong.org/syntax.html) en Parser om HTML te genereren van de Markdown broncode. Meer informatie over opmaak in Markdown kan je vinden op deze [Markdown Cheatsheet pagina](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

---

## Afbeeldingen

Om afbeeldingen te gebruiken in je opgave, dien je de afbeeldingen in de `description/media/` [map](/references/exercise-directory-structure) te plaatsen.

### Lightboxes

Dodona voegt automatisch een [lightbox](https://en.wikipedia.org/wiki/Lightbox_(JavaScript)) toe aan alle afbeeldingen in een opgave. Dat wil zeggen dat als je op een afbeelding klikt, deze zal openen in een lightbox. Het is ook mogelijk om zo een onderschrift toe te voegen en om een alternatieve (hoge-resolutie) versie van de afbeelding te tonen.

Je kan zo'n lighbox ook manueel oproepen met een link door de `dodona-lightbox` *class* toe te voegen:
```html
<a href="image.jpg" class="dodona-lightbox">Show image</a>
```

#### Onderschriften
{: .no_toc }

Je kan een onderschrift (*caption*) specificeren met behulp van het `data-caption` attribuut. Als je dit niet expliciet opneemt, dan zal dodona de waarde van het `alt` attribuut gebruiken.

##### HTML
{: .no_toc }

<div class="code-example" markdown="1">
Een onderschrift dat ingesteld wordt met het `data-caption` attribuut.
</div>
```html
<img src="image.jpg" data-caption="Dit is een langer onderschrift van een afbeelding dat gebruikt zal worden in de lightbox." alt="beschrijving van de afbeelding" />
```

<div class="code-example" markdown="1">
Een onderschrift dat ingesteld wordt met het `alt` attribuut.
</div>
```html
<img src="image.jpg" alt="beschrijving van de afbeelding dat ook zal gebruikt worden als onderschrift in de lightbox." />
```

##### Markdown
{: .no_toc }

<div class="code-example" markdown="1">
Een onderschrift dat ingesteld wordt met het `data-caption` attribuut in Markdown.
</div>
```markdown
![image description](image.jpg){:data-caption="Dit is een langer onderschrift van een afbeelding dat gebruikt zal worden in de lightbox."}
```

<div class="code-example" markdown="1">
Een onderschrift dat ingesteld wordt met het `alt` attribuut in Markdown.
</div>
```markdown
![beschrijving van de afbeelding dat ook zal gebruikt worden als onderschrift in de lightbox.](image.jpg)
```

#### Alternatieve versie
{: .no_toc }

Je kan een alternatieve versie van je afbeelding gebruiken in de lightbox. Zo kan je bijvoorbeeld een lageresolutieversie gebruiken in de algemene beschrijving en enkel de versie in hoge resolutie inladen in de lightbox. Je kan het `data-large` attribuut gebruiken om het pad naar de alternatieve afbeelding op te geven.

<div class="code-example" markdown="1">
Een alternatieve versie van een afbeelding in hoge resolutie, ingesteld met het `data-large` attribuut in HTML.
</div>
```html
<img src="image.jpg" data-large="large-image.jpg" />
```

<div class="code-example" markdown="1">
Een alternatieve versie van een afbeelding in hoge resolutie, ingesteld met het `data-large` attribuut in Markdown.
</div>
```markdown
![beschrijving afbeelding](image.jpg){:data-large="large-image.jpg"}
```

### Gecentreerde groepen

Als je meerdere (kleine) afbeeldingen in een opgave gebruikt, dan kan je ze *inline* naast elkaar plaatsen in een gecentreerde groep. Dit kan door alle afbeeldingen in een `div` element te plaatsen met de `dodona-centered-group` *class*.

```html
<div class="dodona-centered-group">
  <img src="image1.jpg" />
  <img src="image2.jpg" />
  <img src="image3.jpg" />
</div>
```

Naast afbeeldingen kan je ook tabellen en andere elementen in een gecentreerde groep plaatsen.

---

## Tabellen

Tabellen worden ondersteund door zowel HTML als Markdown. Je kan de `table` *class* toevoegen voor een mooiere opmaak.

```html
<table class="table">
  <thead>
    <tr>
      <th>...</th>
      <th>...</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>...</td>
      <td>...</td>
    </tr>
    ...
  </tbody>
</table>
```

---

## Wiskundige formules

Dodona ondersteunt de LaTeX syntax om wiskundige formules te tonen met behulp van het [MathJax project](https://www.mathjax.org).

### Inline formules
Om wiskundige formules en symbolen weer te geven op dezelfde regel als andere tekst (*inline*), volstaat het om voor en na de formule een dubbel dollarteken te plaatsen. Deze syntax is dezelfde voor zowel Markdown als HTML.

```markdown
Wat tekst met symbool $$a$$ en een formule $$x^2$$.
```

### Uitgelichte formules 
Om formules op een eigen regel te plaatsen gebruiken Markdown en HTML een andere syntax.

<div class="code-example" markdown="1">
Omring de formule met `\[` en `\]` in HTML.
</div>
```html
De oplossing kan gevonden worden met de volgende formule: \[a^2 = b^2 + c^2\]
```

<div class="code-example" markdown="1">
In Markdown kan je de dubbele dollar syntax gebruiken waarbij je alles op een nieuwe regel plaatst.
</div>
```html
De oplossing kan gevonden worden met de volgende formule:
$$
a^2 = b^2 + c^2
$$
```

---

## Codefragmenten

Je kan op Dodona heel eenvoudig codefragmenten tonen in een *monospaced* lettertype met *syntax highlighting*.

### Inline code

<div class="code-example" markdown="1">
Als je HTML gebruikt, plaats dan `<code>` en `</code>` rond je code.
</div>
```html
Gebruik de variabele <code>someVariable</code> in je oplossing.
```

<div class="code-example" markdown="1">
Als je Markdown gebruikt, plaats dan *backticks* (\`) rond je code.
</div>
```markdown
Gebruik de variabele `someVariable` in je oplossing.
```

### Blokken code

<div class="code-example" markdown="1">
Als je een codefragment van meerdere regels in je HTML-opgave wil plaatsen, plaats dan `<pre><code>` en `</code></pre>` rond je code.
</div>
```html
<pre><code>
let a = 5;
let b = 42;
</code></pre>
```

<div class="code-example" markdown="0">
Als je een codefragment van meerdere regels in je Markdown-opgave wil plaatsen, plaats dan drie *backticks* (```) op de regel voor en na de code.
</div>

    ```
    let a = 5;
    let b = 42;
    ```

### Syntax highlighting

#### HTML
{: .no_toc }
Dodona ondersteunt geen automatische *syntax highlighting* als je HTML gebruikt. HTML die werd gegenereerd door [Pygments](http://pygments.org/) wordt wel correct getoond als je de correcte syntax gebruikt:

```html
<div class="highlighter-rouge">
  <pre class="highlight">
    <code>
    <span class="kd">let</span> <span class="nx">a</span> <span class="o">=</span> <span class="mi">2</span><span class="p">;</span>
    <span class="kd">let</span> <span class="nx">b</span> <span class="o">=</span> <span class="mi">42</span><span class="p">;</span>
    </code>
  </pre>
</div>
```

#### Markdown
{: .no_toc }

Als je Markdown gebruikt, dan kan Dodona automatisch de code opmaken als je aangeeft in welke programmeertaal de code geschreven is. Dit kan als volgt:

    ```javascript
    let a = 5;
    let b = 42;
    ```

---

## Callouts

Om de aandacht te vestigen op een stukje uit je opgave, kan je gebruik maken van *callouts*. Dit zorgt er voor een opmaak zoals hier wordt getoond:

<div class="callout callout-info">
<h4>Hallo</h4>
<p>Dit is een belangrijk bericht.</p>
</div>

Om een *callout* te gebruiken maak je een `div` element aan met de `callout` *class*. Hierin kan je optioneel een `h4` element en paragraaf plaatsen.

```html
<div class="callout callout-info">
  <h4>Hallo</h4>
  <p>Dit is een belangrijk bericht.</p>
</div>
```

In plaats van `callout-info` kan je ook `callout-success`, `callout-warning`, of `callout-danger` gebruiken om een element in het groen, geel of rood weer te geven.

Voor Markdown is er geen specifieke syntax, maar aangezien je HTML kan gebruiken in Markdown, kan je gewoon voorgaande code gebruiken.

---

## Quotes

Om tekst als een quote weer te geven kan je het *blockquote* element gebruiken.

<div class="code-example" markdown="1">
Als je HTML gebruikt, plaats dan `<blockquote>` en `</blockquote>` rond je quote.
</div>
```html
<blockquote>
  Dit is een quote.
</blockquote>
```

<div class="code-example" markdown="1">
Als je Markdown gebruikt, plaats een `>` teken aan het begin van elke regel van je quote.
</div>
```markdown
> Dit is een quote
```
