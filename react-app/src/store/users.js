const GET_USER = 'users/GET_USER';


const getUser = user => ({
    type:GET_USER,
    user
})


export const getAUser = (userId) => async(dispatch) => {
    const response = await fetch (`/api/users/${userId}`)
    const data = await response.json();
    dispatch(getUser(data.user))
    return data.user
}

const initialState = {}

export const usersReducer = (state = initialState, action) => {
    // let newState = {...state};
    switch(action.type) {
        case GET_USER:
            return [...action.user]

        default:
            return state
    }
}
