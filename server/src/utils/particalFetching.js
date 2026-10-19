const {query} = require("../db/db");

exports.particalFetching = async (req, total, getQuery, params=[], message = "Success") => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const totalCount = parseInt(total.rows[0].count)
    const {rows} = await query(getQuery, [...params, limit])
    return {data: rows, meta: {nextCursor: rows.length ? rows[rows.length - 1].id : null,
            total: totalCount, page, limit, totalPages: Math.ceil(totalCount / limit)}, message}
}