const Conversation = require("../models/conversation");

exports.getConversations = async (req, res) => {
  try {
    const userId = req.userData._id;

    const conversations = await Conversation.find({
      participants: {
        $in: [userId],
      },
    })
      .populate("participants", "-password")
      .sort("-updatedAt")
      .lean();

    for (let i = 0; i < conversations.length; i++) {
      const conversation = conversations[i];
      for (let j = 0; j < 2; j++) {
        if (conversation.participants[j]._id != userId) {
          conversation.recipient = conversation.participants[j];
        }
      }
    }

    return res.json(conversations);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err.message });
  }
};
