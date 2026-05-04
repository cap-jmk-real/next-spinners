import { describe, expect, it } from "vitest";
import {
  BounceSpinner,
  DotsSpinner,
  XPostQuadrantBrailleOrSpinner,
  createAgentFrameSpinner,
  createMixedFrameSpinner,
  mixFrameSources,
} from "./index";

describe("package entry", () => {
  it("exports frame-spinner factory and ported spinners", () => {
    expect(createAgentFrameSpinner).toBeTypeOf("function");
    expect(DotsSpinner).toBeTypeOf("function");
    expect(BounceSpinner).toBeTypeOf("function");
  });

  it("exports deterministic mixer + X-post pack spinner", () => {
    expect(mixFrameSources).toBeTypeOf("function");
    expect(createMixedFrameSpinner).toBeTypeOf("function");
    expect(XPostQuadrantBrailleOrSpinner).toBeTypeOf("function");
  });
});
