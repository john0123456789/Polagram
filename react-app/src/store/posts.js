const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const DELETE_POST = 'posts/DELETE_POST'

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
    post
})

  const initialState = {};

export const getAllPostsThunk = () => async(dispatch) => {
    const response = await fetch('/api/posts')
    const data = await response.json();
    dispatch(getAllPosts(data.posts))
    return data.posts
}

export const createPostThunk = (createdPost) => async(dispatch) => {
    const response = await fetch('/api/post/create', {
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
            return newState
        case DELETE_POST:
            delete newState[action.post.id]
            return newState
        default:
            return state;
    }
}
