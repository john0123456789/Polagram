const GET_FOLLOWERS = 'followers/GET_FOLLOWERS'
const ADD_FOLLOW = 'followers/ADD_FOLLOW'
const DELETE_FOLLOW = 'followers/DELETE_FOLLOW'

const getAllFollowers = (followers) => ({
    type: GET_FOLLOWERS,
    followers
 });

 const addFollow = follow => ({
    type: ADD_FOLLOW,
    follow
 })

 const deleteFollow = unfollow => ({
    type: DELETE_FOLLOW,
    unfollow
 })


export const getAllFollowersThunk = (id) => async(dispatch) => {
    const response = await fetch(`/api/followers/${id}`)
    const data = await response.json();
    dispatch(getAllFollowers(data.followers))
    return data.followers
}

export const addFollowThunk = (follow) => async(dispatch) => {
    const res = await fetch (`/api/followers/new/`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify(follow)
    })

    if (res.ok) {
        const newFollow = await res.json()
        dispatch(addFollow(newFollow))
        return newFollow
    }
}

export const deleteFollowThunk = (unfollow, id) => async(dispatch) => {
    const res = await fetch(`/api/followers/${id}`, {
        method: 'DELETE',
    });

    if (res.ok) {
        const deleted = await res.json(unfollow);
        dispatch(deleteFollow(deleted));
        return deleted
    }
}



const initialState = {};

export const followersReducer = (state = initialState, action) => {
    let newState = {...state};
    switch(action.type) {
        case GET_FOLLOWERS:
            action.followers.forEach((follower) => {
                return newState[follower.id] = follower;
            })
            return newState;

        case ADD_FOLLOW:
            return { ...state, [action.follow.id]: {...action.follow}}

        case DELETE_FOLLOW:
            delete newState[action.unfollow.id];
            return newState

    default:
        return state;

    }
}
