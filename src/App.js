import React, {Component} from 'react';
import LoginBox from './components/LoginBox';

import './assets/css/App.css';
import ChatContainer from './components/ChatContainer';

const io = require('socket.io-client');
let ChatStore = require('./components/ChatStore');

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://localhost:5000',
      showLoginBox: true,
      messages: []
    }
  }

  initSocket(){
    this.io= io(this.state.url)
  }

  componentDidMount() {
    this.initSocket();

    this.io.on('chat-message', msg =>{
      console.log('Message from Another User', msg)
    })

    ChatStore.on('new-message', msg => {
      this.io.emit('chat-message', msg);
    });
  }

  hideLoginBox(){
    this.setState({showLoginBox:false});
  }

  render(){
    return(
      <div>
        { this.state.showLoginBox && <LoginBox hideLoginBox={this.hideLoginBox.bind(this)}/> }
        <div className='chat'>
            <div id='side-area'>
            </div>
            <ChatContainer />
        </div>
      </div>
    )
  }
}

export default App;
