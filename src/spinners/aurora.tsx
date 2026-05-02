"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠁⠂⠄",
  "⠂⠄⡀",
  "⠄⡀⢀",
  "⡀⢀⠠",
  "⢀⠠⠐",
  "⠠⠐⠈",
  "⠐⠈⠁",
  "⠈⠁⠂",
  "⠁⠂⠄",
  "⠂⠄⡀",
  "⠄⡀⢀",
  "⡀⢀⠠",
] as const;

export const AuroraSpinner = createAgentFrameSpinner(FRAMES, 95, "AuroraSpinner");
