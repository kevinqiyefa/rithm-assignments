import React, { Component } from 'react';
import './Die.css';

class Die extends Component {
  render() {
    return (
      <button
        className="Die"
        style={{ backgroundColor: this.props.locked ? "darkred" : "red" }}
        onClick={evt => this.props.handleClick(this.props.idx)}>
        {this.props.val}
      </button>
    )
  }
}

export default Die;