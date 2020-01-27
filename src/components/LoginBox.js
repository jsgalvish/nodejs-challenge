import React, { Component } from 'react';
import axios from 'axios';
import LogoImage from '../assets/img/logo.png';

let ChatStore = require('./ChatStore');

class LoginBox extends Component{
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
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

    axios.post('http://localhost:5000/user/login', {
      username: this.userNameInput.value,
      password: this.passwordInput.value
    }).then((res)=>{
      if (res.status === 200 && res.data.status === 'success'){
        this.setState({
          username: this.userNameInput.value,
          password: this.passwordInput.value });

        ChatStore.init(this.userNameInput.value);

        this.props.hideLoginBox();

      }else if (res.data.status === 'error'){
        alert(res.data.msg);
        this.passwordInput.value = ''
      }
    }).catch((err)=>{
      alert(`Connection Error: ${err}`)
    });

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
              ref={usernameInput => (this.userNameInput = usernameInput )}
            />
            <input
              name = 'password'
              type= 'password'
              placeholder='Password'
              ref={passwordInput => (this.passwordInput = passwordInput )}
            />
            <button type='button' onClick={this.submitHandler.bind(this)}>
              Login
            </button>
            <div id='link-register' onClick={this.props.showRegisterBox}>Need an account?</div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginBox;
