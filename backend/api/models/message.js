const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const messageSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    required: true
  },
  sender: {
    type: ObjectId,
    ref: 'user'
  },
  receiver: {
    type: ObjectId,
    ref: 'user'
  },
});

module.exports = mongoose.model("message", messageSchema);
