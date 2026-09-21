
const userController = require('../db/userdb.js')

const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    const IsEmail = await userController.EmailExists(req.body.email)
    if (!IsEmail) {
        return res.status(401).json({data: 'Email', message: "Email doesn't exist"})
    }
    const user = await userController.getUser(req.body.email, req.body.password)
    if (!user) {
        return res.status(401).json({message: "Password is incorrect", data: 'Password'})
    }
    const data = {user_id: user.id, role: user.role}
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
    res.status(200).json({data: token, message: "Authentication successfully"})
}

exports.signup = async (req, res) => {
    const IsEmail = await userController.EmailExists(req.body.email)
    if (IsEmail) {
        return res.status(401).json({message: "An account with this email already exists",  data: 'Email'})
    }
    const register = await userController.registerUser(req.body.email, req.body.password, req.body.username)
    const user = await userController.getUser(req.body.email, req.body.password)

    if (!user) {
        return res.status(401).json({message: "Something went wrong",  data: 'Account'})
    }
    const data = {user_id: user.id, role: user.role}
    const token = jwt.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
    res.status(200).json({data: token, message: "Authentication successfully"})
}

exports.decodeToken = (req) => {
    const Authorization = req?.headers?.authorization;
    const token = Authorization.split(' ')[1]
    if (!token || token === 'null') return null;
    return jwt.verify(token, process.env.JWT_SECRET_KEY)
}
