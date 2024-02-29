import { Pool } from 'pg';

const pgPool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'node__pg_auth',
    port: '5432',
    password: 'password'
});

function query(text, params) {
    return pgPool.query(text, params);
}


export default query;
