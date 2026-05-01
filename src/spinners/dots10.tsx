"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⢄", "⢂", "⢁", "⡁", "⡈", "⡐", "⡠"] as const;

export const Dots10Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots10Spinner");
