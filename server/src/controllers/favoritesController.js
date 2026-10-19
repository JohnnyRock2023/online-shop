const {decodeToken} = require("./authContoller");
const {query} = require("../db/db");
const {particalFetching} = require("../utils/particalFetching");

exports.getFavorites = async (req, res) => {
    const token = decodeToken(req, res)
    const total = await query('SELECT COUNT(*) FROM public."Favorites"')
    const cursor = req?.query?.cursor ? `AND f.id < ${req.query.cursor}`: ""
    const getQuery = `SELECT f.*, i.* FROM public."Favorites" f JOIN public."Items" i ON f.product_id = i.id WHERE f.user_id = $1 ${cursor} ORDER BY f.id DESC LIMIT $2`
    const result = await particalFetching(req, total, getQuery, [token.user_id], "Got favorites successfully")
    return res.status(200).json(result)
}

exports.addFavorite = async (req, res) => {
    const token = decodeToken(req, res)
    const result = await query('INSERT INTO public."Favorites"(product_id, user_id) VALUES ($1, $2) RETURNING *',
        [req.body.product_id, token.user_id])
    return res.status(201).json({data: result.rows[0], message: "Successfully added to favorites"})
}

exports.deleteFavorite = async (req, res) => {
    const token = decodeToken(req, res)
    await query('DELETE FROM public."Favorites" WHERE product_id = $1 AND user_id = $2', [req.params.id, token.user_id])
    return res.status(203).json({message: "Successfully deleted from favorites"})
}