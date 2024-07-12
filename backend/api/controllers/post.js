const Post = require("../models/post");
const mongoose = require("mongoose");

exports.getAllPosts = (req, res, next) => {
  Post.find()
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
    content: req.body.content,

  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "post created successfully",
        createdPost: {
          _id: result._id,
          content: result.content,

        },
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getPostById = (req, res, next) => {
    const id = req.params.postId;
    Post.findById(id)
      .exec()
      .then((post) => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: "Post not found" });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  };