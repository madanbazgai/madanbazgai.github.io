---
title: "Dead Simple Yet Powerful Global State Manager for Redux Haters"
date: 2025-08-14T11:19:36+05:45
draft: false
# weight: 1
# aliases: ["/first"]
categories: ["React"]
author: "Me"
# author: ["Me", "You"] # multiple authors
showToc: true
TocOpen: false
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: false
ShowBreadCrumbs: false
ShowPostNavLinks: false
ShowWordCount: false
cover:
  image: "/images/blogicon/jotai.png" # image path/url
  alt: "Dead Simple Yet Powerful Global State Manager for Redux Haters" # alt text
  caption: "<blog image>" # display caption under cover
  relative: false # when using page bundles set this to true
  hidden: true # only hide on current single page
---

**`themeAtom.ts`**

```javascript
import { atom } from "jotai";

export const themeAtom = atom("light");
```

**`App.tsx`**

```javascript
import { useAtom } from "jotai";
import { themeAtom } from "./themeAtom";

function App() {
  const [theme, setTheme] = useAtom(themeAtom);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </>
  );
}

export default App;
```

That’s it — as simple as it gets.

---

## About Jotai

- Created by the author of beloved **Zustand**, **Waku**, and **Valtio**
- Alternative to Recoil (Meta) — now deprecated
- **Atomic approach**: each value is an atom
- Global state manager that feels like `useState`
- Solves React context’s extra re-render issue
- No need for memoization

---

## Features

- Minimal core API (\~2kb)
- Powerful & TypeScript-ready
- Works with React, Next.js, Waku, Remix, React Native
- Persistent storage support
- TanStack Query integration
- Devtools available

---

## What’s an Atom?

A small, independent unit of state.
Instead of one large, monolithic state tree, you build state from isolated, composable atoms.

---
