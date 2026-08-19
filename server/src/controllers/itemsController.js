const {query} = require('../db/db.js')
const authController = require('./authContoller.js')
const {decodeToken} = require("./authContoller");
const {getRole} = require("./userController");
const fs = require('fs');

const deleteImage = async (id) => {
    const image = await query('SELECT image FROM public."Items" WHERE id = $1')
    fs.unlink(`..//..//uploads/${image}`, (err) => {
        if (err) {
            console.error('An error occurred:', err);
        } else {
            console.log('File deleted successfully!');
        }
    });
}

exports.getAllItems = async (req, res) => {
    const result = await query('SELECT * FROM public."Items"')
    return res.json(result.rows)
}
exports.getItem = async (req, res) => {
    const result = await query('SELECT * FROM public."Items" WHERE id = $1', [req.params.id])
    return res.json(result.rows[0])
}

exports.addItem = async (req, res) => {
    const token = decodeToken(req)
    if (!token) {res.status(404).send({message: 'Not Authorized'})}
    const role = await getRole(token.user_id)
    if (role === 'admin' || role === 'super') {
        const result = await query('INSERT INTO public."Items"(name, price, description, image) VALUES($1,$2,$3,$4)',
            [req.body.name, req.body.price, req.body.description, req.file.filename])
        res.json(true)
    }
}

exports.updateItem = async (req, res) => {
    const token = decodeToken(req)
    const role = await getRole(token.user_id)
    if (role === 'admin' || role === 'super') {
        if (!req.file) {
            await deleteImage(req.params.id)
            await query('UPDATE public."Items" SET name = $1, price = $2, description = $3 WHERE id = $4',
                [req.body.name, req.body.price, req.body.description, req.params.id])
        }
        await query('UPDATE public."Items" SET name = $1, price = $2, description = $3, image = $4 WHERE id = $5',
            [req.body.name, req.body.price, req.body.description, req.file.filename, req.params.id])
        res.json(true)
    }
    else {
        return res.status(404).send("Not Found");
    }
}

exports.deleteItem = async (req, res) => {
    const token = decodeToken(req)
    if (!token) {res.status(404).send({message: 'Not Authorized'})}
    const role = await getRole(token.user_id)
    if (role === 'admin' || role === 'super') {
        await deleteImage(req.params.id)
        await query('DELETE FROM public."Items" WHERE id = $1', [req.params.id])
        res.json(true)
    }
    else {
        return res.status(404).send("Not Found");
    }
}

exports.addToCart = async (req, res) => {
    const token_data = authController.decodeToken(req)
    const [item_id, count] = req.body
    try {
        await query('INSERT INTO public."Cart"(user_id, item_id, count) VALUES($1,$2,$3)', [token_data.user_id, item_id, count ])
        return res.json(true)
    }
    catch(err) {
        console.log(err)
        return res.json(false)
    }
}
