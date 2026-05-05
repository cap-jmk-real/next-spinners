---
title: shadcn registry
outline: true
---

# Install via shadcn CLI

The repo publishes [shadcn/ui registry](https://ui.shadcn.com/docs/registry) JSON under [`registry/`](https://github.com/cap-jmk-real/next-spinner-kit/tree/main/registry) so you can copy components into your app like Loading UI or Dot Matrix.

## 1. Register the namespace

Merge the `registries` entry from [`components.json.example`](https://github.com/cap-jmk-real/next-spinner-kit/blob/main/components.json.example) into your project’s `components.json` (or add the block by hand). You need a `@/lib` alias (and typically `@/components`) in `tsconfig` paths so copied files can import `@/lib/next-spinners/agent-frame-spinner`.

## 2. Add components

```bash
# Full library (recommended): factory + every spinner + barrel index
npx shadcn@latest add @next-spinners/ns-all

# Or factory only, then individual spinners (pulls ns-agent-frame automatically)
npx shadcn@latest add @next-spinners/ns-agent-frame
npx shadcn@latest add @next-spinners/ns-dots
```

Spinner names match source filenames: `ns-dots`, `ns-wave`, `ns-simple-dots-scrolling`, etc. See [`registry/registry.json`](https://github.com/cap-jmk-real/next-spinner-kit/blob/main/registry/registry.json) for the full list.

## 3. Use

```tsx
"use client";

import { DotsSpinner } from "@/components/next-spinners/spinners";

<DotsSpinner size={24} color="currentColor" label="Loading" />;
```

If you used **`ns-all`**, import from the barrel: `@/components/next-spinners/spinners`. Individual adds place files under `components/next-spinners/spinners/<name>.tsx`.

## Regenerating the registry (maintainers)

After changing `src/agent-frame-spinner.tsx` or `src/spinners/*`, run:

```bash
npm run registry:shadcn
```

Commit updated files under `registry/`.
