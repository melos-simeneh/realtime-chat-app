const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, { cors: { origin: ["http://localhost:5173"] } });

const getReceiverSocketId = (userId) => {
  return userSocketMap[userId];
};

const userSocketMap = {};

const logConnection = (socket, userId = "N/A (No userId provided)") => {
  console.log(`User connected: {socket_id: ${socket.id}, user_id: ${userId}}`);
  return userId;
};

const logOnlineUsers = (userMap) => {
  const onlineUsers = Object.keys(userMap);
  console.log(
    `Online users: ${onlineUsers.length} - [${onlineUsers.join(", ")}]`
  );
  return onlineUsers;
};

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;
  const validUserId = userId && userId !== "undefined" ? userId : null;

  if (validUserId) {
    const loggedUserId = logConnection(socket, validUserId);
    userSocketMap[loggedUserId] = socket.id;
  } else {
    logConnection(socket);
  }

  const onlineUsers = logOnlineUsers(userSocketMap);
  io.emit("getOnlineUsers", onlineUsers);

  socket.on("disconnect", () => {
    if (validUserId) {
      console.log(`User disconnected: {${socket.id}, User ID: ${validUserId}}`);
      delete userSocketMap[validUserId];
      console.log(`Removed user ${validUserId} from online users.`);
    } else {
      console.log(
        `User disconnected: {${socket.id}, User ID: N/A (No userId provided)}`
      );
    }

    const updatedOnlineUsers = logOnlineUsers(userSocketMap);
    io.emit("getOnlineUsers", updatedOnlineUsers);
  });
});

module.exports = {
  io,
  server,
  app,
  getReceiverSocketId,
};
