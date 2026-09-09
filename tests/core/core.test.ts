import { describe, it, expect } from 'vitest';
import {
  isDefined,
  isObject,
  isString,
  pick,
  omit,
  chunk,
  unique,
  groupBy,
} from '../../src/core/index.js';

describe('Core Module', () => {
  describe('isDefined', () => {
    it('returns true for defined values', () => {
      expect(isDefined(0)).toBe(true);
      expect(isDefined('')).toBe(true);
      expect(isDefined(false)).toBe(true);
      expect(isDefined({})).toBe(true);
    });

    it('returns false for undefined or null', () => {
      expect(isDefined(undefined)).toBe(false);
      expect(isDefined(null)).toBe(false);
    });
  });

  describe('isObject', () => {
    it('returns true for plain objects', () => {
      expect(isObject({})).toBe(true);
      expect(isObject({ a: 1 })).toBe(true);
    });

    it('returns false for arrays, null, and primitives', () => {
      expect(isObject([])).toBe(false);
      expect(isObject(null)).toBe(false);
      expect(isObject('string')).toBe(false);
      expect(isObject(123)).toBe(false);
    });
  });

  describe('isString', () => {
    it('returns true for strings', () => {
      expect(isString('')).toBe(true);
      expect(isString('hello')).toBe(true);
    });

    it('returns false for non-strings', () => {
      expect(isString(123)).toBe(false);
      expect(isString(null)).toBe(false);
      expect(isString({})).toBe(false);
    });
  });

  describe('pick', () => {
    it('picks specified properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(pick(obj, ['a', 'c'])).toEqual({ a: 1, c: 3 });
    });

    it('ignores keys that do not exist', () => {
      const obj = { a: 1 };
      // @ts-expect-error Testing invalid key
      expect(pick(obj, ['b'])).toEqual({});
    });
  });

  describe('omit', () => {
    it('omits specified properties', () => {
      const obj = { a: 1, b: 2, c: 3 };
      expect(omit(obj, ['a', 'c'])).toEqual({ b: 2 });
    });
  });

  describe('chunk', () => {
    it('chunks an array into smaller arrays of specified size', () => {
      expect(chunk(['a', 'b', 'c', 'd'], 2)).toEqual([['a', 'b'], ['c', 'd']]);
      expect(chunk(['a', 'b', 'c', 'd', 'e'], 2)).toEqual([['a', 'b'], ['c', 'd'], ['e']]);
    });

    it('returns empty array if input array is empty or size < 1', () => {
      expect(chunk([], 2)).toEqual([]);
      expect(chunk([1, 2], 0)).toEqual([]);
    });
  });

  describe('unique', () => {
    it('returns array with unique values', () => {
      expect(unique([1, 2, 1, 3, 2])).toEqual([1, 2, 3]);
      expect(unique(['a', 'b', 'a'])).toEqual(['a', 'b']);
    });
  });

  describe('groupBy', () => {
    it('groups array elements by key returned from iteratee', () => {
      expect(groupBy([6.1, 4.2, 6.3], Math.floor)).toEqual({
        '4': [4.2],
        '6': [6.1, 6.3],
      });
    });

    it('works with objects', () => {
      const items = [
        { id: 1, category: 'A' },
        { id: 2, category: 'B' },
        { id: 3, category: 'A' },
      ];
      expect(groupBy(items, (item) => item.category)).toEqual({
        A: [
          { id: 1, category: 'A' },
          { id: 3, category: 'A' },
        ],
        B: [{ id: 2, category: 'B' }],
      });
    });
  });
});
