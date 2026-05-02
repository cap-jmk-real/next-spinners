import { act, cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createAgentFrameSpinner } from "./agent-frame-spinner";

const TinySpinner = createAgentFrameSpinner(["x", "y", "z"], 500, "TinySpinner");

describe("createAgentFrameSpinner", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
    cleanup();
  });

  it("advances frames on each interval tick", () => {
    render(<TinySpinner label="Busy" />);
    expect(screen.getByRole("status", { name: "Busy" }).textContent).toBe("x");

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByRole("status", { name: "Busy" }).textContent).toBe("y");

    act(() => {
      vi.advanceTimersByTime(500);
    });
    expect(screen.getByRole("status", { name: "Busy" }).textContent).toBe("z");
  });

  it("clears the interval on unmount", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = render(<TinySpinner />);
    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });

  it("allows overriding role while keeping the accessible name", () => {
    render(<TinySpinner label="L" role="img" />);
    expect(screen.getByRole("img", { name: "L" })).toBeTruthy();
  });

  it("uses durationMs to derive per-frame interval", () => {
    render(<TinySpinner label="Duration test" durationMs={900} />);
    expect(screen.getByRole("status", { name: "Duration test" }).textContent).toBe("x");

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("status", { name: "Duration test" }).textContent).toBe("y");

    act(() => {
      vi.advanceTimersByTime(300);
    });
    expect(screen.getByRole("status", { name: "Duration test" }).textContent).toBe("z");
  });

  it("prefers intervalMs prop over durationMs and factory default", () => {
    render(<TinySpinner label="Interval prefer" durationMs={900} intervalMs={100} />);

    act(() => {
      vi.advanceTimersByTime(100);
    });
    expect(screen.getByRole("status", { name: "Interval prefer" }).textContent).toBe("y");
  });
});
