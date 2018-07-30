import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

class Home extends Component {
  render() {
    const color_list = this.props.cls.map((c, idx) => (
      <Link key={idx} to={`/colors/${c.color}`}>
        <h3>{c.color}</h3>
      </Link>
    ));
    return (
      <div className="Home">
        <div className="header">
          <h2>Welcome to the color factory.</h2>
          <Link to="/colors/new">
            <h1>Add a color</h1>
          </Link>
        </div>
        <div className="cls">{color_list}</div>
      </div>
    );
  }
}

export default Home;
