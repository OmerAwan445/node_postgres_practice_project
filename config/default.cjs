// eslint-disable-next-line
require('dotenv').config();
/* EMPTY FIELD WILL COME FROM custom-environment-variables.cjs file \
AND THEY ARE COMMON IN DEV AND PRODUCTION

==== ORDER FOR COMIPLATION OF CONFIG FILES ===
## default.cjs (always)
## production.cjs (only if DEV_ENV=production)
## custom-environment-variables.cjs (always)
*/

// eslint-disable-next-line
module.exports = {
  db: {
    port: "5432",
    host: "localhost",
    name: "",
    user: "",
    password: "",
  },
  server: {
    port: 3000,
  },
  DEV_ENV: "",
};
