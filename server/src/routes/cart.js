const express = require("express");
const controller = require("../controllers/cartController");
const router = express.Router();

router.get('/', controller.getCart);
router.delete('/', controller.delFromCart)

module.exports = router;