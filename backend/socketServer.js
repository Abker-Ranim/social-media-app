const jwt = require("jsonwebtoken");
const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);

// Socket.IO Configuration
const io = socketIO(server, {
  cors: {
    origin: [process.env.CLIENT_URL],
  },
});

const user = {};

const getReceiverSocketId = (receiverId) => {
  return user[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") user[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(user));

  socket.on("typing", (receiver, sender) => {
    const receiverSocketId = getReceiverSocketId(receiver);
    if (user[receiver]) {
      io.to(receiverSocketId).emit("typing", receiver, sender);
    }
  });

  socket.on("stopTyping", (receiver, sender) => {
    const receiverSocketId = getReceiverSocketId(receiver);
    if (user[receiver]) {
      io.to(receiverSocketId).emit("stopTyping", receiver, sender);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete user[userId];
    io.emit("getOnlineUsers", Object.keys(user));
  });
});

module.exports = { server, app, io, getReceiverSocketId };
