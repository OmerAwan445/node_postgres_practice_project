import bcrypt from 'bcrypt';
const saltRounds = 12;
/**
 * @function hashPassword
 * @param {string} password - The password to be hashed
 * @return {Promise<string>} - The hashed password
 */
export async function hashPassword(password) {
  return await bcrypt.hash(password, saltRounds);
}


/**
 * @function copmarePassword
 * @param {string} password - Entered Password
 * @param {string} hash - Hashed Password
 * @return {Promise<boolean>} - The hashed password
 */
export async function comparePassword(password, hash) {
  return await bcrypt.compare(password, hash);
}
