"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⠁", "⠂", "⠄", "⡀", "⢀", "⠠", "⠐", "⠈"] as const;

export const Dots11Spinner = createAgentFrameSpinner(FRAMES, 100, "Dots11Spinner");
