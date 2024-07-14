const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/checkAuth');
const likeController = require("../controllers/like");

router.get("/", likeController.getAllLikes);
router.post("/", checkAuth,likeController.createLike);
router.delete("/",checkAuth, likeController.deletelike);

module.exports = router;
