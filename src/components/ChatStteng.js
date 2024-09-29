// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(bodyParser.json());

app.post("/send-message", (req, res) => {
  const message = req.body.message;
  // يمكنك التعامل مع الرسائل هنا أو حفظها في قاعدة البيانات
  res.json({ status: "Message received" });
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    io.emit("message", msg); // إرسال الرسالة إلى جميع العملاء المتصلين
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
