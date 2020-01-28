const EventEmitter = require('events').EventEmitter;

class ChatStore extends EventEmitter{

  constructor() {
    super();
    this.state = {
      messages:[],
      username:'',
      room:''
    }
  }

  init(username, room){
    this.state.username = username;
    this.state.room = room;
    this.emit('initialize',{ username: this.state.username, room: this.state.room });
  }

  addMessage(msg){
    this.state.messages.push(msg);
    this.emit('new-message', msg);
  }
}

module.exports = new  ChatStore();
