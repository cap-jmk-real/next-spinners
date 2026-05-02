"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [".  ", ".. ", "...", " ..", "  .", "   "] as const;

export const SimpleDotsScrollingSpinner = createAgentFrameSpinner(
  FRAMES,
  200,
  "SimpleDotsScrollingSpinner",
);
