---
layout: default
title: Exercise descriptions
description: "Exercise description reference Dodona"
permalink: /references/exercise-description
parent: References
nav_order: 1
---

# Exercise descriptions
{: .no_toc }

Dodona supports exercise descriptions in HTML and Markdown with several additional features such as support for mathematical formulas.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Markdown

 For Dodona exercises, we recommend using markdown over HTML. Although markdown is widely used on the internet, the format is not standardized. This led to existence of several markdown "flavors". Dodona uses [kramdown Syntax](http://kramdown.gettalong.org/syntax.html) and the Kramdown parser to generate HTML from the markdown source. More information about basic markdown formatting can be found on this [Markdown Cheatsheet page](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

---

## Images

Dodona automatically adds [lightbox support](https://en.wikipedia.org/wiki/Lightbox_(JavaScript)) to all images in exercise descriptions. If you click on an image, the image will open in a lightbox. It is possible to specify a caption for an image and to set an alternative (high-resolution) version for use in the lightbox.

You can also trigger a lightbox manually using a link by adding a `dodona-lightbox` class:
```html
<a href="image.jpg" class="dodona-lightbox">Show image</a>
```

### Captions

You can specify a caption by using the `data-caption` attribute. If you don't provide such attribute, Dodona uses the value of the `alt` attribute.

#### HTML
{: .no_toc }

<div class="code-example" markdown="1">
A caption set using the `data-caption` attribute.
</div>
```html
<img src="image.jpg" data-caption="This is a longer caption of an image to be used in the lightbox" alt="image description" />
```

<div class="code-example" markdown="1">
A caption set using the `alt` attribute.
</div>
```html
<img src="image.jpg" alt="image description that will also be used as lightbox caption" />
```

#### Markdown
{: .no_toc }

<div class="code-example" markdown="1">
A caption set using the `data-caption` attribute using markdown.
</div>
```markdown
![image description](image.jpg "title text"){:data-caption="This is a longer caption of an image to be used in the lightbox"}
```

<div class="code-example" markdown="1">
A caption set using the `alt` attribute.
</div>
```markdown
![image description that will also be used as lightbox caption](image.jpg "title text")
```

### Alternative version

You can use an alternative version of your image in the lightbox. You could, for example, specify a low-resolution version in the general description and only load the high-resolution version in the lightbox. You can use the `data-large` attribute to specify the path of this alternative image.

#### HTML
{: .no_toc }

<div class="code-example" markdown="1">
An alternative high-resolution version of an image, set using the `data-large` attribute.
</div>
```html
<img src="image.jpg" data-large="large-image.jpg" />
```

#### Markdown
{: .no_toc }

<div class="code-example" markdown="1">
An alternative high-resolution version of an image, set using the `data-large` attribute in markdown.
</div>
```markdown
![alt text](image.jpg "title text"){:data-large="large-image.jpg"}
```

---


- [tables](https://github.ugent.be/dodona/dodona/wiki/Feature:-tables)
- [centered groups](https://github.ugent.be/dodona/dodona/wiki/Feature:-centered-groups)
- [blockquotes](https://github.ugent.be/dodona/dodona/wiki/Feature:-blockquotes)
- [code snippets](https://github.ugent.be/dodona/dodona/wiki/Feature:-code-snippets)
- [math snippets](https://github.ugent.be/dodona/dodona/wiki/Feature:-math-snippets)
- [lightboxes](https://github.ugent.be/dodona/dodona/wiki/Feature:-lightboxes)
- [callouts](https://github.ugent.be/dodona/dodona/wiki/Feature:-callouts)

