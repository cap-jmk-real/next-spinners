"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⢁⠂⠔⠈",
  "⠂⠌⡠⠐",
  "⠄⡐⢀⠡",
  "⡈⠠⠀⢂",
  "⠐⢀⠁⠄",
  "⠠⠁⠊⡀",
  "⢁⠂⠔⠈",
  "⠂⠌⡠⠐",
  "⠄⡐⢀⠡",
  "⡈⠠⠀⢂",
  "⠐⢀⠁⠄",
  "⠠⠁⠊⡀",
] as const;

export const RainSpinner = createAgentFrameSpinner(FRAMES, 100, "RainSpinner");
