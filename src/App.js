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
      messages: [],
      username: ''
    }
  }

  initSocket(){
    this.io= io(this.state.url)
  }

  componentDidMount() {
    this.initSocket();

    ChatStore.on('initialize', (username) => {
      this.setState({username: username })
    })

    this.io.on('chat-message', newMsg =>{
      this.setState((prevState) => ({messages: [...prevState.messages, newMsg]}));
      console.log('Message from Another User', newMsg)
    })

    ChatStore.on('new-message', msg => {
      let newMsg = {msg: msg, username: this.state.username};
      console.log(newMsg);
      this.setState((prevState) => ({messages: [...prevState.messages, msg]}));
      this.io.emit('chat-message', newMsg);
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
