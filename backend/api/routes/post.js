const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const postController = require("../controllers/post");

router.get("/",checkAuth, postController.getAllPosts);
router.post("/",checkAuth, postController.createPost);
router.get('/:postId', checkAuth,postController.getPostById);

module.exports = router;
