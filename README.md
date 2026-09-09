<div align="center">
  <img src="./assets/banner.png" alt="DevoraX Toolkit Banner" width="100%" />

  # DevoraX

  **Build less boilerplate. Ship better software.**

  [![npm version](https://img.shields.io/npm/v/devorax?color=000000&labelColor=333333&style=for-the-badge)](https://www.npmjs.com/package/devorax)
  [![License](https://img.shields.io/npm/l/devorax?color=000000&labelColor=333333&style=for-the-badge)](https://github.com/your-org/devorax/blob/main/LICENSE)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript&logoColor=white&color=000000&labelColor=333333)](https://www.typescriptlang.org/)
  
  <p align="center">
    <em>The modern developer infrastructure toolkit for robust JavaScript & TypeScript applications.</em>
  </p>
</div>

---

## ⚡ Why DevoraX?

Modern application development requires stitching together dozens of tiny packages and constantly reinventing standard utility layers. **DevoraX** connects the common pieces developers repeatedly need.

- 🧠 **Domain-Aware:** Built-in intelligence for AI prompts, standard API responses, and localized infrastructure.
- 🌳 **100% Tree-Shakeable:** Import exactly what you need. Zero bloat.
- 🔒 **Secure by Default:** Built on robust, modern native cryptographic APIs. No unsafe string manipulations.
- ✨ **Zero Configuration:** Flawless TypeScript types and autocomplete right out of the box.

---

## 📦 Installation

Install DevoraX using your favorite package manager:

```bash
npm install devorax
# or
yarn add devorax
# or
pnpm add devorax
```

---

## 🛠️ Modules & Quick Start

DevoraX is divided into highly focused sub-modules. Keep your bundle sizes incredibly small by importing only from the modules you need!

### 🧩 Core `devorax/core`
The foundational functional helpers and strict type guards.

```typescript
import { isDefined, chunk, pick, omit, groupBy } from 'devorax/core';

// Chunk arrays safely
chunk([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]

// Type guarding
const user: string | undefined = "Alice";
if (isDefined(user)) {
  console.log(user.toUpperCase()); // Safely inferred as string
}
```

### 🛡️ Security `devorax/security`
Cryptographic utilities and safe generation wrappers.

```typescript
import { generateOTP, generateSecureToken, maskSecret } from 'devorax/security';

const otp = generateOTP(6); // "482910"
const apiToken = generateSecureToken(32); // 64-char secure hex token
const maskedKey = maskSecret('super_secret_api_key_123', 4); // "********************_123"
```

### 🔌 API `devorax/api`
Standardized, predictable JSON responses for REST/GraphQL APIs.

```typescript
import { createApiResponse, createApiError } from 'devorax/api';

// Standard Success Response
res.json(createApiResponse({ user: "Alice" }));
// { success: true, data: { user: "Alice" } }

// Standard Error Response
res.status(404).json(createApiError("User not found", "NOT_FOUND"));
// { success: false, error: { message: "User not found", code: "NOT_FOUND" } }
```

### 🤖 AI `devorax/ai`
Provider-agnostic prompt templates and LLM response parsing.

```typescript
import { parseAIJSON, createPrompt } from 'devorax/ai';

// Safely extract and parse JSON from Markdown code blocks returned by LLMs
const structuredData = parseAIJSON(llmOutputText); 

// Simple, clean templating
const prompt = createPrompt("Analyze this: {{text}}", { text: "Hello World" });
```

### ⏳ Async `devorax/async`
Real-world asynchronous flow control to handle network latency and flakiness.

```typescript
import { retry, withTimeout, sleep } from 'devorax/async';

// Robust, exponential backoff retries for flaky endpoints
const data = await retry(() => fetch('/api/flaky-endpoint'), { 
  attempts: 3, 
  delayMs: 1000 
});

// Protect long-running promises
const fastData = await withTimeout(fetch('/api/slow'), 5000); 
```

### ✅ Validation `devorax/validation`
Production-ready format validators.

```typescript
import { validateEmail, isStrongPassword, isValidIP } from 'devorax/validation';

validateEmail("user@example.com"); // true
isStrongPassword("WeakPass1"); // false (Missing special char)
```

### 🇮🇳 India `devorax/india`
Specialized utilities for the Indian region.

```typescript
import { formatINR, validatePAN, validateGSTIN } from 'devorax/india';

formatINR(125000); // "₹1,25,000.00"
validatePAN("ABCDE1234F"); // true
```

---

## 🔒 Security

We take security seriously. For vulnerability reporting or responsible disclosure, please refer to our [`SECURITY.md`](./SECURITY.md). 

> [!CAUTION]
> Remember: Passwords, API keys, and sensitive tokens should **never** be logged to the console or exposed in client-facing responses.

## 📄 License

DevoraX is open-source and released under the [MIT License](./LICENSE).

<div align="center">
  <br />
  <sub>Built with ❤️ for modern software engineers.</sub>
</div>
