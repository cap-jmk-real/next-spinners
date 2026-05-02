"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠀⠀⠀⠀",
  "⡇⠀⠀⠀",
  "⣿⠀⠀⠀",
  "⢸⡇⠀⠀",
  "⠀⣿⠀⠀",
  "⠀⢸⡇⠀",
  "⠀⠀⣿⠀",
  "⠀⠀⢸⡇",
  "⠀⠀⠀⣿",
  "⠀⠀⠀⢸",
] as const;

export const ScanSpinner = createAgentFrameSpinner(FRAMES, 70, "ScanSpinner");
