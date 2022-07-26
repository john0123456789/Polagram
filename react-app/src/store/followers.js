export const GET_FOLLOWERS = 'comment/GET_FOLLOWERS'

const getAllFollowers = (followers) => {
    return {
        type: GET_FOLLOWERS,
        followers
    }
}


export const thunkGetAllFollowers = () => async(dispatch) => {
    const response = await fetch('/api/followers/')
    const data = await response.json();
    dispatch(getAllFollowers(data))
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
        default:
            return state;

    }
}

export default followersReducer
