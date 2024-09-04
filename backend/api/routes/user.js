const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const userController = require("../controllers/user");

router.get("/", userController.getAllUsers);
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/current", checkAuth, userController.getCurrentUser);

module.exports = router;
