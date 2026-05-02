# next-spinners

Braille / Unicode **frame spinners** for **React** and **Next.js**. Client Components only; inline styles (no CSS import). Based on [expo-agent-spinners](https://github.com/Eronred/expo-agent-spinners).

**Documentation:** [next-spinners docs](https://cap-jmk-real.github.io/next-spinners/)

## Install

```bash
npm install next-spinners
```

Requires **Node 22+**. Peer: `react`, `react-dom` ^18 || ^19.

## Usage

Use inside a Client Component (or a `"use client"` module). Imports are server-incompatible because spinners use `useState` + `setInterval`.

```tsx
"use client";

import { DotsSpinner } from "next-spinners";

export function Row() {
  return (
    <p style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      <DotsSpinner size={24} color="currentColor" label="Loading" />
      <span>Loading…</span>
    </p>
  );
}
```

![Spinner overview](./media/next-spinners-overview.gif)

## License

MIT
