"use client";

import type { ComponentType } from "react";

import { createMixedFrameSpinner } from "../../../src/mix-frame-spinners";
import type { AgentFrameSpinnerProps } from "../../../src/agent-frame-spinner";

/**
 * Pre-built {@link createMixedFrameSpinner} instances (frame literals mirror
 * `src/spinners/*.tsx` — keep in sync when upstream sequences change).
 */
const FRAMES_DOTS = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"] as const;

const FRAMES_DOTS2 = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"] as const;

const FRAMES_DOTS3 = ["⠋", "⠙", "⠚", "⠞", "⠖", "⠦", "⠴", "⠲", "⠳", "⠓"] as const;

const FRAMES_DOTS4 = [
  "⠄",
  "⠆",
  "⠇",
  "⠋",
  "⠙",
  "⠸",
  "⠰",
  "⠠",
  "⠰",
  "⠸",
  "⠙",
  "⠋",
  "⠇",
  "⠆",
] as const;

const FRAMES_BOUNCE = ["⠁", "⠂", "⠄", "⡀", "⠄", "⠂"] as const;

const FRAMES_SAND = [
  "⠁",
  "⠂",
  "⠄",
  "⡀",
  "⡈",
  "⡐",
  "⡠",
  "⣀",
  "⣁",
  "⣂",
  "⣄",
  "⣌",
  "⣔",
  "⣤",
  "⣥",
  "⣦",
  "⣮",
  "⣶",
  "⣷",
  "⣿",
  "⡿",
  "⠿",
  "⢟",
  "⠟",
  "⡛",
  "⠛",
  "⠫",
  "⢋",
  "⠋",
  "⠍",
  "⡉",
  "⠉",
  "⠑",
  "⠡",
  "⢁",
] as const;

const FRAMES_MOON = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"] as const;

const FRAMES_ARC = ["◜", "◠", "◝", "◞", "◡", "◟"] as const;

const FRAMES_SIMPLE_DOTS = [".  ", ".. ", "...", "   "] as const;

type Spinner = ComponentType<AgentFrameSpinnerProps>;

/** Braille OR of four classic single-cell lineages (Dots, Dots2, Bounce, Sand). */
export const MixedBrailleOrQuad: Spinner = createMixedFrameSpinner(
  [FRAMES_DOTS, FRAMES_DOTS2, FRAMES_BOUNCE, FRAMES_SAND],
  { type: "braille-or", maxPeriod: 120 },
  72,
  "MixedBrailleOrQuad",
);

/** Braille OR of three dotted line variants. */
export const MixedBrailleOrTriple: Spinner = createMixedFrameSpinner(
  [FRAMES_DOTS, FRAMES_DOTS2, FRAMES_DOTS3],
  { type: "braille-or", maxPeriod: 96 },
  78,
  "MixedBrailleOrTriple",
);

/** Full cycles concatenated: moon phase → arc blocks → ASCII simple-dots. */
export const MixedCarouselTri: Spinner = createMixedFrameSpinner(
  [FRAMES_MOON, FRAMES_ARC, FRAMES_SIMPLE_DOTS],
  { type: "carousel", repeat: 1 },
  95,
  "MixedCarouselTri",
);

/** Interleaved ticks across four dot-family Braille sequences (scan-round-robin). */
export const MixedScanRoundRobinQuad: Spinner = createMixedFrameSpinner(
  [FRAMES_DOTS, FRAMES_DOTS2, FRAMES_DOTS3, FRAMES_DOTS4],
  { type: "scan-round-robin" },
  52,
  "MixedScanRoundRobinQuad",
);

export const MIXED_X_SHOWCASE: readonly {
  slug: string;
  title: string;
  subtitle: string;
  Comp: Spinner;
}[] = [
  {
    slug: "braille-or-quad",
    title: "braille-or ×4",
    subtitle: "Dots + Dots2 + Bounce + Sand",
    Comp: MixedBrailleOrQuad,
  },
  {
    slug: "braille-or-triple",
    title: "braille-or ×3",
    subtitle: "Dots + Dots2 + Dots3",
    Comp: MixedBrailleOrTriple,
  },
  {
    slug: "carousel-tri",
    title: "carousel ×3",
    subtitle: "Moon + Arc + SimpleDots",
    Comp: MixedCarouselTri,
  },
  {
    slug: "scan-rr-quad",
    title: "scan-round-robin ×4",
    subtitle: "Dots + Dots2 + Dots3 + Dots4",
    Comp: MixedScanRoundRobinQuad,
  },
] as const;
