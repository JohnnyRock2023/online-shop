const controller = require("../controllers/commentsController");
const {asyncHandler} = require("../utils/asyncHandler");
const {decodeToken} = require("../controllers/authContoller");
const {getRole} = require("../controllers/userController");
const {getComment} = require('..//db/commentDB')
const router = require('express').Router();

const checkAdminRoleOrOwner = async (req, res, next) => {
    const token = decodeToken(req)
    if (!token) {res.status(401).json({message: 'Not Authorized'})}
    const role = await getRole(token.user_id)
    const comment = await getComment(req?.body?.id)
    if ((role === 'admin' || role === 'super') || token.user_id === comment.user_id) {
        req.user = token
        next()
    }
    else {
        res.status(403).json({message: 'Not Enough Rights'})
    }
}


router.get('/:id', asyncHandler(controller.getComments));
router.post('/:id', asyncHandler(controller.addComment));
router.delete('/', checkAdminRoleOrOwner, asyncHandler(controller.deleteComment));

module.exports = router;