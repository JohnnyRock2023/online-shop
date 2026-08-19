
const router = require("express").Router();
const userController = require("../controllers/userController");

const upload = require('../uploads/uploads.js')

router.get('/', userController.getUserData)
router.get('/all', userController.getAllUsers)
router.post('/', upload.single('image'), userController.addUser)
router.put('/', userController.updateUserData)
router.delete('/', userController.deleteUser)

module.exports = router;