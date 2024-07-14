const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true },
});

module.exports = mongoose.model("like", likeSchema);
