import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../actionCreator';

class NewCommentForm extends Component {
  state = { comment: '' };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.addComment(this.state.comment, this.props.id);
    this.setState({ comment: '' });
  };

  handleCommentChange = evt => {
    this.setState({ comment: evt.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} className="text-left">
          <div className="form-group">
            <textarea
              className="form-control"
              onChange={this.handleCommentChange}
              value={this.state.comment}
              required
            />
          </div>
          <button type="submit" className="btn btn-success my-2">
            Add Comment
          </button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  { addComment }
)(NewCommentForm);
