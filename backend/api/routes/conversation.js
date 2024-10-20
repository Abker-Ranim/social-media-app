const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const conversationController = require("../controllers/conversation");

router.get("/", checkAuth, conversationController.getConversations);
router.get("/:id", checkAuth, conversationController.getConversation);

module.exports = router;
