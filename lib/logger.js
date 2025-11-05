/**
 * Environment-aware logging utility
 * Only logs in development mode to keep production clean
 */

const isDevelopment = process.env.NODE_ENV !== 'production'

export const logger = {
  /**
   * Log an error message (only in development)
   * @param {string} message - The error message
   * @param {*} error - The error object or additional context (optional)
   */
  error: (message, error) => {
    if (isDevelopment) {
      if (error !== undefined) {
        console.error(message, error)
      } else {
        console.error(message)
      }
    }
  },

  /**
   * Log an info message (only in development)
   * @param {string} message - The info message
   * @param {*} data - Additional data to log (optional)
   */
  log: (message, data) => {
    if (isDevelopment) {
      if (data !== undefined) {
        console.log(message, data)
      } else {
        console.log(message)
      }
    }
  },

  /**
   * Log a warning message (only in development)
   * @param {string} message - The warning message
   * @param {*} data - Additional data to log (optional)
   */
  warn: (message, data) => {
    if (isDevelopment) {
      if (data !== undefined) {
        console.warn(message, data)
      } else {
        console.warn(message)
      }
    }
  }
}
