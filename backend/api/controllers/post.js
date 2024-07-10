const Post = require("../models/post");
const mongoose = require("mongoose");

exports.getAllPosts = (req, res, next) => {
  User.find()
    .exec()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.createPost = (req, res, next) => {
  const post = new Post({
    _id: new mongoose.Types.ObjectId(),
    userPost: req.body.userPost,
    content: req.body.content,
   
  });

  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "User created successfully",
        createdUser: {
          _id: result._id,
          userPost: result.userPost,
          content: result.content,
          
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
