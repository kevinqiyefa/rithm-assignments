import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container header-content">
            <Link to="/" className="navbar-brand">
              DEMO Streaming
            </Link>

            <form className="form-inline my-2 my-lg-0">
              <div className="mr-3 text-white">Login</div>
              <div className="btn btn-dark  btn-sm my-sm-0">
                Start your free trial
              </div>
            </form>
          </div>
        </nav>
      </div>
    );
  }
}

export default Header;
