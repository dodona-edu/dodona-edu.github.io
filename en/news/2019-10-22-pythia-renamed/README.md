---
title: "Pythia judge renamed to python"
description: "Pythia judge renamed to python"
permalink: '/news/:year/:month/:day/:slug'
date: "2019-10-22"
---

<NewsHeader :title="$frontmatter.title" :date="$frontmatter.date" lang="en" />

To avoid confusion and to be more consistent with other judges, the `pythia` judge has been renamed to `python`. This change was made automatically and requires no further action from users. In addition, the `biopythia` judge was merged into the Python judge, since they used the same codebase. All python exercises can now just use the `python` judge.
