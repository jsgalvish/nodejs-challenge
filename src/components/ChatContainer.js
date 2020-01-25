import React, {Component} from 'react';
import ChatInputBar from './ChatInputBar';
const io = require('socket.io-client');


let ChatStore = require('./ChatStore');

class ChatContainer extends Component{
  constructor(props) {
    super(props);
    this.state = { url: 'http://localhost:5000' }
  }

  initSocket(){
    this.io= io(this.state.url)
  }

  componentDidMount() {
    this.initSocket();

    ChatStore.on('new-message', msg => {
      this.io.emit('chat-message', msg);

      this.io.on('chat-message', msg =>{
        console.log('Message from Another User', msg)
      })
    });


  }

  render(){
    return(
      <div className='chat'>
          <div id='side-area'>
          </div>
          <div id='main-area'>
            <div></div>
            <ChatInputBar />
          </div>
      </div>
    )
  }
}

export default ChatContainer;
