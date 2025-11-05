/**
 * Environment-aware logging utility
 * Only logs in development mode to keep production clean
 */

const isDevelopment = process.env.NODE_ENV !== 'production'

export const logger = {
  /**
   * Log an error message (only in development)
   * @param {string} message - The error message
   * @param {*} error - The error object or additional context
   */
  error: (message, error) => {
    if (isDevelopment) {
      console.error(message, error)
    }
  },

  /**
   * Log an info message (only in development)
   * @param {string} message - The info message
   * @param {*} data - Additional data to log
   */
  log: (message, data) => {
    if (isDevelopment) {
      console.log(message, data)
    }
  },

  /**
   * Log a warning message (only in development)
   * @param {string} message - The warning message
   * @param {*} data - Additional data to log
   */
  warn: (message, data) => {
    if (isDevelopment) {
      console.warn(message, data)
    }
  }
}
