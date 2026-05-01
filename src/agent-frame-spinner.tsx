"use client";

import {
  useEffect,
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
  /** Foreground color. */
  color?: string;
  style?: CSSProperties;
  /**
   * Accessible name for the status region.
   * @defaultValue "Loading"
   */
  label?: string;
};

/**
 * Braille / ASCII frame spinner for web. Matches expo-agent-spinners timing and glyphs.
 * Must be used from a Client Component tree (uses interval + state).
 */
export function createAgentFrameSpinner(
  frames: readonly string[],
  intervalMs: number,
  displayName: string,
): ComponentType<AgentFrameSpinnerProps> {
  function FrameSpinner({
    size = 24,
    color = "#fff",
    style,
    label = "Loading",
    className = "",
    role = "status",
    ...rest
  }: AgentFrameSpinnerProps) {
    const [frame, setFrame] = useState(0);

    useEffect(() => {
      const id = setInterval(() => {
        setFrame((i) => (i + 1) % frames.length);
      }, intervalMs);
      return () => clearInterval(id);
    }, [frames.length, intervalMs]);

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
