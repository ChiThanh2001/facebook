const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { readdirSync } = require("fs");
const dotenv = require("dotenv");
const fileUpload = require("express-fileupload");
const path = require("path");
const http = require("http");
const socketIO = require("socket.io");
const Message = require("./models/Message");

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(fileUpload({
  useTempFiles: true
}))

// Initialize HTTP server and Socket.IO
const server = http.createServer(app);
const io = socketIO(server,{
  cors: {
    origin: "http://localhost:3000", // Change this to the origin of your React app
    methods: ["GET", "POST"],
  },
});

//Load routes dynamically
const routesPath = path.join(__dirname, "routes");
readdirSync(routesPath).map((file) => {
  const route = require(path.join(routesPath, file));
  app.use("/", route);
});


// Socket.IO connection event
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on('chat message', async (msg) => {
    try {
      const savedMessage = await Message.create({
        chatId: msg.chatId,
        senderId: msg.userId,
        text: msg.text,
      });

      // Broadcast the saved message to all connected clients
      io.emit('chat message', savedMessage);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  // Disconnect event
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

//database
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
