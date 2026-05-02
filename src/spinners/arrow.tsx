"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["←", "↖", "↑", "↗", "→", "↘", "↓", "↙"] as const;

export const ArrowSpinner = createAgentFrameSpinner(FRAMES, 100, "ArrowSpinner");
