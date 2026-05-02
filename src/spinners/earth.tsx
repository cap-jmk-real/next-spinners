"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["🌍", "🌎", "🌏"] as const;

export const EarthSpinner = createAgentFrameSpinner(FRAMES, 180, "EarthSpinner");
