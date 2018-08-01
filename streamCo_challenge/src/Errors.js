import React, { Component } from 'react';

import './Home.css';

class Home extends Component {
  render() {
    return (
      <div>
        <nav className="navbar sec-nav">
          <div className="container text-white">{`Popular ${
            this.props.title
          }`}</div>
        </nav>
        <h3 className="home-container mt-5">Oops, something went wrong.</h3>
      </div>
    );
  }
}

export default Home;
