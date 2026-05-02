"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [".  ", ".. ", "...", "   "] as const;

export const SimpleDotsSpinner = createAgentFrameSpinner(
  FRAMES,
  400,
  "SimpleDotsSpinner",
);
