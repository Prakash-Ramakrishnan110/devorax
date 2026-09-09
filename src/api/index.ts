export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

/**
 * Creates a standardized successful API response object.
 *
 * @param data - The response data payload
 * @param meta - Optional metadata (like pagination details)
 * @returns A formatted ApiResponse object
 *
 * @example
 * createApiResponse({ user: "Alice" }) // { success: true, data: { user: "Alice" } }
 */
export function createApiResponse<T>(
  data: T,
  meta?: Record<string, unknown>,
): ApiResponse<T> {
  const response: ApiResponse<T> = { success: true, data };
  if (meta !== undefined) {
    response.meta = meta;
  }
  return response;
}

/**
 * Creates a standardized API error response object.
 *
 * @param message - The error message
 * @param code - Optional error code (e.g., 'NOT_FOUND')
 * @param details - Optional error details or validation issues
 * @returns A formatted ApiErrorResponse object
 *
 * @example
 * createApiError("User not found", "NOT_FOUND")
 */
export function createApiError(
  message: string,
  code?: string,
  details?: unknown,
): ApiErrorResponse {
  const error: ApiErrorResponse['error'] = { message };
  if (code !== undefined) error.code = code;
  if (details !== undefined) error.details = details;
  return { success: false, error };
}

/**
 * Creates standard pagination metadata.
 *
 * @param page - Current page number (1-indexed)
 * @param limit - Number of items per page
 * @param total - Total number of items
 * @returns Pagination metadata object
 *
 * @example
 * createPaginationMeta(2, 10, 45)
 */
export function createPaginationMeta(
  page: number,
  limit: number,
  total: number,
): PaginationMeta {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const totalPages = Math.ceil(total / safeLimit);

  return {
    page: safePage,
    limit: safeLimit,
    total,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  };
}

/**
 * Parses and sanitizes pagination parameters from an incoming query object (e.g., Express req.query).
 *
 * @param query - The request query object
 * @param defaultLimit - Default limit if not provided (default: 10)
 * @param maxLimit - Maximum allowed limit (default: 100)
 * @returns Sanitized page and limit
 *
 * @example
 * parsePagination({ page: "2", limit: "50" }) // { page: 2, limit: 50 }
 */
export function parsePagination(
  query: Record<string, any>,
  defaultLimit = 10,
  maxLimit = 100,
): { page: number; limit: number } {
  let page = 1;
  let limit = defaultLimit;

  if (query['page'] !== undefined) {
    const parsedPage = parseInt(String(query['page']), 10);
    if (!isNaN(parsedPage) && parsedPage > 0) {
      page = parsedPage;
    }
  }

  if (query['limit'] !== undefined) {
    const parsedLimit = parseInt(String(query['limit']), 10);
    if (!isNaN(parsedLimit) && parsedLimit > 0) {
      limit = Math.min(parsedLimit, maxLimit);
    }
  }

  return { page, limit };
}
