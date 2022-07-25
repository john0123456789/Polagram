export const GET_COMMENT = 'comment/GET_COMMENT'

const getAllComments = (comments) => {
    return {
        type: GET_COMMENT,
        comments
    }
}
// fix csrf stuff on all of store

export const thunkGetAllComments = (comments) => async (dispatch) => {
    const response = await fetch('/api/comments')

    if(response.ok) {
        const data = await response.json();
        dispatch(getAllComments(data));
    }
}

const initialState = {};

export const commentReducer = (state = initialState, action) => {
    let newState = {...state}

    switch(action.type) {

        case GET_COMMENT:
            action.comments.forEach(comment => {
                newState[comment.id] = comment
            })
            return newState
    }
}

