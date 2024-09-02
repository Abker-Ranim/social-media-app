const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const conversationController = require("../controllers/conversation");

router.get("/", checkAuth, conversationController.getConversations);

module.exports = router;
