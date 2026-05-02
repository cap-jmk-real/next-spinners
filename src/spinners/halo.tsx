"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠎",
  "⠜",
  "⠖",
  "⠦",
  "⠴",
  "⠲",
  "⠐",
  "⠈",
  "⠁",
  "⠂",
  "⠄",
  "⡀",
  "⢀",
  "⠠",
  "⠐",
  "⠒",
] as const;

export const HaloSpinner = createAgentFrameSpinner(FRAMES, 95, "HaloSpinner");
