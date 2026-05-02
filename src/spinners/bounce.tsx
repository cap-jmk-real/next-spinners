"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⠁", "⠂", "⠄", "⡀", "⠄", "⠂"] as const;

export const BounceSpinner = createAgentFrameSpinner(FRAMES, 120, "BounceSpinner");
