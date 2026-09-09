/**
 * Pauses execution for a specified number of milliseconds.
 *
 * @param ms - The number of milliseconds to sleep
 * @returns A promise that resolves after the specified time
 *
 * @example
 * await sleep(1000); // waits for 1 second
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}

/**
 * Wraps a promise with a timeout. If the promise does not resolve within the specified time,
 * it rejects with a TimeoutError (or a custom error).
 *
 * @param promise - The promise to await
 * @param ms - The timeout in milliseconds
 * @param fallbackError - Optional custom error to throw on timeout
 * @returns The resolved value of the promise
 *
 * @example
 * const data = await withTimeout(fetch('/api/data'), 5000);
 */
export function withTimeout<T>(
  promise: Promise<T>,
  ms: number,
  fallbackError = new Error(`Promise timed out after ${ms}ms`),
): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(fallbackError);
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

/**
 * Options for configuring the retry behavior.
 */
export interface RetryOptions {
  /** Maximum number of attempts (default: 3) */
  attempts?: number;
  /** Base delay between retries in milliseconds (default: 1000) */
  delayMs?: number;
  /** Whether to use exponential backoff (default: true) */
  backoff?: boolean;
}

/**
 * Retries an asynchronous function until it succeeds or the maximum number of attempts is reached.
 *
 * @param fn - The asynchronous function to retry
 * @param options - Configuration options for retry behavior
 * @returns The resolved value of the function
 *
 * @example
 * const data = await retry(() => fetch('/api/data'), { attempts: 3, delayMs: 500 });
 */
export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const attempts = Math.max(1, options.attempts ?? 3);
  const baseDelay = Math.max(0, options.delayMs ?? 1000);
  const useBackoff = options.backoff ?? true;

  let lastError: Error | unknown;

  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      if (i < attempts - 1) {
        // Exponent is 2^i starting at i=0 for the first retry
        const currentDelay = useBackoff ? baseDelay * Math.pow(2, i) : baseDelay;
        await sleep(currentDelay);
      }
    }
  }

  throw lastError;
}
