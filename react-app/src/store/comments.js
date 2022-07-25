export const GET_COMMENT = 'comment/GET_COMMENT'

const getAllComments = (comments) => {
    return {
        type: GET_COMMENT,
        comments
    }
}


export const thunkGetAllComments = () => async (dispatch) => {
    const response = await fetch('/api/comments')
    const data = await response.json();
    dispatch(getAllComments(data.comments));
    return data
}

const initialState = {};

export const commentReducer = (state = initialState, action) => {
    let newState = {...state}
    switch(action.type) {
        case GET_COMMENT:
            const anotherState = {};
            action.comments.forEach((comment) => {
            return anotherState[comment.id] = comment;
          });
            return anotherState;
        default:
            return state;
    }
}
