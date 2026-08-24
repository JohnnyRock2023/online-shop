const {query} = require('../db/db.js')

exports.getComments = async (req, res) => {
    const result = await query('SELECT * FROM public."Comment" c JOIN public."User" u ON c.user_id = u.id WHERE item_id = $1', [req.params.id])
    return res.status(200).json({data: result.rows, message: 'Comments got successfully'})
}
