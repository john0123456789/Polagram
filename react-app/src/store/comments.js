export const GET_COMMENT = 'comments/GET_COMMENT'
export const DELETE_COMMENT = 'comments/DELETE_COMMENT'
export const CREATE_COMMENT = 'comments/CREATE_COMMENT'
export const UPDATE_COMMENT = 'comments/UPDATE_COMMENT'


const createComment = (newComment) => ({
    type: CREATE_COMMENT,
    newComment,
})

const getAllComments = (comments) => ({
    type: GET_COMMENT,
    comments,
})


const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment,
})

const deleteComment = (comment) => ({
    type: DELETE_COMMENT,
    comment,
})


export const thunkGetAllComments = () => async (dispatch) => {
    const response = await fetch('/api/comments/')
    const data = await response.json();
    dispatch(getAllComments(data.comments));
    return data
}

export const createCommentThunk = (newComment) => async(dispatch) => {
    const response = await fetch(`/api/comments/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
    });
    if (response.ok) {
        const newComment = await response.json();
        dispatch(createComment(newComment));
        return newComment;
    }
};

export const updateCommentThunk = (comment, id) => async(dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
      });
      if (response.ok) {
        const comment = await response.json();
        dispatch(updateComment(comment));
        return comment;
      }
    }

export const deleteCommentThunk = (comment, id) => async(dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      const delComment = await response.json(comment)
      dispatch(deleteComment(delComment))
      return delComment;
    }
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
        case CREATE_COMMENT:
            if (!state[action.newComment.id]) {
                newState = {
                    ...state,
                    [action.newComment.id]: action.newComment,
                }
            }
            return newState;
        case UPDATE_COMMENT:
            newState = {...state, [action.comment.id]: action.comment,}
            return newState
        case DELETE_COMMENT:
            delete newState[action.comment.id]
            return newState
        default:
            return state;
    }
}
