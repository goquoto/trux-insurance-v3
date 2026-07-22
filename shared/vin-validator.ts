/**
 * VIN Validator — ISO 3779 check digit verification
 * Pure functions, no network calls. Unit-testable.
 */

// Transliteration map: letter → numeric value
const TRANSLITERATION: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8,
  J: 1, K: 2, L: 3, M: 4, N: 5, P: 7, R: 9,
  S: 2, T: 3, U: 4, V: 5, W: 6, X: 7, Y: 8, Z: 9,
};

// Position weights (positions 1–17)
const WEIGHTS = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2];

export interface VinValidationResult {
  normalized: string;
  isValid: boolean;
  errors: string[];
  warnings: string[];
  checkDigitValid: boolean | null; // null if can't compute (length ≠ 17)
}

/**
 * Normalize a VIN: trim whitespace, strip internal spaces, uppercase
 */
export function normalizeVin(raw: string): string {
  return raw.trim().replace(/\s+/g, '').toUpperCase();
}

/**
 * Check if VIN contains invalid characters (I, O, Q)
 */
export function hasInvalidChars(vin: string): { has: boolean; chars: string[] } {
  const invalid: string[] = [];
  if (vin.includes('I')) invalid.push('I');
  if (vin.includes('O')) invalid.push('O');
  if (vin.includes('Q')) invalid.push('Q');
  return { has: invalid.length > 0, chars: invalid };
}

/**
 * Compute the ISO 3779 check digit for a 17-character VIN
 * Returns the expected check digit character ('0'-'9' or 'X')
 */
export function computeCheckDigit(vin: string): string | null {
  if (vin.length !== 17) return null;

  let sum = 0;
  for (let i = 0; i < 17; i++) {
    const char = vin[i];
    let value: number;

    if (/[0-9]/.test(char)) {
      value = parseInt(char, 10);
    } else if (TRANSLITERATION[char] !== undefined) {
      value = TRANSLITERATION[char];
    } else {
      return null; // invalid character
    }

    sum += value * WEIGHTS[i];
  }

  const remainder = sum % 11;
  return remainder === 10 ? 'X' : String(remainder);
}

/**
 * Full VIN validation
 */
export function validateVin(raw: string): VinValidationResult {
  const normalized = normalizeVin(raw);
  const errors: string[] = [];
  const warnings: string[] = [];
  let checkDigitValid: boolean | null = null;

  // Check for I, O, Q — hard reject, never send to network
  const { has: hasIOQ, chars } = hasInvalidChars(normalized);
  if (hasIOQ) {
    errors.push(
      `VINs never contain ${chars.join(', ')} — check for 1s and 0s`
    );
    return { normalized, isValid: false, errors, warnings, checkDigitValid: false };
  }

  // Check length
  if (normalized.length !== 17) {
    if (normalized.length > 0 && normalized.length < 17) {
      warnings.push(`VIN is ${normalized.length} characters — standard VINs are 17 characters`);
      if (normalized.length < 11) {
        warnings.push('This may be a pre-1981 VIN (shorter format is acceptable)');
      }
    } else if (normalized.length > 17) {
      errors.push(`VIN is ${normalized.length} characters — maximum is 17`);
    }
    checkDigitValid = null;
  } else {
    // Compute check digit (position 9)
    const expected = computeCheckDigit(normalized);
    if (expected !== null) {
      checkDigitValid = normalized[8] === expected;
      if (!checkDigitValid) {
        warnings.push(`Check digit mismatch: position 9 is "${normalized[8]}", expected "${expected}"`);
      }
    }
  }

  // Check for non-alphanumeric characters
  if (/[^A-Z0-9]/.test(normalized)) {
    errors.push('VIN contains invalid characters — only letters and numbers are allowed');
  }

  const isValid = errors.length === 0 && (checkDigitValid === true || checkDigitValid === null);

  return { normalized, isValid, errors, warnings, checkDigitValid };
}

/**
 * Get VIN segment info for the colored strip display
 */
export function getVinSegments(vin: string) {
  const chars = vin.padEnd(17, ' ').split('');
  return chars.map((char, i) => {
    let segment: 'wmi' | 'descriptor' | 'check' | 'serial';
    if (i < 3) segment = 'wmi';
    else if (i < 8) segment = 'descriptor';
    else if (i === 8) segment = 'check';
    else segment = 'serial';
    return { char: char.trim() ? char : '', position: i + 1, segment };
  });
}
