"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠖⠉⠉⠑",
  "⡠⠖⠉⠉",
  "⣠⡠⠖⠉",
  "⣄⣠⡠⠖",
  "⠢⣄⣠⡠",
  "⠙⠢⣄⣠",
  "⠉⠙⠢⣄",
  "⠊⠉⠙⠢",
  "⠜⠊⠉⠙",
  "⡤⠜⠊⠉",
  "⣀⡤⠜⠊",
  "⢤⣀⡤⠜",
  "⠣⢤⣀⡤",
  "⠑⠣⢤⣀",
  "⠉⠑⠣⢤",
  "⠋⠉⠑⠣",
] as const;

export const WaveRowsSpinner = createAgentFrameSpinner(FRAMES, 90, "WaveRowsSpinner");
