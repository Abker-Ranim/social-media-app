const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const userController = require("../controllers/user");
const multer = require("../middleware/multer");

router.get("/", userController.getAllUsers);
router.get("/details/:id", userController.getUserDetails);
router.get("/search/:search", userController.searchUsers);
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/current", checkAuth, userController.getCurrentUser);
router.get("/refresh", checkAuth, userController.refreshUser);
router.patch("/uploadImage", checkAuth, multer, userController.updateUserImage);
router.patch("/uploadCover", checkAuth, multer, userController.updateUserCover);

module.exports = router;
