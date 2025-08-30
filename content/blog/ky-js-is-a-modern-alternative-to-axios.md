---
title: "Ky.js: A Delightful Alternative to Axios"
date: 2025-01-15T21:57:58+05:45
draft: false
categories: ["Javascript"]
tags: ["first", "pinned"]
author: "Me"
showToc: true
TocOpen: false
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: false
ShowBreadCrumbs: false
ShowPostNavLinks: false
ShowWordCount: false
cover:
  image: "/images/blogicon/kyvsaxios.png"
  alt: "Ky.js vs Axios comparison"
  caption: "Comparison between Ky.js and Axios"
  relative: false
  hidden: false
---

ℹ️ This article is authentic, fully organic, handcrafted by a human mind. No AI was harmed or used in generating the ideas for content and title.

!["ky vs axios"](/images/blogicon/kyvsaxios.png)

### [Jump to code 🔻](#installation)



## **Do you really need another HTTP client?**
You might not need any additional HTTP client.
The native fetch API, built into modern browsers and Node.js, is powerful and capable of handling many common use cases.

**However**, real applications need more features like:
- Reusable API instances with authentication
- Request/response interceptors
- Progress tracking and retries
- Consistent error handling

This is where **Ky.js** shines.

---

## What is Ky.js?

Ky.js is a modern, elegant HTTP client built on the **Fetch API**. Think of it as fetch with superpowers.

**Key benefits:**
- **Lightweight**: 4KB vs Axios's 14KB
- **Zero dependencies**: Pure Fetch API
- **Modern**: Supports latest browsers, Node.js 18+
- **TypeScript ready**: Built-in support

Meanwhile, Axios is still tied to the old `XMLHttpRequest`.

---

## Installation

```bash
bun i ky
```

---

## 1. Simple Requests

```javascript
// GET request
const user = await ky("/api/user").json();

// POST with JSON
const result = await ky.post("/api/user", {
  json: { name: "John", email: "john@example.com" }
}).json();

// POST with FormData
const response = await ky.post("/api/upload", {
  body: formData
}).json();
```

---

## 2. Headers & Authentication

```javascript
const response = await ky.post("https://api.example.com/data", {
  headers: {
    "Authorization": "Bearer your-token",
    "Content-Type": "application/json"
  },
  json: { foo: "bar" }
}).json();
```

---

## 3. Reusable API Instance

```javascript
// Create authenticated API instance
const api = ky.create({
  prefixUrl: "https://api.example.com",
  headers: {
    Authorization: `Bearer ${token}`
  }
});

// Use it anywhere
const user = await api.get("user/123").json();
const newPost = await api.post("posts", { json: postData }).json();
```

---

## 4. Query Parameters

```javascript
const users = await ky.get("https://api.example.com/users", {
  searchParams: {
    page: 1,
    limit: 10,
    sort: "desc"
  }
}).json();
```

---

## 5. Interceptors with Hooks

```javascript
// Request interceptor
const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("X-Requested-With", "ky");
      }
    ]
  }
});

// Response interceptor
const api = ky.extend({
  hooks: {
    afterResponse: [
      (request, options, response) => {
        if (response.status === 500) {
          toast.error("Server error occurred");
        }
      }
    ]
  }
});
```

---

## 6. Automatic Retries

```javascript
// Simple retry
const response = await ky("https://api.example.com/data", {
  retry: 3
});

// Advanced retry configuration
const api = ky.create({
  retry: {
    limit: 3,
    methods: ["get", "put"],
    statusCodes: [408, 429, 500, 502, 503, 504]
  },
  hooks: {
    beforeRetry: [
      async ({ retryCount }) => {
        console.log(`Retrying... attempt ${retryCount}`);
      }
    ]
  }
});
```

---

## 7. Request Cancellation

```javascript
const controller = new AbortController();

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
  const response = await ky("https://api.example.com/data", {
    signal: controller.signal,
    timeout: 10000
  }).json();
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request cancelled");
  }
}
```

---

## 8. Error Handling

```javascript
try {
  const data = await ky.post("https://api.example.com/data", {
    json: { foo: "bar" }
  }).json();
} catch (error) {
  if (error.name === "HTTPError") {
    console.log(`HTTP ${error.response.status}`);
    const errorData = await error.response.json();
  } else if (error.name === "TimeoutError") {
    console.log("Request timed out");
  }
}
```

---

## 9. TypeScript Support

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

// GET with types
const user = await api.get<User>("users/123").json();

// POST with types
const newUser = await api.post<User>("users", {
  json: {
    name: "John Doe",
    email: "john@example.com"
  }
}).json();
```

---

## 10. Response Types

```javascript
// Different response formats
const jsonData = await ky.get("api/data").json();
const textData = await ky.get("api/text").text();
const blobData = await ky.get("files/image.jpg").blob();
const bufferData = await ky.get("files/doc.pdf").arrayBuffer();

// Raw response
const response = await ky.get("api/data");
const headers = Object.fromEntries(response.headers);
```

---

## Ky vs Axios

| Feature | Ky | Axios |
|---------|-------|-------|
| **Size** | 4KB | 14KB |
| **Dependencies** | Zero | Multiple |
| **Base** | Fetch API | XMLHttpRequest |
| **Modern Support** | ✅ | Limited |
| **TypeScript** | Built-in | Built-in |
| **Retries** | Built-in | External package |

---

## Why Choose Ky?

- **Smaller bundle size** - Less JavaScript to load
- **Modern foundation** - Built on Fetch API
- **Zero dependencies** - No security vulnerabilities from deps
- **Better DX** - Cleaner, more intuitive API
- **Future-proof** - Aligned with web standards

---

> ⚠️ **Note**: Ky requires modern browsers with Fetch support. For legacy browser support, use Axios.

---

## Getting Started

```javascript
import ky from 'ky';

// Create your API client
const api = ky.create({
  prefixUrl: 'https://your-api.com',
  headers: {
    'Authorization': 'Bearer your-token'
  }
});

// Start making requests
const data = await api.get('endpoint').json();
```
