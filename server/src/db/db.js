
const { Pool } = require('pg')

require('dotenv').config()

const url = process.env.DB_URL

const pool = new Pool({connectionString: url})

exports.query = (text, params) => {
    return pool.query(text, params)
}