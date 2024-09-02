const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const messageController = require("../controllers/message");

router.get("/:id",checkAuth, messageController.getMessages);
router.post("/:id",checkAuth, messageController.createMessage);

module.exports = router;
