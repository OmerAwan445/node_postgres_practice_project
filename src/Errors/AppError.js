/**
 * Represents an application error.
 * @class
 */
export class AppError extends Error {
/**
  * Create a new AppError instance.
  * @param {string} message - The error message.
  * @param {number} statusCode - The HTTP status code associated with the error.
  * @param {number} errorCode - The Error code Came from DB.
  * @param {string} constraint - The constraint that caused the error.
  * @param {boolean} isOperational - Indicates whether the error is operational.
*/
  constructor(message, statusCode, errorCode, constraint, isOperational) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain


    /* Should I seprate the Db Error class from AppError class */
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.constraint = constraint;
    this.isOperational = isOperational;

    // Capture the stack trace
    Error.captureStackTrace(this);
  }
}
