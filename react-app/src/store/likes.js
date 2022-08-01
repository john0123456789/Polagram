const GET_LIKES = 'posts/GET_LIKES'
const ADD_LIKES = 'posts/ADD_LIKES'
const DELETE_LIKES = 'posts/DELETE_LIKES'

const getAllLikes = (likes) => ({
    type: GET_LIKES,
    likes
 });

 const addLikes = createdLike => ({
    type: ADD_LIKES,
    createdLike
 })

 const deleteLikes = deleteLike => ({
    type: DELETE_LIKES,
    deleteLike
 })


export const getAllLikesThunk = () => async(dispatch) => {
    const response = await fetch(`/api/likes/`)
    const data = await response.json();
    dispatch(getAllLikes(data.likes))
    return data.likes
}

export const addLikesThunk = (createdLike) => async(dispatch) => {
    const res = await fetch (`/api/likes/new/`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(createdLike)
    })

    if (res.ok) {
        const newLike = await res.json()
        dispatch(addLikes(newLike))
        return newLike
    }
}


export const deleteLikesThunk = (deleteLike, id) => async(dispatch) => {
    const res = await fetch(`/api/likes/${id}`, {
        method: 'DELETE',
    });
    if (res.ok) {
        const deleted = await res.json(deleteLike);
        dispatch(deleteLikes(deleted));
        return deleted;
    }
}



const initialState = {};

export const likesReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_LIKES:
            action.likes.forEach((like) => {
                return newState[like.id] = like;
            })
            return newState;

        case ADD_LIKES:
            return { ...state, [action.createdLike.id]: {...action.createdLike}}

        case DELETE_LIKES:
            delete newState[action.deleteLike.id];
            return newState
    default:
        return state;

    }
}
