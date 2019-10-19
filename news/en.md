---
layout: default
title: News
description: "Dodona news"
permalink: /en/news/
nav_exclude: true
nav_order: 2
has_children: true
has_toc: false
lang: en
---

Deze pagina is ook beschikbaar [in het Nederlands](/nl/news/)
{: .fs-1 .lh-0 .align-right}

# Dodona news
{: .fs-9 }

On this page, you can find an overview of all Dodona news.
{: .fs-6 .fw-300 }

--- 

## All news

<ul class='news-overview'>
{%- assign all_news = site.news | where: "lang", page.lang -%}
{%- for news in all_news -%}
  <li>
    <article>
      <a href="{{ news.url }}">{{ news.title }}</a>
      <time class='news-date'>{{ news.date | date: "%B %d, %Y" }}</time>
    </article>
  </li>
{%- endfor -%}
</ul>