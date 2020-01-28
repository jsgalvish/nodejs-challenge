import React, {Component} from 'react';

class ChatSelector extends Component{

  submitChangeRoom(room){
    this.props.updateRoom(room);
  }
  render(){
    return(
      <div className='chat-selector'>
        <button type='button' onClick={ () => this.submitChangeRoom('a') }>Alpha Room</button>
        <button type='button' onClick={ ()=> this.submitChangeRoom('b')}>Bravo Room</button>
        <button type='button' onClick={ () => this.submitChangeRoom('c')}>Charlie Room</button>
        <button type='button' onClick={ () => this.submitChangeRoom('d')}>Delta Room</button>
        <button type='button' onClick={ () => this.submitChangeRoom('e')}>Echo Room</button>
      </div>
    )
  }
}

export default ChatSelector
