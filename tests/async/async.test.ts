import { describe, it, expect, vi } from 'vitest';
import { sleep, withTimeout, retry } from '../../src/async/index.js';

describe('Async Module', () => {
  describe('sleep', () => {
    it('resolves after specified time', async () => {
      const start = Date.now();
      await sleep(50);
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(40); // 40 to account for timer variance
    });

    it('handles negative numbers safely', async () => {
      const start = Date.now();
      await sleep(-50);
      const end = Date.now();
      expect(end - start).toBeLessThan(20);
    });
  });

  describe('withTimeout', () => {
    it('resolves if promise completes before timeout', async () => {
      const p = sleep(10).then(() => 'done');
      const result = await withTimeout(p, 50);
      expect(result).toBe('done');
    });

    it('rejects if promise takes longer than timeout', async () => {
      const p = sleep(50).then(() => 'done');
      await expect(withTimeout(p, 10)).rejects.toThrow(/timed out/);
    });

    it('uses custom error if provided', async () => {
      const p = sleep(50).then(() => 'done');
      await expect(withTimeout(p, 10, new Error('Custom Timeout'))).rejects.toThrow('Custom Timeout');
    });

    it('rejects immediately if promise itself rejects', async () => {
      const p = Promise.reject(new Error('Inner Error'));
      await expect(withTimeout(p, 50)).rejects.toThrow('Inner Error');
    });
  });

  describe('retry', () => {
    it('returns result if fn succeeds on first try', async () => {
      const fn = vi.fn().mockResolvedValue('success');
      const result = await retry(fn);
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(1);
    });

    it('retries until success', async () => {
      const fn = vi
        .fn()
        .mockRejectedValueOnce(new Error('fail 1'))
        .mockRejectedValueOnce(new Error('fail 2'))
        .mockResolvedValue('success');

      const result = await retry(fn, { attempts: 3, delayMs: 1 });
      expect(result).toBe('success');
      expect(fn).toHaveBeenCalledTimes(3);
    });

    it('throws last error if max attempts reached', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('always fails'));
      
      await expect(retry(fn, { attempts: 2, delayMs: 1 })).rejects.toThrow('always fails');
      expect(fn).toHaveBeenCalledTimes(2);
    });

    it('uses exponential backoff by default', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('fail'));
      const start = Date.now();
      
      try {
        await retry(fn, { attempts: 3, delayMs: 10 }); // Delays: 10ms + 20ms = 30ms total sleep
      } catch (e) {
        // expected
      }
      
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(25);
    });
    
    it('uses constant delay if backoff is false', async () => {
      const fn = vi.fn().mockRejectedValue(new Error('fail'));
      const start = Date.now();
      
      try {
        await retry(fn, { attempts: 3, delayMs: 10, backoff: false }); // Delays: 10ms + 10ms = 20ms total
      } catch (e) {
        // expected
      }
      
      const end = Date.now();
      expect(end - start).toBeGreaterThanOrEqual(15);
    });
  });
});
