const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userPost: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },

});

module.exports = mongoose.model("post", postSchema);
