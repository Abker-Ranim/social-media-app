const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

router.get("/", userController.getAllUsers);
router.post("/", userController.signupUser);
router.post("/", userController.loginUser);

module.exports = router;
