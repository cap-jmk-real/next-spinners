# next-spinners

Braille/Unicode **frame** spinners for **React** / **Next.js** (Client Components: `useState` + interval). No CSS import—inline styles only.

<!-- HTML + img: renders in VS Code/Cursor preview; same shields as nested markdown on GitHub -->
<p>
  <a href="https://github.com/cap-jmk-real/next-spinner-kit/actions/workflows/ci.yml"><img src="https://img.shields.io/github/actions/workflow/status/cap-jmk-real/next-spinner-kit/ci.yml?style=flat-square&amp;label=CI" alt="CI" /></a>
  <a href="https://www.npmjs.com/package/next-spinners"><img src="https://img.shields.io/npm/v/next-spinners.svg?style=flat-square" alt="npm version" /></a>
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License: MIT" /></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-6.x-3178C6?style=flat-square&amp;logo=typescript&amp;logoColor=white" alt="TypeScript" /></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node-22%2B-339933?style=flat-square&amp;logo=node.js&amp;logoColor=white" alt="Node" /></a>
  <a href="https://cap-jmk-real.github.io/next-spinner-kit/"><img src="https://img.shields.io/badge/docs-GitHub%20Pages-0ea5e9?style=flat-square&amp;logo=readthedocs&amp;logoColor=white" alt="Docs" /></a>
  <a href="https://coderabbit.ai"><img src="https://img.shields.io/coderabbit/prs/github/cap-jmk-real/next-spinner-kit?style=flat-square&amp;utm_source=oss&amp;utm_medium=github&amp;utm_campaign=cap-jmk-real%2Fnext-spinner-kit&amp;labelColor=171717&amp;color=FF570A&amp;link=https%3A%2F%2Fcoderabbit.ai&amp;label=CodeRabbit+Reviews" alt="CodeRabbit Reviews" /></a>
</p>

---

## Install

```bash
npm install next-spinners
```

**Node 22+.** Peers: `react`, `react-dom` (^18 or ^19). For `next-spinners/loading-ui` add `clsx`, `tailwind-merge`, `motion`, and Tailwind in your app.

## Usage

```tsx
"use client";

import { DotsSpinner } from "next-spinners";

export function Example() {
  return <DotsSpinner size={24} color="currentColor" label="Loading" />;
}
```

Optional **`effect="dotmatrix"`** on any exported frame spinner for neon gradient glyphs.

**Exports**

| Import                     | Contents                                                                                   |
| -------------------------- | ------------------------------------------------------------------------------------------ |
| `next-spinners`            | Named spinners, `createAgentFrameSpinner`, `createMixedFrameSpinner`, `mixFrameSources`, … |
| `next-spinners/loading-ui` | [Loading UI](https://loading-ui.com/)-style registry components (Tailwind + Motion)        |

**shadcn:** copy [`components.json.example`](./components.json.example) registry URL → `npx shadcn@latest add @next-spinners/ns-dots` (or `ns-all`, etc.).

**Mixed frames:** `mixFrameSources` / `createMixedFrameSpinner` combine 2–4 frame arrays (`braille-or`, `carousel`, `scan-round-robin`). Presets: `XPostQuadrantBrailleOrSpinner`, … in `mixed-x-post-pack`.

Repo-only extras (vendored upstream trees, GIF tooling, long docs): see [`docs/`](https://cap-jmk-real.github.io/next-spinner-kit/) and `vendor/README.md`. Not required to install from npm.
