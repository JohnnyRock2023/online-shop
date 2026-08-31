const {query} = require("./db");

exports.getComment = async (id) => {
    if (id) {
        const result = await query('SELECT * FROM public."Comment" WHERE id = $1', [id])
        return result.rows[0];
    }
}