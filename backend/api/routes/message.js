const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message");

router.get("/", messageController.getAllMessages);
router.get("/:messageId", messageController.getAllMessages);
router.post("/", messageController.createMessage);

module.exports = router;
