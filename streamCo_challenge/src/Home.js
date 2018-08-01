import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import './Home.css';

import ProgramCard from './ProgramCard';

class Home extends Component {
  render() {
    return (
      <div>
        <nav className="navbar sec-nav">
          <div className="container text-white header-content">{`Popular ${
            this.props.title
          }`}</div>
        </nav>
        <div className="home-container">
          <Link to="/series" className="links">
            <ProgramCard
              title="Series"
              url="https://s-media-cache-ak0.pinimg.com/originals/5a/41/8b/5a418b5677fcb4c14c998f1c0b96e976.jpg"
            />
          </Link>
          <Link to="/movies" className="links">
            <ProgramCard
              title="Movies"
              url="http://www.hun.is/wp-content/uploads/2014/10/cinema_popcorn.jpg"
            />
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
