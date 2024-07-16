const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const commentController = require("../controllers/comment");

router.get("/", checkAuth, commentController.getAllComments);
router.post("/", checkAuth,commentController.createComment);
router.get("/:commentId",checkAuth, commentController.getcommentById);
router.delete("/:commentId", checkAuth,commentController.deleteComment);

module.exports = router;
