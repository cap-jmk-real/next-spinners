# Maintainers

## Regenerating spinners from expo-agent-spinners

1. Clone [expo-agent-spinners](https://github.com/Eronred/expo-agent-spinners) into **`.expo-spinners-src/`** at the repo root (gitignored).
2. Run:

```bash
node scripts/generate-agent-spinners.mjs
```

3. Run format, tests, and `npm run build`.

## Preview GIF and frame snapshot

Vanilla preview HTML and the npm readme GIF are driven by the same frame lists as the React components.

- **Snapshot JSON + overview HTML** (after editing `src/spinners/*.tsx`):

```bash
npm run media:snapshot
```

This updates `media/spinner-frames-snapshot.json` and inlines data into `media/overview.html`.

- **Animated GIF** (Playwright + ffmpeg):

```bash
npm run media:gif
```

Requires a Chromium install (`npx playwright install chromium` or system Chrome/Edge). Tunables live in `scripts/capture-overview-gif.mjs` (viewport, frame interval, fps).

Prettier may flag regenerated `media/overview.html` / `media/spinner-frames-snapshot.json`; run the repo’s Prettier check/fix if CI complains.

## Documentation site

From the repo root:

```bash
npm run docs:dev    # VitePress dev server
npm run docs:build  # production build → docs/.vitepress/dist
```

`docs/sync-public.mjs` runs before build and copies `media/` and `examples/` into the docs app so images and example links resolve.

GitHub Pages base path is configured in `docs/.vitepress/config.mts` (`base: "/next-spinners/"`).
