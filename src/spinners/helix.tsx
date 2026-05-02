"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⢌⣉⢎⣉",
  "⣉⡱⣉⡱",
  "⣉⢎⣉⢎",
  "⡱⣉⡱⣉",
  "⢎⣉⢎⣉",
  "⣉⡱⣉⡱",
  "⣉⢎⣉⢎",
  "⡱⣉⡱⣉",
  "⢎⣉⢎⣉",
  "⣉⡱⣉⡱",
  "⣉⢎⣉⢎",
  "⡱⣉⡱⣉",
  "⢎⣉⢎⣉",
  "⣉⡱⣉⡱",
  "⣉⢎⣉⢎",
  "⡱⣉⡱⣉",
] as const;

export const HelixSpinner = createAgentFrameSpinner(FRAMES, 80, "HelixSpinner");
