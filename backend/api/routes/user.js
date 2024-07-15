const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const userController = require("../controllers/user");

router.get("/", checkAuth, userController.getAllUsers);
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);

module.exports = router;
