import React, { Component } from 'react';
import './ProgramCard.css';

class ProgramCard extends Component {
  render() {
    const title = this.props.title.split(':')[0];
    return (
      <div className="cards">
        <img src={this.props.url} alt="" width="200px" height="300px" />
        <p className="titles mt-3">{title}</p>
      </div>
    );
  }
}

export default ProgramCard;
