import { describe, expect, it } from "vitest";
import { convert, formatPercent, formatSigned, unitLabel } from "./format";

describe("format helpers", () => {
  it("converts rial to toman only for rial-priced items", () => {
    expect(convert(2_689_000, "rial", "toman")).toBe(268_900);
    expect(convert(2_689_000, "rial", "rial")).toBe(2_689_000);
    expect(convert(4134.49, "usd", "toman")).toBe(4134.49);
  });

  it("labels units", () => {
    expect(unitLabel("rial", "toman")).toBe("تومان");
    expect(unitLabel("usd", "toman")).toBe("دلار");
  });

  it("formats signed values with Persian digits", () => {
    expect(formatPercent(1.77)).toBe("+۱٫۷۷٪");
    expect(formatPercent(-0.5)).toBe("−۰٫۵٪");
    expect(formatPercent(0)).toBe("۰٪");
    expect(formatSigned(-1200, "rial")).toBe("−۱٬۲۰۰");
  });
});
