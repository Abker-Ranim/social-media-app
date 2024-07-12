const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");

router.get("/", postController.getAllPosts);
router.post("/", postController.createPost);
router.get('/:postId', postController.getPostById);

module.exports = router;
