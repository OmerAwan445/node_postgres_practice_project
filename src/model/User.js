import { query } from '../db.js';
import { QUERY_CREATE_USER } from "../queries/AuthQueries.js";

/**
 * @function
 * @param {object} userData - The user data to be created
 */
const createUser = async (userData) => {
  const { first_name, last_name, email, password } = userData;
  const { rows }= await query(QUERY_CREATE_USER,
  // eslint-disable-next-line
    [first_name, last_name, email, password]);
  return rows;
};

const UserModel = { createUser };
export default UserModel;
