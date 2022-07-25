const GET_LIKES = 'posts/GET_LIKES'
const ADD_LIKES = 'posts/ADD_LIKES'
const DELETE_LIKES = 'posts/DELETE_LIKES'

const getAllLikes = likes => ({
    type: GET_LIKES,
    likes
 });

 const addLikes = like => ({
    type: ADD_LIKES,
    like
 })

 const deleteLikes = deletelike => ({
    type: DELETE_LIKES,
    deleteLike
 })


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


export const deleteLikesThunk = (deleteLike, id) => async(dispatch) => {
    const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const deleted = await res.json(deleteLike);
        dispatch(deleteLikes(deleted));
        return deleted
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

        case ADD_LIKES:
            return { ...state, [action.like.id]: { ...action.like}}

        case DELETE_LIKES:
            delete newState[action.deleteLike.id];
            return newState

    default:
        return state;

    }
}
