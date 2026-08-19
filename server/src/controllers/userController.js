const {getUser} = require("../db/userdb");
const {query} = require("../db/db");
const {decodeToken} = require("./authContoller");
const userController = require("./userController");

exports.getUserData = async (req, res) => {
    const decodedToken = decodeToken(req);
    const data = await query('SELECT name, image, email, role FROM public."User" WHERE id = $1', [decodedToken.user_id]);
    return res.json(data.rows);
}

exports.getAllUsers = async (req, res) => {
    const decodedToken = decodeToken(req);
    if (!decodedToken) {return res.status(404).send("Not Found");}
    const role = await userController.getRole(decodedToken.user_id);
    if (role === 'super') {
        const result = await query('SELECT id, email, name, image, role FROM public."User"')
        res.json(result.rows)
    }
    else {
        return res.status(404).send("Not Found");
    }
}

exports.updateUserData = async (req, res) => {
    const decodedToken = decodeToken(req);
    if (!decodedToken) {return res.status(404).send("Not Found");}
    const role = await userController.getRole(decodedToken.user_id);
    console.log(req.body);
    if (role === 'super') {
        const result = await query('UPDATE public."User" SET role=$1 WHERE id = $2 ', [...req.body]);
        res.json(result.rows);
    }
    else {
        return res.status(404).send("Not Found");
    }
}

exports.addUser = async (req, res) => {
    const decodedToken = decodeToken(req);
    console.log(req.body, req.file)
    if (!decodedToken) {return res.status(404).send("Not Authorized");}
    try {
        const role = await userController.getRole(decodedToken.user_id);
        let params = [req.body.username, req.body.email, req.body.password, req.body.role]
        if (req.file) {
            params.push(req.file.filename)
        }
        if (role === 'super') {
            if (req.file) {
                await query(`INSERT INTO public."User"(name, email, password, role, image) VALUES ($1, $2, $3, $4, $5)`, params);
            }
            else {
                await query(`INSERT INTO public."User"(name, email, password, role) VALUES ($1, $2, $3, $4)`, params);
            }
            res.json(true);
        }
        else {
            res.status(404).send("Not Enough Rights");
        }
    }
    catch (error){
        res.status(404).send("Error occured");
    }
}

exports.deleteUser = async (req, res) => {
    const decodedToken = decodeToken(req);
    if (!decodedToken) {return res.status(404).send("Not Authorized");}
    try {
        const role = await userController.getRole(decodedToken.user_id);
        if (role === 'super') {
            const result = await query('DELETE FROM public."User" WHERE id = $1', [req.body.id]);
            res.json(true);
        }
        else {
            res.status(404).send("Not Enough Rights");
        }
    }
    catch (error){
        res.status(404).send("Error occured");
    }
}


exports.getRole = async (user_id) => {
    const user = await query(`SELECT * FROM public."User" WHERE id = $1`, [user_id]);
    return user.rows[0].role
}