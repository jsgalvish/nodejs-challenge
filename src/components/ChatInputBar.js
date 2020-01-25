import React, {Component} from 'react';

class ChatInputBar extends Component{
  constructor(props) {
    super(props);
  }

  sendMessage(e){
    e.preventDefault()
    console.log(`New Message:  ${this.msgInput.value}`)
  }

  render(){
    return(
      <div className='chat-bar'>
        <form id='chat-form'>
          <input
            id='chat-input'
            type='text'
            placeholder='Type your message...'
            ref={(input) => {this.msgInput = input}}
          />
          <button id='chat-submit' type='submit' onClick={this.sendMessage.bind(this)}>Send Message</button>
        </form>
      </div>
    )
  }
}

export default ChatInputBar;
