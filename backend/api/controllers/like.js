const Like = require("../models/like");
const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.createLike = async (req, res, next) => {
    const { post: postId, user: id } = req.body;


    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid post or user ID"
        });
    }
    let exixstingPost = null;
    await Post.findById(postId)
        .then(post => {
            exixstingPost = post;
            console.log(exixstingPost);
        })
        .catch(err => {
            console.error("Error finding post:", err);
            return res.status(500).json({
                error: err.message
            });
        })
    if (exixstingPost == null) {
        return res.status(404).json({
            message: "Post not found"
        });
    }
    let exixstingUser = null;
    await User.findById(id)
        .then(user => {
            exixstingUser = user;
            console.log(exixstingUser);
        })
        .catch(err => {
            console.error("Error finding user:", err);
            return res.status(500).json({
                error: err.message
            });
        })
    if (exixstingUser == null) {
        return res.status(404).json({
            message: "User not found"
        });
    }
    Like.findOne({ post: postId, user: id })
        .then(existingLike => {
            if (existingLike) {
                return res.status(409).json({
                    message: "User has already liked this post"
                });
            }

            const like = new Like({
                _id: new mongoose.Types.ObjectId(),
                post: postId,
                user: id,
            });

            return like.save();
        })
        .catch(err => {
            console.error("Error finding like:", err);
            return res.status(500).json({
                error: err.message
            });
        })
        .then(result => {
            if (result) {
                res.status(201).json({
                    message: "Like created successfully",
                    createdLike: {
                        _id: result._id,
                        post: result.post,
                        user: result.user,
                    },
                });
            }
        })
        .catch(err => {
            console.error("Error creating like:", err);
            res.status(500).json({
                error: err.message
            });
        });
};

exports.getNumberOfLikesByPost = (req, res, next) => {
    const postId = req.params.postId;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({
            message: "Invalid post ID"
        });
    }

    Like.countDocuments({ post: postId })
        .then(count => {
            res.status(200).json({
                postId: postId,
                numberOfLikes: count
            });
        })
        .catch(err => {
            console.error("Error counting likes:", err);
            res.status(500).json({
                error: err.message
            });
        });
};

exports.getLikesByPost = (req, res, next) => {
    const postId = req.params.postId;


    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).json({
            message: "Invalid post ID"
        });
    }

    Like.find({ post: postId })
        .populate('user', 'firstName lastName')
        .exec()
        .then((likes) => {
            res.status(200).json(likes);
        })
        .catch((err) => {
            console.error("Error getting likes:", err);
            res.status(500).json({
                error: err.message
            });
        });
};

exports.deleteLike = (req, res, next) => {
    const postId = req.params.postId;
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid post or user ID"
        });
    }

    Like.findByIdAndDelete({ post: postId, user: id })
        .then(deletedLike => {
            if (!deletedLike) {
                return res.status(404).json({
                    message: "Like not found"
                });
            }
            res.status(200).json({
                message: "Like deleted successfully",
                deletedLike: deletedLike
            });
        })
        .catch(err => {
            console.error("Error deleting like:", err);
            res.status(500).json({
                error: err.message
            });
        });
};
