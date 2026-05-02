"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
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

export const SandSpinner = createAgentFrameSpinner(FRAMES, 80, "SandSpinner");
