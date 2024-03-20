export const QUERY_CREATE_USER =
`INSERT INTO users ( first_name, last_name, email, password )
    VALUES ($1, $2, $3, $4) RETURNING *`;
export const QUERY_GET_USER_BY_EMAIL =
    `SELECT * from users WHERE email = $1`;
