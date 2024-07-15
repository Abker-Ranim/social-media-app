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
    const like = new Like({
        _id: new mongoose.Types.ObjectId(),
        post: req.body.post,
        user: req.body.user,
    });

    like
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "like created successfully",
                createdlike: {
                    _id: result._id,
                    post: result.post,
                    user: result.user,
                },
            });
        })
        .catch((err) => {
            res.status(500).json(err);
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