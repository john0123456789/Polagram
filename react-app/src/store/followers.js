export const GET_FOLLOWERS = 'comment/GET_FOLLOWERS'

const getAllFollowers = (followers) => {
    return {
        type: GET_FOLLOWERS,
        followers
    }
}


export const thunkGetAllFollowers = (followers) => async (dispatch) => {
    const response = await fetch('/api/followers')

    if(response.ok) {
        const data = await response.json();
        dispatch(getAllFollowers(data));
    }
}

const initialState = {};
const followersReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case GET_FOLLOWERS:
            action.followers.forEach(follower => {
                newState[follower.id] = follower
            })
            return newState
    }
}

export default followersReducer
