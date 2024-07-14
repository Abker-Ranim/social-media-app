const express = require("express");
const router = express.Router();

const likeController = require("../controllers/like");

router.get("/", likeController.getAllLikes);
router.post("/", likeController.createLike);
router.delete("/", likeController.deletelike);

module.exports = router;
