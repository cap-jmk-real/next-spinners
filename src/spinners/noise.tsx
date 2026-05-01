"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["▓", "▒", "░", " ", "░", "▒"] as const;

export const NoiseSpinner = createAgentFrameSpinner(FRAMES, 100, "NoiseSpinner");
