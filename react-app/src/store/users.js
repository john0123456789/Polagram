const GET_USER = 'users/GET_USER';


const getUser = users => ({
    type:GET_USER,
    users
})


export const getAUser = (id) => async(dispatch) => {
    const response = await fetch (`/api/users/${id}`)

    if (response.ok) {
        const users = await response.json()
        dispatch(getUser(users))
    }
}

const initialState = {}

export const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USER:
            const anotherState= {};
            action.users.forEach((user) => {
            return anotherState[user.id] = user;
            });
            return anotherState

        default:
            return state
    }
}
