"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠀",
  "⠠",
  "⠰",
  "⠔",
  "⠒",
  "⠑",
  "⠕",
  "⠗",
  "⠷",
  "⠿",
  "⠷",
  "⠗",
  "⠕",
  "⠑",
  "⠒",
  "⠔",
  "⠰",
  "⠠",
  "⠀",
] as const;

export const BloomSpinner = createAgentFrameSpinner(FRAMES, 100, "BloomSpinner");
