# Examples

## App Router page

See [`ExampleAppRouterPage.tsx`](./ExampleAppRouterPage.tsx): a client page that uses `DotsSpinner`, `WaveSpinner`, and `PulseSpinner`.

Spinners from `next-spinners` require **`"use client"`** (or a client child component). There is no CSS import for this package.

## Loading UI overview (Tailwind + Motion)

[`loading-ui-overview-app/`](./loading-ui-overview-app/) is a small **Next.js** app that renders every component from **`next-spinners/loading-ui`** in a grid. It is used by `npm run media:gif:loading-ui` (install deps in that folder first).

## Mixed-frame X showcase (GIF)

[`mixed-x-gif-app/`](./mixed-x-gif-app/) renders **four** spinners built with **`createMixedFrameSpinner`** (each combines 2–4 library frame sequences). Regenerate the social GIF: `cd examples/mixed-x-gif-app && npm install` once, then from the repo root **`npm run media:gif:mixed-x`** (writes `media/next-spinners-mixed-x-showcase.gif`).
