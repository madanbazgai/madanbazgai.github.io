---
title: "'use use'"
date: 2025-08-30T09:57:36+05:45
draft: false
categories: ["React"]
tags: ["React"]
author: "Me"
showToc: true
TocOpen: false
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: false
ShowBreadCrumbs: false
ShowPostNavLinks: false
ShowWordCount: false
cover:
    image: "/images/blogicon/use.png"
    alt: "React use use" # alt text
    caption: "<blog image>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---


---
ℹ️ This article is authentic, fully organic, handcrafted by a human mind. No AI was harmed or used in generating the ideas for `content` and `title`.

**`'use use'`** is a meme going around in a react ecosystem, with the introduction of many use directives like:

- `"use client"`
- `"use server"`
- `"use cache"`
- `"use memo"`
- `"use no memo"`
- `"use dom"`


But this article is not about `directives`, its about the `use` hook.
React introduced it in react 19 and it has simplified few different things.

---

## 1. Data Fetching

```javascript
import { use } from "react";

async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  return response.json();
}

export default function User() {
  const users = use(fetchUsers());

  return (
    <div>
      <p>Users: {JSON.stringify(users)}</p>
    </div>
  );
}
```

Not only for data fetching it can resolve any promises.
You can use `<Suspense>` and `<ErrorBoundary>` for loading and error handling.

---

## 2. Consuming Context

```javascript
import { createContext, use } from "react";

const ThemeContext = createContext("light");

export function App() {
  return (
    <ThemeContext.Provider value="dark">
      <MyComponent />
    </ThemeContext.Provider>
  );
}

function MyComponent() {
  const theme = use(ThemeContext);

  return <h2>Current theme: {theme}</h2>;
}
```

---

## Conditional Usage

Unlike other hooks, `use` can be called inside conditionals or loops.

```javascript
function Button({ show, children }) {
  if (show) {
    const theme = use(ThemeContext);
    return <button className={`button-${theme}`}>{children}</button>;
  }
  return null;
}
```

---

> ⚠️
> - The `use` hook is designed for **React Server Components (RSC)**.
> - It can only be used inside a **component** or another **hook**.


---

## What is `use`?

The `use` hook lets you **read the value of a resource**, such as:
- A **Promise** (auto-resolves with Suspense support)
- A **Context** value

---

## Why use `use`?
- Cleaner, more declarative code
- Better developer experience
- Works seamlessly with **Suspense**

---
