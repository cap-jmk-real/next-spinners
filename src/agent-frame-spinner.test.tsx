import { act, render, screen } from "@testing-library/react";
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
});
