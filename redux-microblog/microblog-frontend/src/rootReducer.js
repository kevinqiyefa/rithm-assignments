const INITIAL_STATE = {
  posts: []
};

export default function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'FETCH_POSTS':
      return {
        posts: action.posts.sort((a, b) => b.upvote - a.upvote)
      };

    case 'ADD_POST':
      return {
        posts: [
          ...state.posts,
          {
            title: action.title,
            body: action.body,
            id: action.id,
            is_editing: false,
            is_commenting: false,
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
            post.is_editing = false;
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
            post.is_editing = !post.is_editing;
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
            post.is_commenting = !post.is_commenting;
          }
          return post;
        })
      };

    case 'ADD_COMMENT':
      return {
        posts: state.posts.map(post => {
          if (action.postID === post.id) {
            post.comments = [
              ...post.comments,
              {
                comment: action.comment,
                id: action.id,
                is_editing_comment: false
              }
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
                c.is_editing_comment = !c.is_editing_comment;
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
            post.is_commenting = false;
            post.comments.map(c => {
              if (action.commentID === c.id) {
                c.is_editing_comment = false;
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
