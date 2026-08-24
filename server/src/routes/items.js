const express = require("express");
const controller = require("../controllers/itemsController")

const router = express.Router();

const upload = require('../uploads/uploads.js')
const {decodeToken} = require("..//controllers/authContoller");
const {getRole} = require("../controllers/userController");
const {asyncHandler} = require("../utils/asyncHandler");

const checkAdminRole = async (req, res, next) => {
    const token = decodeToken(req)
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

router.get('/search', asyncHandler(controller.searchItems));
router.get('/:id', asyncHandler(controller.getItem));
router.get('/', asyncHandler(controller.getItems));
router.post('/:id', asyncHandler(controller.addToCart));
router.post('/', checkAdminRole, upload.single("image"), asyncHandler(controller.addItem));
router.delete('/:id', checkAdminRole, asyncHandler(controller.deleteItem));
router.put('/:id', checkAdminRole, upload.single("image"), asyncHandler(controller.updateItem));

module.exports = router;