
const router = require("express").Router()
const favoritesController = require("../controllers/favoritesController")
const {asyncHandler} = require("../utils/asyncHandler");

router.get("/", asyncHandler(favoritesController.getFavorites))
router.post("/", asyncHandler(favoritesController.addFavorite))
router.delete("/:id", asyncHandler(favoritesController.deleteFavorite))

module.exports = router