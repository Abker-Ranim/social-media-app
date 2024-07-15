const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const likeSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  post: {
    type: ObjectId,
    ref: "post",
    required: true,
  },
  user: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("like", likeSchema);
