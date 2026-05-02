"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["···", "•··", "·•·", "··•", "···"] as const;

export const PointSpinner = createAgentFrameSpinner(FRAMES, 200, "PointSpinner");
