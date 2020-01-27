import React, { Component } from 'react';
import axios from 'axios';
import LogoImage from '../assets/img/logo.png';

class RegisterBox extends Component{

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      email: '',
      fullName: ''
    }
  }

  submitHandler(e){
    e.preventDefault()

    if(this.usernameInput.value === ''){
      alert('username required')
      return false
    } else if ( this.fullnameInput.value === ''){
      alert('fullname required')
      return false
    } else if ( this.emailInput.value === ''){
      alert('email required')
      return false
    } else if ( this.passwordInput.value === '') {
      alert('password required')
      return false
    }

    let userData = {
      fullName: this.usernameInput.value,
      username: this.fullnameInput.value,
      email:  this.emailInput.value,
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
          <div>
            <input
              name= 'username'
              type= 'text'
              placeholder='Username'
              ref={input => (this.usernameInput = input )}
            />
            <input
              name= 'fullname'
              type= 'text'
              placeholder='FullName'
              ref={input => (this.fullnameInput = input )}
            />
            <input
              name= 'email'
              type= 'text'
              placeholder='email'
              ref={input => (this.emailInput = input )}
            />
            <input
              name='userPass'
              type= 'password'
              placeholder='Password'
              ref={input => (this.passwordInput = input )}
            />
            <button type='button' onClick={this.submitHandler.bind(this)}>
              Register
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default RegisterBox;
