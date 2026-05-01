"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["◐", "◓", "◑", "◒"] as const;

export const CircleHalvesSpinner = createAgentFrameSpinner(
  FRAMES,
  50,
  "CircleHalvesSpinner",
);
