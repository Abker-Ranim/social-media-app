const jwt = require("jsonwebtoken");
const socketIO = require("socket.io");
const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);

// Socket.IO Configuration
const io = socketIO(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
// io.use(authSocket);

const user = {};

const getReceiverSocketId = (receiverId) => {
  return user[receiverId];
};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") user[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(user));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete user[userId];
    io.emit("getOnlineUsers", Object.keys(user));
  });
});

// const authSocket = (socket, next) => {
//   let token = socket.handshake.auth.token;

//   if (token) {
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_KEY);
//       socket.decoded = decoded;
//       next();
//     } catch (err) {
//       next(new Error("Authentication error"));
//     }
//   } else {
//     next(new Error("Authentication error"));
//   }
// };

module.exports = { server, app, io, getReceiverSocketId };
