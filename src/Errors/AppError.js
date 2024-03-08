/**
 * Represents an application error.
 * @class
 */
export class AppError extends Error {
/**
     * Create a new AppError instance.
     * @param {string} name - The name of the error.
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code associated with the
     * error.
     * @param {boolean} isOperational - Indicates whether the error is
     * operational.
*/
  constructor(name, message, statusCode, isOperational) {
    super(message);

    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture the stack trace
    Error.captureStackTrace(this);
  }
}
