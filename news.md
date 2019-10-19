---
layout: default
title: Nieuws
description: "Dodona nieuwsberichten"
permalink: /news/
nav_order: 2
has_children: false
lang: nl
---

# Dodona nieuws
{: .fs-9 }

Dit is een overzicht van de Dodona nieuwsberichten
{: .fs-6 .fw-300 }

--- 

<ul>
{% for news in site.news %}
  <li><a href="{{ news.url }}">{{ news.title }}</a> ({{ news.date | date: "%d/%m/%Y"}})</li>
{% endfor %}
</ul>