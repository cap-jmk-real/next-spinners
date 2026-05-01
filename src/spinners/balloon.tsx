"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = [".", "o", "O", "o", "."] as const;

export const BalloonSpinner = createAgentFrameSpinner(FRAMES, 120, "BalloonSpinner");
