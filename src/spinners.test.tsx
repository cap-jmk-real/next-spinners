import { render, screen } from "@testing-library/react";
import type { ComponentType } from "react";
import { describe, expect, it } from "vitest";
import * as Spinners from "./spinners";

const spinnerEntries = Object.entries(Spinners).filter(
  ([name, value]) => name.endsWith("Spinner") && typeof value === "function",
) as [string, ComponentType<{ label?: string }>][];

describe("expo-agent-spinners ports", () => {
  it("exports one component per spinner file", () => {
    expect(spinnerEntries.length).toBe(66);
  });

  it("smoke-renders every exported spinner (sequential unmount)", () => {
    for (const [componentName, Component] of spinnerEntries) {
      const { unmount } = render(<Component label="Working" />);
      expect(screen.getByRole("status", { name: "Working" })).toBeTruthy();
      expect(componentName.length).toBeGreaterThan(0);
      unmount();
    }
  });
});
