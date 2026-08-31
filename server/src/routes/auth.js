const router = require('express').Router()
const authController = require('../controllers/authContoller')
const {asyncHandler} = require("../utils/asyncHandler");

router.post('/login', asyncHandler(authController.login));
router.post('/signup', asyncHandler(authController.signup));

module.exports = router