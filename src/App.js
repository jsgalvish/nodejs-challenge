import React from 'react';
const io = require('socket.io-client');

let socket = io('http://localhost:5000');
socket.emit('newMessage', 'Hi There!');

function App() {
  return (
    <div className='App'>
      <h1>Hi There!</h1>
    </div>
  );
}

export default App;
