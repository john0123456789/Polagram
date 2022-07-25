const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';
const CREATE_POST = 'posts/CREATE_POST';

const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts,
  });

const createPosts = (createdPost) => ({
    type: CREATE_POST,
    createdPost,
})

  const initialState = {};

export const getAllPostsThunk = () => async(dispatch) => {
    const response = await fetch('/api/posts')
    const data = await response.json();
    dispatch(getAllPosts(data))
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

export const postsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_ALL_POSTS:
            action.tests.forEach((test) => {
                return newState[test.id] = test;
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
        default:
            return state;
    }
}
