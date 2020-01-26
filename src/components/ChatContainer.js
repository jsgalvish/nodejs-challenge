import React, { Component } from 'react';
import ChatInputBar from './ChatInputBar';

class ChatContainer extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div id='main-area'>
        <div>

        </div>
        <ChatInputBar />
      </div>
    )
  }
}

export default ChatContainer;
