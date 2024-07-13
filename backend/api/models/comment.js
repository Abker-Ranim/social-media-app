const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const commentSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    required: true,
  },
  commentOwner: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  post: {
    type: ObjectId,
    ref: "post",
    required: true,
  },
});

module.exports = mongoose.model("comment", commentSchema);
