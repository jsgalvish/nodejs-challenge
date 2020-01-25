import React, {Component} from 'react';

class ChatInputBar extends Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <div className='chat-bar'>
        <form id='chat-form'>
          <input id='chat-input' type='text' placeholder='Type your message...'/>
          <button id='chat-submit' type='submit'>Send Message</button>
        </form>
      </div>
    )
  }
}

export default ChatInputBar;
