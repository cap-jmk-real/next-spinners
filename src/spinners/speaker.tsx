"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["🔈", "🔉", "🔊", "🔉"] as const;

export const SpeakerSpinner = createAgentFrameSpinner(FRAMES, 160, "SpeakerSpinner");
