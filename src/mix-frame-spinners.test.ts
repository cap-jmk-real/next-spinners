import { describe, expect, it } from "vitest";

import { mixFrameSources } from "./mix-frame-spinners";

const A = ["⠁", "⠂"] as const;
const B = ["⠄", "⡀"] as const;

function orBraille(a: string, b: string) {
  const base = 0x28_00;
  return String.fromCodePoint(
    base + ((a.codePointAt(0)! - base) | (b.codePointAt(0)! - base)),
  );
}

describe("mixFrameSources", () => {
  it("braille-or: ORs dot masks each tick (two sources)", () => {
    const out = mixFrameSources([A, B], { type: "braille-or", maxPeriod: 10 });
    expect(out.length).toBe(2);
    expect(out[0]).toBe(orBraille(A[0], B[0]));
    expect(out[1]).toBe(orBraille(A[1], B[1]));
  });

  it("braille-or: caps period with maxPeriod", () => {
    const long = Array.from({ length: 11 }, (_, i) =>
      String.fromCodePoint(0x28_00 + (i % 8)),
    ) as readonly string[];
    const out = mixFrameSources([long, A], {
      type: "braille-or",
      maxPeriod: 5,
    });
    expect(out.length).toBe(5);
  });

  it("braille-or: rejects non-Braille frames", () => {
    expect(() => mixFrameSources([["x"], ["⠁"]], { type: "braille-or" })).toThrow(
      /Braille/,
    );
  });

  it("carousel: concatenates full cycles in order", () => {
    const out = mixFrameSources([A, B], { type: "carousel", repeat: 1 });
    expect(out).toEqual(["⠁", "⠂", "⠄", "⡀"]);
  });

  it("carousel: repeat stacks the same concat", () => {
    const out = mixFrameSources([A, B], { type: "carousel", repeat: 2 });
    expect(out).toEqual(["⠁", "⠂", "⠄", "⡀", "⠁", "⠂", "⠄", "⡀"]);
  });

  it("scan-round-robin: length = maxLen * sourceCount", () => {
    const s1 = ["a", "b", "c"] as const;
    const s2 = ["1", "2"] as const;
    const out = mixFrameSources([s1, s2], { type: "scan-round-robin" });
    expect(out).toEqual(["a", "1", "b", "2", "c", "1"]);
  });

  it("throws on fewer than two sources", () => {
    expect(() => mixFrameSources([A], { type: "carousel" })).toThrow(/2 and 4/);
  });

  it("throws on more than four sources", () => {
    expect(() => mixFrameSources([A, B, A, B, A], { type: "carousel" })).toThrow(
      /2 and 4/,
    );
  });
});
