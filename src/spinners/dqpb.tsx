"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["d", "q", "p", "b"] as const;

export const DqpbSpinner = createAgentFrameSpinner(FRAMES, 100, "DqpbSpinner");
