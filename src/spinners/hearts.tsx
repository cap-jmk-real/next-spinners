"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "🩷",
  "🧡",
  "💛",
  "💚",
  "💙",
  "🩵",
  "💜",
  "🤎",
  "🖤",
  "🩶",
  "🤍",
] as const;

export const HeartsSpinner = createAgentFrameSpinner(FRAMES, 120, "HeartsSpinner");
