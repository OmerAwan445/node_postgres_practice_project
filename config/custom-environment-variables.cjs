/* ALL DEFINED ENV ARE COMMON ENV FOR DEV AND PROD
AND THE FIELD VALUE WILL BE THE KEY NAME IN .env FILE
FOR EXAMPLE db.name = "DB_NAME" HERE IT MEANS IN .env FILE
THERE WILL BE A FIELD LIKE DB_NAME=ANY_VALUE
*/
// eslint-disable-next-line
module.exports = {
  db: {
    name: 'DB_NAME',
    user: 'DB_USER',
    password: 'DB_PASSWORD',
  },
  DEV_ENV: 'DEV_ENV',
};
