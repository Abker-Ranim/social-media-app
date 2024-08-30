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
    ref: "user",
    required: true,
  },
},{ timestamps: true });

module.exports = mongoose.model("post", postSchema);
