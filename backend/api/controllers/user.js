const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

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
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      return res.status(500).json({
        error: err
      });
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash
    });

    user.save()
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: "User created successfully",
          createdUser: {
            _id: result._id,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
          },
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      });
  });
};





