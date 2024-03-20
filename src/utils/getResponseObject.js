
/**
 * @function
 * @param {*} data
 * @param {number} [statusCode=200] - The status code of the response (default: 200).
 * @param {string} [message=success] - A proper message for response (default: "success").
 * @return {Object} - The success response object
 */
export function getResponseObject(data, statusCode = 200, message="success") {
  return {
    error: false,
    statusCode: statusCode,
    message: message,
    data: data,
  };
}
