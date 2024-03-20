/**
 * Represents a database error.
 * @class
 */
export class DbError extends Error {
/**
    * @param {string} message - The error message.
    * @param {number} errorCode - The error code.
    * @param {string} constraint - The constraint that caused the error.
    * @param {boolean} isOperational - Indicates whether the error is operational.
     */
  constructor(message, errorCode, constraint, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message;
    this.errorCode = errorCode;
    this.constraint = constraint;
    this.statusCode = 400; // default status code// default status code
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

