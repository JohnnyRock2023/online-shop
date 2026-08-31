const express = require("express");
const controller = require("../controllers/cartController");
const {asyncHandler} = require("../utils/asyncHandler");
const router = express.Router();

router.get('/', asyncHandler(controller.getCart));
router.delete('/', asyncHandler(controller.delFromCart));

module.exports = router;