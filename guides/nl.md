---
layout: default
title: Handleidingen
description: "Handleidingen Dodona"
permalink: /nl/guides/
redirect_from:
  - /guides/
nav_order: 3
has_children: true
has_toc: false
lang: nl
slug: guides
---

# Handleidingen

Hier vind je enkele handleidingen, vooral gericht op lesgevers.

---

## In het Nederlands

{% assign guides = site.html_pages | where: "parent", "Handleidingen" | sort:"nav_order" %}

<ul>
{% for guide in guides %}
  <li><a href='{{ guide.url }}'>{{ guide.title }}</a></li>
{% endfor %}
</ul>

## Enkel in het Engels

* [Creating a Judge](/en/guides/creating-a-judge/)
