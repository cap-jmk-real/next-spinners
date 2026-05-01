"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["◴", "◷", "◶", "◵"] as const;

export const CircleQuartersSpinner = createAgentFrameSpinner(
  FRAMES,
  120,
  "CircleQuartersSpinner",
);
