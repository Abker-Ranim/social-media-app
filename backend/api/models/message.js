const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  senderId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
},
{ timestamps: true });

module.exports = mongoose.model("message", messageSchema);
