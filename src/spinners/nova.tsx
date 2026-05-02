"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠀",
  "⠄",
  "⠆",
  "⠖",
  "⠶",
  "⠷",
  "⠿",
  "⡿",
  "⣿",
  "⡿",
  "⠿",
  "⠷",
  "⠶",
  "⠖",
  "⠆",
  "⠄",
] as const;

export const NovaSpinner = createAgentFrameSpinner(FRAMES, 85, "NovaSpinner");
