const Message = require("../models/message");
const mongoose = require("mongoose");
const Conversation = require("../models/conversation");
const User = require("../models/user");

exports.createMessage = async (req, res, next) => {
  try {
    const userId = req.userData._id;
    const receiverId = req.params.id;
    const content = req.body.content;
    const receiver = await User.findById(receiverId);

    if (!receiver) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [userId, receiverId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        _id: new mongoose.Types.ObjectId(),
        participants: [userId, receiverId],
      });
    }

    await Message.create({
      _id: new mongoose.Types.ObjectId(),
      conversation: conversation._id,
      sender: userId,
      content,
    });
    conversation.save();
    return res.status(200).json({ message: "Message Sent Successfully" });
  } catch (err) {
    console.log(err)
    return res.status(500).json(err);
  }
};

exports.getMessages = async (req, res, next) => {
  try {
    const conversationId = req.params.id;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      throw new Error("Conversation not found");
    }

    const messages = await Message.find({
      conversation: conversation._id,
    })
      .populate("sender", "-password")
      .sort("-createdAt")
      .limit(12);

    return res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
