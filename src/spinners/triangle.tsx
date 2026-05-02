"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["◢", "◣", "◤", "◥"] as const;

export const TriangleSpinner = createAgentFrameSpinner(FRAMES, 50, "TriangleSpinner");
