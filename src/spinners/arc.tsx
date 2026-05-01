"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["◜", "◠", "◝", "◞", "◡", "◟"] as const;

export const ArcSpinner = createAgentFrameSpinner(FRAMES, 100, "ArcSpinner");
