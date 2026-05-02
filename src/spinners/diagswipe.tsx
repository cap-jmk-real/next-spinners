"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠁⠀",
  "⠋⠀",
  "⠟⠁",
  "⡿⠋",
  "⣿⠟",
  "⣿⡿",
  "⣿⣿",
  "⣿⣿",
  "⣾⣿",
  "⣴⣿",
  "⣠⣾",
  "⢀⣴",
  "⠀⣠",
  "⠀⢀",
  "⠀⠀",
  "⠀⠀",
] as const;

export const DiagSwipeSpinner = createAgentFrameSpinner(FRAMES, 60, "DiagSwipeSpinner");
