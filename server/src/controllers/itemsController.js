const {query} = require('../db/db.js')
const {decodeToken} = require("./authContoller");
const fs = require('fs');
const path = require("path");

const deleteImage = async (id) => {
    const image = await query('SELECT image FROM public."Items" WHERE id = $1', [id])
    const imageName = image.rows[0].image
    if (imageName) {
        const imagePath = path.join(__dirname, "..//..//uploads", imageName)
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('An error occurred:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });
    }
}

exports.searchItems = async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const cursor = req?.query?.cursor ? `AND id < ${req.query.cursor}`: ""
    const name = `%${req?.query?.search}%`
    const total = await query('SELECT COUNT(*) from public."Items" WHERE name ILIKE $1', [name])
    const totalCount = parseInt(total.rows[0].count)
    const {rows} = await query(`SELECT * FROM public."Items" WHERE name ILIKE $1 ${cursor} ORDER BY id ASC LIMIT $2`, [name, limit])
    return res.status(200).json({data: rows, meta: {nextCursor: rows.length ? rows[rows.length - 1].id : null, total: totalCount, page, limit, totalPages: Math.ceil(totalCount / limit)},
        message: "Item search results successfully"})
}

exports.getItems = async (req, res) => {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, parseInt(req.query.limit) || 10);
    const cursor = req?.query?.cursor ? `WHERE id < ${req.query.cursor}`: ""
    const {rows} = await query(`SELECT * FROM public."Items" ${cursor} ORDER BY id ASC`)
    const total = await query('SELECT COUNT(*) from public."Items"')
    const totalCount = parseInt(total.rows[0].count)
    return res.status(200).json({data: rows, meta: {nextCursor: rows.length ? rows[rows.length - 1].id : null,total: totalCount, page, limit, totalPages: Math.ceil(totalCount / limit)},
        message: "Items got successfully"})
}

exports.getItem = async (req, res) => {
    const result = await query('SELECT * FROM public."Items" WHERE id = $1', [req.params.id])
    return res.status(200).json({data: result.rows[0], message: "Item got successfully"})
}

exports.addItem = async (req, res) => {
    if (req.file) {
        await query('INSERT INTO public."Items"(name, price, description, image) VALUES($1,$2,$3,$4)',
            [req.body.name, req.body.price, req.body.description, req?.file?.filename])
    }
    else {
        await query('INSERT INTO public."Items"(name, price, description) VALUES($1,$2,$3)',
            [req.body.name, req.body.price, req.body.description])
    }
    res.status(201).json({message: 'Item added successfully'})
}

exports.updateItem = async (req, res) => {
    if (req.file) {
        await deleteImage(req.params.id)
        await query('UPDATE public."Items" SET name = $1, price = $2, description = $3, image = $4 WHERE id = $5',
            [req.body.name, req.body.price, req.body.description, req.file.filename, req.params.id])
    }
    else {
        await query('UPDATE public."Items" SET name = $1, price = $2, description = $3 WHERE id = $4',
            [req.body.name, req.body.price, req.body.description, req.params.id])
    }
    res.status(202).json({message: 'Item updated successfully'})
}

exports.deleteItem = async (req, res) => {
    await deleteImage(req.params.id)
    await query('DELETE FROM public."Items" WHERE id = $1', [req.params.id])
    res.status(204).json({message: 'Item deleted successfully'})
}

exports.addToCart = async (req, res) => {
    const token_data = decodeToken(req)
    const [item_id, count] = req.body
    await query('INSERT INTO public."Cart"(user_id, item_id, count) VALUES($1,$2,$3)', [token_data.user_id, item_id, count ])
    return res.status(200).json({message: 'Item added successfully'})
}
