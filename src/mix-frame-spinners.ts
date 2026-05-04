import type { ComponentType } from "react";

import { createAgentFrameSpinner } from "./agent-frame-spinner";
import type { AgentFrameSpinnerProps } from "./agent-frame-spinner";

/** Braille block U+2800 … U+28FF (single codepoint). */
const BRAILLE_MIN = 0x28_00;
const BRAILLE_MAX = 0x28_ff;

export type FrameSource = readonly string[];

export type MixedFrameStrategy =
  | {
      /**
       * Per tick, OR all Braille dot masks (single-cell glyphs only).
       * Period = min(lcm(lengths), maxPeriod).
       */
      type: "braille-or";
      maxPeriod?: number;
    }
  | {
      /**
       * Play each source’s full cycle in order: …A… then …B… (then repeat `repeat` times).
       */
      type: "carousel";
      /** @default 1 */
      repeat?: number;
    }
  | {
      /**
       * For each frame index `i` (0 … maxLength−1), emit one glyph from every source in order
       * (length = `maxLength * sourceCount`). Good for “all at once” strobing columns.
       */
      type: "scan-round-robin";
    };

function assertSourceCount(sources: readonly FrameSource[]) {
  if (sources.length < 2 || sources.length > 4) {
    throw new Error(
      `mixFrameSources: need between 2 and 4 sources, got ${sources.length}`,
    );
  }
  for (let i = 0; i < sources.length; i++) {
    if (sources[i].length === 0) {
      throw new Error(`mixFrameSources: source ${i} has no frames`);
    }
  }
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

function lcm2(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function lcmMany(values: number[]): number {
  return values.reduce((acc, v) => lcm2(acc, v), values[0]!);
}

function isSingleBrailleCell(s: string): boolean {
  if (s.length !== 1) return false;
  const cp = s.codePointAt(0)!;
  return cp >= BRAILLE_MIN && cp <= BRAILLE_MAX;
}

function brailleToDots(s: string): number {
  if (!isSingleBrailleCell(s)) {
    throw new Error(
      `mixFrameSources(braille-or): expected one Braille cell (U+2800–U+28FF), got ${JSON.stringify(s)}`,
    );
  }
  return s.codePointAt(0)! - BRAILLE_MIN;
}

function dotsToBraille(d: number): string {
  return String.fromCodePoint(BRAILLE_MIN + (d & 0xff));
}

function mixBrailleOr(sources: readonly FrameSource[], maxPeriod: number): string[] {
  const lens = sources.map((s) => s.length);
  let period = lcmMany([...lens]);
  period = Math.min(period, maxPeriod);
  const out: string[] = [];
  for (let i = 0; i < period; i++) {
    let mask = 0;
    for (let j = 0; j < sources.length; j++) {
      const ch = sources[j][i % lens[j]]!;
      mask |= brailleToDots(ch);
    }
    out.push(dotsToBraille(mask));
  }
  return out;
}

function mixCarousel(sources: readonly FrameSource[], repeat: number): string[] {
  const r = Math.max(1, Math.floor(repeat));
  const out: string[] = [];
  for (let n = 0; n < r; n++) {
    for (const src of sources) {
      for (let i = 0; i < src.length; i++) {
        out.push(src[i]!);
      }
    }
  }
  return out;
}

function mixScanRoundRobin(sources: readonly FrameSource[]): string[] {
  const lens = sources.map((s) => s.length);
  const maxLen = Math.max(...lens);
  const out: string[] = [];
  for (let i = 0; i < maxLen; i++) {
    for (let s = 0; s < sources.length; s++) {
      out.push(sources[s][i % lens[s]]!);
    }
  }
  return out;
}

/**
 * Deterministically combine 2–4 frame lists into one loop (no randomness / no AI).
 * Strategies: `braille-or` (single-cell Braille only), `carousel`, `scan-round-robin`.
 */
export function mixFrameSources(
  sources: readonly FrameSource[],
  strategy: MixedFrameStrategy,
): string[] {
  assertSourceCount(sources);

  switch (strategy.type) {
    case "braille-or": {
      const maxPeriod = strategy.maxPeriod ?? 120;
      for (const src of sources) {
        for (const fr of src) {
          if (!isSingleBrailleCell(fr)) {
            throw new Error(
              `mixFrameSources(braille-or): every frame must be a single Braille character; offending frame ${JSON.stringify(fr)}`,
            );
          }
        }
      }
      return mixBrailleOr(sources, maxPeriod);
    }
    case "carousel":
      return mixCarousel(sources, strategy.repeat ?? 1);
    case "scan-round-robin":
      return mixScanRoundRobin(sources);
  }
}

/**
 * Returns a client spinner component built from {@link mixFrameSources}.
 */
export function createMixedFrameSpinner(
  sources: readonly FrameSource[],
  strategy: MixedFrameStrategy,
  baseIntervalMs: number,
  displayName: string,
): ComponentType<AgentFrameSpinnerProps> {
  const frames = mixFrameSources(sources, strategy);
  return createAgentFrameSpinner(frames, baseIntervalMs, displayName);
}
