"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["▏", "▎", "▍", "▌", "▋", "▊", "▉", "▊", "▋", "▌", "▍", "▎"] as const;

export const GrowHorizontalSpinner = createAgentFrameSpinner(
  FRAMES,
  120,
  "GrowHorizontalSpinner",
);
