import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../assets/NewPostForm.css';
import { addPost } from '../actionCreator';

class NewPostForm extends Component {
  state = { title: '', body: '', newpost: false };

  handleSubmit = evt => {
    evt.preventDefault();
    // check if valid
    if (this.state.title && this.state.body) {
      this.props.addPost(this.state.title, this.state.body);
      this.setState({ title: '', body: '' });
    }
  };

  handleTitleChange = evt => {
    this.setState({ title: evt.target.value });
  };
  handleBodyChange = evt => {
    this.setState({ body: evt.target.value });
  };

  newPostToggle = () => {
    this.setState({ newpost: !this.state.newpost });
  };

  render() {
    return (
      <div className="container w-75 post-form">
        <h1 id="post-heading">Wanna share your story?</h1>
        <button
          type="button"
          className="btn btn-success btn-lg newPostFormBtn"
          onClick={this.newPostToggle}
        >
          New Post
        </button>
        {this.state.newpost ? (
          <form onSubmit={this.handleSubmit} className="text-left">
            <div className="form-group">
              <label htmlFor="title">Title:</label>
              <input
                className="form-control"
                type="text"
                id="title"
                onChange={this.handleTitleChange}
                value={this.state.title}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Body:</label>
              <textarea
                className="form-control"
                id="body"
                onChange={this.handleBodyChange}
                value={this.state.body}
                rows="4"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary float-right my-2">
              Add Post
            </button>
          </form>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { addPost }
)(NewPostForm);
