"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠄",
  "⠆",
  "⠇",
  "⠋",
  "⠙",
  "⠸",
  "⠰",
  "⠠",
  "⠰",
  "⠸",
  "⠙",
  "⠋",
  "⠇",
  "⠆",
] as const;

export const Dots4Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots4Spinner");
