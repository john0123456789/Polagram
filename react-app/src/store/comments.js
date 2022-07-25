import { csrfFetch } from './csrf';

export const GET_COMMENT = 'comment/GET_COMMENT'

const getAllComments = (comments) => {
    return {
        type: GET_COMMENT,
        comments
    }
}


export const thunkGetAllComments = (comments) => async (dispatch) => {
    const response = await csrfFetch('/api/comments')

    if(response.ok) {
        const data = await response.json();
        dispatch(getAllComments(data));
    }
}

const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState = {...state}

    switch(action.type) {

        case GET_COMMENT:
            action.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState
    }
}

export default commentReducer
