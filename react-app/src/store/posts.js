const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const DELETE_POST = 'posts/DELETE_POST';
const UPDATE_POST = 'posts/UPDATE_POST'

const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts,
  });

const createPosts = (createdPost) => ({
    type: CREATE_POST,
    createdPost,
})

const deletePost = (post) => ({
    type: DELETE_POST,
    post,
})

const updatePost = (post) => ({
  type: UPDATE_POST,
  post,
})

  const initialState = {};

export const getAllPostsThunk = () => async(dispatch) => {
    const response = await fetch('/api/posts/')
    const data = await response.json();
    dispatch(getAllPosts(data.posts))
    return data.posts
}

export const createPostThunk = (createdPost) => async(dispatch) => {
    const response = await fetch('/api/posts/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createdPost),
    });
    if (response.ok) {
      const createdPost = await response.json();
      dispatch(createPosts(createdPost));
      return createdPost;
    }
  };

export const deletePostThunk = (post, id) => async(dispatch) => {
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  })
  if (response.ok) {
    const postId = await response.json(post)
    dispatch(deletePost(postId))
    return postId;
  }
}

export const updatePostThunk = (post, id) => async(dispatch) => {
  const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
    if (response.ok) {
      const post = await response.json();
      dispatch(updatePost(post));
      return post;
    }
  }

export const postsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_ALL_POSTS:
            action.posts.forEach((post) => {
                return newState[post.id] = post;
            })
            return newState;
        case CREATE_POST:
            if (!state[action.createdPost.id]) {
                newState = {
                    ...state,
                    [action.createdPost.id]: action.createdPost,
                };
            }
            return newState;
        case UPDATE_POST:
          newState = {...state, [action.post.id]: action.post,};
            return newState
        case DELETE_POST:
            delete newState[action.post.id]
            return newState
        default:
            return state;
    }
}
