const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  post: { type: mongoose.Schema.Types.ObjectId, ref: "post", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
});

module.exports = mongoose.model("like", likeSchema);
