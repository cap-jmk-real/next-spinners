"use client";

import type { ComponentType } from "react";

import { LOADING_UI_KIT_TILES } from "../lib/kit-tiles";

function needsTextChild(slug: string) {
  return (
    slug === "text-dots" ||
    slug === "text-blink" ||
    slug === "text-shimmer" ||
    slug === "text-shimmer-wave" ||
    slug === "typing"
  );
}

function KitPreview({
  slug,
  Cmp,
}: {
  slug: string;
  Cmp: ComponentType<Record<string, unknown>>;
}) {
  const box =
    "flex h-32 flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-900/60 p-3";

  if (needsTextChild(slug)) {
    return (
      <div className={box}>
        <Cmp className="text-base text-emerald-400">Loading</Cmp>
        <span className="text-[10px] uppercase tracking-wide text-slate-500">{slug}</span>
      </div>
    );
  }

  if (slug === "terminal") {
    return (
      <div className={box}>
        <Cmp className="text-sm text-emerald-400" />
        <span className="text-[10px] uppercase tracking-wide text-slate-500">{slug}</span>
      </div>
    );
  }

  return (
    <div className={box}>
      <Cmp className="size-11 shrink-0 text-emerald-400" />
      <span className="text-[10px] uppercase tracking-wide text-slate-500">{slug}</span>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Loading UI kit
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Ported registry components from{" "}
          <a className="text-emerald-400 underline" href="https://loading-ui.com/">
            loading-ui.com
          </a>{" "}
          (next-spinners <code className="rounded bg-slate-800 px-1">/loading-ui</code>).
        </p>
      </header>
      <div
        id="loading-ui-kit-grid"
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      >
        {LOADING_UI_KIT_TILES.map(([slug, Cmp]) => (
          <KitPreview key={slug} slug={slug} Cmp={Cmp} />
        ))}
      </div>
    </main>
  );
}
