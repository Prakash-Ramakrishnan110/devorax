import { describe, it, expect } from 'vitest';
import { generateOTP, maskSecret, generateSecureToken, hashData } from '../../src/security/index.js';

describe('Security Module', () => {
  describe('generateOTP', () => {
    it('generates an OTP of the specified length', () => {
      const otp = generateOTP(6);
      expect(otp).toHaveLength(6);
      expect(/^\d+$/.test(otp)).toBe(true);
    });

    it('defaults to 6 characters', () => {
      expect(generateOTP()).toHaveLength(6);
    });

    it('handles zero or negative length', () => {
      expect(generateOTP(0)).toBe('');
      expect(generateOTP(-5)).toBe('');
    });
  });

  describe('maskSecret', () => {
    it('masks a string leaving visible characters at the end', () => {
      expect(maskSecret('supersecret1234', 4)).toBe('***********1234');
      expect(maskSecret('123456789', 2)).toBe('*******89');
    });

    it('uses a custom mask character', () => {
      expect(maskSecret('secret123', 3, '#')).toBe('######123');
    });

    it('masks everything if visibleChars is 0', () => {
      expect(maskSecret('12345', 0)).toBe('*****');
    });

    it('masks everything if string length is less than or equal to visibleChars', () => {
      expect(maskSecret('123', 4)).toBe('***');
      expect(maskSecret('12', 2)).toBe('**');
    });

    it('handles empty strings', () => {
      expect(maskSecret('')).toBe('');
    });
  });

  describe('generateSecureToken', () => {
    it('generates a hex token of correct length', () => {
      // 32 bytes = 64 hex characters
      const token = generateSecureToken(32);
      expect(token).toHaveLength(64);
      expect(/^[0-9a-f]+$/.test(token)).toBe(true);
    });

    it('handles zero or negative length', () => {
      expect(generateSecureToken(0)).toBe('');
      expect(generateSecureToken(-10)).toBe('');
    });
  });

  describe('hashData', () => {
    it('generates a stable SHA-256 hash', async () => {
      const hash1 = await hashData('hello world');
      const hash2 = await hashData('hello world');
      
      expect(hash1).toBe(hash2);
      expect(hash1).toHaveLength(64); // SHA-256 is 32 bytes = 64 hex chars
    });
    
    it('generates different hashes for different data', async () => {
      const hash1 = await hashData('data1');
      const hash2 = await hashData('data2');
      expect(hash1).not.toBe(hash2);
    });
  });
});
