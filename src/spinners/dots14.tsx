"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠉⠉",
  "⠈⠙",
  "⠀⠹",
  "⠀⢸",
  "⠀⣰",
  "⢀⣠",
  "⣀⣀",
  "⣄⡀",
  "⣆⠀",
  "⡇⠀",
  "⠏⠀",
  "⠋⠁",
] as const;

export const Dots14Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots14Spinner");
