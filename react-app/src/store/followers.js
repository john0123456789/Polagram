const GET_FOLLOWERS = 'followers/GET_FOLLOWERS'
const DELETE_FOLLOW = 'followers/DELETE_FOLLOW'

const getAllFollowers = (followers) => ({
    type: GET_FOLLOWERS,
    followers
 });


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

        case DELETE_FOLLOW:
            delete newState[action.unfollow.id];
            return newState

    default:
        return state;

    }
}
