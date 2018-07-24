import React, { Component } from 'react';

import './Card.css';

class Card extends Component {
  render() {
    let angle = this.props.ang;
    let randomX = this.props.x;
    let randomY = this.props.y;
    return (
      <div className="App">
        <li>
          <img
            src={this.props.src}
            alt=""
            style={{
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }}
          />
        </li>
      </div>
    );
  }
}

export default Card;
