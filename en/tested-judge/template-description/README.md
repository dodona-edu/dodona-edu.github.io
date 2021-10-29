---
title: "TESTed description templates"
description: "TESTed description templates"
---

# Documentation description templates
Description templates are used to only write a description once.
That description can be instantiated for each programming language that is necessary with the correct names and style
conventions.

Description templates are written using the Mako templating system.
TESTed supports two markup languages for the exercises: Markdown and HTML.
The descriptions can be written in both English and Dutch.

Which parts of the description should be generated for a programming language?

- **Function names**:
  The style conventions for function names are programming language dependant.
  Example: Python uses the `snake_case` convention, Java uses the `camelCase` convention.
- **Type names**:
  One of the larger difference between programming languages are the names that are used for the same datatype.
  For example, 8-bit integers: in Java they're called `byte`, while Haskell uses `Data.Int.Int8`.
- **Type names in natural language**:
  The type names in natural language, especially those for collections, also differ between programming languages.
  For example, JavaScript has arrays, while Python has lists. Similarly, Java has maps, while Python has dictionaries.
  However, the data structures are the same for both languages.
- **Code examples**:
  The biggest difference between programming languages is the syntax used to write code.
  
## Constants
First we will look at the constants that can be used in the templates.
- **prompt**:
  This constant contains the prefix for the console prompt.
  In the HTML template it will be the escaped version.
  Example: `>>>` for Python.
- **language and language_html**:
  These constants contain the name of the programming language for which an instance is generated.
  `language_html` is the HTML-safe version of `language`.
- **namespace and namespace_html**:
  These constants contain the `namespace` of the code.
  The namespace can be passed as a parameter to the conversion program.
  `namespace_html` is the HTML-safe version of `namespace`.

The constants and function calls in Mako must be notated between `${...}`.

### Example
The first example is in Markdown for Java and Python, with the namespace `solution`.
The second example is in HTML for JavaScript, with the namespace `submission`.

#### Markdown
Template:
```mako
The prompt for **${language}** is `${prompt}`.
The namespace is '${namespace}'.
```

Instance Java:
```markdown
The prompt for **java** is `>`.
The namespace is 'Solution'.
```

Instance Python:
```markdown
The prompt for **python** is `>>>`.
The namespace is 'solution'.
```

#### HTML
Template:
```mako
<p>
    The prompt for <span style="font-weight: bold">${language_html}</span> is <code>${prompt}</code>.
    The namespace is '${namespace_html}'.
</p>
```

Instance JavaScript:
```html
<p>
    The prompt for <span style="font-weight: bold">javascript</span> is <code>&gt;</code>.
    The namespace is 'submission'.
</p>
```

