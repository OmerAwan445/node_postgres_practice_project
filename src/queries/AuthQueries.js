export const QUERY_CREATE_USER =
`INSERT INTO users ( first_name, last_name, email, password, confirm_password )
    VALUES ($1, $2, $3, $4, $5) RETURNING *`;
