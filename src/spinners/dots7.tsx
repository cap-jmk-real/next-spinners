"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠈",
  "⠉",
  "⠋",
  "⠓",
  "⠒",
  "⠐",
  "⠐",
  "⠒",
  "⠖",
  "⠦",
  "⠤",
  "⠠",
  "⠠",
  "⠤",
  "⠦",
  "⠖",
  "⠒",
  "⠐",
  "⠐",
  "⠒",
  "⠓",
  "⠋",
  "⠉",
  "⠈",
] as const;

export const Dots7Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots7Spinner");
