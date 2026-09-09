import { describe, it, expect } from 'vitest';
import {
  formatINR,
  validatePAN,
  validateGSTIN,
  validateIndianPhone,
} from '../../src/india/index.js';

describe('India Module', () => {
  describe('formatINR', () => {
    it('formats numbers into Indian Rupees', () => {
      // Depending on Node environment, Intl.NumberFormat might use slightly different spacing.
      // We will normalize non-breaking spaces for testing
      const formatted = formatINR(125000).replace(/\s/g, '');
      expect(formatted).toMatch(/₹1,25,000\.00/);
    });
  });

  describe('validatePAN', () => {
    it('validates a correct PAN', () => {
      expect(validatePAN('ABCDE1234F')).toBe(true);
    });

    it('rejects an incorrect PAN format', () => {
      expect(validatePAN('12345ABCDE')).toBe(false); // numbers first
      expect(validatePAN('ABCDE1234')).toBe(false); // missing last letter
      expect(validatePAN('ABCDE12345')).toBe(false); // last char is number
      expect(validatePAN('abcde1234f')).toBe(false); // lowercase
    });
  });

  describe('validateGSTIN', () => {
    it('validates a correct GSTIN', () => {
      expect(validateGSTIN('22AAAAA0000A1Z5')).toBe(true);
      expect(validateGSTIN('07AAAAA1234A1Z1')).toBe(true);
    });

    it('rejects an incorrect GSTIN format', () => {
      expect(validateGSTIN('22AAAAA0000A1X5')).toBe(false); // missing 'Z'
      expect(validateGSTIN('AAAAA0000A1Z5')).toBe(false); // missing state code
      expect(validateGSTIN('22AAAAA0000A1Z')).toBe(false); // missing checksum
    });
  });

  describe('validateIndianPhone', () => {
    it('validates correct 10 digit Indian mobile numbers', () => {
      expect(validateIndianPhone('9876543210')).toBe(true);
      expect(validateIndianPhone('6123456789')).toBe(true);
    });

    it('handles prefixes and formatting correctly', () => {
      expect(validateIndianPhone('+919876543210')).toBe(true);
      expect(validateIndianPhone('+91 9876543210')).toBe(true);
      expect(validateIndianPhone('09876543210')).toBe(true);
      expect(validateIndianPhone('98765-43210')).toBe(true);
    });

    it('rejects invalid Indian mobile numbers', () => {
      expect(validateIndianPhone('5876543210')).toBe(false); // starts with 5
      expect(validateIndianPhone('987654321')).toBe(false); // 9 digits
      expect(validateIndianPhone('98765432101')).toBe(false); // 11 digits without prefix
      expect(validateIndianPhone('abcdefghij')).toBe(false); // not digits
    });
  });
});
