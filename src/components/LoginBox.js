import React, { Component } from 'react';
import LogoImage from '../assets/img/logo.png';

let ChatStore = require('./ChatStore');

class LoginBox extends Component{
  constructor(props) {
    super(props);

    this.state = {
      username: ''
    }
  }

  submitHandler(){
    if(this.userNameInput.value === ''){
      alert('Username Required');
      return
    } else if ( this.passwordInput.value === ''){
      alert('Enter your Password');
      return;
    }

    this.setState({ username: this.userNameInput.value, password: this.passwordInput });

    this.props.hideLoginBox();

    ChatStore.init(this.userNameInput.value)
  }

  render(){
    return(
      <div className='login-box'>
        <div className='login-card'>
          <img src={LogoImage} alt='logo' />
          <div>
            <input
              name = 'username'
              type= 'text'
              placeholder='Username or Email'
              //onChange={this.handleUsernameChange.bind(this)}
              ref={usernameInput => (this.userNameInput = usernameInput )}
            />
            <input
              name = 'password'
              type= 'password'
              placeholder='Password'
              //onChange={this.handleUsernameChange.bind(this)}
              ref={passwordInput => (this.passwordInput = passwordInput )}
            />
            <button type='button' onClick={this.submitHandler.bind(this)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginBox;
