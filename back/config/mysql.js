const mysql = require('mysql')
dotenv = require('dotenv').config()

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_MDP,
    database: process.env.DB_NAME
})

module.exports = connect