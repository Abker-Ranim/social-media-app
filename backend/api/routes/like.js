const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const likeController = require("../controllers/like");


router.post("/", checkAuth,likeController.createLike);
router.get("/numberOfLikes/:postId", likeController.getNumberOfLikesByPost);
router.get("/likesByPost/:postId", likeController.getLikesByPost);
router.delete("/:postId", checkAuth,likeController.deleteLike);


module.exports = router;
