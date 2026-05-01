"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["◰", "◳", "◲", "◱"] as const;

export const SquareCornersSpinner = createAgentFrameSpinner(
  FRAMES,
  180,
  "SquareCornersSpinner",
);
