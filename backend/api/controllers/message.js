const Message = require("../models/message");
const Conversation = require("../models/conversation");
const { getReceiverSocketId, io } = require("../../socketServer");

exports.createMessage = async (req, res) => {
  try {
    const { content } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userData._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      content,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      conversation.lastMessage = newMessage.content;
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
