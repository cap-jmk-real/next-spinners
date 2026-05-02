"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⢕⢕⢕", "⡪⡪⡪", "⢊⠔⡡", "⡡⢊⠔"] as const;

export const CheckerboardSpinner = createAgentFrameSpinner(
  FRAMES,
  250,
  "CheckerboardSpinner",
);
