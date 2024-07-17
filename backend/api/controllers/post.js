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
    postOwner: req.body.postOwner,
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Post created successfully",
        createdPost: {
          _id: result._id,
          content: result.content,
          postOwner: result.postOwner,
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getPostById = (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id).populate('postOwner')
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

exports.updatePost = (req, res, next) => {
  const id = req.params.postId;
  const newContent = req.body.content;

  Post.findById(id)
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.postOwner.toString() !== req.userData.id) {
        return res.status(403).json({ message: "You are not authorized to update this post" });
      }


      Post.findOneAndUpdate(
        { _id: id },
        { $set: { content: newContent } },
        { new: true }
      )
        .then((updatedDocument) => {
          res.status(200).json(updatedDocument);
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            error: 'An error occurred while updating the post',
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'An error occurred while searching for the post',
      });
    });
};

exports.deletePost = (req, res, next) => {
  const postId = req.params.postId;

  Post.findById(postId)
    .exec()
    .then((post) => {
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }


      if (post.postOwner.toString() !== req.userData.id) {
        return res.status(403).json({ message: "You are not authorized to delete this post" });
      }


      Post.findByIdAndDelete(postId)
        .then(() => {
          res.status(200).json({ message: "Post deleted successfully" });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({ error: 'An error occurred while deleting the post' });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: 'An error occurred while searching for the post',
      });
    });
};

