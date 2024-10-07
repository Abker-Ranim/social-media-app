const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "uploads/profile.jpg",
  },
  coverPicture: {
    type: String,
    default: "uploads/cover.png",
  },
  followers: [{ 
    type: mongoose.Schema.Types.ObjectId,
     ref: "User" }], 
  following: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" }],
});

module.exports = mongoose.model("user", userSchema);
