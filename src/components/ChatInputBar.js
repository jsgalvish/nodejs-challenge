import React, {Component} from 'react';
let ChatStore = require('./ChatStore')

class ChatInputBar extends Component{
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  sendMessage(e){
    e.preventDefault();
    this.setState({message: this.msgInput.value});
    ChatStore.addMessage(this.msgInput.value);
    this.msgInput.value = '';
  }

  render(){
    return(
      <div className='chat-bar'>
        <form id='chat-form'>
          <input
            id='chat-input'
            type='text'
            placeholder='Type your message...'
            autoComplete='off'
            ref={(input) => {this.msgInput = input}}
          />
          <button id='chat-submit' type='submit' onClick={this.sendMessage.bind(this)}>Send Message</button>
        </form>
      </div>
    )
  }
}

export default ChatInputBar;
