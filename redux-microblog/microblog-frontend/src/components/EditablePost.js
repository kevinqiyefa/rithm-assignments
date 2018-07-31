import React, { Component } from 'react';

export default class EditablePost extends Component {
  state = { title: this.props.title, body: this.props.body };

  handleTitleChange = evt => {
    this.setState({ title: evt.target.value });
  };
  handleBodyChange = evt => {
    this.setState({ body: evt.target.value });
  };

  submitUpdate = evt => {
    evt.preventDefault();
    this.props.updatePost(this.state.title, this.state.body);
  };

  render() {
    return (
      <li>
        <form onSubmit={this.submitUpdate} className="text-left">
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              onChange={this.handleTitleChange}
              value={this.state.title}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              className="form-control"
              onChange={this.handleBodyChange}
              value={this.state.body}
              rows="4"
              required
            />
          </div>
          <button type="submit" className="btn btn-success my-2">
            Update
          </button>
        </form>
      </li>
    );
  }
}
