---
outline: deep
---

# Guide

## Client Components only

Every export uses **`"use client"`** internally: the implementation relies on `useState` and `setInterval`. You must either:

- Render spinners from a file that starts with `"use client"`, or
- Import them only from a Client Component subtree.

Server Components cannot import these modules directly. For App Router, keep spinners in a small client leaf (see [/examples/README](/examples/README)).

There is **no** CSS entry (do not import `next-spinners/*.css`).

## Props

Shared type: **`AgentFrameSpinnerProps`**. All built-in spinners accept:

| Prop         | Type              | Default     | Notes                                                                |
| ------------ | ----------------- | ----------- | -------------------------------------------------------------------- |
| `size`       | `number`          | `24`        | `fontSize` in px.                                                    |
| `color`      | `string`          | `"#fff"`    | CSS foreground (`color`). Use `currentColor` to follow parent text.  |
| `style`      | `CSSProperties`   | —           | Merged **after** built-in styles; `style.color` overrides `color`.   |
| `label`      | `string`          | `"Loading"` | `aria-label` on the `status` live region.                            |
| `durationMs` | `number`          | —           | Length of one full loop; interval ≈ `durationMs /` number of frames. |
| `intervalMs` | `number`          | —           | Ms between frames; overrides built-in timing and `durationMs`.       |
| …            | `HTMLSpanElement` | —           | Normal `<span>` attributes (`className`, `id`, `data-*`, etc.).      |

The root element is `<span role="status" aria-live="polite">`.

### Animation timing

Each spinner ships with a default ms-per-frame (matching upstream). You can override:

- **`durationMs`** — total time for one complete cycle. Per-frame delay is `Math.round(durationMs / frameCount)`, at least **1 ms**.
- **`intervalMs`** — explicit delay between frames. If both are set, **`intervalMs` wins**.

```tsx
<DotsSpinner durationMs={2400} label="Slow loop" />
<DotsSpinner intervalMs={40} label="Fast ticks" />
```

### Color and design tokens

Spinners render as monospace text; **only foreground color** is styled (no separate “track” fill).

- **Fixed palette:** `color="#2563eb"`.
- **Inherit context:** `color="currentColor"` so the glyph matches surrounding `color`.
- **Tokens / variables:** pass through `style`, since it wins over `color`:

```tsx
<DotsSpinner style={{ color: "var(--accent, #fff)" }} label="Saving" />
```

Merge order in code is: base layout → `color` prop → `...style`. Anything you put in `style` (including `color`) overrides the `color` prop.

### Accessible labeling

Set **`label`** to a short, task-specific string (e.g. `"Saving draft"`, `"Loading invoices"`). It maps to `aria-label` on the status region so assistive tech announces something meaningful instead of a generic “Loading”.

## Custom spinner (`createAgentFrameSpinner`)

```tsx
"use client";

import { createAgentFrameSpinner } from "next-spinners";

const FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"] as const;

export const MySpinner = createAgentFrameSpinner(FRAMES, 80, "MySpinner");
```

- **`frames`** — non-empty `readonly string[]`; each string is one animation step (can be multiple Braille/Unicode code points).
- **`intervalMs`** — delay between frames (same as upstream Expo timings where ported).
- **`displayName`** — React `displayName` for devtools.

Export a const so the component identity is stable.

## npm readme and preview image

The repo ships **`media/next-spinners-overview.gif`**. On **npmjs.com**, relative images sometimes fail; you can link a versioned file from unpkg, for example:

`https://unpkg.com/next-spinners@0.1.2/media/next-spinners-overview.gif` (pin the version to the release you publish).

## Further reading

- [Expo → export mapping](/reference/expo-mapping)
- [Maintainers](/maintainers) — codegen and GIF regeneration
