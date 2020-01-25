import React, {Component} from 'react';
import ChatInputBar from './ChatInputBar';

class ChatContainer extends Component{
  constructor(props) {
    super(props);
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
