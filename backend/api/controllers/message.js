const Message = require("../models/message");
const mongoose = require("mongoose");
const Conversation = require("../models/conversation");
const User = require("../models/user");


exports.createMessage = async (req, res, next) => {
  const conversationId = req.body.conversation;

  if (!mongoose.Types.ObjectId.isValid(conversationId)) {
    return res.status(400).json({
      message: "Invalid conversation "
    });
  }
  let exixstingConversation = null;
  await Conversation.findById(conversationId)
    .then(conversation => {
      exixstingConversation = conversation;
      console.log(exixstingConversation);
    })
    .catch(err => {
      console.error("Error finding conversation:", err);
      return res.status(500).json({
        error: err.message
      });
    })
  if (exixstingConversation == null) {
    return res.status(404).json({
      message: "Conversation not found"
    });
  }

  try {
    const message = new Message({
      _id: new mongoose.Types.ObjectId(),
      content: req.body.content,
      sender: req.userData._id,
      receiver: req.body.receiver,
      conversation: req.body.conversation,
    });

    const result = await message.save();


    res.status(201).json({
      message: "message created successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getMessageById = (req, res, next) => {
  const id = req.params.messageId;
  Message.findById(id).populate('sender', 'firstName lastName')
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
