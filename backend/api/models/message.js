const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: { type: String, required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    receive: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },


});

module.exports = mongoose.model("message", messageSchema);
