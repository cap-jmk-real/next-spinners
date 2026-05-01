"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⣼", "⣹", "⢻", "⠿", "⡟", "⣏", "⣧", "⣶"] as const;

export const Dots13Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots13Spinner");
