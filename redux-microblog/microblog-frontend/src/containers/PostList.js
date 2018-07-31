import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Post from '../components/Post';
import { connect } from 'react-redux';
import EditablePost from '../components/EditablePost';
import '../assets/PostList.css';
import {
  fetchPosts,
  updatePost,
  handleEditingToggle,
  deletePost,
  addUpvote,
  addDownvote,
  handleCommentingToggle
} from '../actionCreator';

class PostList extends Component {
  componentDidMount() {
    this.props.fetchPosts();
  }

  handleDelete = id => {
    this.props.deletePost(id);
  };

  handleToggle = id => {
    this.props.handleEditingToggle(id);
  };

  handleToggleComment = id => {
    this.props.handleCommentingToggle(id);
  };

  handleUpdate = (id, title, body) => {
    this.props.updatePost(id, title, body);
  };

  handleAddUpvote = id => {
    this.props.addUpvote(id);
  };
  handleAddDownvote = id => {
    this.props.addDownvote(id);
  };

  render() {
    const posts = this.props.posts.map(
      post =>
        !post.is_editing ? (
          <Post
            post={post}
            likPost={() => this.handleAddUpvote(post.id)}
            dislikPost={() => this.handleAddDownvote(post.id)}
            toggleEdit={() => this.handleToggle(post.id)}
            toggleComment={() => this.handleToggleComment(post.id)}
            deletePost={() => this.handleDelete(post.id)}
            key={uuid()}
          />
        ) : (
          <EditablePost
            title={post.title}
            body={post.body}
            updatePost={(newTitle, newBody) =>
              this.handleUpdate(post.id, newTitle, newBody)
            }
            key={uuid()}
          />
        )
    );
    return (
      <div className="container posts">
        {this.props.posts.length ? (
          <h3 className="pb-3 mb-4 font-italic border-bottom text-left">
            MY STORIES
          </h3>
        ) : (
          ''
        )}
        <ul>{posts}</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { posts: state.posts };
}

export default connect(
  mapStateToProps,
  {
    fetchPosts,
    updatePost,
    handleEditingToggle,
    deletePost,
    addUpvote,
    addDownvote,
    handleCommentingToggle
  }
)(PostList);
