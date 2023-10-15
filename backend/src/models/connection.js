const mysql = require('mysql2/promise')

require('dotenv').config()

const connection = mysql.createPool({
    host:process.env.M_HOST,
    user:process.env.M_USER,
    password:process.env.M_PASSWORD,
    database:process.env.M_DB
})

module.exports = connection