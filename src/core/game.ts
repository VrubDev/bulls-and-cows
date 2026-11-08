export type Base = 2 | 8 | 10 | 16;

const ALPHABET = "0123456789abcdef";

export function createDigitValidator(base: Base) {
  return function (char: string): boolean {
    if (char.length !== 1) {
      return false;
    }
    const validDigits = ALPHABET.slice(0, base);
    return validDigits.includes(char.toLocaleLowerCase());
  };
}

export function isValidGuess(
  guess: string,
  length: number,
  base: Base
): boolean {
  if (guess.length !== length) {
    return false;
  }

  if (base < 2) {
    return false;
  }

  return true;
}
