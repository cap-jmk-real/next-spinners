"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠿",
  "⠛",
  "⠟",
  "⠯",
  "⠷",
  "⠾",
  "⡿",
  "⢿",
  "⠄",
  "⠆",
  "⠠",
  "⠡",
  "⠑",
  "⠘",
  "⠸",
  "⠼",
  "⣀",
  "⣤",
  "⣶",
  "⣿",
  "⢿",
  "⠿",
  "⠻",
  "⠽",
] as const;

export const RandomSpinner = createAgentFrameSpinner(FRAMES, 75, "RandomSpinner");
