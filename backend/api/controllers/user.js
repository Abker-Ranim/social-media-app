const User = require("../models/user");
const mongoose = require("mongoose");

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

exports.createUser = (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User created successfully",
        createdUser: {
          _id: result._id,
          firstname: result.firstname,
          lastname: result.lastname,
          email: result.email,
          password: result.password,
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
