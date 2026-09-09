import { describe, it, expect } from 'vitest';
import {
  validateEmail,
  validateURL,
  isStrongPassword,
  validateRequired,
  isValidDate,
  isValidIP,
} from '../../src/validation/index.js';

describe('Validation Module', () => {
  describe('validateEmail', () => {
    it('returns true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('returns false for invalid emails', () => {
      expect(validateEmail('test@example')).toBe(false);
      expect(validateEmail('test.example.com')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateURL', () => {
    it('returns true for valid URLs', () => {
      expect(validateURL('https://example.com')).toBe(true);
      expect(validateURL('http://localhost:8080/path?query=1')).toBe(true);
    });

    it('returns false for invalid URLs', () => {
      expect(validateURL('example.com')).toBe(false); // missing protocol
      expect(validateURL('not a url')).toBe(false);
      expect(validateURL('')).toBe(false);
    });
  });

  describe('isStrongPassword', () => {
    it('returns true for strong passwords', () => {
      expect(isStrongPassword('StrongPass123')).toBe(true);
    });

    it('returns false if missing requirements', () => {
      expect(isStrongPassword('weak')).toBe(false); // too short, no upper/number
      expect(isStrongPassword('short1A')).toBe(false); // too short
      expect(isStrongPassword('nouppercase123')).toBe(false); // no upper
      expect(isStrongPassword('NOLOWERCASE123')).toBe(false); // no lower
      expect(isStrongPassword('NoNumbersHere')).toBe(false); // no number
    });
  });

  describe('validateRequired', () => {
    it('returns true for provided values', () => {
      expect(validateRequired('hello')).toBe(true);
      expect(validateRequired(123)).toBe(true);
      expect(validateRequired(true)).toBe(true);
      expect(validateRequired(false)).toBe(true); // false is provided
      expect(validateRequired([1, 2])).toBe(true);
      expect(validateRequired({ a: 1 })).toBe(true);
    });

    it('returns false for missing or empty values', () => {
      expect(validateRequired(null)).toBe(false);
      expect(validateRequired(undefined)).toBe(false);
      expect(validateRequired('')).toBe(false);
      expect(validateRequired('   ')).toBe(false);
      expect(validateRequired([])).toBe(false);
    });
  });

  describe('isValidDate', () => {
    it('returns true for valid date strings', () => {
      expect(isValidDate('2023-01-01')).toBe(true);
      expect(isValidDate('Jan 1 2023')).toBe(true);
      expect(isValidDate(new Date().toISOString())).toBe(true);
    });

    it('returns false for invalid date strings', () => {
      expect(isValidDate('not a date')).toBe(false);
      expect(isValidDate('')).toBe(false);
    });
  });

  describe('isValidIP', () => {
    it('returns true for valid IPv4 addresses', () => {
      expect(isValidIP('192.168.1.1')).toBe(true);
      expect(isValidIP('0.0.0.0')).toBe(true);
      expect(isValidIP('255.255.255.255')).toBe(true);
    });

    it('returns false for invalid IP addresses', () => {
      expect(isValidIP('256.1.2.3')).toBe(false); // out of range
      expect(isValidIP('1.2.3')).toBe(false); // too short
      expect(isValidIP('1.2.3.4.5')).toBe(false); // too long
      expect(isValidIP('not.an.ip.address')).toBe(false);
    });
  });
});
