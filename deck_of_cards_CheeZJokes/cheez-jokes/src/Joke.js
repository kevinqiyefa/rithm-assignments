import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
  render() {
    const style = { margin: '0 1em 0 0' };

    return (
      <div className="Joke">
        <li>{this.props.joke}</li>
        <button className="btn" onClick={this.props.upvote} style={style}>
          <i className="far fa-thumbs-up" /> ({this.props.like})
        </button>
        <button className="btn" onClick={this.props.downvote}>
          <i className="far fa-thumbs-down" /> ({this.props.dislike})
        </button>
      </div>
    );
  }
}

export default Joke;
