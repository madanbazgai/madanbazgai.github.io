---
title: "Nodejs Simplified With Native Typescript and Watch Mode Support"
date: 2025-05-19T15:07:37+05:45
description: "Run TypeScript files directly in Node.js 22.6+ with no extra dependencies, use the built-in watch mode, and start from a recommended tsconfig."
categories: ["Backend"]
tags: ["nodejs"]
cover:
  image: "../../assets/images/blogicon/nodejs.png"
  alt: "Node.js with TypeScript"
---

![Node.js with TypeScript](../../assets/images/blogicon/nodejs.png)

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
