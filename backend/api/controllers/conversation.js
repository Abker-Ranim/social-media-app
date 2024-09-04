const Conversation = require("../models/conversation");

exports.getConversations = async (req, res) => {
  try {
    const userId = req.userData._id;

    const conversations = await Conversation.find({
      participants: {
        $in: [userId],
      },
    }).populate("participants", "-password");

    const result = conversations.map((conversation) => {
      conversation.participants = conversation.participants.filter(
        (participant) => participant._id.toString() !== userId
      );
      return conversation;
    });

    return res.json(result);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};

exports.getConversation = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.userData._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};
