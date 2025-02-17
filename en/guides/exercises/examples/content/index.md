---
title: "Reading activity"
sidebarTitle: Reading activity
order: 6
---

# Reading Activity

If you used the _template repository_ from the [guide](/en/guides/exercises/creating-exercises/introduction/), your repository already contains an exercise and a reading activity.
Now, we will add a reading activity ourselves.
This is useful for integrating extra information or small pieces of theory into your learning path.
The existing reading activity can, of course, serve as an example.

::: info Similar to an Exercise
The structure and `config.json` file for a reading activity are identical to those of an exercise.
However, there are two key differences: the value of `type` must be set to `content`, and anything specific to exercises can be omitted.
:::

## 1. Structure

Each reading activity in Dodona corresponds to a specific folder in the repository.
That folder follows a [fixed structure](/en/references/exercise-directory-structure), which we will now create.

First, create a new folder for the reading activity, which we will call `markdown_demo`.
Then, within this new folder, create a `description` folder, where the reading activity will be stored.
After that, create a `media` folder inside the `description` folder, where images and other files will be stored.

The folder structure for this reading activity should look like this:

```
reading-activities//
└── markdown_demo/
   └── description/
      └── media/
```

## 2. Configuration

Dodona also requires each reading activity to have a [configuration file](/en/references/exercise-config).
This file contains metadata used by Dodona.

Create the file `config.json` in the `markdown_demo` folder with the following content:

```json
{
  "description": {
    "names": {
      "en": "Markdown demo",
      "nl": "Markdown demo"
    }
  },
  "access": "private",
  "type": "content"
}
```

This file specifies three things:

- `names`: The **names** of the reading activity as shown in Dodona, in Dutch (_nl_) and English (_en_). (In this case, both names are the same.)
- `access`: The **access level** is set to _private_.
  We choose a private reading activity because this is just a guide, but we encourage you to make your reading activities public (_public_), so other teachers can use them (just like you have access to public reading activities on Dodona).
- `type`: Must be set to `content` for reading activities. If omitted, the default value is `exercise`.

After creating this file, your repository should look like this:

```
reading-activities//
└── markdown_demo/
   ├── description/
   |  └── media/
   └── config.json
```

## 3. Adding Images or Files

To add an image, you have two options:
You can either reference an image stored in the `media` folder, or you can reference the image via a direct link.
Both methods will be demonstrated in the example below.

Download the following image of the UGent logo. Here is a [direct link](https://styleguide.ugent.be/files/uploads/logo_UGent_NL_RGB_2400_kleur_witbg.png).
Right-click the image and select _Save image as..._.

![UGent logo](logo_UGent.png)

Right-click the `media` folder in VS Code web and click _Upload..._.
Select the image from your computer and click _Open_.

To reference the image, use the following syntax:
The code starts with an exclamation mark (`!`), and the square brackets contain a description of the image.
The round brackets contain the path to the image.

```markdown
![UGent logo](media/logo_UGent.png)
```

## 4. Content

The next step is writing the content of the reading activity.
Create a file `description.en.md` in the `description` folder of the reading activity with the following content:

````markdown
# Markdown Demo

## Text Formatting

This is an example sentence with words in *italic*, **bold**, and a variable `result` in function `compute_solution()`.

## Links and Images

This sentence contains a [link](https://docs.dodona.be/en/references/exercise-description/) to the Dodona guide on Markdown.
Below is the Dodona logo displayed via a link.

![Dodona logo](https://dodona.be/icon.png)

Here, we reference the UGent logo directly from the `media` folder.

![UGent logo](media/logo_UGent.png)

### Most Popular Programming Languages on Dodona

1. Python
2. R
3. Java

### Types of Engineers

* Business Engineer
* Industrial Engineer (ing.)
* Civil Engineer (ir.)
* Bioengineer

## Mathematical Formulas

Calculate the length of the hypotenuse $$c$$ of a triangle using the formula $$c^2 = a^2 + b^2$$.

The solution can be found with the following formula:
$$
c = \sqrt{a^2 + b^2}
$$

## Code Snippets

In your solution, you can use this code: `print("text")`{:.language-python}.

```console?lang=python&prompt=>>>
>>> echo("Hello")
Hello
>>> echo("Other side")
Other side
```

```python
name = input()
print(f"Hello, {name}!")
```

## Callouts

{: .callout.callout-success}
> #### Note
> This is an important message.

## Quotes

This is not a quote.

> This is a quote.
````

If you also want to create Dutch content, use the name `description.nl.md` for the second file.
The content of reading activities is written in Markdown, a relatively simple formatting language. More information about Markdown can be found [here](/en/references/exercise-description).

After creating these files, your repository should look like this:

```
reading-activities//
└── markdown_demo/
   ├── description/
   |  ├── media/
   |  |  └── logo_UGent.png
   |  └── description.en.md
   └── config.json
```

## 5. Saving Changes

Don't forget to _commit_ your changes, or they will be lost!

An example of how to do this can be found [here](/en/guides/exercises/creating-exercises/exercise/#_5-saving-changes).

## 6. Reviewing the Reading Activity

The reading activity you just created can be found in [your repository](https://dodona.be/en/repositories/) on Dodona.
Check the reading activity. Does everything look good?
If so, you can publish it by clicking _Publish this exercise_ at the top of the reading activity.
Your reading activity is now ready to be used on Dodona!
