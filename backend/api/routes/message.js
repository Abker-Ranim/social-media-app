const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const messageController = require("../controllers/message");

router.get("/", checkAuth,messageController.getAllMessages);
router.get("/:messageId",checkAuth, messageController.getMessageById);
router.post("/",checkAuth, messageController.createMessage);

module.exports = router;
