export const QUERY_CREATE_USER =
`INSERT INTO users ( first_name, last_name, email, password )
    VALUES ($1, $2, $3, $4) RETURNING *, NULL AS password`;

export const QUERY_GET_USER_BY_EMAIL =
    `SELECT * FROM users WHERE email = $1`;

export const QUERY_SAVE_AUTH_TOKEN =
    `INSERT INTO auth_tokens (user_id, token, token_type, token_expiry) VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, token_type) DO UPDATE SET token = EXCLUDED.token,
           token_expiry = EXCLUDED.token_expiry`;
