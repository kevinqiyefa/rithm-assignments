import React, { Component } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <div className="login-content">
          <h1>You need to login first</h1>
        </div>
        <button>Login</button>
      </div>
    );
  }
}

export default Login;
