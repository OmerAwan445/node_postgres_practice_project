import ApiResponse from "../utils/ApiResponse.js";
import { getEnv } from "../utils/getEnv.js";
import { AppError } from "./AppError.js";
import { DbError } from "./DbError.js";

/**
 * It typically sits at the top level of your Express application and is used as middleware
 * to catch and process errors that occur during the request-response cycle.
 * It captures errors that are thrown or passed to the next() function in middleware etc.
 * @class
*/
class ErrorHandler {
  /**
       * Handles errors that occur during the request-response cycle.
       * @param {Error} error - The error to handle.
       * @param {Response} responseStream - The response stream to send the error to.
       * @returns {Promise<void>} A promise that resolves when the error handling is complete.
    */
  // eslint-disable-next-line
async handleError(error, responseStream) {
    await this.logError(error);
    await this.fireMonitoringMetric(error);
    return await this.checkForDatabaseErrorAndSendResponse(error, responseStream) ||
    await this.crashIfUntrustedErrorOrSendResponse(error, responseStream);
  }

  /**
     * logs the error
     * @param {Error} error - The error to log.
  */
  async logError(error) {
    console.error(error);
  }

  async fireMonitoringMetric(error) {
  // console.error(error);
  }
  /**
     * Crashes the application if the error is untrusted, otherwise sends the error
     * to the response stream.
     * @param {Error} error - The error to handle.
     * @param {Response} responseStream -  The response stream to send the error to.
     */
  async crashIfUntrustedErrorOrSendResponse(error, responseStream) {
    if (error instanceof AppError) {
      return responseStream.status(error.statusCode).send(errorResponseObj(error));
    } else {
      // crash the application
      error.statusCode = 500;
      if (getEnv('DEV_ENV') === "development") {
        return responseStream.status(500).send(errorResponseObj(error));
      } else {
        error.message = "Internal Server Error";
        return responseStream.status(500).send(errorResponseObj(error));
      }
    }
  }

  /**
   * Checks for a database error and sends the response.
   * @param {Error} error
   * @param {*} responseStream
   * @return {*}
*/
  async checkForDatabaseErrorAndSendResponse(error, responseStream) {
    if (error instanceof DbError) {
      if (error.constraint === 'users_email_key' && error.errorCode === '23505') {
        error.message = 'Email already exists';
        error.statusCode = 409;
      }
      return responseStream.status(error.statusCode).send(errorResponseObj(error));
    }
    return null;
  }
}

export const handler = new ErrorHandler();

/**
 * Sends a error response according to DEV_ENV.
 * Sends Different error response in development and production.
 * @function errorResponseObj
 * @param {Error} error - The error to handle.
 * @return {object} - The error response.
 */
function errorResponseObj(error) {
  if (getEnv('DEV_ENV') === "development") {
    return {
      error: true,
      statusCode: error.statusCode,
      message: error.message,
      stack: error.stack,
      data: [],
      ...error,
    };
  } else {
    return ApiResponse.error(error.message, error.statusCode);
  }
}
