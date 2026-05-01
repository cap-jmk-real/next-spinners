"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["☀️", "🌤", "⛅️", "🌥", "☁️", "🌧", "🌨", "⛈"] as const;

export const WeatherSpinner = createAgentFrameSpinner(FRAMES, 100, "WeatherSpinner");
