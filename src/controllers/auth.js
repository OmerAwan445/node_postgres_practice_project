import { db } from '../db.js';
const signup = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM users');
  res.send(rows);
};

/*
 create a wrapper for controller to catch errors and watch video to catch
 errors professionally throught the app even when using pg db
*/

export { signup };

