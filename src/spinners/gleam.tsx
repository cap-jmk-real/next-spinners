"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠀",
  "⠁",
  "⠉",
  "⠋",
  "⠛",
  "⠟",
  "⠿",
  "⡿",
  "⣿",
  "⡿",
  "⠿",
  "⠟",
  "⠛",
  "⠋",
  "⠉",
  "⠁",
] as const;

export const GleamSpinner = createAgentFrameSpinner(FRAMES, 90, "GleamSpinner");
