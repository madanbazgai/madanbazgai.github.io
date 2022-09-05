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
description: "Desc Text."
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
cover:
    image: "/madmax.avif" # image path/url
    alt: "blog image" # alt text
    caption: "<blog image>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page
editPost:
    URL: "https://github.com/madanbajgai/madanbajgai.github.io/tree/master/content/posts/"
    Text: "Click here to Suggest Changes" # edit text
    appendFilePath: true # to append file path to Edit link
---
