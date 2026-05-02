"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"] as const;

export const MoonSpinner = createAgentFrameSpinner(FRAMES, 80, "MoonSpinner");
