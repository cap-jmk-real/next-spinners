"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠁",
  "⠔",
  "⠒",
  "⠑",
  "⠊",
  "⠉",
  "⠃",
  "⠇",
  "⠏",
  "⠟",
  "⠻",
  "⠽",
  "⠾",
  "⠷",
  "⠶",
  "⠦",
  "⠎",
  "⠒",
] as const;

export const RippleSpinner = createAgentFrameSpinner(FRAMES, 95, "RippleSpinner");
