import React, { Component, Fragment} from 'react';
import ChatContainer from './components/ChatContainer';
import './css/App.css';

//const io = require('socket.io-client');

//let socket = io('http://localhost:5000');
//socket.emit('newMessage', 'Hi There!');

class App extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    return(
      <Fragment>
        <ChatContainer />
      </Fragment>
    )
  }

}

export default App;
