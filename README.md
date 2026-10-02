<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=700&size=36&pause=1000&color=000000&center=true&vCenter=true&width=600&height=80&lines=DevoraX+Toolkit;Build+less+boilerplate;Ship+better+software" alt="Typing SVG Animation" />

  # DevoraX

  [![npm version](https://img.shields.io/npm/v/@prakash1935/devorax?color=000000&labelColor=333333&style=for-the-badge)](https://www.npmjs.com/package/@prakash1935/devorax)
  [![License](https://img.shields.io/npm/l/@prakash1935/devorax?color=000000&labelColor=333333&style=for-the-badge)](#-license)
  [![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue?style=for-the-badge&logo=typescript&logoColor=white&color=000000&labelColor=333333)](https://www.typescriptlang.org/)
  
  <br />
  <img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=600&size=20&pause=2000&color=2ecc71&center=true&vCenter=true&width=400&height=40&lines=🧪+100%25+Test+Coverage;83+Tests+Passed+Successfully!" alt="Test Coverage Animation" />

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
npm install @prakash1935/devorax
# or
yarn add @prakash1935/devorax
# or
pnpm add @prakash1935/devorax
```

---

## 🚀 Quick Test (Copy & Paste)

Want to see DevoraX in action right now? Open your terminal, create a test folder, and run one of these snippets to test the AES encryption module instantly!

**For Windows (PowerShell):**
```powershell
mkdir devorax-test; cd devorax-test
npm init -y
npm install @prakash1935/devorax
Set-Content test.mjs -Value @"
import { encryptAES, decryptAES } from '@prakash1935/devorax/security';

const encrypted = await encryptAES('DevoraX is live!', 'my-password');
console.log('🔒 Encrypted:', encrypted);
console.log('🔓 Decrypted:', await decryptAES(encrypted, 'my-password'));
"@
node test.mjs
```

**For Mac/Linux:**
```bash
mkdir devorax-test && cd devorax-test
npm init -y
npm install @prakash1935/devorax
cat << 'EOF' > test.mjs
import { encryptAES, decryptAES } from '@prakash1935/devorax/security';

const encrypted = await encryptAES('DevoraX is live!', 'my-password');
console.log('🔒 Encrypted:', encrypted);
console.log('🔓 Decrypted:', await decryptAES(encrypted, 'my-password'));
EOF
node test.mjs
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
import { generateOTP, generateSecureToken, maskSecret, encryptAES, decryptAES } from 'devorax/security';

const otp = generateOTP(6); // "482910"
const apiToken = generateSecureToken(32); // 64-char secure hex token
const maskedKey = maskSecret('super_secret_api_key_123', 4); // "********************_123"

// Strong AES-256-GCM encryption
const key = "12345678901234567890123456789012";
const encrypted = await encryptAES("Super Secret Message", key);
const decrypted = await decryptAES(encrypted, key); // "Super Secret Message"
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
import { parseAIJSON, createPrompt, estimateTokens, parseFunctionArgs } from 'devorax/ai';

// Safely extract and parse JSON from Markdown code blocks returned by LLMs
const structuredData = parseAIJSON(llmOutputText); 

// Simple, clean templating
const prompt = createPrompt("Analyze this: {{text}}", { text: "Hello World" });

// Estimate token costs (1 token ~= 4 chars)
const tokenCount = estimateTokens(prompt); 

// Parse Function Call arguments from AI
const args = parseFunctionArgs(`{"query": "best pizza in NYC"}`);
```

### ⏳ Async `devorax/async`
Real-world asynchronous flow control to handle network latency and flakiness.

```typescript
import { retry, withTimeout, sleep, batchPromises, poll } from 'devorax/async';

// Robust, exponential backoff retries for flaky endpoints
const data = await retry(() => fetch('/api/flaky-endpoint'), { 
  attempts: 3, 
  delayMs: 1000 
});

// Protect long-running promises
const fastData = await withTimeout(fetch('/api/slow'), 5000); 

// Process thousands of items safely without running out of memory (10 at a time)
await batchPromises(hugeArray, async (item) => process(item), 10);

// Keep polling until a background job is finished
const finalStatus = await poll(checkJobStatus, (status) => status === 'DONE', 2000, 10);
```

### ✅ Validation `devorax/validation`
Production-ready format validators.

```typescript
import { validateEmail, isStrongPassword, isValidIP, validateSchema } from 'devorax/validation';

validateEmail("user@example.com"); // true
isStrongPassword("WeakPass1"); // false (Missing special char)

// Fast, lightweight runtime schema validation (No Zod required)
const user = { age: 25, active: true };
const { valid, errors } = validateSchema(user, {
  age: (v) => typeof v === 'number' && v >= 18,
  active: (v) => v === true
}); // valid: true
```

### 🇮🇳 India `devorax/india`
Specialized utilities for the Indian region.

```typescript
import { formatINR, validatePAN, validateGSTIN } from 'devorax/india';

formatINR(125000); // "₹1,25,000.00"
validatePAN("ABCDE1234F"); // true
```

---

## 🧪 Bulletproof Testing

We care deeply about stability. DevoraX ships with **100% test coverage** across all modules, including a massive real-world integration test.

```text
$ vitest run
 RUN  v1.6.1 devorax

 ✓ tests/api/api.test.ts  (13 tests) 14ms
 ✓ tests/security/security.test.ts  (12 tests) 21ms
 ✓ tests/core/core.test.ts  (14 tests) 17ms
 ✓ tests/validation/validation.test.ts  (12 tests) 20ms
 ✓ tests/ai/ai.test.ts  (12 tests) 15ms
 ✓ tests/india/india.test.ts  (8 tests) 54ms
 ✓ tests/integration.test.ts  (1 test) 147ms
 ✓ tests/async/async.test.ts  (11 tests) 255ms

 Test Files  8 passed (8)
      Tests  83 passed (83)
```

---

## 🔒 Security

We take security seriously. For vulnerability reporting or responsible disclosure, please refer to our [`SECURITY.md`](./SECURITY.md). 

> [!CAUTION]
> Remember: Passwords, API keys, and sensitive tokens should **never** be logged to the console or exposed in client-facing responses.

## 📄 License

DevoraX is open-source and released under the **MIT License**.

```text
MIT License

Copyright (c) 2026 Prakash Ramakrishnan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

<div align="center">
  <br />
  <sub>Built with ❤️ by Prakash Ramakrishnan for modern software engineers.</sub>
</div>
