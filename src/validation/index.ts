/**
 * Basic email format validation.
 *
 * @param email - The email string to validate
 * @returns True if it looks like a valid email address
 */
export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validates whether a string is a valid URL.
 *
 * @param url - The URL string to validate
 * @returns True if the string is a valid URL
 */
export function validateURL(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * Checks if a password meets strong requirements:
 * At least 8 characters long, contains at least one uppercase letter,
 * one lowercase letter, and one number.
 *
 * @param password - The password string to validate
 * @returns True if the password is strong
 */
export function isStrongPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;
  return (
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password)
  );
}

/**
 * Checks if a value is provided (not null, undefined, empty string, or empty array).
 *
 * @param value - The value to check
 * @returns True if the value is present and not empty
 */
export function validateRequired(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

/**
 * Validates if a string can be parsed into a valid Date object.
 *
 * @param dateString - The date string to validate
 * @returns True if it is a valid date
 */
export function isValidDate(dateString: string): boolean {
  if (!dateString || typeof dateString !== 'string') return false;
  const d = new Date(dateString);
  return !isNaN(d.getTime());
}

/**
 * Validates if a string is a valid IPv4 address.
 *
 * @param ip - The IP address string to validate
 * @returns True if it is a valid IPv4 address
 */
export function isValidIP(ip: string): boolean {
  if (!ip || typeof ip !== 'string') return false;
  const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/;
  if (ipv4Regex.test(ip)) {
    return ip.split('.').every((part) => parseInt(part, 10) <= 255);
  }
  return false;
}
