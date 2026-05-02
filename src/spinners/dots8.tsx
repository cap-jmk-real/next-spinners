"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠁",
  "⠁",
  "⠉",
  "⠙",
  "⠚",
  "⠒",
  "⠂",
  "⠂",
  "⠒",
  "⠲",
  "⠴",
  "⠤",
  "⠄",
  "⠄",
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
  "⠈",
] as const;

export const Dots8Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots8Spinner");
