
const router = require('express').Router()
const orderController = require('../controllers/orderController')
const {decodeToken} = require("../controllers/authContoller");
const {getRole} = require("../controllers/userController");
const {asyncHandler} = require("../utils/asyncHandler");

const checkAdminRole = async (req, res, next) => {
    const token = decodeToken(req, res)
    if (!token) {res.status(401).json({message: 'Not Authorized'})}
    const role = await getRole(token.user_id)
    if (role === 'admin' || role === 'super') {
        req.user = token
        next()
    }
    else {
        res.status(403).json({message: 'Not Enough Rights'})
    }
}
router.get('/:id', asyncHandler(orderController.getOrder))
router.get('/', asyncHandler(orderController.getOrders))
router.post('/', asyncHandler(orderController.addOrder))
router.put('/:id', () =>{})
router.delete('/:id', () => {})

module.exports = router