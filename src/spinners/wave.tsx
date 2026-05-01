"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⠁⠂⠄⡀", "⠂⠄⡀⢀", "⠄⡀⢀⠠", "⡀⢀⠠⠐", "⢀⠠⠐⠈", "⠠⠐⠈⠁", "⠐⠈⠁⠂", "⠈⠁⠂⠄"] as const;

export const WaveSpinner = createAgentFrameSpinner(FRAMES, 100, "WaveSpinner");
