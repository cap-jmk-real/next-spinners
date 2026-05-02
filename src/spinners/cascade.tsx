"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠀⠀⠀⠀",
  "⠀⠀⠀⠀",
  "⠁⠀⠀⠀",
  "⠋⠀⠀⠀",
  "⠞⠁⠀⠀",
  "⡴⠋⠀⠀",
  "⣠⠞⠁⠀",
  "⢀⡴⠋⠀",
  "⠀⣠⠞⠁",
  "⠀⢀⡴⠋",
  "⠀⠀⣠⠞",
  "⠀⠀⢀⡴",
  "⠀⠀⠀⣠",
  "⠀⠀⠀⢀",
] as const;

export const CascadeSpinner = createAgentFrameSpinner(FRAMES, 60, "CascadeSpinner");
