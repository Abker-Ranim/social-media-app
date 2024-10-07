const Like = require("../models/like");
const Post = require("../models/post");
const Comment = require("../models/comment");
const mongoose = require("mongoose");

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate("postOwner", "-password").exec();

    const newPosts = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await Like.countDocuments({ post: post._id });
        const commentsCount = await Comment.countDocuments({ post: post._id });
        const liked =
          (await Like.findOne({ post: post._id, user: req.userData._id })) !==
          null;
        return { ...post._doc, likesCount, commentsCount, liked };
      })
    );

    res.status(200).json(newPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({
      postOwner: userId,
    })
      .populate("postOwner", "-password")
      .exec();

    const newPosts = await Promise.all(
      posts.map(async (post) => {
        const likesCount = await Like.countDocuments({ post: post._id });
        const commentsCount = await Comment.countDocuments({ post: post._id });
        const liked =
          (await Like.findOne({ post: post._id, user: userId })) !== null;
        return { ...post._doc, likesCount, commentsCount, liked };
      })
    );

    res.status(200).json(newPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    
    let imageUrl = null;

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`; 
    }

    const post = new Post({
      _id: new mongoose.Types.ObjectId(),
      content: req.body.content,
      postOwner: req.userData._id,
      imageUrl: req.file.path,
    });

    const result = await post.save();

    res.status(201).json({
      message: "Post created successfully",
      createdPost: {
        _id: result._id,
        createdAt: result.createdAt,
        postOwner: req.userData,
        content: result.content,
        imageUrl: result.imageUrl,
        liked: false,
        likesCount: 0,
        commentsCount: 0,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getPostById = (req, res, next) => {
  const id = req.params.postId;
  Post.findById(id)
    .populate("postOwner")
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

      if (post.postOwner.toString() !== req.userData._id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to update this post" });
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
            error: "An error occurred while updating the post",
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "An error occurred while searching for the post",
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

      if (post.postOwner.toString() !== req.userData._id) {
        return res
          .status(403)
          .json({ message: "You are not authorized to delete this post" });
      }

      Post.findByIdAndDelete(postId)
        .then(() => {
          res.status(200).json({ message: "Post deleted successfully" });
        })
        .catch((error) => {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while deleting the post" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: "An error occurred while searching for the post",
      });
    });
};
