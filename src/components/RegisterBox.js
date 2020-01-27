import React, { Component } from 'react';
import axios from 'axios';
import LogoImage from '../assets/img/logo.png';

class RegisterBox extends Component{

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    }
  }

  submitHandler(e){
    e.preventDefault()

    if(this.usernameInput.value === ''){
      alert('username required')
      return false
    } else if ( this.passwordInput.value === '') {
      alert('password required')
      return false
    }

    let userData = {
      username: this.usernameInput.value,
      password: this.passwordInput.value
    }

    axios.post("http://localhost:5000/user/register", userData).then((res) => {
        if (res.status === 200 && res.data.status === 'success'){
          alert('Succesfull Registered');
          this.props.showLoginBox();
        } else if (res.data.status === 'error'){
          alert(res.data.message)
        }

    }).catch((err) => {
      alert('Error Conection to the Server!!')
    })
  }

  render(){
    return(
      <div className='login-box'>
        <div className='login-card'>
          <img src={LogoImage} alt='logo' />
          <form>
            <input
              name= 'username'
              type= 'text'
              placeholder='Username'
              autoComplete="on"
              ref={input => (this.usernameInput = input )}
            />
            <input
              name='userPass'
              type= 'password'
              placeholder='Password'
              autoComplete='new-password'
              ref={input => (this.passwordInput = input )}
            />
            <button type='button' onClick={this.submitHandler.bind(this)}>
              <b>Register</b>
            </button>
            <div id='link-register' onClick={this.props.showLoginBox}>login instead?</div>
          </form>
        </div>
      </div>
    )
  }
}

export default RegisterBox;
