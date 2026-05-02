"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⣾", "⣽", "⣻", "⢿", "⡿", "⣟", "⣯", "⣷"] as const;

export const Dots2Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots2Spinner");
