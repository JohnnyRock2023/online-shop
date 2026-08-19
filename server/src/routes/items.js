const express = require("express");
const controller = require("../controllers/itemsController")
const multer = require("multer");
const path = require("path");

const router = express.Router();

const upload = require('../uploads/uploads.js')

router.get('/', controller.getAllItems);
router.get('/:id', controller.getItem);
router.post('/:id', controller.addToCart)
router.post('/', upload.single("image"), controller.addItem)
router.delete('/:id', controller.deleteItem);
router.put('/:id', upload.single("image"), controller.updateItem);

module.exports = router;