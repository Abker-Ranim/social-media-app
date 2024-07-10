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
        commentPost: req.body.commentPost,
        content: req.body.content,

    });

    comment
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "comment created successfully",
                createdComment: {
                    _id: result._id,
                    commentPost: result.commentPost,
                    content: result.content,

                },
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.deleteComment = (req, res, next) => {
    const commentId = req.params.commentId;

    Comment.findByIdAndRemove(commentId)
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: 'Comment deleted successfully',
                });
            } else {
                res.status(404).json({
                    message: 'Comment not found',
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};