const controller = require("../controllers/commentsController");
const router = require('express').Router();

router.get('/:id', controller.getComments);

module.exports = router;