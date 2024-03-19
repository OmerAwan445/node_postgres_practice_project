import pg from 'pg';
import { DbError } from './Errors/DbError.js';
import { getEnv } from './utils/getEnv.js';

const { Pool } = pg;

const db = new Pool({
  user: getEnv('db.user'),
  host: getEnv('db.host'),
  database: getEnv('db.name'),
  port: getEnv('db.port'),
  password: getEnv('db.password'),
});

export const query = async (text, params) => {
  try {
    const { rows } = await db.query(text, params);
    return { rows };
  } catch (error) {
    console.log(error.code, 'error code', error.constraint,
        'error constraint', error.name, 'error name');
    throw new DbError(error.message, error.code, error.constraint, true);
  }
};
