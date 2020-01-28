const cors = require('cors');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let mongoose = require('mongoose');

let BodyParser = require("body-parser");
const bot = require('./bot');

app.use(cors());

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)
mongoose.connect('mongodb+srv://admin0123:admin0123@chatusers-2bz1s.gcp.mongodb.net/chat_users?retryWrites=true&w=majority');

let userModel = require('../api/models/userModel');
let userRoutes = require('../api/routes/userRoutes');
let messageModel = require('../api/models/messageModel');
let messageRoutes = require('../api/routes/messageRoutes');

userRoutes.route(app);
messageRoutes.route(app);

io.on('connection',(socket) =>{

  socket.on('connect-room', (room) => {
    socket.join(room);
  })


  socket.on('chat-message', (data) => {
    let listenerBot = new bot(socket, data.msg, data.room);
    listenerBot.sent();
    socket.broadcast.to(data.room).emit("chat-message", data);
  })
});

http.listen(PORT, () => {
  console.log(`server running PORT: ${PORT}`)
});
