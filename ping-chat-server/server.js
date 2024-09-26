const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("message", (message) => {
    console.log("message received", message);
    io.emit("message", message);
  });

  socket.on("disconnect user", () => {
    io.emit("user disconnected");
    console.log("client disconnected");
  });
});

const port = process.env.PORT || 8080;

server.listen(port, () => console.log("listening on 8080"));
