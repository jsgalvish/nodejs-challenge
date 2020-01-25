const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on('connection',(socket) =>{
  console.log('New Client is Connected')

  socket.on('chat-message', (msg) => {
    console.log(`New Message: ${msg}`);
    socket.broadcast.emit("chat-message", msg);
  })
});

http.listen(PORT, () => {
  console.log(`server running PORT: ${PORT}`)
});
