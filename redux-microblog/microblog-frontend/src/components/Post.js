import React, { Component } from 'react';
import CommentList from '../containers/CommentList';
import '../assets/Post.css';

export default class Post extends Component {
  render() {
    return (
      <li className="blog-post">
        <h2 className="blog-post-title">{this.props.post.title}</h2>
        <p className="mt-3 mb-4">{this.props.post.body}</p>

        <button
          type="button"
          className="btn btn-primary mx-1"
          onClick={this.props.likPost}
        >
          <i className="far fa-thumbs-up" /> {this.props.post.upvote}
        </button>
        <button
          type="button"
          className="btn btn-secondary mx-1"
          onClick={this.props.dislikPost}
        >
          <i className="far fa-thumbs-down" /> {this.props.post.downvote}
        </button>
        <button
          type="button"
          className="btn btn-warning mx-1"
          onClick={this.props.toggleEdit}
        >
          <i className="fas fa-edit" />
        </button>
        <button
          type="button"
          className="btn btn-info mx-1"
          onClick={this.props.toggleComment}
        >
          <i className="fas fa-comment-dots" />
        </button>
        <button
          type="button"
          className="btn btn-danger mx-1"
          onClick={this.props.deletePost}
        >
          <i className="fas fa-trash-alt" />
        </button>

        <CommentList post={this.props.post} />
      </li>
    );
  }
}
