const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: { type: String, required: true },
});

module.exports = mongoose.model("post", postSchema);
