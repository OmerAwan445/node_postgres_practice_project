import { query } from '../db.js';
import { QUERY_CREATE_USER, QUERY_GET_USER_BY_EMAIL } from "../queries/AuthQueries.js";

/**
 * @function
 * @param {object} userData - The user data to be created
 */
const createUser = async (userData) => {
  const { first_name, last_name, email, password } = userData;
  const { rows } = await query(QUERY_CREATE_USER,
      [first_name, last_name, email, password]);
  return rows[0];
};

/**
 * @function getUserByEmail
 * @param {String} email - The email of the user to be retrieved
 * @return {Promise<User> | null} - The user object
 */
async function getUserByEmail(email) {
  const { rows } = await query(QUERY_GET_USER_BY_EMAIL, [email]);
  return rows[0];
}


const UserModel = { createUser, getUserByEmail };
export default UserModel;
