const socketIo = require("socket.io");
require("dotenv").config();
exports.init = (app) => {
  const server = require("http").Server(app);
  const io = socketIo(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", (room) => {
      socket.join(room);
    });

    socket.on("comment", (data) => {
      const room = data.room;

      io.to(room).emit("comment", { comment: data.comment, user: data.user });
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });
  server.listen(4000, () => {
    console.log("Server listening on port 4000");
  });
};
