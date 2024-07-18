const Like = require("../models/like");
const mongoose = require("mongoose");


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


exports.createDislike = (req, res, next) => {
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
            
            return Dislike.findOne({ post: postId, user: id });
        })
        .catch(err => {
            console.error("Error finding user:", err);
            return res.status(500).json({
                error: err.message
            });
        })
        .then(existingDislike => {
            if (existingDislike) {
                return res.status(409).json({
                    message: "User has already disliked this post"
                });
            }
            
            const dislike = new Dislike({
                _id: new mongoose.Types.ObjectId(),
                post: postId,
                user: id,
            });

            return dislike.save();
        })
        .catch(err => {
            console.error("Error finding dislike:", err);
            return res.status(500).json({
                error: err.message
            });
        })
        .then(result => {
            if (result) {
                res.status(201).json({
                    message: "Dislike created successfully",
                    createdDislike: {
                        _id: result._id,
                        post: result.post,
                        user: result.user,
                    },
                });
            }
        })
        .catch(err => {
            console.error("Error creating dislike:", err);
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
        .populate({
            path: 'user',
            select: 'firstName lastName '
        }) 
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