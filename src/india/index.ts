/**
 * Formats a number as Indian Rupees (INR) using the Indian numbering system.
 * 
 * Note: This relies on the environment's Intl API.
 *
 * @param amount - The numerical amount to format
 * @returns A formatted INR currency string
 *
 * @example
 * formatINR(125000) // "₹1,25,000.00"
 */
export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Validates an Indian Permanent Account Number (PAN).
 * Format: 5 uppercase letters, 4 numbers, 1 uppercase letter.
 * 
 * Disclaimer: This provides formatting validation only, not legal verification.
 *
 * @param pan - The PAN string to validate
 * @returns True if the string is a validly formatted PAN
 *
 * @example
 * validatePAN("ABCDE1234F") // true
 */
export function validatePAN(pan: string): boolean {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(pan);
}

/**
 * Validates an Indian Goods and Services Tax Identification Number (GSTIN).
 * Format: 2 digits (State code), 10 char PAN, 1 digit/letter (entity code), 
 * 'Z' (default), 1 digit/letter (checksum).
 * 
 * Disclaimer: This provides formatting validation only, not legal verification.
 *
 * @param gstin - The GSTIN string to validate
 * @returns True if the string is a validly formatted GSTIN
 *
 * @example
 * validateGSTIN("22AAAAA0000A1Z5") // true
 */
export function validateGSTIN(gstin: string): boolean {
  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return gstinRegex.test(gstin);
}

/**
 * Validates an Indian mobile phone number.
 * Ensures the number is exactly 10 digits and starts with 6, 7, 8, or 9.
 * Handles common prefixes like +91 or 0, and strips spaces and hyphens.
 *
 * @param phone - The phone string to validate
 * @returns True if the string represents a valid Indian mobile number
 *
 * @example
 * validateIndianPhone("+91 9876543210") // true
 */
export function validateIndianPhone(phone: string): boolean {
  const cleanPhone = phone.replace(/^(?:\+?91|0)|\s|-/g, '');
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(cleanPhone);
}
