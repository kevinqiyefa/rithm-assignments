import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewCommentForm extends Component {
  state = { comment: '' };

  handleSubmit = evt => {
    evt.preventDefault();

    this.props.dispatch({
      type: 'Add_COMMENTS',
      postID: this.props.id,
      comment: this.state.comment
    });
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

export default connect()(NewCommentForm);
