# next-spinner-kit

Small, accessible loading indicators for **Next.js** and **React**. Components are **Server Component friendly** (no `"use client"` required). Styles ship as a separate CSS file you import once.

## Install

```bash
npm install next-spinner-kit
```

Requires **Node 22+** (matches [Shiphook](https://github.com/cap-jmk-real/shiphook) and modern Next.js toolchains).

## Usage (App Router)

Import the stylesheet once in your root layout:

```tsx
// app/layout.tsx
import "next-spinner-kit/next-spinner.css";
```

Use the spinner anywhere (Server or Client Components):

```tsx
import { NextSpinner } from "next-spinner-kit";

export default function Page() {
  return (
    <p>
      <NextSpinner variant="ring" size="md" label="Loading dashboard" />
    </p>
  );
}
```

### Variants and sizes

- **variant**: `"ring"` (default) | `"dots"` | `"bars"`
- **size**: `"sm"` | `"md"` (default) | `"lg"`

### Theming

Override the accent color with CSS on a wrapper or globally:

```css
.my-panel .nsk {
  --nsk-color: #10b981;
}
```

### Caption

Pass children to show text beside the indicator:

```tsx
<NextSpinner label="Loading">Fetching data…</NextSpinner>
```

## Deploying with Shiphook

This repo includes a [`shiphook.yaml`](./shiphook.yaml) that runs a clean install, full CI, and build after `git pull` on your server. See [Shiphook](https://github.com/cap-jmk-real/shiphook) for setup (webhook secret, HTTPS, `runScript`).

## Development

```bash
npm ci
npm run ci
npm run build
```

## License

MIT
