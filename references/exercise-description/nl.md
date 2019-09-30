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

## Tables

Both HTML and markdown tables are supported. You can add the `table` class for prettier formatting.

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

## Math snippets

Dodona supports a LaTeX-style syntax to render mathematical formulas using the [MathJax project](https://www.mathjax.org).

### Inline formulas
To display mathematical symbols and formulas inline, wrap them with a double dollar symbol. This syntax is the same for both markdown and HTML.

```markdown
Some text with symbol $$a$$ and a formula $$x^2$$.
```

### Block 
Markdown and HTML use a different syntax to display formulas on their own line.

<div class="code-example" markdown="1">
When using HTML, wrap the formula with `\[` and `\]`.
</div>
```html
The solution can be found with the following formula: \[a^2 = b^2 + c^2\]
```

<div class="code-example" markdown="1">
When using markdown, use the double dollar syntax but put everything a new line.
</div>
```html
The solution can be found with the following formula: 
$$
a^2 = b^2 + c^2
$$
```

---

## Code snippets

You can easily render code fragments in a monospaced font with syntax highlighting on Dodona.

### Inline code

<div class="code-example" markdown="1">
When using HTML, wrap your code with `<code>` and `</code>`.
</div>
```html
In your solution, use can use variable <code>someVariable</code>.
```

<div class="code-example" markdown="1">
In markdown, wrap your code with backticks (\`).
</div>
```markdown
In your solution, use can use variable `someVariable`.
```

### Code blocks

<div class="code-example" markdown="1">
If you want to use a multi-line code block using HTML, wrap your code with `<pre><code>` and `</code></pre>`.
</div>
```html
<pre><code>
let a = 5;
let b = 42;
</code></pre>
```

<div class="code-example" markdown="0">
If you want to use a multi-line code block using markdown, wrap your code with a triple backticks (```) and newlines.
</div>

    ```
    let a = 5;
    let b = 42;
    ```

### Syntax highlighting

#### HTML
{: .no_toc }
Dodona doesn't support automatic syntax highlighting when using HTML. It can, however, correctly display HTML generated by [Pygments](http://pygments.org/) if you wrap it with the correct tags:

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

Using Markdown, Dodona can automatically add syntax highlighting if you provide the programming language in which the code is written as follows:

    ```javascript
    let a = 5;
    let b = 42;
    ```

---

## Callouts

To highlight something in your exercise description, you can use the callout style. This will result in an element as shown below:

<div class="callout callout-info">
<h4>Hello</h4>
<p>This is an important info message.</p>
</div>

To use a callout, create a `div` element with the `callout` class, containing an optional `h4` tag and a paragraph.

```html
<div class="callout callout-info">
  <h4>Hello</h4>
  <p>This is an important info message.</p>
</div>
```

You can swap out `callout-info` for `callout-success`, `callout-warning`, or `callout-danger` to use green, yellow, or red instead of blue as highlight color.

There is no specific syntax for markdown, but since you can use html in markdown, you can use the above.

---

## Quotes

To style text as a quote, you can use a blockquote.

<div class="code-example" markdown="1">
In HTML, wrap the quote with `<blockquote>` and `</blockquote>`.
</div>
```html
<blockquote>
  This is a quote.
</blockquote>
```

<div class="code-example" markdown="1">
In markdown, prefix each line with a `>`.
</div>
```markdown
> This is a quote.
```
