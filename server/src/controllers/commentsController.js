const {query} = require('../db/db.js')
const {decodeToken} = require("./authContoller");
const {particalFetching} = require("../utils/particalFetching");

exports.getComments = async (req, res) => {
    const total = await query('SELECT COUNT(*) from public."Comment" WHERE item_id = $1', [req.params.productId])
    const cursor = req?.query?.cursor ? `AND c.id < ${req.query.cursor}`: ""
    const getQuery = 'SELECT c.id, c.user_id, c.item_id, c.comment, c.date, u.image, u.name ' +
        `FROM public."Comment" c JOIN public."User" u ON c.user_id = u.id WHERE c.item_id = $1 ${cursor} ORDER BY id DESC LIMIT $2`
    const result = await particalFetching(req, total, getQuery, [req.params.productId], "Got comments successfully")
    return res.status(200).json(result)
}

exports.addComment = async (req, res) => {
    const token = decodeToken(req, res)
    const result = await query(`INSERT INTO public."Comment"(user_id, item_id, comment) VALUES ($1,$2,$3) RETURNING *`,
        [token.user_id, req.params.productId, req.body.data])
    return res.status(201).json({data:result.rows[0], message: 'Comment added successfully'})
}

exports.deleteComment = async (req, res) => {
    await query(`DELETE FROM public."Comment" WHERE id = $1`, [req.params.commentId])
    return res.status(203).json({message: 'Comment deleted successfully'})
}

