"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⡀⠀⠀",
  "⡄⠀⠀",
  "⡆⠀⠀",
  "⡇⠀⠀",
  "⣇⠀⠀",
  "⣧⠀⠀",
  "⣷⠀⠀",
  "⣿⠀⠀",
  "⣿⡀⠀",
  "⣿⡄⠀",
  "⣿⡆⠀",
  "⣿⡇⠀",
  "⣿⣇⠀",
  "⣿⣧⠀",
  "⣿⣷⠀",
  "⣿⣿⠀",
  "⣿⣿⡀",
  "⣿⣿⡄",
  "⣿⣿⡆",
  "⣿⣿⡇",
  "⣿⣿⣇",
  "⣿⣿⣧",
  "⣿⣿⣷",
  "⣿⣿⣿",
  "⣿⣿⣿",
  "⠀⠀⠀",
] as const;

export const ColumnsSpinner = createAgentFrameSpinner(FRAMES, 60, "ColumnsSpinner");
