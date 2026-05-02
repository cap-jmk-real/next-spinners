"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [
  "⠉",
  "⠑",
  "⠘",
  "⠔",
  "⠒",
  "⠂",
  "⠄",
  "⡀",
  "⢀",
  "⠠",
  "⠐",
  "⠈",
  "⠃",
  "⠊",
  "⠙",
  "⠚",
  "⠒",
  "⠔",
  "⠘",
  "⠑",
] as const;

export const EchoSpinner = createAgentFrameSpinner(FRAMES, 85, "EchoSpinner");
