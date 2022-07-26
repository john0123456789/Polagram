export const GET_COMMENT = 'comment/GET_COMMENT'
export const DELETE_COMMENT = 'comment/DELETE_COMMENT'

const getAllComments = (comments) => {
    return {
        type: GET_COMMENT,
        comments
    }
}

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        comment
    }
}


export const thunkGetAllComments = () => async (dispatch) => {
    const response = await fetch('/api/comments')
    const data = await response.json();
    dispatch(getAllComments(data.comments));
    return data
}

export const deleteCommentThunk = (comment, id) => async(dispatch) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    })
    if (response.ok) {
      const commentId = await response.json(comment)
      dispatch(deleteComment(commentId))
      return commentId;
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
        case DELETE_COMMENT:
            delete newState[action.comment.id]
            return newState
        default:
            return state;
    }
}
