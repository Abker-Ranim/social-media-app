const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.createComment = async (req, res, next) => {
  const postId = req.body.post;
  const commentOwner = req.userData._id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: "Invalid post ",
    });
  }
  let exixstingPost = null;
  await Post.findById(postId)
    .then((post) => {
      exixstingPost = post;
      console.log(exixstingPost);
    })
    .catch((err) => {
      console.error("Error finding post:", err);
      return res.status(500).json({
        error: err.message,
      });
    });
  if (exixstingPost == null) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  try {
    const comment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      content: req.body.content,
      commentOwner: commentOwner,
      post: req.body.post,
    });

    const result = await comment.save();

    const populatedComment = await Comment.findById(result._id).populate(
      "commentOwner",
      "-password"
    );

    res.status(201).json({
      message: "Comment created successfully",
      createdComment: {
        _id: populatedComment._id,
        content: populatedComment.content,
        commentOwner: {
          _id: populatedComment.commentOwner._id,
          firstName: populatedComment.commentOwner.firstName,
          lastName: populatedComment.commentOwner.lastName,
        },
        post: populatedComment.post,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getCommentsByPost = (req, res, next) => {
  const postId = req.params.postId;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }

  Comment.find({ post: postId })
    .populate("commentOwner", "-password")
    .exec()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      console.error("Error getting comments:", err);
      res.status(500).json({
        error: err.message,
      });
    });
};
exports.deleteComment = (req, res, next) => {
  const userId = req.userData._id;
  const commentId = req.params.commentId;

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({
      message: "Invalid comment ID",
    });
  }
  Comment.findOneAndDelete({ commentOwner: userId, _id: commentId })
    .then((deletedComment) => {
      if (!deletedComment) {
        return res.status(404).json({
          message: "comment not found",
        });
      }
      res.status(200).json({
        message: "comment deleted successfully",
        deletedComment: deletedComment,
      });
    })
    .catch((err) => {
      console.error("Error deleting comment:", err);
      res.status(500).json({
        error: err.message,
      });
    });
};

exports.updateComment = (req, res, next) => {
  const userId = req.userData._id;
  const commentId = req.params.commentId;
  const newContent = req.body.content;

  console.log("Comment ID:", commentId);
  console.log("Comment Owner ID:", userId);

  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    return res.status(400).json({
      message: "Invalid comment ID",
    });
  }
  if (!newContent || newContent.trim() === "") {
    return res.status(400).json({
      message: "Comment content cannot be empty",
    });
  }
  Comment.findOneAndUpdate(
    { _id: commentId, commentOwner: userId },
    { $set: { content: newContent } },
    { new: true }
  )
    .then((updatedComment) => {
      if (!updatedComment) {
        return res.status(404).json({
          message: "Comment not found or user not authorized",
        });
      }
      res.status(200).json({
        message: "Comment updated successfully",
        updatedComment: updatedComment,
      });
    })
    .catch((error) => {
      console.error("Error updating comment:", error);
      res.status(500).json({
        error: "An error occurred while updating the comment",
      });
    });
};