## Functions
As already indicated in the section [Constants](#constants) Mako also supports functions.

We will again give an overview of all available functions that could be used in the templates with some examples.

- **function_name**:
  This function is used the generated the correct style conventions for the function names.
  The input of this function is one string.
  ::: tip Hint
  When you pass the function name in the template, it's best to use the `snake_case` style convention.
  This makes it possible to generate the correct function names for each language.
  :::
- **type_name**:
  This function is used to translate the TESTed datatypes to the programming language datatypes.
  The input of this function is either a string, or a pair as type argument.  
  The first argument of the pair must be a collection datatype string,
  the second either one type argument, or a list of type arguments.
- **natural_type_name**:
  This function searches the natural name for a collection datatype and/or the string datatype of TESTed for a given
  programming language.
  The input of this function is one string.

### Example
Now we look at a Markdown example description for Python and JavaScript.

Template:
```mako
The function ${function_name("characterize_string")} takes one
${type_name("text")} as argument and returns the ${natural_type_name("sequence")}
of characters of type ${type_name(("sequence", "char"))}.
```

Instance JavaScript:
```markdown
The function `characterizeString` takes one
`string` as argument and returns the array
of characters of type `array<string>`.
```

Instance Python:
```markdown
The function `characterize_string` takes one
`str` as argument and returns the list
of characters of type `List[str]`.
```

## Code examples
The templates have the possibilities to notate the code examples in a _DOCTEST_-style.

### Code snippets
The code snippets must be written in the mini-programming language of TESTed
(see [Statements, expressions and return-raw](../dsl/#statements-expressions-and-return-raw)),
in a Python doctest-style manner.
The input statements and expressions must be prefixed with the _larger than_ character (`>`), the return values not.

To be able to use multiple lines, we look at the balancing of the brackets.
In addition, you can also explicitly indicate that a statement/expression continues on the next line,
when the last symbol on the line is a backslash (`\`).

:::warning Important
The code snippets are processed before the render step of the template.
In this process, the statements and expression are translated to the calls to the corresponding functions.
As a result, Mako directives cannot be used in these code snippets.
:::

#### Example
```javascript
> heir(8, 10)
[10, 4, 15, 11, 7, 5, 3,
 2, 16, 12, 1, 6, 13, 9, 14, 8]
```

### Heading
The code snippets that must be analysed in Markdown must start with the heading ` ```tested` without whitespace in
front.
This code snippets must terminate with ` ``` ` without whitespace in front.
The only limitation for the Markdown code snippets is that the lines may not start with ` ``` `.

The code snippets that must be analysed in HTML are located in the tag `code` and must have the `tested` class.
The only limitation for the HTML code snippets, is that they may not contain `code` tags inside, even in strings.

### Examples
A first example is a Markdown template with a Kotlin instance.
A second example is a HTML template with a Haskell instance.

#### Markdown
Template:
````mako
```tested
> heir(8, 10)
[10, 4, 15, 11, 7, 5, 3,
 2, 16, 12, 1, 6, 13, 9, 14, 8]
```
````

Instance Kotlin:
````markdown
```console?lang=kotlin&prompt=>
> heir(8, 10)
listOf(10, 4, 15, 11, 7, 5, 3, 2, 16, 12, 1, 6, 13, 9, 14, 8)
```
````

#### HTML
Template:
```mako
<div class="highlighter-rouge language-${language}">
<pre class="highlight"><code class="color tested code" id="code">\
> encode("And now for something completely different.",
         1)
"And now for something completely different."\
</code></pre>
</div>
```

Instance Haskell:
```html
<div class="highlighter-rouge language-haskell">
<pre class="highlight"><code class="color tested code" id="code">&gt; <span class="nf">encode</span> <span class="p">(</span><span class="s">&quot;And now for something completely different.&quot;</span><span class="p">)</span> <span class="p">(</span><span class="mi">1</span> <span class="ow">::</span> <span class="kt">Int</span><span class="p">)</span>
<span class="s">&quot;And now for something completely different.&quot;</span></code></pre>
</div>
```

## Language specific information
The Mako-templates also have conditional constructs,
this makes it possible to add information for only one specific programming language.

### Example
We will look to an example in Markdown for Java and C, but a similar structure could be used in HTML.

Template:
```mako
Common text

% if language == 'java':
The function must be static declared in the class ${namespace}.
% endif
```

Instance Java:
```markdown
Common text

The function must be static declared in the class Solution.
```

Instance C:
```markdown
Common text
```

## Custom variables
When you frequently use a name in the text, you can define a variable in Mako,
the advantages is avoiding multiple function calls that returns the same value.

### Example
We will now look at an example in Markdown without instances.
```mako
<% list = natural_type_name("list") %>\
Write a function ${function_name("heir")}, which has two parameters $k$ and $n$,
which have both the type ${type_name("integer")}, you may assume that $k >= 2$.
The function must return a ${list} of the type ${type_name(("list", "integer"))}
that contains the order of the removed children of the circle.
The first removed child must be at the first position in the ${list},
and the eventuual heir must last in the ${list}.
Use the numbers which are used to order the children in the ${list},
as elements in the ${list}.
```

## Complete HTML template
Below follows a complete HTML template description.
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

## Instances of the template
To instantiate the templates for a programming language, you can use a Python script that is in TESTed repository.
This script can be found at the [GitHub repository](https://github.com/dodona-edu/universal-judge) of TESTed.
The script can be run with one of the following commands (and combinations) in the root directory of the
GitHub repository:
```bash
# Default instantiate English HTML for python with namespace 'submission'
$ python3 -m tested.description_instance < template.html.mako > description.html
# Short options
$ python3 -m tested.description_instance -d template.html.mako -o description.html
# Long option names
$ python3 -m tested.description_instance --description template.html.mako --output description.html
# Positional arguments
$ python3 -m tested.description_instance template.html.mako description.html
```

The additional options are:
| **Short** | **Long** | **Description** |
| -------- | -------- | -----------------|
| `-l` | `--language` | Programming language, default 'python' |
| `-i` | `--i18n` | Natural language, default 'en' |
| `-n` | `--namespace` | Namespace of the exercise, default 'submission' |
| `-M` | `--markdown` | Markdown template |
| `-H` | `--html` | HTML template, default |
