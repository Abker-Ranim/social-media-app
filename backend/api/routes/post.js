const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const postController = require("../controllers/post");
const multer = require("../middleware/multer");


router.get("/", checkAuth, postController.getAllPosts);
router.get("/byUser/:userId", checkAuth, postController.getPostsByUser);
router.post("/", checkAuth,multer, postController.createPost);
router.get("/:postId", checkAuth, postController.getPostById);
router.put("/:postId", checkAuth, postController.updatePost);
router.delete("/:postId", checkAuth, postController.deletePost);

module.exports = router;
