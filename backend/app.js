const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
const http = require("http");
const socketIO = require("socket.io");

const { authSocket, socketServer } = require("./socketServer");

const userRoutes = require("./api/routes/user.js");
const postRoutes = require("./api/routes/post.js");
const commentRoutes = require("./api/routes/comment.js");
const messageRoutes = require("./api/routes/message.js");
const likeRoutes = require("./api/routes/like.js");
const conversationRoutes = require("./api/routes/conversation.js");

const app = express();

const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/social_media")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });
mongoose.Promise = global.Promise;

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Handling
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Access-Control-Allow-Origin",
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);

// Routes
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/message", messageRoutes);
app.use("/like", likeRoutes);
app.use("/conversation", conversationRoutes);

// Error Handling
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Socket.IO Configuration
// const io = socketIO(server);

// io.on("connection", (socket) => {
//   console.log("Un utilisateur est connecté");

//   socket.on("sendMessage", (messageData) => {
    
//     io.to(messageData.conversationId).emit("receiveMessage", messageData);
//   });

//   socket.on("joinConversation", (conversationId) => {
//     socket.join(conversationId); 
//   });

//   socket.on("disconnect", () => {
//     console.log("Un utilisateur est déconnecté");
//   });
// });
const httpServer = http.createServer(app);

const io = socketIO(httpServer, {
  cors: {
    origin: [
      process.env.CLIENT_URL,
      "https://social-media-app.vercel.app",
    ],
  },
});

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

// Server
app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});

module.exports = app;
