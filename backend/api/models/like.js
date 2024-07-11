const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  likePost: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model("like", likeSchema);
