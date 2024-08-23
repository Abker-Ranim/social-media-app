const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
            id: user[0]._id,
            firstName: user[0].firstName,
            lastName: user[0].lastName,
            email: user[0].email,
          }
          const token = jwt.sign(
            loggedInUser,
            process.env.JWT_KEY,
            { expiresIn: expiresIn }
          );
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
}
