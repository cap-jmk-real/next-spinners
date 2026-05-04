# next-spinners

Braille/Unicode **frame** spinners for **React** / **Next.js** (Client Components: `useState` + interval). No CSS import—inline styles only.

**[Docs](https://cap-jmk-real.github.io/next-spinners/)** · **License:** MIT

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

Repo-only extras (vendored upstream trees, GIF tooling, long docs): see [`docs/`](https://cap-jmk-real.github.io/next-spinners/) and `vendor/README.md`. Not required to install from npm.
