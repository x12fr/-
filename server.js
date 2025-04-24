const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const fs = require("fs");

let users = [];

app.use(express.static(__dirname));
app.use(express.json());

app.post("/login", (req, res) => {
  const { username } = req.body;
  if (users.includes(username)) {
    return res.json({ success: false });
  }
  users.push(username);
  res.json({ success: true });
});

io.on("connection", socket => {
  socket.on("join", user => {
    socket.username = user;
  });

  socket.on("message", msg => {
    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    users = users.filter(u => u !== socket.username);
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
