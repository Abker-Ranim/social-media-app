const mongoose = require("mongoose");

const conversationSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "user",
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("conversation", conversationSchema);
