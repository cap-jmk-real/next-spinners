"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⢹", "⢺", "⢼", "⣸", "⣇", "⡧", "⡗", "⡏"] as const;

export const Dots9Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots9Spinner");
