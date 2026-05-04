# Vendored upstream loader libraries

These directories are **verbatim shallow clones** of the published projects (MIT). They are **not** reimplemented “inspired” spinners: use or copy components from here when you want the real Loading UI or Dot Matrix loaders (Tailwind / Motion / SVG).

| Directory       | Upstream                                                  | What it contains                                                                      |
| --------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `loading-ui/`   | [turbostarter/loading-ui](https://github.com/turbostarter/loading-ui) | Site + **registry** sources under `registry/components/loading-ui/` (install via their docs / shadcn registry). |
| `dot-matrix/` | [zzzzshawn/matrix](https://github.com/zzzzshawn/matrix) (“Dot Matrix”) | **`loaders/`** tree — all dot-matrix loader implementations and shared utilities.    |

## Updating

From the repo root:

```bash
npm run vendor:sync
npm run port:loading-ui
```

`port:loading-ui` copies `vendor/loading-ui/registry/components/loading-ui/*.tsx` into **`src/loading-ui/`** for the **`next-spinners/loading-ui`** npm export (re-run whenever Loading UI upstream changes).

Or manually:

```bash
rm -rf vendor/loading-ui vendor/dot-matrix
git clone --depth 1 https://github.com/turbostarter/loading-ui.git vendor/loading-ui
git clone --depth 1 https://github.com/zzzzshawn/matrix.git vendor/dot-matrix
```

The npm package **`next-spinners`** still ships only the **Braille / Unicode frame spinners** from `src/` (expo lineage + package-only). Vendored trees are included so this repo holds **full upstream copies** alongside those exports; they are **not** wired into `dist/` — integrate them in your app per upstream instructions (Tailwind, path aliases, etc.).
