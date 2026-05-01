"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["▁", "▃", "▄", "▅", "▆", "▇", "▆", "▅", "▄", "▃"] as const;

export const GrowVerticalSpinner = createAgentFrameSpinner(
  FRAMES,
  120,
  "GrowVerticalSpinner",
);
