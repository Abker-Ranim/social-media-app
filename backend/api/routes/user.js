const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const userController = require("../controllers/user");
const multer = require("../middleware/multer");

router.get("/", userController.getAllUsers);
router.get("/details/:id", checkAuth, userController.getUserDetails);
router.get("/search/:search", userController.searchUsers);
router.post("/signup", userController.signupUser);
router.post("/login", userController.loginUser);
router.get("/current", checkAuth, userController.getCurrentUser);
router.get("/refresh", checkAuth, userController.refreshUser);
router.patch(
  "/uploadImage/:type",
  checkAuth,
  multer,
  userController.updateUserImage
);
router.post("/follow/:id", checkAuth, userController.followUser);
router.delete("/unfollow/:id", checkAuth, userController.unfollowUser);
router.get("/followers", checkAuth, userController.getFollowers);
router.get("/following", checkAuth, userController.getFollowing);

module.exports = router;
