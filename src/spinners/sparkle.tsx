"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ["⡡⠊⢔⠡", "⠊⡰⡡⡘", "⢔⢅⠈⢢", "⡁⢂⠆⡍", "⢔⠨⢑⢐", "⠨⡑⡠⠊"] as const;

export const SparkleSpinner = createAgentFrameSpinner(FRAMES, 150, "SparkleSpinner");
