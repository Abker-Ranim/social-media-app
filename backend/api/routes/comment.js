const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const commentController = require("../controllers/comment");

router.post("/", checkAuth,commentController.createComment);
router.get("/commentsByPost/:postId", checkAuth, commentController.getCommentsByPost);
router.delete("/:commentId", checkAuth,commentController.deleteComment);
router.put('/:commentId', checkAuth,commentController.updateComment);


module.exports = router;
