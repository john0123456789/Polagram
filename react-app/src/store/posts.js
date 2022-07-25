import {csrfFetch} from './csrf';

const GET_ALL_POSTS = 'posts/GET_ALL_POSTS';

const getAllPosts = (posts) => ({
    type: GET_ALL_POSTS,
    posts,
  });

  const initialState = {};

export const getAllPostsThunk = () => async(dispatch) => {
    const response = await csrfFetch('/api/posts')
    const data = await response.json();
    dispatch(getAllPosts(data))
}

export const postsReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_ALL_POSTS:
            action.posts.forEach((post) => {
                return newState[post.id] = post;
            })
            return newState;
        default:
            return state;
    }
}
