import type { ReactNode } from "react";

import {
  MixedBrailleOrQuad,
  MixedBrailleOrTriple,
  MixedCarouselTri,
  MixedScanRoundRobinQuad,
} from "../lib/saved-mixed-spinners";

/** Ensures Braille + emoji render in the GIF capture (see layout font variable). */
const MIXED_SPINNER_FONT =
  'var(--font-mixed-symbols), "Noto Sans Symbols 2", "Segoe UI Symbol", "Segoe UI Emoji", ui-monospace, monospace';

/** Fits the tile strip; avoid oversized glyphs in short capture frames. */
const SPINNER_PX = 40;

const spinStyle = { fontFamily: MIXED_SPINNER_FONT } as const;

/** Fixed-height preview so the glyph stays centered and never collapses in tall flex layouts. */
const SPINNER_WELL_H = 84;

function ShowcaseTile({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 0,
        padding: "12px 10px 14px",
        borderRadius: 12,
        border: "1px solid rgba(148, 163, 184, 0.25)",
        background: "rgba(15, 23, 42, 0.9)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: SPINNER_WELL_H,
          width: "100%",
          flexShrink: 0,
          borderRadius: 8,
          background: "rgba(2, 6, 23, 0.75)",
          overflow: "visible",
        }}
      >
        {children}
      </div>
      <p
        style={{
          margin: "12px 0 0",
          textAlign: "center",
          width: "100%",
          fontSize: 15,
          fontWeight: 650,
          lineHeight: 1.3,
          letterSpacing: "-0.02em",
          color: "#f8fafc",
        }}
      >
        {label}
      </p>
    </div>
  );
}

export default function HomePage() {
  return (
    <main
      id="mixed-x-showcase-root"
      style={{
        margin: "0 auto",
        maxWidth: 1200,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        boxSizing: "border-box",
        padding: "24px 28px 28px",
      }}
    >
      <div>
        <h1
          style={{
            margin: 0,
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.2,
            letterSpacing: "-0.03em",
            color: "#f8fafc",
          }}
        >
          Mixed frame spinners
        </h1>

        <div
          id="mixed-x-showcase-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: 14,
            marginTop: 18,
            alignItems: "start",
            gridAutoRows: "min-content",
          }}
        >
          <ShowcaseTile label="4× Braille OR">
            <MixedBrailleOrQuad
              size={SPINNER_PX}
              color="#5eead4"
              label="4-way Braille OR"
              style={spinStyle}
            />
          </ShowcaseTile>

          <ShowcaseTile label="3× Braille OR">
            <MixedBrailleOrTriple
              size={SPINNER_PX}
              color="#5eead4"
              label="3-way Braille OR"
              style={spinStyle}
            />
          </ShowcaseTile>

          <ShowcaseTile label="Carousel">
            <MixedCarouselTri
              size={SPINNER_PX}
              color="#5eead4"
              label="Mixed carousel"
              style={spinStyle}
            />
          </ShowcaseTile>

          <ShowcaseTile label="4× Round-robin">
            <MixedScanRoundRobinQuad
              size={SPINNER_PX}
              color="#5eead4"
              label="4-way round-robin"
              style={spinStyle}
            />
          </ShowcaseTile>
        </div>
      </div>
    </main>
  );
}
