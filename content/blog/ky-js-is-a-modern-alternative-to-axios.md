---
title: "Ky.js: A Delightful Alternative to Axios"
date: 2025-01-15T21:57:58+05:45
draft: false
# weight: 1
# aliases: ["/first"]
# author: ["Me", "You"] # multiple authors
categories: ["Javascript"]
tags: ["first", "pinned"]
author: "Me"
showToc: true
TocOpen: false
description: ""
canonicalURL: "https://canonical.url/to/page"
ShowReadingTime: true
ShowBreadCrumbs: true
ShowPostNavLinks: true
ShowWordCount: true
cover:
  image: "/images/blogicon/kyvsaxios.png"
  alt: "Ky.js vs Axios comparison"
  caption: "Comparison between Ky.js and Axios"
  relative: false
  hidden: false
---

[jump to code](#installation)

!["ky vs axios"](/images/blogicon/kyvsaxios.png)

## Do You Really Need Another HTTP Client?

**You might not need any additional HTTP client**. The native `fetch` API, built into modern browsers and Node.js, is powerful and capable of handling many common use cases. If you're making simple HTTP requests, `fetch` might be all you need.

**However**, real-world applications often require more sophisticated features. You might need to:

- Create reusable API instances with predefined base URLs and authentication
- Implement request/response interceptors for token refresh flows
- Transform request/response data consistently across your application
- Track file upload/download progress
- Handle retries for failed requests
- Manage request cancellation
- Show toast notifications for various HTTP responses

This is where Ky.js shines.

## What is Ky.js?

Ky.js is a modern, elegant HTTP client built on top of the **Fetch API**. Think of it as a lightweight wrapper that adds powerful features while maintaining the simplicity and familiarity of fetch. In contrast, Axios is built on the older **XMLHttpRequest** technology.

## Core Features

- **Lightweight**: Only 4KB minzipped (compared to Axios's 14KB)
- **Zero dependencies**: Built directly on the Fetch API
- **Modern**: Supports latest browsers, Node.js 18+, Bun, and Deno
- **TypeScript ready**: Built-in TypeScript support
- **Interceptors**: Support for request and response interceptors.
- **Api instance with base URL, authorization headers etc.**
- **Error Handling, Retries, File upload progress**
- **...And much more.**

## Installation

```bash
npm i ky
```

## 1. Simple Requests

#### GET Request

```javascript
const user = await ky("/api/user").json();
```

#### POST Request

- **JSON Body**

```jsx
const json = await ky.post("/api/user", { json: { foo: "bar" } }).json();
```

- **FormData**

```javascript
const response = await ky.post("/api/user", { body: formData }).json();
```

## 2. Set Request Headers

```javascript
const json = await ky
  .post("https://example.com", {
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer token",
    },
    json: {
      foo: true,
    },
  })
  .json();
```

## 3. Reusable api instance

```javascript
// With prefix URL
const api = ky.create({ prefixUrl: 'http://localhost:5000' });

// With authentication
const authenticatedAPI = ky.create({
prefixUrl: "http://localhost:5000",
headers: {
	Authorization: `Bearer ${Cookies.get("accessToken")}`,
	}
});

// usage
const user = await authenticatedAPI.get('/api/user').json();
const json = await authenticatedAPI.post('/api/user',{json:jsonData}).json());
```

## 4. Query params

```javascript
const response = await ky
  .get("https://api.example.com/users", {
    searchParams: {
      page: 1,
      limit: 10,
      sort: "desc",
    },
  })
  .json();
```

## 5. Interceptors/Hooks

```javascript
// Request Interceptor
const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set("X-Requested-With", "ky");
      },
    ],
  },
});

// Response Interceptor
const api = ky.extend({
  hooks: {
    afterResponse: [
      (request, options, response) => {
        if (response.status === 500) {
          toast.error("Internal Server Error");
        }
      },
    ],
  },
});
```

## 6. Retries

```javascript
// Simple retry
const response = await ky("https://api.example.com", {
  retry: 5,
});

// Advanced retry configuration
const api = ky.create({
  retry: {
    limit: 3,
    methods: ["get", "put"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    afterStatusCodes: [413, 429, 503],
    maxRetryAfter: 5000,
    backoffLimit: 3000,
  },
  hooks: {
    beforeRetry: [
      async ({ request, options, error, retryCount }) => {
        console.log(`Retrying request (${retryCount} attempt)`);
        request.headers.set("Authorization", await getNewToken());
      },
    ],
  },
});
```

## 7. Request Cancellation

```javascript
const controller = new AbortController();
const { signal } = controller;

// Cancel after 5 seconds
setTimeout(() => {
  controller.abort();
}, 5000);

try {
  const response = await ky("https://api.example.com/longrunning", {
    signal,
    timeout: 10000, // 10 second timeout
  }).json();
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request was cancelled");
  }
}

// Multiple request cancellation
const requests = [
  ky.get("https://api1.example.com", { signal }),
  ky.get("https://api2.example.com", { signal }),
  ky.get("https://api3.example.com", { signal }),
];

try {
  const responses = await Promise.all(requests);
} catch (error) {
  if (error.name === "AbortError") {
    console.log("All requests were cancelled");
  }
}
```

## 8. File Upload and Progress Tracking

```javascript
const controller = new AbortController();
const { signal } = controller;

// Cancel after 5 seconds
setTimeout(() => {
  controller.abort();
}, 5000);

try {
  const response = await ky("https://api.example.com/longrunning", {
    signal,
    timeout: 10000, // 10 second timeout
  }).json();
} catch (error) {
  if (error.name === "AbortError") {
    console.log("Request was cancelled");
  }
}

// Multiple request cancellation
const requests = [
  ky.get("https://api1.example.com", { signal }),
  ky.get("https://api2.example.com", { signal }),
  ky.get("https://api3.example.com", { signal }),
];

try {
  const responses = await Promise.all(requests);
} catch (error) {
  if (error.name === "AbortError") {
    console.log("All requests were cancelled");
  }
}
```

## 9. Error Handling

```javascript
try {
  const response = await ky
    .post("https://api.example.com/data", {
      json: { foo: "bar" },
    })
    .json();
} catch (error) {
  if (error.name === "HTTPError") {
    const errorJson = await error.response.json();
    console.log("Status:", error.response.status);
  } else if (error.name === "TimeoutError") {
    console.log("Request timed out");
  }
}

// Custom error handling with hooks
const api = ky.create({
  hooks: {
    beforeError: [
      (error) => {
        const { response } = error;
        if (response && response.body) {
          error.name = "CustomAPIError";
          error.message = `${response.body.message} (${response.status})`;
        }
        return error;
      },
    ],
  },
});
```

## 10. Typescript Support

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserDto {
  name: string;
  email: string;
}

// GET with type
const user = await api.get<User>(`users/123`).json();
// Alternative syntax
const user = await api.get(`users/123`).json<User>();

// POST with type
const newUser = await api
  .post<User>("users", {
    json: {
      name: "John Doe",
      email: "john@example.com",
    } as CreateUserDto,
  })
  .json();
```

## 11. Response Types

```javascript
// JSON response
const jsonData = await ky.get("endpoint").json();

// Text response
const textResponse = await ky.get("endpoint").text();

// Blob response
const blobResponse = await ky.get("files/image.jpg").blob();

// ArrayBuffer response
const bufferResponse = await ky.get("files/document.pdf").arrayBuffer();

// Raw response
const rawResponse = await ky.get("endpoint");
const headers = Object.fromEntries(rawResponse.headers);
const status = rawResponse.status;
```

## Comparison with Axios

| Feature                 | Ky                                       | Axios                                |
| ----------------------- | ---------------------------------------- | ------------------------------------ |
| **Base Implementation** | Built on Fetch API                       | Built on XMLHttpRequest              |
| **Size**                | Smaller (~4KB minzipped)                 | Larger (~14KB minzipped)             |
| **Dependencies**        | Zero dependencies                        | Has dependencies                     |
| **Browser Support**     | Modern browsers only                     | Wider browser support                |
| **Node.js Support**     | Node.js 18+ (native fetch)               | All Node.js versions                 |
| **Response Parsing**    | Manual (.json(), .text())                | Automatic based on content-type      |
| **Request Body**        | Requires manual stringification for JSON | Automatic transformation             |
| **Interceptors**        | Uses hooks system                        | Uses interceptors system             |
| **Progress**            | Both upload and download                 | Both upload and download             |
| **Timeout**             | Simple timeout option                    | Request and response timeouts        |
| **Cancellation**        | Native AbortController                   | Custom Cancel Token                  |
| **Request Config**      | More minimal API                         | More extensive configuration options |
| **Transforms**          | Hooks for request/response               | Data/Header transformers             |
| **Default Settings**    | Via .extend() and .create()              | Via defaults and instance creation   |
| **TypeScript Support**  | Built-in                                 | Built-in                             |
| **Error Handling**      | HTTPError with response object           | Detailed error object with config    |
| **Form Data**           | Native FormData support                  | Automatic handling                   |
| **Request Retry**       | Built-in retry with options              | Requires separate package            |
| **HTTP/2 Support**      | Via Fetch API                            | No direct support                    |
| **Bundle Size Impact**  | Smaller footprint                        | Larger footprint                     |
