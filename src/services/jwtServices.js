import jwt from 'jsonwebtoken';
import { getEnv } from '../utils/getEnv.js';

/**
 * @function
 * @param {*} user
 * return {Promise<{accessToken: string, refreshToken: string}>}
 */
async function generateRefreshAndAccessTokens(user) {
  return new Promise((resolve, reject) => {
    try {
      const { refresh_token_secret, access_token_secret,
        refresh_token_expiry, access_token_expiry } = getEnv('JWT');

      const refreshToken = jwt.sign({ user }, refresh_token_secret,
          { expiresIn: refresh_token_expiry });
      const accessToken = jwt.sign({ user }, access_token_secret, { expiresIn: access_token_expiry });

      resolve({ accessToken, refreshToken });
    } catch (error) {
      console.log('Error in generating tokens:', error.message);
      reject(new Error('Error in generating tokens: ' + error.message ));
    }
  });
}

export { generateRefreshAndAccessTokens };
