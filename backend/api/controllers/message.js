const Message = require("../models/message");
const mongoose = require("mongoose");

exports.getAllMessages = (req, res, next) => {
  Message.find()
    .exec()
    .then((messages) => {
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
    sender: req.body.sender,
    receiver: req.body.receiver
  });

  message
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Message created successfully",
        createdMessage: {
          _id: result._id,
          content: result.content,
          sender: result.sender,
          receiver: result.receiver,
        },
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.getMessageById = (req, res, next) => {
  const id = req.params.messageId;
  Message.findById(id).populate('sender')
    .exec()
    .then((message) => {
      if (message) {
        res.status(200).json(message);
      } else {
        res.status(404).json({ message: "Message not found" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};
