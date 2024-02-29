import pg from 'pg';
import { getEnv } from './utils/getEnv.js';

const { Pool } = pg;

const pgPool = new Pool({
    user: getEnv('db.user'),
    host: getEnv('db.host'),
    database: getEnv('db.name'),
    port: getEnv('db.port'),
    password: getEnv('db.password')
});

function query(text, params) {
    return pgPool.query(text, params);
}


export default query;
