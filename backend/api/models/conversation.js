const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const conversationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  participants: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  messages: [
    {
      type: ObjectId,
      ref: "Message",
      default: [],
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("conversation", conversationSchema);
