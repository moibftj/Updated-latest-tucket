/**
 * Supabase Error Handling Utilities
 * Provides categorized error handling for Supabase operations
 * Follows 2025 best practices for error propagation to React error boundaries
 */

/**
 * Custom error class for Supabase-specific errors
 */
export class SupabaseError extends Error {
  constructor(message, code, originalError, context = '') {
    super(message)
    this.name = 'SupabaseError'
    this.code = code
    this.originalError = originalError
    this.context = context
    this.timestamp = new Date().toISOString()
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage() {
    return this.message
  }

  /**
   * Get error details for logging
   */
  getLogDetails() {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      timestamp: this.timestamp,
      originalError: this.originalError,
    }
  }
}

/**
 * Categorize and handle Supabase errors
 * @param {Error} error - The error from Supabase
 * @param {string} context - Context where error occurred (e.g., 'TripsSection', 'AuthFlow')
 * @throws {SupabaseError} Always throws a categorized error for error boundaries to catch
 */
export function handleSupabaseError(error, context = '') {
  // Log the original error for debugging
  console.error(`Supabase error in ${context}:`, error)

  // Handle null/undefined
  if (!error) {
    throw new SupabaseError(
      'An unknown error occurred',
      'UNKNOWN',
      error,
      context
    )
  }

  const errorMessage = error.message || error.toString()
  const errorCode = error.code || error.status || 'UNKNOWN'

  // Authentication errors
  if (errorMessage.includes('JWT') || errorCode === 'PGRST301') {
    throw new SupabaseError(
      'Your session has expired. Please sign in again.',
      'AUTH_EXPIRED',
      error,
      context
    )
  }

  if (errorMessage.includes('Invalid login credentials') || errorCode === 'invalid_credentials') {
    throw new SupabaseError(
      'Invalid email or password. Please try again.',
      'INVALID_CREDENTIALS',
      error,
      context
    )
  }

  if (errorMessage.includes('Email not confirmed') || errorCode === 'email_not_confirmed') {
    throw new SupabaseError(
      'Please confirm your email address before signing in.',
      'EMAIL_NOT_CONFIRMED',
      error,
      context
    )
  }

  // Database errors
  if (errorCode === 'PGRST116' || errorMessage.includes('not found')) {
    throw new SupabaseError(
      'The requested data was not found. It may have been deleted.',
      'NOT_FOUND',
      error,
      context
    )
  }

  if (errorCode === '23505' || errorMessage.includes('duplicate key')) {
    throw new SupabaseError(
      'This item already exists. Please try a different value.',
      'DUPLICATE_ENTRY',
      error,
      context
    )
  }

  if (errorCode === '23503' || errorMessage.includes('foreign key')) {
    throw new SupabaseError(
      'Cannot complete this action due to related data constraints.',
      'FOREIGN_KEY_VIOLATION',
      error,
      context
    )
  }

  // Permission errors
  if (errorCode === 'PGRST301' || errorMessage.includes('permission denied')) {
    throw new SupabaseError(
      'You do not have permission to perform this action.',
      'PERMISSION_DENIED',
      error,
      context
    )
  }

  // Network errors
  if (errorMessage.includes('Failed to fetch') || errorMessage.includes('NetworkError')) {
    throw new SupabaseError(
      'Network error. Please check your internet connection and try again.',
      'NETWORK_ERROR',
      error,
      context
    )
  }

  // Rate limiting
  if (errorCode === '429' || errorMessage.includes('rate limit')) {
    throw new SupabaseError(
      'Too many requests. Please wait a moment and try again.',
      'RATE_LIMIT',
      error,
      context
    )
  }

  // Timeout errors
  if (errorMessage.includes('timeout') || errorCode === 'ETIMEDOUT') {
    throw new SupabaseError(
      'The request took too long. Please try again.',
      'TIMEOUT',
      error,
      context
    )
  }

  // Generic database error
  if (errorCode?.startsWith('PG') || errorCode?.startsWith('23')) {
    throw new SupabaseError(
      'A database error occurred. Please try again later.',
      'DATABASE_ERROR',
      error,
      context
    )
  }

  // Default: generic error
  throw new SupabaseError(
    errorMessage || 'An unexpected error occurred. Please try again.',
    errorCode,
    error,
    context
  )
}

/**
 * Wrapper for async Supabase operations with error handling
 * @param {Function} operation - Async function that performs Supabase operation
 * @param {string} context - Context for error reporting
 * @returns {Promise<any>} Result of the operation
 * @throws {SupabaseError} If operation fails
 */
export async function withSupabaseErrorHandling(operation, context = '') {
  try {
    const result = await operation()
    
    // Check for Supabase error in response
    if (result?.error) {
      handleSupabaseError(result.error, context)
    }
    
    return result
  } catch (error) {
    // If already a SupabaseError, re-throw
    if (error instanceof SupabaseError) {
      throw error
    }
    
    // Otherwise, categorize and throw
    handleSupabaseError(error, context)
  }
}

/**
 * Safe wrapper that catches errors and returns them instead of throwing
 * Useful for components that want to handle errors locally without error boundaries
 * @param {Function} operation - Async function that performs Supabase operation
 * @param {string} context - Context for error reporting
 * @returns {Promise<{data: any, error: SupabaseError|null}>}
 */
export async function safeSupabaseOperation(operation, context = '') {
  try {
    const result = await withSupabaseErrorHandling(operation, context)
    return { data: result, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

/**
 * Log Supabase errors to external service (e.g., Sentry, LogRocket)
 * This can be called in error boundaries or API routes
 * @param {SupabaseError} error - The error to log
 */
export function logSupabaseError(error) {
  if (!(error instanceof SupabaseError)) {
    console.warn('logSupabaseError called with non-SupabaseError:', error)
    return
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Supabase Error:', error.getLogDetails())
  }

  // TODO: Integrate with error monitoring service
  // Example for Sentry:
  // if (typeof window !== 'undefined' && window.Sentry) {
  //   window.Sentry.captureException(error, {
  //     tags: {
  //       error_type: 'supabase',
  //       error_code: error.code,
  //       context: error.context,
  //     },
  //     extra: error.getLogDetails(),
  //   })
  // }

  // Example for server-side logging to Supabase Edge Functions:
  // if (typeof window === 'undefined') {
  //   // Server-side: log to Supabase Edge Function
  //   fetch('/api/log-error', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(error.getLogDetails()),
  //   }).catch(console.error)
  // }
}
