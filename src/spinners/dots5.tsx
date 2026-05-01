"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠋",
  "⠙",
  "⠚",
  "⠒",
  "⠂",
  "⠂",
  "⠒",
  "⠲",
  "⠴",
  "⠦",
  "⠖",
  "⠒",
  "⠐",
  "⠐",
  "⠒",
  "⠓",
  "⠋",
] as const;

export const Dots5Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots5Spinner");
