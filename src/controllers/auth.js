import { AppError } from '../Errors/AppError.js';
import { db } from '../db.js';
const signup = async (req, res, next) => {
  try{
    // return next( new AppError('Can\'t run query right now', 400, true));
    const { rows } = await db.query('SELECT * FROM users');
    res.send(rows);
  }
  catch(error){
    next( new AppError(error.message, 500, true) )
  }
};


/**
 * It catches errors that occur during the request-response cycle.
 * @function
 * @params function
 */
export function catchAsyncError(fn) {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
/*
 create a wrapper for controller to catch errors and watch video to catch
 errors professionally throught the app even when using pg db
*/

export { signup };

