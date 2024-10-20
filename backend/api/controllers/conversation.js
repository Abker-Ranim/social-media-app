const Conversation = require("../models/conversation");

exports.getConversations = async (req, res) => {
  try {
    const userId = req.userData._id;

    const conversations = await Conversation.find({
      participants: {
        $in: [userId],
      },
    }).populate("participants", "id firstName lastName profilePicture");

    return res.json(conversations);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.userData._id;

    let participants = [senderId];
    if (senderId !== receiverId) {
      participants.push(receiverId);
    }
    participants.sort();

    let conversations = await Conversation.find().populate("messages");
    let conversation = null;
    for (let conv of conversations) {
      let convParticipants = [...conv.participants];
      convParticipants.sort();
      if (JSON.stringify(convParticipants) === JSON.stringify(participants)) {
        conversation = conv;
        break;
      }
    }

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
