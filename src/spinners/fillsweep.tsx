"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⣀⣀",
  "⣤⣤",
  "⣶⣶",
  "⣿⣿",
  "⣿⣿",
  "⣿⣿",
  "⣶⣶",
  "⣤⣤",
  "⣀⣀",
  "⠀⠀",
  "⠀⠀",
] as const;

export const FillSweepSpinner = createAgentFrameSpinner(FRAMES, 100, "FillSweepSpinner");
