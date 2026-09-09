/**
 * Checks if a value is defined (not null and not undefined).
 *
 * @param val - The value to check
 * @returns True if the value is defined
 *
 * @example
 * isDefined("hello") // true
 * isDefined(null) // false
 */
export function isDefined<T>(val: T | undefined | null): val is T {
  return val !== undefined && val !== null;
}

/**
 * Checks if a value is a plain object (and not an array or null).
 *
 * @param val - The value to check
 * @returns True if the value is a plain object
 *
 * @example
 * isObject({ a: 1 }) // true
 * isObject([1, 2]) // false
 * isObject(null) // false
 */
export function isObject(val: unknown): val is Record<string, unknown> {
  return typeof val === 'object' && val !== null && !Array.isArray(val);
}

/**
 * Checks if a value is a string.
 *
 * @param val - The value to check
 * @returns True if the value is a string
 *
 * @example
 * isString("hello") // true
 * isString(123) // false
 */
export function isString(val: unknown): val is string {
  return typeof val === 'string';
}

/**
 * Creates an object composed of the picked object properties.
 *
 * @param obj - The source object
 * @param keys - The property paths to pick
 * @returns The new object
 *
 * @example
 * pick({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { a: 1, c: 3 }
 */
export function pick<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Pick<T, K> {
  const result = {} as Pick<T, K>;
  for (const key of keys) {
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}

/**
 * Creates an object composed of the properties that are not omitted.
 *
 * @param obj - The source object
 * @param keys - The property paths to omit
 * @returns The new object
 *
 * @example
 * omit({ a: 1, b: 2, c: 3 }, ['a', 'c']) // { b: 2 }
 */
export function omit<T extends Record<string, any>, K extends keyof T>(
  obj: T,
  keys: readonly K[],
): Omit<T, K> {
  const result = { ...obj };
  for (const key of keys) {
    delete result[key];
  }
  return result;
}

/**
 * Creates an array of elements split into groups the length of size.
 *
 * @param array - The array to process
 * @param size - The length of each chunk
 * @returns Returns the new array of chunks
 *
 * @example
 * chunk(['a', 'b', 'c', 'd'], 2) // [['a', 'b'], ['c', 'd']]
 */
export function chunk<T>(array: readonly T[], size: number): T[][] {
  if (!array.length || size < 1) {
    return [];
  }
  const result: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

/**
 * Creates a duplicate-free version of an array.
 *
 * @param array - The array to inspect
 * @returns Returns the new duplicate free array
 *
 * @example
 * unique([1, 2, 1, 3, 2]) // [1, 2, 3]
 */
export function unique<T>(array: readonly T[]): T[] {
  return Array.from(new Set(array));
}

/**
 * Creates an object composed of keys generated from the results of running each element of collection thru getKey.
 *
 * @param array - The array to iterate over
 * @param getKey - The function to extract the key
 * @returns Returns the composed aggregate object
 *
 * @example
 * groupBy([6.1, 4.2, 6.3], Math.floor) // { '4': [4.2], '6': [6.1, 6.3] }
 */
export function groupBy<T, K extends PropertyKey>(
  array: readonly T[],
  getKey: (item: T) => K,
): Record<K, T[]> {
  const result = {} as Record<K, T[]>;
  for (const item of array) {
    const key = getKey(item);
    if (!result[key]) {
      result[key] = [];
    }
    result[key].push(item);
  }
  return result;
}
