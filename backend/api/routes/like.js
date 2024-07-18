const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const likeController = require("../controllers/like");

router.post("/", checkAuth,likeController.createLike);
router.post("/", checkAuth,likeController.createDislike);
router.get("/:postId", likeController.getNumberOfLikesByPost);
router.get("/LikesByPost/:postId", likeController.getLikesByPost);


module.exports = router;
