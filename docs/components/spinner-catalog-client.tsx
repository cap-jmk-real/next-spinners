"use client";

import { useEffect, useState } from "react";
import { SpinnerCatalogApp, SpinnerHeroApp } from "./spinner-catalog-app";

/** Client-only mount so frame spinners (intervals) never run during static prerender. */
export function SpinnerCatalogClient() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return (
      <div
        style={{
          minHeight: 360,
          borderRadius: 12,
          background: "linear-gradient(165deg, #0f172a 0%, #020617 100%)",
          border: "1px solid rgba(148,163,184,0.2)",
        }}
      />
    );
  }
  return (
    <div aria-hidden="true">
      <SpinnerCatalogApp />
    </div>
  );
}

/** Lightweight native showcase for the landing page hero. */
export function SpinnerHeroClient() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  if (!ready) {
    return (
      <div
        style={{
          minHeight: 190,
          borderRadius: 12,
          background: "linear-gradient(165deg, #0f172a 0%, #020617 100%)",
          border: "1px solid rgba(148,163,184,0.2)",
        }}
      />
    );
  }
  return (
    <div aria-hidden="true">
      <SpinnerHeroApp />
    </div>
  );
}
