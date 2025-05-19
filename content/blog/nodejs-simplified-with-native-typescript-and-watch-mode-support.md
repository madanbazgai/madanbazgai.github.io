---
title: "Nodejs Simplified With Native Typescript and Watch Mode Support"
date: 2025-05-19T15:07:37+05:45
draft: false
# weight: 1
# aliases: ["/first"]
categories: ["Backend"]
tags: ["nodejs"]
author: "Me"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: true
description: "Desc Text."
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
cover:
    image: "/images/blogicon/nodejs.png" # image path/url
    alt: "blog image" # alt text
    caption: "<blog image>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---

![TailwindCss](/images/blogicon/nodejs.png)

Starting from node `22.6.0`,
you can directly start writing on the `.ts` file without installing any dependencies:

`index.ts`
```typescript
function main(message: string): void {
  console.log("Message: " + message);
}
main("Hello! world");
```

For running with watch mode:

`package.json`
```json
"dev": "node -w index.ts"
```


Recommended base tsconfig
`tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "rewriteRelativeImportExtensions": true,
    "verbatimModuleSyntax": true,
    "erasableSyntaxOnly": true
  }
}
```
