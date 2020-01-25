const EventEmitter = require('events').EventEmitter;

class ChatStore extends EventEmitter{

  constructor() {
    super();
    this.state = {
      messages:[]
    }
  }

  addMessage(msg){
    this.state.messages.push(msg);
    this.emit('new-message', msg);
  }
}

module.exports = new  ChatStore();
