/* IN THIS FILE EMPTY FIELDS MEANS THAT THESE FIELDS WILL BE FILLED BY THE custom-environment-variables.js FILE
AND THEY ARE COMMON ON DEV AND PRODUCTION
FILLED FIELDS MEANS THAT THEY ARE ONLY USED IN PRODUCTION
*/

module.exports = {
    db:{
        port: "5454",
        name:'',
        userName:'',
        host:process.env.DB_HOST ?? '',
        password:'',
    },
    server:{
        port: process.env.SERVER_PORT,
    }
}