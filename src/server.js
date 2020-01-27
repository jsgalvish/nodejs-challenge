const cors = require('cors');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const http = require("http").createServer(app);
const io = require("socket.io")(http);

let mongoose = require('mongoose');
let BodyParser = require("body-parser");

app.use(cors());

app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());


mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true)
//mongoose.connect('mongodb+srv://root:root@chatusers-2bz1s.gcp.mongodb.net/chat_users?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://admin:admin0123@chatusers-2bz1s.gcp.mongodb.net/chat_users?retryWrites=true&w=majority',function(err) {
  if(err){ console.log(err);}
  else{
    console.log('connected');}
});

let userMode = require('../api/models/userModel')
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
