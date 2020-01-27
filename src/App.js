import React, {Component} from 'react';
import axios from 'axios';
import lodash from'lodash';
import LoginBox from './components/LoginBox';
import RegisterBox from './components/RegisterBox';
import ChatStore from './ChatStore';

import './assets/css/App.css';
import ChatContainer from './components/ChatContainer';

const io = require('socket.io-client');

class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      url: 'http://localhost:5000',
      messages: [],
      username: '',
      showLoginBox: true,
      showRegisterBox: false,
    }
  }

  showRegisterBox(){
    this.setState({showLoginBox: false, showRegisterBox: true })
  }

  showLoginBox(){
    this.setState({showLoginBox: true, showRegisterBox: false })
  }

  hideLoginBox(){
    this.setState({showLoginBox: false})
  }

  initSocket(){
    this.io= io(this.state.url)
  }

  loadChat(){
    axios.get(`${this.state.url}/message/all`).then(resp => {

      let  saveMessages = resp.data.messages.map((msg, index) => { return  lodash.omit(msg, '_id') } );
      this.setState( {messages: saveMessages})

    }).catch((err) => {
      console.log(err);
    });
  }

  componentDidMount() {
    this.initSocket();

    ChatStore.on('initialize', (username) => {
      this.loadChat();
      this.setState({username: username })
    });

    ChatStore.on('new-message', msg => {
      let newMsg = {msg: msg, username: this.state.username};
      this.setState((prevState) => ({messages: [...prevState.messages, newMsg]}));

      axios.post("http://localhost:5000/message/save", newMsg).then((res) => {
      }).catch((err) => {
        console.log('Error Conection to the Server!!')
      });

      this.io.emit('chat-message', newMsg);
    });

    this.io.on('bot-message', (newMsg) => {
      this.setState((prevState) => ({messages: [...prevState.messages, newMsg]
      }));
    })

    this.io.on('chat-message', (newMsg) => {
      this.setState((prevState) => ({messages: [...prevState.messages, newMsg]
      }));
    })
  }

  render(){
    return(
      <div>
        { this.state.showLoginBox && <LoginBox showRegisterBox={this.showRegisterBox.bind(this)} hideLoginBox={this.hideLoginBox.bind(this)}/> }
        { this.state.showRegisterBox && <RegisterBox showLoginBox={this.showLoginBox.bind(this)}/>}

        <div className='chat'>
            <div id='side-area'>
            </div>
            <ChatContainer messages={this.state.messages} username={ this.state.username }/>
        </div>
      </div>
    )
  }
}

export default App;
