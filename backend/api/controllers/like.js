const Like = require("../models/like");
const mongoose = require("mongoose");


exports.getAllLikes = (req, res, next) => {
    Like.find()
        .exec()
        .then((likes) => {
            res.status(200).json(likes);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.createLike = (req, res, next) => {
    const { post: postId, user: id } = req.body;


    if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            message: "Invalid post or user ID"
        });
    }

    Post.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).json({
                    message: "Post not found"
                });
            }

            return User.findById(id);
        })
        .catch(err => {
            console.error("Error finding post:", err);
            return res.status(500).json({
                error: err.message
            });
        })
        .then(user => {
            if (!user) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            return Like.findOne({ post: postId, user: id });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            return res.status(500).json({
                error: err.message
            });
        })
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

exports.deletelike = (req, res, next) => {
    const likeId = req.params.likeId;

    Like.findByIdAndDelete(likeId).populate('user')
        .then(result => {
            if (result) {
                res.status(200).json({
                    message: 'like deleted successfully',
                });
            } else {
                res.status(404).json({
                    message: 'like not found',
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
};