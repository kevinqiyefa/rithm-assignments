import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Post from '../components/Post';
import { connect } from 'react-redux';
import EditablePost from '../components/EditablePost';
import '../assets/PostList.css';

class PostList extends Component {
  handleDelete = id => {
    this.props.dispatch({ type: 'DELETE_POST', id });
  };

  handleToggle = id => {
    this.props.dispatch({ type: 'TOGGLE_EDITING', id });
  };

  handleToggleComment = id => {
    this.props.dispatch({ type: 'TOGGLE_COMMENTING', id });
  };

  handleUpdate = (id, title, body) => {
    this.props.dispatch({ type: 'UPDATE_POST', title, body, id });
  };

  handleAddUpvote = id => {
    this.props.dispatch({ type: 'ADD_UPVOTE', id });
  };
  handleAddDownvote = id => {
    this.props.dispatch({ type: 'ADD_DOWNVOTE', id });
  };

  render() {
    const posts = this.props.posts.map(
      post =>
        !post.isEditing ? (
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

export default connect(mapStateToProps)(PostList);
