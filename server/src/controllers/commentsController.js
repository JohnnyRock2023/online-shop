const {query} = require('../db/db.js')
const {decodeToken} = require("./authContoller");

exports.getComments = async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const total = await query('SELECT COUNT(*) from public."Comment" WHERE item_id = $1', [req.params.id])
    const totalCount = parseInt(total.rows[0].count)
    const cursor = req?.query?.cursor ? `AND c.id < ${req.query.cursor}`: ""
    const {rows} = await query('SELECT c.id, c.user_id, c.item_id, c.comment, c.date, u.image, u.name ' +
        `FROM public."Comment" c JOIN public."User" u ON c.user_id = u.id WHERE c.item_id = $1 ${cursor} ORDER BY id DESC LIMIT $2`, [req.params.id, limit])
    return res.status(200).json({data: rows, meta: {nextCursor: rows.length ? rows[rows.length - 1].id : null, total: totalCount, page, limit, totalPages: Math.ceil(totalCount / limit)}, message: 'Comments got successfully'})
}

exports.addComment = async (req, res) => {
    const token = decodeToken(req)
    const result = await query(`INSERT INTO public."Comment"(user_id, item_id, comment) VALUES ($1,$2,$3) RETURNING *`,
        [token.user_id, req.params.id, req.body.data])
    return res.status(201).json({data:result.rows[0], message: 'Comment added successfully'})
}

exports.deleteComment = async (req, res) => {
    await query(`DELETE FROM public."Comment" WHERE id = $1`, [req.body.id])
    return res.status(203).json({message: 'Comment deleted successfully'})
}

