import pg from 'pg';
import { getEnv } from './utils/getEnv.js';
import { AppError } from './Errors/AppError.js';

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
    return rows[0];
  } catch (error) {
    console.log(error.code, 'error code', error.constraint,
        'error constraint', error.name, 'error name');
    throw new AppError(error.message, 400, true);
  }
};
