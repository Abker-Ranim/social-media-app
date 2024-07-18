const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const likeController = require("../controllers/like");


router.post("/", checkAuth,likeController.createLike);
router.get("/:postId", likeController.getNumberOfLikesByPost);
router.get("/LikesByPost/:postId", likeController.getLikesByPost);
router.delete("/:postId/:userId", checkAuth,likeController.deleteLike);


module.exports = router;
