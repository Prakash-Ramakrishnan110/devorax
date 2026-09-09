/**
 * Generates a secure random One-Time Password (OTP) consisting of digits.
 *
 * @param length - The length of the OTP (default: 6)
 * @returns A string containing the OTP
 *
 * @example
 * generateOTP(6) // "482910"
 */
export function generateOTP(length = 6): string {
  if (length <= 0) return '';
  const array = new Uint32Array(length);
  globalThis.crypto.getRandomValues(array);
  
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += (array[i]! % 10).toString();
  }
  return otp;
}

/**
 * Masks a secret string, leaving only a specified number of characters visible at the end.
 *
 * @param secret - The string to mask
 * @param visibleChars - Number of characters to leave visible at the end (default: 4)
 * @param maskChar - The character to use for masking (default: '*')
 * @returns The masked string
 *
 * @example
 * maskSecret("supersecretapikey1234", 4) // "*****************1234"
 * maskSecret("123", 4) // "***"
 */
export function maskSecret(secret: string, visibleChars = 4, maskChar = '*'): string {
  if (!secret) return '';
  if (visibleChars < 0) visibleChars = 0;
  if (secret.length <= visibleChars) return maskChar.repeat(secret.length);
  const maskedLength = secret.length - visibleChars;
  return maskChar.repeat(maskedLength) + secret.slice(-visibleChars);
}

/**
 * Generates a secure random token (hex encoded).
 * 
 * @param bytes - Number of random bytes to generate (default: 32)
 * @returns Hex encoded secure token
 * 
 * @example
 * generateSecureToken(16) // "a1b2c3d4..."
 */
export function generateSecureToken(bytes = 32): string {
  if (bytes <= 0) return '';
  const array = new Uint8Array(bytes);
  globalThis.crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Hashes a string using SHA-256. 
 * Note: Suitable for hashing data like emails or identifiers, NOT for passwords.
 * 
 * @param data - The string to hash
 * @returns A promise resolving to the hex encoded hash
 * 
 * @example
 * await hashData("user@example.com") // "..."
 */
export async function hashData(data: string): Promise<string> {
  const encoder = new TextEncoder();
  const dataBuffer = encoder.encode(data);
  const hashBuffer = await globalThis.crypto.subtle.digest('SHA-256', dataBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}
