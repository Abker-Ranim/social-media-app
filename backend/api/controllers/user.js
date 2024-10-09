const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const { unlink } = require("node:fs/promises");

async function deletefile(path) {
  try {
    await unlink(path);
    console.log(`successfully deleted ${path}`);
  } catch (error) {
    console.error("there was an error:", error.message);
  }
}

exports.getAllUsers = (req, res, next) => {
  User.find()
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getUserDetails = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id).exec();
    const result = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
      coverPicture: user.coverPicture,
      isFollowing: false,
    };
    if (user.followers.includes(req.userData._id)) {
      result.isFollowing = true;
    }
    res.status(200).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

exports.searchUsers = (req, res, next) => {
  const search = req.params.search;
  User.find({
    $or: [
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
      // { email: { $regex: search, $options: "i" } },
    ],
  })
    .select("firstName lastName profilePicture")
    .limit(10)
    .exec()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.signupUser = (req, res, next) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(req.body.password)) {
    return res.status(400).json({
      message:
        "Password must contain at least 8 characters, including letters and numbers",
    });
  }

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      });

      user
        .save()
        .then((result) => {
          res.status(201).json({
            message: "User created successfully",
          });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }
  });
};

exports.loginUser = (req, res, next) => {
  const { email, password, remember } = req.body;
  User.find({ email: email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      bcrypt.compare(password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }

        if (result) {
          const expiresIn = remember ? "30d" : "1d";
          const loggedInUser = {
            _id: user[0]._id,
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
            profilePicture: user[0].profilePicture,
            coverPicture: user[0].coverPicture,
          };
          const token = jwt.sign(loggedInUser, process.env.JWT_KEY, {
            expiresIn: expiresIn,
          });
          return res.status(200).json({
            message: "Auth success",
            token: token,
            user: loggedInUser,
          });
        }

        res.status(401).json({
          message: "Auth failed",
        });
      });
    });
};

exports.getCurrentUser = (req, res, next) => {
  res.status(200).json(req.userData);
};

exports.updateUserImage = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No profile image provided." });
  }

  const type = req.params.type;

  if (type !== "cover" && type !== "profile") {
    return res.status(400).json({ error: "Invalid type." });
  }

  const newImagePath =
    type === "cover"
      ? { coverPicture: req.file.path }
      : { profilePicture: req.file.path };

  User.findOneAndUpdate({ _id: req.userData._id }, newImagePath, {
    new: false,
    runValidators: true,
    context: "query",
  })
    .then((data) => {
      const oldImagePath =
        type === "cover" ? data.coverPicture : data.profilePicture;
      if (
        (type === "profile" && oldImagePath !== "uploads/profile.jpg") ||
        (type === "cover" && oldImagePath !== "uploads/cover.jpg")
      ) {
        deletefile(oldImagePath);
      }

      return res.status(200).json({
        message: "Profile image updated successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: "There was an error, try again later.",
      });
    });
};

exports.refreshUser = (req, res, next) => {
  User.findById(req.userData._id)
    .exec()
    .then((user) => {
      const loggedInUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePicture: user.profilePicture,
        coverPicture: user.coverPicture,
      };
      const token = jwt.sign(loggedInUser, process.env.JWT_KEY, {
        expiresIn: "1d",
      });
      return res.status(200).json({
        message: "Auth success",
        token: token,
        user: loggedInUser,
      });
    });
};

exports.followUser = async (req, res, next) => {
  try {
    const currentUserId = req.userData._id;
    const userToFollowId = req.params.id;

    const userToFollow = await User.findById(userToFollowId);
    if (!userToFollow) {
      return res.status(404).json({ message: "User to follow not found." });
    }
    if (userToFollowId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself." });
    }

    if (userToFollow.followers.includes(currentUserId)) {
      return res
        .status(400)
        .json({ message: "You are already following this user." });
    }

    await User.findByIdAndUpdate(
      currentUserId,
      { $push: { following: userToFollowId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userToFollowId,
      { $push: { followers: currentUserId } },
      { new: true }
    );

    res.status(200).json({ message: "Following user successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error following user." });
  }
};

exports.unfollowUser = async (req, res, next) => {
  try {
    const currentUserId = req.userData._id;
    const userToUnfollowId = req.params.id;

    const userToUnfollow = await User.findById(userToUnfollowId);
    if (!userToUnfollow) {
      return res.status(404).json({ message: "User to unfollow not found." });
    }

    if (userToUnfollowId === currentUserId) {
      return res.status(400).json({ message: "You cannot unfollow yourself." });
    }

    if (!userToUnfollow.followers.includes(currentUserId)) {
      return res
        .status(400)
        .json({ message: "You are not following this user." });
    }

    await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { following: userToUnfollowId } },
      { new: true }
    );

    await User.findByIdAndUpdate(
      userToUnfollowId,
      { $pull: { followers: currentUserId } },
      { new: true }
    );

    res.status(200).json({ message: "Unfollowed user successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error unfollowing user." });
  }
};

exports.getFollowers = async (req, res, next) => {
  try {
    const userId = req.userData._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const followers = await User.find({ following: userId })
      .select("firstName lastName email profilePicture")
      .exec();

    res.status(200).json(followers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFollowing = async (req, res, next) => {
  try {
    const userId = req.userData._id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const following = await User.find({ followers: userId })
      .select("firstName lastName email profilePicture")
      .exec();

    res.status(200).json(following);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
