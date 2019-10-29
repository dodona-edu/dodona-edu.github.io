---
layout: default
title: References
description: "Dodona references"
permalink: /en/references/
nav_order: 4
has_children: true
has_toc: false
lang: en
slug: references
---

# References

Here you can find up to date descriptions of the Dodona config files and directory structures.

---

## In English

{% assign references = site.html_pages | where: "parent", "References" | sort:"nav_order" %}

<ul>
{% for ref in references %}
  <li><a href='{{ ref.url }}'>{{ ref.title }}</a></li>
{% endfor %}
</ul>

## In Dutch

{% assign references = site.html_pages | where: "parent", "Referenties" | sort:"nav_order" %}

<ul>
{% for ref in references %}
  <li><a href='{{ ref.url }}'>{{ ref.title }}</a></li>
{% endfor %}
</ul>
