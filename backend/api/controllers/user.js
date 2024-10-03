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

exports.getUserDetails = (req, res, next) => {
  const id = req.params.id;
  User.findById(id)
    .exec()
    .then((user) => {
      res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
        cover: user.cover,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
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
    .select("firstName lastName image")
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
            image: user[0].image,
            cover: user[0].cover,
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

  const newImagePath = req.file.path;

  User.findOneAndUpdate(
    { _id: req.userData._id },
    { image: newImagePath },
    { new: false, runValidators: true, context: "query" }
  )
    .then((data) => {
      console.log(data);
      const oldImagePath = data.image;
      if (oldImagePath !== "uploads/profile.jpg") {
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
  const { _id, firstName, lastName, email, image } = req.userData;

  User.findById(_id)
    .exec()
    .then((user) => {
      const loggedInUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        image: user.image,
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
exports.updateUserCover = (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No profile Cover provided." });
  }

  const newCoverPath = req.file.path;

  User.findOneAndUpdate(
    { _id: req.userData._id },
    { cover: newCoverPath },
    { new: false, runValidators: true, context: "query" }
  )
    .then((data) => {
      console.log(data);
      const oldCoverPath = data.cover;
      if (oldCoverPath !== "uploads/cover.png") {
        deletefile(oldCoverPath);
      }

      return res.status(200).json({
        message: "Profile Cover updated successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        error: "There was an error, try again later.",
      });
    });
};