import { describe, expect, it } from "vitest";
import * as entry from "./index";

describe("package entry", () => {
  it("exports NextSpinner", () => {
    expect(entry.NextSpinner).toBeTypeOf("function");
  });
});
