const {query} = require("./db");

exports.EmailExists = async (email) => {
    const result = await query('SELECT * FROM public."User" WHERE email = $1', [email]);
    return result.rows.length !== 0
}

exports.getUser = async (email, password) => {
    const result = await query('SELECT * FROM public."User" WHERE email = $1 AND password = $2', [email, password])
    return result.rows[0]
}

exports.registerUser = async (email, password, name) => {
    const result = await query('INSERT INTO public."User"(email, password, name) VALUES($1,$2,$3)', [email, password, name]);
    return result.rows.length !== 0
}