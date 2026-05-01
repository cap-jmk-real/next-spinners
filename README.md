# next-spinners

Small, accessible loading indicators for **Next.js** and **React**. Components are **Server Component friendly** (no `"use client"` required). Styles ship as a separate CSS file you import once.

## Preview

![Animated overview of ring, dots, and bars spinners](./media/next-spinners-overview.gif)

The GIF is shipped in the npm package under `media/` so this relative path works on GitHub. On **npmjs.com**, if the image does not render, use the versioned file URL instead, for example:  
`https://unpkg.com/next-spinners@0.1.0/media/next-spinners-overview.gif` (bump the version after each release).

## Install

```bash
npm install next-spinners
```

Requires **Node 22+** (matches [Shiphook](https://github.com/cap-jmk-real/shiphook) and modern Next.js toolchains).

## Usage (App Router)

Import the stylesheet once in your root layout:

```tsx
// app/layout.tsx
import "next-spinners/next-spinner.css";
```

Use the spinner anywhere (Server or Client Components):

```tsx
import { NextSpinner } from "next-spinners";

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

## Full page example

See [`examples/ExampleAppRouterPage.tsx`](./examples/ExampleAppRouterPage.tsx) for a ready-to-copy App Router page that exercises all variants.

## License

MIT
