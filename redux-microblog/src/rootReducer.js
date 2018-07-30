import uuid from 'uuid/v1';

const INITIAL_STATE = {
  posts: []
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ADD_POST':
      return {
        posts: [
          ...state.posts,
          {
            title: action.title,
            body: action.body,
            id: uuid(),
            isEditing: false,
            isCommenting: false,
            upvote: 0,
            downvote: 0,
            comments: []
          }
        ]
      };

    case 'UPDATE_POST':
      return {
        posts: state.posts.map(post => {
          if (action.id === post.id) {
            post.title = action.title;
            post.body = action.body;
            post.isEditing = false;
          }
          return post;
        })
      };

    case 'ADD_UPVOTE':
      return {
        posts: state.posts
          .map(post => {
            if (action.id === post.id) {
              post.upvote = post.upvote + 1;
            }
            return post;
          })
          .sort((a, b) => b.upvote - a.upvote)
      };

    case 'ADD_DOWNVOTE':
      return {
        posts: state.posts.map(post => {
          if (action.id === post.id) {
            post.downvote = post.downvote + 1;
          }
          return post;
        })
      };

    case 'TOGGLE_EDITING':
      return {
        posts: state.posts.map(post => {
          if (action.id === post.id) {
            post.isEditing = !post.isEditing;
          }
          return post;
        })
      };

    case 'DELETE_POST':
      return {
        posts: state.posts.filter(post => action.id !== post.id)
      };

    case 'TOGGLE_COMMENTING':
      return {
        posts: state.posts.map(post => {
          if (action.id === post.id) {
            post.isCommenting = !post.isCommenting;
          }
          return post;
        })
      };

    case 'Add_COMMENTS':
      return {
        posts: state.posts.map(post => {
          if (action.postID === post.id) {
            post.comments = [
              ...post.comments,
              { comment: action.comment, id: uuid(), isEditingComment: false }
            ];
          }
          return post;
        })
      };

    case 'TOGGLE_EDITING_COMMENT':
      return {
        posts: state.posts.map(post => {
          if (action.postID === post.id) {
            post.comments.map(c => {
              if (action.commentID === c.id) {
                c.isEditingComment = !c.isEditingComment;
              }
              return c;
            });
          }
          return post;
        })
      };

    case 'UPDATE_COMMENT':
      return {
        posts: state.posts.map(post => {
          if (action.postID === post.id) {
            post.isCommenting = false;
            post.comments.map(c => {
              if (action.commentID === c.id) {
                c.isEditingComment = false;
                c.comment = action.updateComment;
              }
              return c;
            });
          }
          return post;
        })
      };

    case 'DELETE_COMMENT':
      return {
        posts: state.posts.map(post => {
          if (action.postID === post.id) {
            post.comments = post.comments.filter(
              c => action.commentID !== c.id
            );
          }
          return post;
        })
      };

    default:
      return state;
  }
}
