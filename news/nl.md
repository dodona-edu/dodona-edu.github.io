---
layout: default
title: Nieuws
description: "Dodona nieuwsberichten"
permalink: /nl/news/
redirect_from:
  - /news/
nav_order: 2
has_children: true
has_toc: false
lang: nl
---

This page is also available [in English](/en/news/)
{: .fs-1 .lh-0 .align-right}

# Dodona nieuws
{: .fs-9 }

Op deze pagina vind je een overzicht van alle Dodona nieuwsberichten.
{: .fs-6 .fw-300 }

--- 

## Alle berichten

<ul class='news-overview'>
{%- assign all_news = site.news | where: "lang", page.lang -%}
{%- for news in all_news -%}
  <li>
    <article>
      <a href="{{ news.url }}">{{ news.title }}</a>
      <time class='news-date'>{{ news.date | date: "%d/%m/%Y"}}</time>
    </article>
  </li>
{% endfor %}
</ul>