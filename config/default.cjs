require('dotenv').config()
/* EMPTY FIELD WILL COME FROM custom-environment-variables.cjs file \
AND THEY ARE COMMON IN DEV AND PRODUCTION

==== ORDER FOR COMIPLATION OF CONFIG FILES ===
## default.cjs (always)
## production.cjs (only if NODE_ENV=production)
## custom-environment-variables.cjs (always)
*/


module.exports = {
    db:{
        port: "5454",
        name:'',
        userName:'',
        host:'localhost',
        password:''
    },
    server:{
        port: 3000,
    }
}
