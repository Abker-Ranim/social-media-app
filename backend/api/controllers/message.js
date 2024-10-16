const Message = require("../models/message");
const Conversation = require("../models/conversation");
const { getReceiverSocketId, io } = require("../../socketServer");

exports.createMessage = async (req, res) => {
  try {
    const { content, receiverIds } = req.body;
    const senderId = req.userData._id;

    const participants = [...receiverIds];
    if (!participants.includes(senderId)) {
      participants.push(senderId);
    }
    participants.sort();

    let conversations = await Conversation.find();
    let conversation = null;
    for (let conv of conversations) {
      let convParticipants = [...conv.participants];
      convParticipants.sort();
      if (JSON.stringify(convParticipants) === JSON.stringify(participants)) {
        conversation = conv;
        break;
      }
    }

    if (!conversation) {
      conversation = await Conversation.create({
        participants: participants,
      });
    }

    const newMessage = new Message({
      sender: senderId,
      receivers: receiverIds,
      content,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      conversation.lastMessage = newMessage.content;
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    receiverIds.forEach((receiverId) => {
      const receiverSocketId = getReceiverSocketId(receiverId);

      if (receiverSocketId && receiverId !== req.userData._id) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
