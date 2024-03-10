import { getEnv } from "../utils/getEnv.js";
import { AppError } from "./AppError.js";

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
    await this.crashIfUntrustedErrorOrSendResponse(error, responseStream);
  }

  /**
     * logs the error
     * @param {Error} error - The error to log.
  */
  async logError(error) {
    console.error(error);
  }

  /**
       * Fires a monitoring metric for the error.
       * @param {Error} error - The error to fire the metric for.
*/
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
      // Return full error details on development
      if (getEnv('NODE_ENV') === "development") {
        return responseStream.status(error.statusCode).send({
          error: true,
          name: error.name,
          message: error.message,
          statusCode: error.statusCode,
          stack: error.stack,
          ...error,
        });
      }
      return responseStream.status(error.statusCode).send({
        error: true,
        message: error.message,
        statusCode: error.statusCode,
      });
    } else {
      return responseStream.status(500).send(
          {
            error: true,
            message: 'Internal Server Error',
            statusCode: 500,
          },
      );
    }
  }
}

export const handler = new ErrorHandler();
