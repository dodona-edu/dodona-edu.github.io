---
layout: default
title: Referenties
description: "Referentiebestanden Dodona"
permalink: /nl/references/
redirect_from:
  - /references/
nav_order: 4
has_children: true
has_toc: false
lang: nl
slug: references
---

# Referenties

Hier vind je up-to-date beschrijvingen van de Dodona configuratiebestanden en mappenstructuren.

---

## In het Nederlands

{% assign references = site.html_pages | where: "parent", "Referenties" | sort:"nav_order" %}

<ul>
{% for ref in references %}
  <li><a href='{{ ref.url }}'>{{ ref.title }}</a></li>
{% endfor %}
</ul>

## In het Engels

{% assign references = site.html_pages | where: "parent", "References" | sort:"nav_order" %}

<ul>
{% for ref in references %}
  <li><a href='{{ ref.url }}'>{{ ref.title }}</a></li>
{% endfor %}
</ul>
