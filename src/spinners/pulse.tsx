"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⠀⠶⠀", "⠰⣿⠆", "⢾⣉⡷", "⣏⠀⣹", "⡁⠀⢈"] as const;

export const PulseSpinner = createAgentFrameSpinner(FRAMES, 180, "PulseSpinner");
