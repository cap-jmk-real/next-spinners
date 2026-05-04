"use client";

/**
 * Four deterministic “novel” spinners for social posts — built with
 * {@link createMixedFrameSpinner} from `../mix-frame-spinners`.
 * Frame literals mirror `src/spinners/*.tsx` sources (keep in sync if those change).
 */
import { createMixedFrameSpinner } from "../mix-frame-spinners";

/** @see `./dots` */
const DOTS_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"] as const;

/** @see `./dots2` */
const DOTS2_FRAMES = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"] as const;

/** @see `./dots3` */
const DOTS3_FRAMES = ["⠋", "⠙", "⠚", "⠞", "⠖", "⠦", "⠴", "⠲", "⠳", "⠓"] as const;

/** @see `./dots4` */
const DOTS4_FRAMES = [
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

/** @see `./bounce` */
const BOUNCE_FRAMES = ["⠁", "⠂", "⠄", "⡀", "⠄", "⠂"] as const;

/** @see `./dqpb` */
const DQPB_FRAMES = ["d", "q", "p", "b"] as const;

/** OR-fusion of four classic dot loops — dense “supernova” Braille. */
export const XPostQuadrantBrailleOrSpinner = createMixedFrameSpinner(
  [DOTS_FRAMES, DOTS2_FRAMES, DOTS3_FRAMES, DOTS4_FRAMES],
  { type: "braille-or", maxPeriod: 96 },
  72,
  "XPostQuadrantBrailleOrSpinner",
);

/** OR-fusion of three rhythms (dots + bounce + dots2). */
export const XPostTrioBrailleOrSpinner = createMixedFrameSpinner(
  [DOTS_FRAMES, BOUNCE_FRAMES, DOTS2_FRAMES],
  { type: "braille-or", maxPeriod: 72 },
  80,
  "XPostTrioBrailleOrSpinner",
);

/** Full `dqpb` cycle, then full dots cycle — ASCII ↔ Braille handoff. */
export const XPostAsciiBrailleCarouselSpinner = createMixedFrameSpinner(
  [DQPB_FRAMES, DOTS_FRAMES],
  { type: "carousel", repeat: 1 },
  90,
  "XPostAsciiBrailleCarouselSpinner",
);

/** Strobe scan: for each beat, show one frame from dots, then one from dots2, repeat. */
export const XPostDotsScanRoundRobinSpinner = createMixedFrameSpinner(
  [DOTS_FRAMES, DOTS2_FRAMES],
  { type: "scan-round-robin" },
  55,
  "XPostDotsScanRoundRobinSpinner",
);
