/**
 * Centralized API client for handling all HTTP requests
 * Automatically handles authentication headers and error responses
 * Integrates with Supabase error handling for better error categorization
 */

import { handleSupabaseError, SupabaseError } from './supabase-errors'

/**
 * Custom error class for API errors with additional context
 */
export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Check if this is an authentication error
   */
  isAuthError() {
    return this.status === 401 || this.status === 403;
  }

  /**
   * Check if this is a network error
   */
  isNetworkError() {
    return this.status === 0;
  }

  /**
   * Get user-friendly error message
   */
  getUserMessage() {
    if (this.isAuthError()) {
      return 'Your session has expired. Please sign in again.';
    }
    if (this.isNetworkError()) {
      return 'Network error. Please check your connection.';
    }
    if (this.status === 404) {
      return 'The requested resource was not found.';
    }
    if (this.status === 500) {
      return 'Server error. Please try again later.';
    }
    return this.message || 'An unexpected error occurred.';
  }
}

/**
 * Get authentication token from localStorage
 * @returns {string|null} JWT token or null if not found
 */
function getAuthToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}

/**
 * Main API client function
 * @param {string} endpoint - API endpoint (e.g., '/trips' or '/auth/login')
 * @param {Object} options - Fetch options
 * @param {string} options.method - HTTP method (GET, POST, PATCH, DELETE)
 * @param {Object} options.body - Request body (will be JSON stringified)
 * @param {Object} options.headers - Additional headers
 * @param {boolean} options.skipAuth - Skip authorization header (for public endpoints)
 * @returns {Promise<any>} Response data
 * @throws {ApiError} If request fails
 */
export async function apiClient(endpoint, options = {}) {
  const {
    method = 'GET',
    body,
    headers = {},
    skipAuth = false,
  } = options;

  // Build headers
  const requestHeaders = {
    'Content-Type': 'application/json',
    ...headers,
  };

  // Add auth token if available and not skipped
  if (!skipAuth) {
    const token = getAuthToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }
  }

  // Build fetch options
  const fetchOptions = {
    method,
    headers: requestHeaders,
  };

  // Add body if present (and not GET request)
  if (body && method !== 'GET') {
    fetchOptions.body = JSON.stringify(body);
  }

  // Ensure endpoint starts with /api
  const url = endpoint.startsWith('/api') ? endpoint : `/api${endpoint}`;

  try {
    const response = await fetch(url, fetchOptions);

    // Parse response
    let data;
    try {
      data = await response.json();
    } catch (parseError) {
      // If response is not JSON, create generic error
      throw new ApiError(
        'Invalid server response',
        response.status,
        null
      );
    }

    // Handle error responses
    if (!response.ok) {
      const errorMessage = data.error || data.message || 'An error occurred';
      
      // Create API error
      const apiError = new ApiError(
        errorMessage,
        response.status,
        data
      );

      // If this looks like a Supabase error, try to categorize it
      if (data.code || errorMessage.includes('JWT') || errorMessage.includes('PGRST')) {
        try {
          // Convert to SupabaseError for better categorization
          handleSupabaseError(
            { message: errorMessage, code: data.code, status: response.status },
            `API:${endpoint}`
          );
        } catch (supabaseError) {
          // If it's a SupabaseError, throw that instead
          if (supabaseError instanceof SupabaseError) {
            throw supabaseError;
          }
        }
      }

      throw apiError;
    }

    return data;
  } catch (error) {
    // Re-throw SupabaseError and ApiError as-is
    if (error instanceof SupabaseError || error instanceof ApiError) {
      throw error;
    }

    // Network or parsing errors
    const networkError = new ApiError(
      error.message || 'Network error occurred',
      0,
      null
    );

    // Log network errors
    console.error('Network error:', error);

    throw networkError;
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: (endpoint, options = {}) =>
    apiClient(endpoint, { ...options, method: 'GET' }),

  post: (endpoint, body, options = {}) =>
    apiClient(endpoint, { ...options, method: 'POST', body }),

  patch: (endpoint, body, options = {}) =>
    apiClient(endpoint, { ...options, method: 'PATCH', body }),

  delete: (endpoint, options = {}) =>
    apiClient(endpoint, { ...options, method: 'DELETE' }),
};

/**
 * Auth-specific API calls
 */
export const authApi = {
  register: (userData) => api.post('/auth/register', userData, { skipAuth: true }),

  login: (credentials) => api.post('/auth/login', credentials, { skipAuth: true }),

  getMe: () => api.get('/auth/me'),
};

/**
 * User-specific API calls
 */
export const userApi = {
  updateProfile: (updates) => api.patch('/users/profile', updates),

  heartbeat: () => api.post('/users/heartbeat', {}),

  getOnlineUsers: () => api.get('/users/online'),
};

/**
 * Trip-specific API calls
 */
export const tripApi = {
  create: (tripData) => api.post('/trips', tripData),

  getAll: (page = 1, limit = 10) => apiClient(`/trips?page=${page}&limit=${limit}`),

  getPublic: (page = 1, limit = 12) => apiClient(`/trips/public/all?page=${page}&limit=${limit}`),

  getShared: (page = 1, limit = 12) => apiClient(`/trips/shared?page=${page}&limit=${limit}`),

  getById: (id) => api.get(`/trips/${id}`),

  update: (id, updates) => api.patch(`/trips/${id}`, updates),

  delete: (id) => api.delete(`/trips/${id}`),
};

/**
 * Message-specific API calls
 */
export const messageApi = {
  send: (messageData) => api.post('/messages', messageData),

  getConversation: (userId) => api.get(`/messages/${userId}`),
};
