const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  content: {
    type: String,
    required: true,
  },
  postOwner: {
    type: ObjectId,
    ref: 'user'
  },
  postComment: [{
    type: ObjectId,
    ref: 'comment'
  }]
});

module.exports = mongoose.model("post", postSchema);
