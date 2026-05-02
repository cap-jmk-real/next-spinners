"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
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
  "⠴",
  "⠲",
  "⠒",
  "⠂",
  "⠂",
  "⠒",
  "⠚",
  "⠙",
  "⠉",
  "⠁",
] as const;

export const Dots6Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots6Spinner");
