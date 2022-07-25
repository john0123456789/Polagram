const GET_LIKES = 'posts/GET_LIKES'
const ADD_LIKES = 'posts/ADD_LIKES'
const EDIT_LIKES = 'posts/EDIT_LIKES'

const getAllLikes = likes => ({
    type: GET_LIKES,
    likes
 });

 const addLikes = like => {
    type: ADD_LIKES,
    like
 }


export const getAllLikesThunk = (id) => async(dispatch) => {
    const res = await fetch(`/api/posts/${id}`)

    if(res.ok) {
        const likes = await res.json()
        dispatch(getAllLikes(likes))
    }
}

export const addLikesThunk = newLikes => async(dispatch) => {
    const res = await fetch (`/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(newLike)
    })

    if (res.ok) {
        const newLike = await res.json()
        dispatch(addLikes(newLikes))
        return newLikes
    }
}


const initialState = {};


export const likesReducer = (state = initialState, action) => {
    // let newState = { ...state }
    switch (action.type) {
        case GET_LIKES:
            const anotherState = {};
            action.likes.forEach((like) => {
            return anotherState[like.id] = like;
        });
            return anotherState;

        case ADD_LIKES:
            return { ...state, [action.like.id]: { ...action.like}}

    }
}
