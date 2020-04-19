---
layout: default
title: Guides
description: "Dodona guides"
permalink: /en/guides/
nav_order: 3
has_children: true
has_toc: false
lang: en
slug: guides
---

# Guides

Here you'll find a number of guides, primarily focused on teachers.

---

## In English

{% assign guides = site.html_pages | where: "parent", "Guides" | sort:"nav_order" %}

<ul>
{% for guide in guides %}
  <li><a href='{{ guide.url }}'>{{ guide.title }}</a></li>
{% endfor %}
</ul>

## Only in Dutch

* [Van start met Dodona](/nl/guides/getting-started/)
