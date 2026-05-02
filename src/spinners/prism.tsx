"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⢠⡄", "⣰⡆", "⣴⡇", "⣶⡇", "⣷⡿", "⣿⣿", "⣷⡿", "⣶⡇", "⣴⡇", "⣰⡆"] as const;

export const PrismSpinner = createAgentFrameSpinner(FRAMES, 100, "PrismSpinner");
