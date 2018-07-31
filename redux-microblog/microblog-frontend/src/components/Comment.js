import React, { Component } from 'react';
import '../assets/Comment.css';

export default class Comment extends Component {
  render() {
    return (
      <li className="comment">
        <em className="mr-5">{this.props.comment}</em>

        <button
          type="button"
          className="btn btn-warning mx-1"
          onClick={this.props.toggleCommentEdit}
        >
          <i className="fas fa-edit" />
        </button>
        <button
          type="button"
          className="btn btn-danger mx-1"
          onClick={this.props.deleteComment}
        >
          <i className="fas fa-trash-alt" />
        </button>
      </li>
    );
  }
}
