import { describe, it, expect } from 'vitest';
import {
  createApiResponse,
  createApiError,
  createPaginationMeta,
  parsePagination,
} from '../../src/api/index.js';

describe('API Module', () => {
  describe('createApiResponse', () => {
    it('creates a standard success response', () => {
      const response = createApiResponse({ id: 1 });
      expect(response).toEqual({
        success: true,
        data: { id: 1 },
      });
    });

    it('includes meta if provided', () => {
      const response = createApiResponse({ id: 1 }, { timestamp: 123 });
      expect(response).toEqual({
        success: true,
        data: { id: 1 },
        meta: { timestamp: 123 },
      });
    });
  });

  describe('createApiError', () => {
    it('creates a standard error response', () => {
      const response = createApiError('Not found');
      expect(response).toEqual({
        success: false,
        error: { message: 'Not found' },
      });
    });

    it('includes code and details if provided', () => {
      const response = createApiError('Invalid data', 'VALIDATION_ERROR', { field: 'email' });
      expect(response).toEqual({
        success: false,
        error: {
          message: 'Invalid data',
          code: 'VALIDATION_ERROR',
          details: { field: 'email' },
        },
      });
    });
  });

  describe('createPaginationMeta', () => {
    it('calculates correct pagination metadata', () => {
      const meta = createPaginationMeta(2, 10, 25);
      expect(meta).toEqual({
        page: 2,
        limit: 10,
        total: 25,
        totalPages: 3,
        hasNextPage: true,
        hasPrevPage: true,
      });
    });

    it('handles first page correctly', () => {
      const meta = createPaginationMeta(1, 10, 25);
      expect(meta.hasPrevPage).toBe(false);
      expect(meta.hasNextPage).toBe(true);
    });

    it('handles last page correctly', () => {
      const meta = createPaginationMeta(3, 10, 25);
      expect(meta.hasPrevPage).toBe(true);
      expect(meta.hasNextPage).toBe(false);
    });

    it('handles negative or zero values safely', () => {
      const meta = createPaginationMeta(0, 0, 10);
      expect(meta.page).toBe(1);
      expect(meta.limit).toBe(1);
    });
  });

  describe('parsePagination', () => {
    it('extracts valid page and limit from query string objects', () => {
      const result = parsePagination({ page: '2', limit: '20' });
      expect(result).toEqual({ page: 2, limit: 20 });
    });

    it('falls back to defaults if not provided', () => {
      const result = parsePagination({});
      expect(result).toEqual({ page: 1, limit: 10 });
    });

    it('falls back to defaults if invalid data provided', () => {
      const result = parsePagination({ page: 'abc', limit: 'xyz' });
      expect(result).toEqual({ page: 1, limit: 10 });
    });

    it('clamps limit to maxLimit', () => {
      const result = parsePagination({ limit: '1000' }, 10, 100);
      expect(result.limit).toBe(100);
    });
    
    it('handles negative numbers safely', () => {
       const result = parsePagination({ page: '-5', limit: '-10' });
       expect(result).toEqual({ page: 1, limit: 10 }); // Defaults
    });
  });
});
