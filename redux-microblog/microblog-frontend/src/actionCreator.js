import axios from 'axios';

export function fetchPosts() {
  return async dispatch => {
    const response = await axios.get('http://localhost:3001/api/posts');
    return dispatch({
      type: 'FETCH_POSTS',
      posts: response.data
    });
  };
}

export function addPost(title, body) {
  return async dispatch => {
    const response = await axios.post('http://localhost:3001/api/posts', {
      title,
      body
    });
    return dispatch({
      type: 'ADD_POST',
      title: response.data.title,
      body: response.data.body,
      id: response.data.id
    });
  };
}

export function updatePost(id, title, body) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/api/posts/${id}`, {
      title,
      body
    });
    return dispatch({
      type: 'UPDATE_POST',
      title,
      body,
      id
    });
  };
}

export function deletePost(id) {
  return async dispatch => {
    await axios.delete(`http://localhost:3001/api/posts/${id}`);
    return dispatch({
      type: 'DELETE_POST',
      id
    });
  };
}

export function handleEditingToggle(id) {
  return { type: 'TOGGLE_EDITING', id };
}

export function addUpvote(id) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/api/posts/${id}/votes/upvote`);
    return dispatch({
      type: 'ADD_UPVOTE',
      id
    });
  };
}

export function addDownvote(id) {
  return async dispatch => {
    await axios.patch(`http://localhost:3001/api/posts/${id}/votes/downvote`);
    return dispatch({
      type: 'ADD_DOWNVOTE',
      id
    });
  };
}

export function handleCommentingToggle(id) {
  return { type: 'TOGGLE_COMMENTING', id };
}

export function addComment(comment, postID) {
  return async dispatch => {
    const response = await axios.post(
      `http://localhost:3001/api/posts/${postID}/comments`,
      {
        comment
      }
    );
    return dispatch({
      type: 'ADD_COMMENT',
      comment,
      id: response.data.id,
      postID
    });
  };
}

export function handleEditingCommentToggle(postID, commentID) {
  return { type: 'TOGGLE_EDITING_COMMENT', postID, commentID };
}

export function updateComment(postID, commentID, updateComment) {
  return async dispatch => {
    await axios.patch(
      `http://localhost:3001/api/posts/${postID}/comments/${commentID}`,
      {
        updateComment
      }
    );
    return dispatch({
      type: 'UPDATE_COMMENT',
      postID,
      commentID,
      updateComment
    });
  };
}

export function deleteComment(postID, commentID) {
  return async dispatch => {
    await axios.delete(
      `http://localhost:3001/api/posts/${postID}/comments/${commentID}`
    );
    return dispatch({
      type: 'DELETE_COMMENT',
      postID,
      commentID
    });
  };
}
