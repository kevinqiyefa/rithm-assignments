import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Chips.css';
import chips from './chips.png';

export default class Chips extends Component {
  state = { count: 0, chips: [] };

  eaten = () => {
    const x = Math.random() * 80;
    const y = Math.random() * 80;

    this.setState({
      count: this.state.count + 1,
      chips: [...this.state.chips, { x, y }]
    });
  };

  render() {
    const bag = this.state.chips.map((b, idx) => (
      <img
        className="bag"
        key={idx}
        src={chips}
        alt=""
        style={{ top: `${b.x}%`, left: `${b.y}%` }}
      />
    ));
    return (
      <div className="Chips">
        <div className="content">
          <h1>Bags eaten: {this.state.count}</h1>
          <button className="btn" onClick={this.eaten}>
            Nom Nom Nom
          </button>
          <h1>
            <Link to="/">Go back</Link>
          </h1>
        </div>
        {bag}
      </div>
    );
  }
}
