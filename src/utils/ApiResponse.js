class ApiResponse {
/**
 *
 * @param {*} error
 * @param {*} statusCode
 * @param {*} message
 * @param {*} data
 */
  constructor(error, statusCode, message, data) {
    this.error = error;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success(data, message = 'Success', statusCode = 200) {
    return new ApiResponse(false, statusCode, message, data);
  }

  static error(message = 'Internal Server Error', statusCode = 500) {
    return new ApiResponse(true, statusCode, message, []);
  }
}

export default ApiResponse;
