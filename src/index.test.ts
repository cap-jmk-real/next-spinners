import { describe, expect, it } from "vitest";
import { BounceSpinner, DotsSpinner, createAgentFrameSpinner } from "./index";

describe("package entry", () => {
  it("exports frame-spinner factory and ported spinners", () => {
    expect(createAgentFrameSpinner).toBeTypeOf("function");
    expect(DotsSpinner).toBeTypeOf("function");
    expect(BounceSpinner).toBeTypeOf("function");
  });
});
