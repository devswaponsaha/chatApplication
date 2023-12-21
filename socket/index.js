const { Server } = require("socket.io");

const io = new Server({
  cors: "http://localhost:5173/",
});

const onlineUsers = [];

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("addNewUser", (userId) => {
    onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    });
    
    
    console.log('Online User', onlineUsers);
});

io.listen(3000);
