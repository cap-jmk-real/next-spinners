"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⊶", "⊷"] as const;

export const ToggleSpinner = createAgentFrameSpinner(FRAMES, 250, "ToggleSpinner");
