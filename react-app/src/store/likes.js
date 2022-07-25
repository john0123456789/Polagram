const GET_LIKES = 'posts/GET_LIKES'

const getAllLikes = likes => ({
    type: GET_LIKES,
    likes
 });

export const getAllLikesThunk = (id) => async(dispatch) => {
    const res = await fetch(`/api/posts/${id}`)

    if(res.ok) {
        const likes = await res.json()
        dispatch(getAllLikes(likes))
    }
}

const initialState = {};


export const likesReducer = (state = initialState, action) => {
    let newState = { ...state }
    switch (action.type) {
        case GET_LIKES:
            const anotherState = {};
            action.likes.forEach((like) => {
            return anotherState[like.id] = like;
        });
            return anotherState;

    }
}
