const Comment = require("../models/comment");
const mongoose = require("mongoose");

exports.getAllComments = (req, res, next) => {
  Comment.find()
    .exec()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.createComment = (req, res, next) => {
  const comment = new Comment({
    _id: new mongoose.Types.ObjectId(),
    content: req.body.content,
    commentOwner:req.body.commentOwner,
  });

  comment
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Comment created successfully",
        createdComment: {
          _id: result._id,
          content: result.content,
          commentOwner:result.commentOwner,
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getcommentById = (req, res, next) => {
  const id = req.params.commentId;
  Comment.findById(id).populate('commentOwner')
    .exec()
    .then((comment) => {
      if (comment) {
        res.status(200).json(comment);
      } else {
        res.status(404).json({ message: "Comment not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.deleteComment = (req, res, next) => {
  const commentId = req.params.commentId;
  Comment.findByIdAndDelete(commentId).populate('commentOwner')
    .then((result) => {
      if (result) {
        res.status(200).json({
          message: "Comment deleted successfully",
        });
      } else {
        res.status(404).json({
          message: "Comment not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
