import { describe, it, expect } from 'vitest';
import { validateVin, normalizeVin, computeCheckDigit, hasInvalidChars, getVinSegments } from '../shared/vin-validator';

describe('VIN Validator', () => {
  describe('normalizeVin', () => {
    it('trims and uppercases', () => {
      expect(normalizeVin('  1ftmw1t88mfa00001  ')).toBe('1FTMW1T88MFA00001');
    });
    it('strips internal spaces', () => {
      expect(normalizeVin('1FTM W1T8 8MFA 00001')).toBe('1FTMW1T88MFA00001');
    });
  });

  describe('hasInvalidChars', () => {
    it('rejects I, O, Q', () => {
      expect(hasInvalidChars('1FTMW1I88MFA00001').has).toBe(true);
      expect(hasInvalidChars('1FTMW1O88MFA00001').has).toBe(true);
      expect(hasInvalidChars('1FTMW1Q88MFA00001').has).toBe(true);
    });
    it('accepts valid VIN characters', () => {
      expect(hasInvalidChars('1FTMW1T88MFA00001').has).toBe(false);
    });
  });

  describe('computeCheckDigit', () => {
    it('computes correct check digit for known VINs', () => {
      // 1FTMW1T88MFA00001 - position 9 is '8'
      const result = computeCheckDigit('1FTMW1T88MFA00001');
      expect(result).toBe('8');
    });
    it('returns null for non-17 char VINs', () => {
      expect(computeCheckDigit('1FTMW1T8')).toBeNull();
    });
  });

  describe('validateVin', () => {
    it('validates a correct VIN (2021 Ford F-150)', () => {
      const result = validateVin('1FTMW1T88MFA00001');
      expect(result.isValid).toBe(true);
      expect(result.checkDigitValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('rejects VIN with I/O/Q characters', () => {
      const result = validateVin('1FTMW1I88MFA00001');
      expect(result.isValid).toBe(false);
      expect(result.errors[0]).toContain('VINs never contain');
    });

    it('warns about incorrect check digit', () => {
      // Change position 9 from '8' to '5' — should fail check digit
      const result = validateVin('1FTMW1T85MFA00001');
      expect(result.checkDigitValid).toBe(false);
      expect(result.warnings.length).toBeGreaterThan(0);
    });

    it('handles short VINs with warning', () => {
      const result = validateVin('ABC12345');
      expect(result.warnings.length).toBeGreaterThan(0);
      expect(result.checkDigitValid).toBeNull();
    });

    it('handles trailer VIN (1UYVS2530CP351020)', () => {
      const result = validateVin('1UYVS2530CP351020');
      // This VIN should pass basic validation (no I/O/Q, 17 chars)
      expect(result.normalized.length).toBe(17);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('getVinSegments', () => {
    it('returns 17 segments with correct segment types', () => {
      const segments = getVinSegments('1FTMW1T88MFA00001');
      expect(segments).toHaveLength(17);
      expect(segments[0].segment).toBe('wmi');
      expect(segments[2].segment).toBe('wmi');
      expect(segments[3].segment).toBe('descriptor');
      expect(segments[7].segment).toBe('descriptor');
      expect(segments[8].segment).toBe('check');
      expect(segments[9].segment).toBe('serial');
      expect(segments[16].segment).toBe('serial');
    });
  });
});
