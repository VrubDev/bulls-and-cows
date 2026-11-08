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

  const uniqueChars = new Set(guess.split(""));
  if (uniqueChars.size !== guess.length) {
    return false;
  }

  const isValidDigit = createDigitValidator(base);
  const chars = guess.split("");

  const allCharsValid = chars.every((char) => isValidDigit(char));
  if (!allCharsValid) {
    return false;
  }

  return true;
}

export function evaluateGuess(
  secret: string,
  guess: string
): { bulls: number; cows: number } {
  if (secret.length !== guess.length) {
    return { bulls: 0, cows: 0 };
  }
  return { bulls: -1, cows: -1 };
}
