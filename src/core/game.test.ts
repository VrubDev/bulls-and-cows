import { describe, expect, it } from "vitest";
import { createDigitValidator } from "./game";

describe("createDigitValidator", () => {
  it("validates binary (base 2) digits correctly", () => {
    const isBinary = createDigitValidator(2);
    expect(isBinary("0")).toBe(true);
    expect(isBinary("1")).toBe(true);
    expect(isBinary("2")).toBe(false);
    expect(isBinary("a")).toBe(false);
  });

  it("validates octal (base 8) digits correctly", () => {
    const isOctal = createDigitValidator(8);
    expect(isOctal("0")).toBe(true);
    expect(isOctal("7")).toBe(true);
    expect(isOctal("8")).toBe(false);
  });

  it("validates decimal (base 10) digits correctly", () => {
    const isDecimal = createDigitValidator(10);
    expect(isDecimal("0")).toBe(true);
    expect(isDecimal("9")).toBe(true);
    expect(isDecimal("a")).toBe(false);
  });

  it("validates hexadecimal (base 16) digits case-insensitively", () => {
    const isHex = createDigitValidator(16);
    expect(isHex("0")).toBe(true);
    expect(isHex("9")).toBe(true);
    expect(isHex("a")).toBe(true);
    expect(isHex("f")).toBe(true);
    expect(isHex("A")).toBe(true);
    expect(isHex("F")).toBe(true);
    expect(isHex("g")).toBe(false);
    expect(isHex("G")).toBe(false);
  });

  it("rejects empty strings and multi-character strings", () => {
    const isDecimal = createDigitValidator(10);
    expect(isDecimal("")).toBe(false);
    expect(isDecimal("10")).toBe(false);
  });
});
