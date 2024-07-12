const Message = require("../models/message");
const mongoose = require("mongoose");

exports.getAllMessages = (req, res, next) => {
    Message.find()
        .exec()
        .then((messagess) => {
            res.status(200).json(messages);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};

exports.createMessage = (req, res, next) => {
    const message = new Message({
        _id: new mongoose.Types.ObjectId(),
        content: req.body.content,

    });

    message
        .save()
        .then((result) => {
            console.log(result);
            res.status(201).json({
                message: "msg created successfully",
                createdMessage: {
                    _id: result._id,
                    content: result.content,
                  
                },
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
};
