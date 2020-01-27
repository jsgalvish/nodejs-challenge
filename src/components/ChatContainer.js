import React, { Component } from 'react';
import lodash from 'lodash'
import ChatInputBar from './ChatInputBar';

class ChatContainer extends Component{

  componentDidUpdate(){
    let scroll = document.getElementById("scroll-messages");
    scroll.scrollTop = scroll.scrollHeight;
  }

  render(){
    return(
      <div id='main-area'>
        <div className='chat-messages'>
          <ul id='scroll-messages'>
            {
              lodash.takeRight(this.props.messages, 50).map((msgObj, index) =>{
              if(msgObj.username === this.props.username) {
                return <li key={index} className='msg-me'> <b>{'[you]  '}</b>  {msgObj.msg + '   '} </li>
              }
              else if (msgObj.username === 'bot'){
                return <li key={index} className='msg-bot'><b> {msgObj.msg + '   '} </b></li>
              }
              else{
                return <li key={index} className='msg-others'> <b>{'[' + msgObj.username +']'}</b> {'   ' + msgObj.msg}</li>
              }
            })}
          </ul>

        </div>
        <ChatInputBar />
      </div>
    )
  }
}

export default ChatContainer;
