import { config } from 'dotenv';
import { Pool } from 'pg';

const pgPool = new Pool({
    user: config.get('db.user'),
    host: 'localhost',
    database: 'node__pg_auth',
    port: '5432',
    password: 'password'
});

function query(text, params) {
    return pgPool.query(text, params);
}


export default query;
