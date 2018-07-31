import React, { Component } from 'react';
import uuid from 'uuid/v1';
import Comment from '../components/Comment';
import { connect } from 'react-redux';
import NewCommentForm from './NewCommentForm';
import EditableComment from '../components/EditableComment';
import {
  handleEditingCommentToggle,
  updateComment,
  deleteComment
} from '../actionCreator';

class CommentList extends Component {
  handleToggleEditComment = (pID, cID) => {
    this.props.handleEditingCommentToggle(pID, cID);
  };

  handleUpdateComment = (postID, commentID, updateComment) => {
    this.props.updateComment(postID, commentID, updateComment);
  };

  handleDeleteComment = (postID, commentID) => {
    this.props.deleteComment(postID, commentID);
  };

  render() {
    const { id, comments, is_commenting } = this.props.post;

    const cms = comments.map(
      c =>
        !c.is_editing_comment ? (
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
        {is_commenting ? <NewCommentForm id={id} /> : ''}
        <ul className="container mt-5 ml-3 comments">{cms}</ul>
      </div>
    );
  }
}

export default connect(
  null,
  { handleEditingCommentToggle, updateComment, deleteComment }
)(CommentList);
