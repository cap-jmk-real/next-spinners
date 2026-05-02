"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["/", "-", "\\", "|", "\\", "-"] as const;

export const RollingLineSpinner = createAgentFrameSpinner(
  FRAMES,
  80,
  "RollingLineSpinner",
);
