"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⠀", "⠄", "⠆", "⠦", "⠶", "⠷", "⠿", "⠷", "⠶", "⠦", "⠆", "⠄", "⠀"] as const;

export const ZenSpinner = createAgentFrameSpinner(FRAMES, 130, "ZenSpinner");
