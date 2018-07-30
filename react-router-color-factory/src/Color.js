import React, { Component } from 'react';
import './Color.css';
import { Link } from 'react-router-dom';

class Color extends Component {
  render() {
    return (
      <div className="Color" style={{ backgroundColor: this.props.cl }}>
        <div className="color-content">
          <h1>This is {this.props.cl}</h1>
          <h1>isnt it beautiful?</h1>
        </div>
        <Link to="/colors">Go Back</Link>
      </div>
    );
  }
}

export default Color;
