const {query} = require("../db/db");
const {decodeToken} = require("./authContoller");
const path = require("path");
const fs = require("fs");
const {particalFetching} = require("../utils/particalFetching");

const deleteImage = async (id) => {
    const image = await query('SELECT image FROM public."User" WHERE id = $1', [id])
    const imageName = image.rows[0].image
    if (imageName) {
        const imagePath = path.join(__dirname, "..//..//uploads", image.rows[0].image)
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('An error occurred:', err);
            } else {
                console.log('File deleted successfully!');
            }
        });
    }
}

exports.getUserData = async (req, res) => {
    const token = decodeToken(req, res, true)
    const data = await query('SELECT * FROM public."User" WHERE id = $1', [token.user_id]);
    return res.status(200).json({data: data.rows[0], message: "User data found successfully"});
}

exports.searchUsers = async (req, res) => {
    const cursor = req?.query?.cursor ? `AND id < ${req.query.cursor}`: ""
    const name = `%${req?.query?.search}%`
    const total = await query('SELECT COUNT(*) from public."Items" WHERE name ILIKE $1', [name])
    const getQuery = `SELECT * FROM public."User" WHERE name ILIKE $1 ${cursor} ORDER BY id ASC LIMIT $2`
    const result = await particalFetching(req, total, getQuery, [name],
        "Users found successfully")
    return res.status(200).json(result)
}

exports.getUsers = async (req, res) => {
    const cursor = req?.query?.cursor ? `WHERE id < ${req.query.cursor}`: ""
    const total = await query('SELECT COUNT(*) from public."User"')
    const getQuery = `SELECT id, email, name, image, role FROM public."User" ${cursor}`
    const result = await particalFetching(req, total, getQuery, [name],"Got users successfully")
    res.status(200).json(result);
}

exports.updateUserData = async (req, res) => {
    let role = req.body?.role;
    if (!role) {
        const data = await query('SELECT * FROM public."User" WHERE id = $1', [req.body.id]);
        role = data.rows[0].role;
    }

    let params = [req.body.name, req.body.email, req.body.password, role];

    if (req.file) {
        await deleteImage(req.body.id)
        await query('UPDATE public."User" SET name=$1, email=$2, password=$3, role=$4, image=$5 WHERE id = $6',
            [...params, req.file.filename, req.body.id]);
    }
    else {
        await query('UPDATE public."User" SET name=$1, email=$2, password=$3, role=$4 WHERE id = $5',
            [...params, req.body.id]);
    }
    res.status(202).json({message: 'Updated user'});
}

exports.addUser = async (req, res) => {
    let params = [req.body.username, req.body.email, req.body.password, req.body.role]
    if (req.file) {
        await query(`INSERT INTO public."User"(name, email, password, role, image) VALUES ($1, $2, $3, $4, $5)`, [...params, req.file.filename]);
    }
    else {
        await query(`INSERT INTO public."User"(name, email, password, role) VALUES ($1, $2, $3, $4)`, params);
    }
    res.status(201).json({message: "User Added"})
}

exports.deleteUser = async (req, res) => {
    await query('DELETE FROM public."User" WHERE id = $1', [req.body.id]);
    res.status(204).json({message: "User Deleted"});

}

exports.getRole = async (user_id) => {
    const user = await query(`SELECT * FROM public."User" WHERE id = $1`, [user_id]);
    return user.rows[0].role
}