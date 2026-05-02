"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⡇", "⣇", "⣧", "⣷", "⣿", "⢿", "⡿", "⣟", "⣯", "⣷", "⣧", "⣇"] as const;

export const FlowSpinner = createAgentFrameSpinner(FRAMES, 90, "FlowSpinner");
