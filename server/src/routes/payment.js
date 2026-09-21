const {asyncHandler} = require("../utils/asyncHandler");
const paymentController = require("../controllers/paymentController");

const router = require("express").Router();

router.post("/:id", asyncHandler(paymentController.processPayment))

module.exports = router;