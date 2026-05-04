"use client";

import {
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type CSSProperties,
  type HTMLAttributes,
} from "react";

export type AgentFrameSpinnerProps = Omit<
  HTMLAttributes<HTMLSpanElement>,
  "color" | "style" | "children"
> & {
  /** Pixel font size (expo-agent-spinners default: 24). */
  size?: number;
  /**
   * Foreground color (maps to CSS `color`). Merged before `style`, so a color in
   * `style` wins — use `color="currentColor"` to inherit the parent text color,
   * or `style={{ color: "var(--your-token)" }}` for design tokens.
   * Ignored when `effect="dotmatrix"` (gradient fill is used instead).
   */
  color?: string;
  style?: CSSProperties;
  /**
   * Neon gradient text + glow inspired by [Dot Matrix](https://dotmatrix.zzzzshawn.cloud/).
   * Injects a one-time `@keyframes` stylesheet when first used.
   */
  effect?: "none" | "dotmatrix";
  /**
   * Accessible name for the status region.
   * @defaultValue "Loading"
   */
  label?: string;
  /** Milliseconds between frames; overrides factory default and wins over `durationMs`. */
  intervalMs?: number;
  /**
   * Milliseconds for one full loop (`interval ≈ durationMs / frame count`, rounded).
   * Ignored when `intervalMs` is set.
   */
  durationMs?: number;
};

/**
 * Braille / ASCII frame spinner for web. Matches expo-agent-spinners timing and glyphs.
 * Must be used from a Client Component tree (uses interval + state).
 */
export function createAgentFrameSpinner(
  frames: readonly string[],
  baseIntervalMs: number,
  displayName: string,
): ComponentType<AgentFrameSpinnerProps> {
  function FrameSpinner({
    size = 24,
    color = "#fff",
    style,
    effect = "none",
    label = "Loading",
    className = "",
    role = "status",
    intervalMs: intervalMsProp,
    durationMs,
    ...rest
  }: AgentFrameSpinnerProps) {
    const [frame, setFrame] = useState(0);

    const tickMs = useMemo(() => {
      if (intervalMsProp != null && Number.isFinite(intervalMsProp)) {
        return Math.max(1, Math.round(intervalMsProp));
      }
      if (
        durationMs != null &&
        Number.isFinite(durationMs) &&
        durationMs > 0 &&
        frames.length > 0
      ) {
        return Math.max(1, Math.round(durationMs / frames.length));
      }
      return baseIntervalMs;
    }, [intervalMsProp, durationMs, baseIntervalMs, frames.length]);

    useEffect(() => {
      const id = setInterval(() => {
        setFrame((i) => (i + 1) % frames.length);
      }, tickMs);
      return () => clearInterval(id);
    }, [frames.length, tickMs]);

    useEffect(() => {
      if (effect !== "dotmatrix") return;
      const id = "next-spinners-dotmatrix-kf";
      if (document.getElementById(id)) return;
      const el = document.createElement("style");
      el.id = id;
      el.textContent = `
@keyframes next-spinners-dm-gradient {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}
`;
      document.head.appendChild(el);
    }, [effect]);

    const dotmatrix: CSSProperties =
      effect === "dotmatrix"
        ? {
            backgroundImage:
              "linear-gradient(92deg, #22d3ee, #a78bfa, #f472b6, #4ade80, #22d3ee)",
            backgroundSize: "240% 100%",
            backgroundPosition: "0% 50%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 0 6px rgba(34, 211, 238, 0.45))",
            animation: "next-spinners-dm-gradient 2.6s linear infinite",
          }
        : {};

    const merged: CSSProperties = {
      fontSize: size,
      color,
      textAlign: "center",
      lineHeight: size * 1.3,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      /* Braille (U+2800…) and mixed Unicode often lack glyphs in pure monospace — symbols first. */
      fontFamily:
        '"Noto Sans Symbols 2", "Segoe UI Symbol", "Segoe UI Emoji", ui-monospace, SFMono-Regular, "Cascadia Code", monospace',
      ...dotmatrix,
      ...style,
    };

    return (
      <span
        className={className}
        style={merged}
        role={role}
        aria-live="polite"
        aria-label={label}
        {...rest}
      >
        {frames[frame]}
      </span>
    );
  }

  FrameSpinner.displayName = displayName;
  return FrameSpinner;
}
