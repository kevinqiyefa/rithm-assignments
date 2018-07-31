import React, { Component } from 'react';

export default class Title extends Component {
  render() {
    return (
      <li className="list-group-item d-inline-flex flex-wrap">
        <h4 className="mb-0 mr-3 flex-wrap">{this.props.title}</h4>

        <button
          type="button"
          className="close ml-2"
          aria-label="Close"
          onClick={this.props.deletePost}
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </li>
    );
  }
}
