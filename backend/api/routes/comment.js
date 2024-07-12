const express = require("express");
const router = express.Router();

const commentController = require("../controllers/comment");

router.get("/", commentController.getAllComments);
router.post("/", commentController.createComment);
router.get("/:commentId", commentController.getcommentById);
router.delete("/:commentId", commentController.deleteComment);

module.exports = router;
