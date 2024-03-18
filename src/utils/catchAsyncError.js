
/**
 * It catches errors that occur during the request-response cycle.
 * @function
 * @param {function} fn - The function to catch errors from.
 * @return {function} A function that catches errors from the provided function.
 */
export function catchAsyncError(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
