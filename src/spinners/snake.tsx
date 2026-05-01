"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⣁⡀",
  "⣉⠀",
  "⡉⠁",
  "⠉⠉",
  "⠈⠙",
  "⠀⠛",
  "⠐⠚",
  "⠒⠒",
  "⠖⠂",
  "⠶⠀",
  "⠦⠄",
  "⠤⠤",
  "⠠⢤",
  "⠀⣤",
  "⢀⣠",
  "⣀⣀",
] as const;

export const SnakeSpinner = createAgentFrameSpinner(FRAMES, 80, "SnakeSpinner");
