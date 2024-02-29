require('dotenv').config()

module.exports = {
    db:{
        port: process.env.PORT
    },
    server:{
        port: "any-server-port"
    }
}