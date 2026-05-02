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
   */
  color?: string;
  style?: CSSProperties;
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

    const merged: CSSProperties = {
      fontSize: size,
      color,
      textAlign: "center",
      lineHeight: size * 1.3,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily:
        'ui-monospace, SFMono-Regular, "Cascadia Code", "Segoe UI Mono", monospace',
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
