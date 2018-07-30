import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Comment from '../components/Comment';
import { connect } from 'react-redux';
import NewCommentForm from './NewCommentForm';
import EditableComment from '../components/EditableComment';

class CommentList extends Component {
  handleToggleEditComment = (pID, cID) => {
    this.props.dispatch({
      type: 'TOGGLE_EDITING_COMMENT',
      postID: pID,
      commentID: cID
    });
  };

  handleUpdateComment = (postID, commentID, updateComment) => {
    this.props.dispatch({
      type: 'UPDATE_COMMENT',
      postID,
      commentID,
      updateComment
    });
  };

  handleDeleteComment = (postID, commentID) => {
    this.props.dispatch({ type: 'DELETE_COMMENT', postID, commentID });
  };

  render() {
    const { id, comments, isCommenting } = this.props.post;

    const cms = comments.map(
      c =>
        !c.isEditingComment ? (
          <Comment
            comment={c.comment}
            key={uuid()}
            toggleCommentEdit={() => this.handleToggleEditComment(id, c.id)}
            deleteComment={() => this.handleDeleteComment(id, c.id)}
          />
        ) : (
          <EditableComment
            comment={c.comment}
            key={uuid()}
            updateComment={updatedComment =>
              this.handleUpdateComment(id, c.id, updatedComment)
            }
          />
        )
    );
    return (
      <div>
        {isCommenting ? <NewCommentForm id={id} /> : ''}
        <ul className="container mt-5 ml-3 comments">{cms}</ul>
      </div>
    );
  }
}

export default connect()(CommentList);
