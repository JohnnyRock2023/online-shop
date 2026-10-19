const {query} = require('../db/db.js')
const {decodeToken} = require("./authContoller");
const fs = require('fs');
const path = require("path");
const {particalFetching} = require("../utils/particalFetching");

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

exports.searchProducts = async (req, res) => {
    const cursor = req?.query?.cursor ? `AND id < ${req.query.cursor}`: ""
    const name = `%${req?.query?.search}%`
    const total = await query('SELECT COUNT(*) from public."Items" WHERE name ILIKE $1', [name])
    const getQuery = `SELECT * FROM public."Items" WHERE name ILIKE $1 ${cursor} ORDER BY id ASC LIMIT $2`
    const result = await particalFetching(req, total, getQuery, [name],
        "Product search results successfully")
    return res.status(200).json(result)
}

exports.getProducts = async (req, res) => {
    const token = decodeToken(req, res, true)
    const cursor = req?.query?.cursor ? `WHERE i.id < ${req.query.cursor}`: ""
    const authorized = token?.user_id ? `(SELECT 1 FROM public."Favorites" WHERE product_id = i.id AND user_id = ${token?.user_id})` : 'null'
    const total = await query('SELECT COUNT(*) from public."Items"')
    const getQuery =`SELECT i.id, i.name, i.image, i.price, ${authorized} isFavorite 
                    FROM public."Items" i ${cursor} ORDER BY id ASC LIMIT $1`
    const result = await particalFetching(req, total, getQuery, [],
        "Products got successfully")
    return res.status(200).json(result)
}

exports.getProduct = async (req, res) => {
    const token = decodeToken(req, res)
    const authorized = token?.user_id ? `(SELECT 1 FROM public."Favorites" WHERE product_id = i.id AND user_id = $2)` : 'null'
    const result = await query(`SELECT i.*, ${authorized} isFavorite FROM public."Items" i WHERE i.id = $1`,
        token?.user_id ? [req.params.id, token.user_id]: [req.params.id])
    return res.status(200).json({data: result.rows[0], message: "Product got successfully"})
}

exports.addProduct = async (req, res) => {
    if (req.file) {
        await query('INSERT INTO public."Items"(name, price, description, image) VALUES($1,$2,$3,$4)',
            [req.body.name, req.body.price, req.body.description, req?.file?.filename])
    }
    else {
        await query('INSERT INTO public."Items"(name, price, description) VALUES($1,$2,$3)',
            [req.body.name, req.body.price, req.body.description])
    }
    res.status(201).json({message: 'Product added successfully'})
}

exports.updateProduct = async (req, res) => {
    if (req.file) {
        await deleteImage(req.params.id)
        await query('UPDATE public."Items" SET name = $1, price = $2, description = $3, image = $4 WHERE id = $5',
            [req.body.name, req.body.price, req.body.description, req.file.filename, req.params.id])
    }
    else {
        await query('UPDATE public."Items" SET name = $1, price = $2, description = $3 WHERE id = $4',
            [req.body.name, req.body.price, req.body.description, req.params.id])
    }
    res.status(202).json({message: 'Product updated successfully'})
}

exports.deleteProduct = async (req, res) => {
    await deleteImage(req.params.id)
    await query('DELETE FROM public."Items" WHERE id = $1', [req.params.id])
    res.status(204).json({message: 'Product deleted successfully'})
}

exports.addToCart = async (req, res) => {
    const token_data = decodeToken(req, res)
    const [item_id, count] = req.body
    await query('INSERT INTO public."Cart"(user_id, item_id, count) VALUES($1,$2,$3)', [token_data.user_id, item_id, count ])
    return res.status(200).json({message: 'Product added successfully'})
}
