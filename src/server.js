const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let BodyParser = require("body-parser");
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

let userRoutes = require('../api/routes/userRoutes');
userRoutes.route(app);


io.on('connection',(socket) =>{
  console.log('New Client is Connected')

  socket.on('chat-message', (msg) => {
    console.log(`New Message: ${msg.msg} - ${msg.username}`);
    socket.broadcast.emit("chat-message", msg);
  })
});

http.listen(PORT, () => {
  console.log(`server running PORT: ${PORT}`)
});
