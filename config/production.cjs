/* IN THIS FILE EMPTY FIELDS MEANS THAT THESE FIELDS WILL BE FILLED BY THE
custom-environment-variables.js FILE
AND THEY ARE COMMON ON DEV AND PRODUCTION
FILLED FIELDS MEANS THAT THEY ARE ONLY USED IN PRODUCTION (ONLY WHEN NODE_ENV=production)
*/

// eslint-disable-next-line
module.exports = {
  db: {
    // eslint-disable-next-line
    port: process.env.DB_PORT,
    name: '',
    user: '',
    // eslint-disable-next-line
    host: process.env.DB_HOST,
    password: '',
  },
  server: {
    // eslint-disable-next-line
    port: process.env.SERVER_PORT,
  },
  DEV_ENV: '',
  JWT: {
    refresh_token_secret: "",
    access_token_secret: "",
    refresh_token_expiry: "",
    access_token_expiry: "",
  },

};


