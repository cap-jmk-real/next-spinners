import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NextSpinner } from "./NextSpinner";

describe("NextSpinner", () => {
  it("exposes a polite status region with a default label", () => {
    render(<NextSpinner />);
    const el = screen.getByRole("status", { name: "Loading" });
    expect(el).toBeTruthy();
    expect(el.getAttribute("aria-live")).toBe("polite");
  });

  it("supports custom accessible names", () => {
    render(<NextSpinner label="Saving project" />);
    expect(screen.getByRole("status", { name: "Saving project" })).toBeTruthy();
  });

  it("renders optional caption text", () => {
    render(<NextSpinner>Please wait…</NextSpinner>);
    expect(screen.getByText("Please wait…")).toBeTruthy();
  });

  it("supports dots and bars variants", () => {
    const { rerender, container } = render(<NextSpinner variant="dots" />);
    expect(container.querySelector(".nsk--dots")).toBeTruthy();

    rerender(<NextSpinner variant="bars" />);
    expect(container.querySelector(".nsk--bars")).toBeTruthy();
  });

  it("renders the ring variant by default", () => {
    const { container } = render(<NextSpinner />);
    expect(container.querySelector(".nsk--ring")).toBeTruthy();
    expect(container.querySelector(".nsk__ring")).toBeTruthy();
  });

  it("applies size classes", () => {
    const { rerender, container } = render(<NextSpinner size="sm" />);
    expect(container.firstChild).toBeTruthy();
    expect((container.firstChild as HTMLElement).className).toContain("nsk--sm");

    rerender(<NextSpinner size="lg" />);
    expect((container.firstChild as HTMLElement).className).toContain("nsk--lg");
  });

  it("merges className and forwards extra attributes", () => {
    render(<NextSpinner className="extra" data-testid="spinner" role="presentation" />);
    const el = screen.getByTestId("spinner");
    expect(el.className).toContain("extra");
    expect(el.className).toContain("nsk");
    expect(el.getAttribute("role")).toBe("presentation");
  });
});
