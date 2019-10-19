---
layout: default
title: Nieuws
description: "Dodona nieuwsberichten"
permalink: /news/
nav_order: 2
has_children: true
has_toc: false
lang: nl
---

# Dodona nieuws
{: .fs-9 }

Op deze pagina vind je een overzicht van alle Dodona nieuwsberichten.
{: .fs-6 .fw-300 }

--- 

## Alle berichten

<ul class='news-overview'>
{% for news in site.news %}
  <li>
    <article>
      <a href="{{ news.url }}">{{ news.title }}</a>
      <time class='news-date'>{{ news.date | date: "%d/%m/%Y"}}</time>
    </article>
  </li>
{% endfor %}
</ul>