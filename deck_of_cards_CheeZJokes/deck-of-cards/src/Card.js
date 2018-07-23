import React, { Component } from 'react';

import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className="App">
        <li>
          <img
            src={this.props.src}
            alt=""
            style={{
              transform: `translate(${Math.random() * 90 -
                45}px, ${Math.random() * 40 - 20}px) rotate(${Math.random() *
                40 -
                20}deg)`
            }}
          />
        </li>
      </div>
    );
  }
}

export default Card;
