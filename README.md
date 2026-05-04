# next-spinners

Braille / Unicode **frame spinners** for **React** and **Next.js**. Client Components only; inline styles (no CSS import). Frame sets follow [expo-agent-spinners](https://github.com/Eronred/expo-agent-spinners) where those demos exist, plus 11 [package-only](docs/reference/expo-mapping.md) exports.

**Full copies** of [Loading UI](https://loading-ui.com/) and [Dot Matrix](https://dotmatrix.zzzzshawn.cloud/) (MIT) live in this repo under `**vendor/`** — every upstream loader as shipped in those projects — **not** simplified “inspired” remakes. The **Braille frame spinners** ship from the package root (`next-spinners`). **Loading UI registry components** are also published as `**next-spinners/loading-ui`** (ported from `vendor/loading-ui`; Tailwind + Motion peers apply). **Dot Matrix** stays vendored-only under `vendor/dot-matrix` (use their Tailwind/Motion setup).

**Documentation:** [next-spinners docs](https://cap-jmk-real.github.io/next-spinners/). **Cursor agents:** skill `**[.cursor/skills/next-spinners-agents/](.cursor/skills/next-spinners-agents/SKILL.md)`\*\* (pick / mix / author spinners, Loading UI subpath, registry, vendored Dot Matrix boundaries).

### shadcn CLI (copy into your repo)

Add the registry URL from `[components.json.example](./components.json.example)`, then e.g. `npx shadcn@latest add @next-spinners/ns-all` or `…/ns-dots`. Details: [shadcn registry docs](https://cap-jmk-real.github.io/next-spinners/reference/shadcn-registry.html).

## Install

```bash
npm install next-spinners
```

Requires **Node 22+**. Peers: `react`, `react-dom` ^18 || ^19. For `**next-spinners/loading-ui`\*\*: `clsx`, `tailwind-merge`, and `motion` (for animated loaders).

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

Optional `**effect="dotmatrix"**` on any frame spinner applies the neon gradient glyph styling (see attribution GIFs below).

### Mixing spinners (deterministic, 2–4 sources)

Combine existing frame loops without AI: `**mixFrameSources**` returns a new `string[]`, and `**createMixedFrameSpinner**` wraps it with the same client timing as other spinners.

- `**braille-or**` — each output cell is the bitwise **OR** of up to four **single-character Braille** frames (same index modulo each source’s length). Period is `min(lcm(lengths), maxPeriod)`.
- `**carousel`** — play each source’s full cycle **in order\*\* (optional `repeat`).
- `**scan-round-robin`\*\* — for each index `i`, emit one frame from every source in order (length `max(lengths) × sourceCount`).

Preset “novel” exports for posts: `**XPostQuadrantBrailleOrSpinner**`, `**XPostTrioBrailleOrSpinner**`, `**XPostAsciiBrailleCarouselSpinner**`, `**XPostDotsScanRoundRobinSpinner**` (see `src/spinners/mixed-x-post-pack.tsx`).

```tsx
"use client";

import { createMixedFrameSpinner } from "next-spinners";

const FRAMES_A = ["⠋", "⠙", "⠹"] as const;
const FRAMES_B = ["⠄", "⡀"] as const;

export const MyFusion = createMixedFrameSpinner(
  [FRAMES_A, FRAMES_B],
  { type: "braille-or", maxPeriod: 48 },
  70,
  "MyFusion",
);
```

### Loading UI kit (`next-spinners/loading-ui`)

Registry spinners from [loading-ui.com](https://loading-ui.com/) are copied into `**src/loading-ui/**` (run `**npm run port:loading-ui**` after `vendor:sync` when upstream changes). Use Tailwind in your app; import e.g. `import { Ring } from "next-spinners/loading-ui"`.

Regenerate the GIF: `cd examples/loading-ui-overview-app && npm install` once, then from repo root `**npm run media:gif:loading-ui**` (Playwright video → ffmpeg; env `LOADING_UI_GIF_FRAMES`, `LOADING_UI_GIF_SAMPLE_HZ`, `LOADING_UI_GIF_FPS`, `LOADING_UI_OVERVIEW_BASE_URL`).

### Full grid

Repo-relative `media/…` images resolve in GitHub and local Markdown preview when this folder is the workspace root.

### Dot Matrix loaders (vendored upstream)

Full [Dot Matrix](https://github.com/zzzzshawn/matrix) loader set from `**vendor/dot-matrix**` (gallery captured via `/?embed=1`: hero hidden, each tile shows default + bloom/opacity/layout/theme variants, all loaders animate — not the npm `next-spinners` frame exports). Install deps in that folder, then run `npm run media:gif:dotmatrix` to refresh **two** GIFs: `**next-spinners-dotmatrix-overview.gif`** = entire embed grid (no `rows` query); `**next-spinners-dotmatrix-overview-rows4.gif\*\*` = first four rows only (`rows=4`).

### Frame-spinner lineage (GIFs)

Each GIF is generated from `scripts/build-readme-attribution-pages.mjs`.

#### [expo-agent-spinners](https://github.com/Eronred/expo-agent-spinners) — all 55 upstream keys

#### next-spinners originals — 11 [package-only](docs/reference/expo-mapping.md) exports, three variants each

### Loading UI & Dot Matrix (upstream copies)

Sources are in `**vendor/loading-ui**` and `**vendor/dot-matrix**`. Update instructions: `[vendor/README.md](vendor/README.md)`.

Regenerate frame GIFs: `npm run media:gif` (frame overview), `npm run media:gif:dotmatrix` (starts `next dev` in `vendor/dot-matrix` or set `DOTMATRIX_OVERVIEW_BASE_URL` to an already-running app), `**npm run media:gif:loading-ui**` (overview app under `examples/loading-ui-overview-app`), `**npm run media:gif:mixed-x**` (four `createMixedFrameSpinner` demos under `examples/mixed-x-gif-app` → `media/next-spinners-mixed-x-showcase.gif`), and `npm run media:readme-gifs` (two GIFs above; Playwright + ffmpeg). Dot-matrix capture writes `**next-spinners-dotmatrix-overview.gif**` (all rows, `/?embed=1` only) and `**next-spinners-dotmatrix-overview-rows4.gif**` (four rows): warmup load, viewport fit to `#loader-grid`, Playwright video, then ffmpeg palette-GIF with **tail trim** so the clip matches `DOTMATRIX_GIF_FRAMES_* / DOTMATRIX_GIF_SAMPLE_HZ`. If `DOTMATRIX_OVERVIEW_BASE_URL` includes `rows=` in the query string, it is stripped before each capture so the “overview” file is never limited to four rows. Env: `DOTMATRIX_GIF_FRAMES_FULL`, `DOTMATRIX_GIF_FRAMES_ROWS4`, `DOTMATRIX_GIF_FRAMES` (overrides both), `DOTMATRIX_CAPTURE=both|full|rows4`.

## License

MIT
