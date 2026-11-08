import { describe, expect, it } from "vitest";
import { createDigitValidator } from "./game";
import { isValidGuess } from "./game";
import { evaluateGuess } from "./game";
import { generateSecret } from "./game";

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

describe("isValidGuess", () => {
  it("returns true for a completely valid guess", () => {
    expect(isValidGuess("1234", 4, 10)).toBe(true);
  });

  it("returns false if the length is incorrect", () => {
    expect(isValidGuess("123", 4, 10)).toBe(false);
    expect(isValidGuess("12345", 4, 10)).toBe(false);
  });

  it("returns false if it contains invalid characters for the base", () => {
    expect(isValidGuess("123a", 4, 10)).toBe(false);
  });

  it("returns false if characters are not unique", () => {
    expect(isValidGuess("1123", 4, 10)).toBe(false);
  });
});

describe("evaluateGuess", () => {
  it("returns all bulls for an exact match", () => {
    expect(evaluateGuess("1234", "1234")).toEqual({ bulls: 4, cows: 0 });
  });

  it("returns all cows if all characters are correct but in wrong positions", () => {
    expect(evaluateGuess("1234", "4321")).toEqual({ bulls: 0, cows: 4 });
  });

  it("returns correct mix of bulls and cows", () => {
    expect(evaluateGuess("1234", "1524")).toEqual({ bulls: 2, cows: 1 });
  });

  it("returns zeros if there are no matching characters", () => {
    expect(evaluateGuess("1234", "5678")).toEqual({ bulls: 0, cows: 0 });
  });
});

describe("generateSecret", () => {
  it("returns a string of the correct length", () => {
    const secret = generateSecret(4, 10);
    expect(secret.length).toBe(4);
  });

  it("returns only unique characters", () => {
    const secret = generateSecret(4, 10);
    const uniqueChars = new Set(secret.split(""));
    expect(uniqueChars.size).toBe(secret.length);
  });

  it("only uses valid characters for the given base", () => {
    const secret = generateSecret(4, 16);
    const isValidDigit = createDigitValidator(16);

    const allValid = secret.split("").every((char) => isValidDigit(char));
    expect(allValid).toBe(true);
  });
});
