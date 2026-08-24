
const userController = require('../db/userdb.js')

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const IsEmail = await userController.EmailExists(req.body.email)
    if (!IsEmail) {
        return res.status(401).json({message: "Email doesn't exist",  type: 'Email'})
    }
    const user = await userController.getUser(req.body.email, req.body.password)
    if (!user) {
        return res.status(401).json({message: "Password is incorrect", type: 'Password'})
    }
    const data = {user_id: user.id, role: user.role}
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
    res.status(200).json({token})
}

exports.signup = async (req, res) => {
    const IsEmail = await userController.EmailExists(req.body.email)
    if (IsEmail) {
        return res.status(401).json({message: "An account with this email already exists",  type: 'Email'})
    }
    const register = await userController.registerUser(req.body.email, req.body.password, req.body.username)
    const user = await userController.getUser(req.body.email, req.body.password)

    if (!user) {
        return res.status(401).json({message: "Something went wrong",  type: 'Account'})
    }
    const data = {user_id: user.id, role: user.role}
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
    res.status(200).json({token})
}

exports.decodeToken = (req) => {
    try {
        const Authorization = req.headers.authorization;
        const token = Authorization.split(' ')[1]
        return jwt.verify(token, process.env.JWT_SECRET_KEY)
    }
    catch (err) {
        console.error(err);
    }
}
