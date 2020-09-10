---
title: Exercise descriptions
description: "Exercise description reference Dodona"
---

# Exercise descriptions

> Dodona supports exercise descriptions and reading activities in HTML and Markdown with several additional features such as support for mathematical formulas.

These features are available for both exercises and reading activities. They are rendered in exactly the same way. The only difference is that exercises have a text editor at the bottom of the exercise description, where a reading activity has a `MARK AS READ` button.

## Markdown

 For Dodona exercises and reading activities, we recommend using Markdown over HTML. Although Markdown is widely used on the internet, the format is not standardized. This led to existence of several Markdown "flavors". Dodona uses [kramdown Syntax](http://kramdown.gettalong.org/syntax.html) and the Kramdown parser to generate HTML from the Markdown source. You can find more information about basic Markdown formatting on this [Markdown Cheatsheet page](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

## Images

To use images in your description, be sure to put the images in the `description/media/` [directory](/en/references/exercise-directory-structure) of your exercise.

### Lightboxes

Dodona automatically adds [lightbox support](https://en.wikipedia.org/wiki/Lightbox_(JavaScript)) to all images in descriptions. If you click on an image, the image will open in a lightbox. It is possible to specify a caption for an image and to set an alternative (high-resolution) version for use in the lightbox.

You can also trigger a lightbox manually using a link by adding a `dodona-lightbox` class:
```html
<a href="image.jpg" class="dodona-lightbox">Show image</a>
```

```markdown
[Show image](image.jpg){: .dodona-lightbox}
```

#### Captions

You can specify a caption by using the `data-caption` attribute. If you don't provide such attribute, Dodona uses the value of the `alt` attribute.

##### HTML

A caption set using the `data-caption` attribute:

```html
<img src="image.jpg" data-caption="This is a longer caption of an image to be used in the lightbox" alt="image description" />
```

A caption set using the `alt` attribute:

```html
<img src="image.jpg" alt="image description that will also be used as lightbox caption" />
```

##### Markdown

A caption set using the `data-caption` attribute using Markdown:

```markdown
![image description](image.jpg){:data-caption="This is a longer caption of an image to be used in the lightbox"}
```

A caption set using the `alt` attribute using Markdown:

```markdown
![image description that will also be used as lightbox caption](image.jpg)
```

#### Alternative version

You can use an alternative version of your image in the lightbox. You could, for example, specify a low-resolution version in the general description and only load the high-resolution version in the lightbox. You can use the `data-large` attribute to specify the path of this alternative image.

An alternative high-resolution version of an image, set using the `data-large` attribute in HTML:

```html
<img src="image.jpg" data-large="large-image.jpg" />
```

An alternative high-resolution version of an image, set using the `data-large` attribute in Markdown:

```markdown
![image description](image.jpg){:data-large="large-image.jpg"}
```

### Centered groups

If you have multiple (small) images in an exercise description, you can display them inline next to each other in a centered group. This is done by wrapping all images with a `div` element with the `dodona-centered-group` class.

```html
<div class="dodona-centered-group">
  <img src="image1.jpg" />
  <img src="image2.jpg" />
  <img src="image3.jpg" />
</div>
```

You can also include tables or other elements in a centered group.

### Dark mode visibility

If you want to use separate images for light mode and dark mode (e.g. with a different background color) you can add the `light-only` or `dark-only` class to the image. The `light-only` class will only show the image when light mode is used while the `dark-only` class will only show the image when dark mode is used. These classes also work for other html elements.

```html
<img src="dark-image.jpg" class="dark-only" />
<img src="light-image.jpg" class="light-only" />
```

```markdown
[Show image](dark-image.jpg){: .dark-only}
[Show image](light-image.jpg){: .light-only}
```

## Tables

Both HTML and Markdown tables are supported. You can add the `table` class for prettier formatting.

##### HTML

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

##### Markdown

```markdown
|-----------------+------------+-----------------+----------------|
| Default aligned |Left aligned| Center aligned  | Right aligned  |
|-----------------|:-----------|:---------------:|---------------:|
| First body part |Second cell | Third cell      | fourth cell    |
| Second line     |foo         | **strong**      | baz            |
| Third line      |quux        | baz             | bar            |
|-----------------+------------+-----------------+----------------|
| Second body     |            |                 |                |
| 2 line          |            |                 |                |
|=================+============+=================+================|
| Footer row      |            |                 |                |
|-----------------+------------+-----------------+----------------|
{: .table}
```

## Math snippets

Dodona supports a LaTeX-style syntax to render mathematical formulas using the [MathJax project](https://www.mathjax.org).

### Inline formulas
To display mathematical symbols and formulas inline, wrap them with a double dollar symbol. This syntax is the same for both Markdown and HTML.

```markdown
Some text with symbol $$a$$ and a formula $$x^2$$.
```

### Standout formulas 
Markdown and HTML use a different syntax to display formulas on their own line.

When using HTML, wrap the formula with `\[` and `\]`:

```html
The solution can be found with the following formula: \[a^2 = b^2 + c^2\]
```

When using Markdown, use the double dollar syntax but put everything a new line:

```html
The solution can be found with the following formula: 
$$
a^2 = b^2 + c^2
$$
```

## Code snippets

You can easily render code fragments in a monospaced font with syntax highlighting on Dodona.

### Inline code

When using HTML, wrap your code with `<code>` and `</code>`:

```html
In your solution, you can use variable <code>someVariable</code>.
```

In Markdown, wrap your code with backticks (\`):

```markdown
In your solution, use can use variable `someVariable`.
```

### Code blocks

If you want to use a multi-line code block using HTML, wrap your code with `<pre><code>` and `</code></pre>`:

```html
<pre><code>
let a = 5;
let b = 42;
</code></pre>
```

If you want to use a multi-line code block using Markdown, wrap your code with a triple backticks (```) and newlines:

    ```
    let a = 5;
    let b = 42;
    ```

### Syntax highlighting

#### HTML

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

Using Markdown, Dodona can automatically add syntax highlighting if you provide the programming language in which the code is written as follows:

    ```javascript
    let a = 5;
    let b = 42;
    ```

## Callouts

To highlight something in your exercise description, you can use the callout style. This will result in an element like this:

::: tip Hello
This is an important success message.
:::

To use a callout, create a `div` element with the `callout` class, containing an optional `h4` tag and a paragraph.

```html
<div class="callout callout-success">
  <h4>Hello</h4>
  <p>This is an important success message.</p>
</div>
```

You can swap out `callout-success` for `callout-info`, `callout-warning`, or `callout-danger` to use blue, yellow, or red instead of green as highlight color.

In Markdown, you can emulate this style by using this syntax:

```markdown
{: .callout.callout-success}
> #### Hello
> This is an important message.
```

## Quotes

To style text as a quote, you can use a blockquote.

In HTML, wrap the quote with `<blockquote>` and `</blockquote>`:

```html
<blockquote>
  This is a quote.
</blockquote>
```

In Markdown, prefix each line with a `>`:

```markdown
> This is a quote.
```
