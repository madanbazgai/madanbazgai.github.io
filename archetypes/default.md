---
title: "{{ replace .Name "-" " " | title }}"
date: {{ .Date }}
draft: false
# weight: 1
# aliases: ["/first"]
categories: ["Default"]
tags: ["first"]
author: "Me"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
description: "Desc Text."
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
cover:
    image: "/madmax.jpg" # image path/url
    alt: "blog image" # alt text
    caption: "<blog image>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
