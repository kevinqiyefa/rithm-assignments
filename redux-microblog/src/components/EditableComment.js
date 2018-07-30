import React, { Component } from 'react';

export default class EditableComment extends Component {
  state = { comment: this.props.comment };

  handleCommentChange = evt => {
    this.setState({ comment: evt.target.value });
  };

  submitUpdate = evt => {
    evt.preventDefault();
    this.props.updateComment(this.state.comment);
  };

  render() {
    return (
      <li>
        <form onSubmit={this.submitUpdate} className="text-left">
          <div className="form-group">
            <textarea
              className="form-control"
              onChange={this.handleCommentChange}
              value={this.state.comment}
              required
            />
          </div>
          <button type="submit" className="btn btn-warning my-2">
            Update
          </button>
        </form>
      </li>
    );
  }
}
