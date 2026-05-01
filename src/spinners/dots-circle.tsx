"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⢎⠀", "⠎⠁", "⠊⠑", "⠈⠱", "⠀⡱", "⢀⡰", "⢄⡠", "⢆⡀"] as const;

export const DotsCircleSpinner = createAgentFrameSpinner(FRAMES, 80, "DotsCircleSpinner");
