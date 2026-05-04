---
title: Introduction
outline: true
---

# next-spinners

Braille / Unicode **frame spinners** for **React** and **Next.js**: same frame sequences and timing as [expo-agent-spinners](https://github.com/Eronred/expo-agent-spinners), packaged as Client Components with inline styles.

![Animated overview](./media/next-spinners-overview.gif)

## Quick start

```bash
npm install next-spinners
```

Requires **Node 22+**. Peer dependencies: `react` and `react-dom` ^18 or ^19.

```tsx
"use client";

import { DotsSpinner } from "next-spinners";

<DotsSpinner size={24} color="#38bdf8" label="Loading" />;
```

- **[Guide](/guide)** — client boundary, props, theming, custom frames, App Router
- **[Live gallery (by origin)](/reference/spinner-gallery)** — every frame spinner, rendered in the browser (no GIFs)
- **[Expo → export mapping](/reference/expo-mapping)** — upstream demo keys and all named exports
- **[Maintainers](/maintainers)** — regenerating modules and preview assets

## Package surface

- **`createAgentFrameSpinner(frames, intervalMs, displayName)`** — factory for your own sequences (`AgentFrameSpinnerProps`).
- **Named `*Spinner` components** — re-exported from the package root (see reference).

Readme on npm/GitHub stays minimal; this site holds the full detail.
