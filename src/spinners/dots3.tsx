"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⠋", "⠙", "⠚", "⠞", "⠖", "⠦", "⠴", "⠲", "⠳", "⠓"] as const;

export const Dots3Spinner = createAgentFrameSpinner(FRAMES, 80, "Dots3Spinner");
