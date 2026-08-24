
const router = require("express").Router();
const userController = require("../controllers/userController");

const upload = require('../uploads/uploads.js')
const {decodeToken} = require("../controllers/authContoller");
const {asyncHandler} = require("../utils/asyncHandler");

const checkOwnerOrSuperRole = async (req, res, next) => {
    const decodedToken = decodeToken(req);
    if (!decodedToken) {
        return res.status(401).json({message: "Not Authorized"});
    }
    const role = await userController.getRole(decodedToken.user_id);
    if (role === 'super' || decodedToken.user_id === req.body?.id) {
        req.user = decodedToken;
        next()
    }
    else {
        return res.status(403).json({message: "Not Enough Rights"});
    }
}

router.get('/search', checkOwnerOrSuperRole, asyncHandler(userController.searchUsers))
router.get('/', asyncHandler(userController.getUserData))
router.post('/', checkOwnerOrSuperRole, upload.single('image'), asyncHandler(userController.addUser))
router.put('/', checkOwnerOrSuperRole, upload.single('image'), asyncHandler(userController.updateUserData))
router.delete('/', checkOwnerOrSuperRole, asyncHandler(userController.deleteUser))

module.exports = router;