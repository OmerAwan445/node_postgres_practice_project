import { query } from '../db.js';
import { QUERY_SAVE_AUTH_TOKEN } from '../queries/AuthQueries.js';
import { getEnv } from '../utils/getEnv.js';
import moment from 'moment';

/**
 * Converts a time format string into a timestamp format suitable for storing in a PostgreSQL TIMESTAMP column.
 * @param {string} timeFormat The time format string (e.g., "7d" for 7 days, "15m" for 15 minutes).
 * @return {string} The timestamp format (e.g., "YYYY-MM-DD HH:mm:ss").
 */
function convertTimeToTimestamp(timeFormat) {
  const timeMeasurementFigure = timeFormat[timeFormat.length-1]; // 'd', 'm', 'h'
  const momentTimeObj = { [timeMeasurementFigure]: parseInt(timeFormat.match(/\d+/)[0]) };

  // Parse the time format
  const duration = moment.duration(momentTimeObj);

  // Calculate the expiration date based on the current date
  const expirationDate = moment().add(duration);

  // Convert the expiration date to a timestamp format
  const timestamp = expirationDate.format('YYYY-MM-DD HH:mm:ss');

  return timestamp;
}
/**
 * @param {string} token`
 * @param {'access' | 'refresh'} tokenType
 * @param {number} user_id
 * @return {Promise<*>}
 */
async function saveAuthTokenToDb(token, tokenType, user_id) {
  let token_expiry;
  switch (tokenType) {
    case 'access': {
      token_expiry = convertTimeToTimestamp(getEnv('JWT').access_token_expiry);
      break;
    }
    case 'refresh': {
      token_expiry = convertTimeToTimestamp(getEnv('JWT').refresh_token_expiry);
      break;
    }
    // add other tokens expiry times
    default: {
      throw new Error('Invalid token type');
    }
  }
  await query(QUERY_SAVE_AUTH_TOKEN, [user_id, token, tokenType, token_expiry]);
}

const AuthTokenModel = { saveAuthTokenToDb };
export default AuthTokenModel;


