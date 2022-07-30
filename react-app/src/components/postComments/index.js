import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllComments, deleteCommentThunk } from '../../store/comments'
import { useHistory, NavLink } from "react-router-dom";
import { AiFillDelete } from 'react-icons/ai';
import { MdEdit } from 'react-icons/md';

import './postComment.css'

const PostComments = ({postId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

    const comments = useSelector(state => {
        return Object.values(state.comments).filter(comment => comment.postId === postId);
    })

    useEffect(() => {
        dispatch(thunkGetAllComments(postId))
    }, [dispatch, postId])

    const handleDeleteComment = async (e) => {
        e.preventDefault();
        const buttonData = Number(e.target.id);
        for (const comment of comments) {
          if (comment.id === buttonData) {

            let deletedComment = await dispatch(deleteCommentThunk(comment, buttonData))
                    if(deletedComment) {
                    history.push('/posts/')

        }
      }
    }
}
    const handleEditComment = (e) => {
        e.preventDefault();
        const buttonData = Number(e.target.id);
        history.push(`/comments/${buttonData}`)
    }

    return (
        <>
            <div>
                {comments.map((comment)=>{
                    return (
                        <div className="commenter">
                           <NavLink className="comname" to={`/users/${comment.commentersId}`}><b>{comment.poster}</b></NavLink> {comment.content}
                           {comment.commentersId === user.id ? (
                            <>
                            <button id={comment.id} size="13px" className="firstcommentalters" onClick={(e)=>handleEditComment(e)}>Edit</button>
                            <button id={comment.id} size="13px" className="commentalters" onClick={(e)=>handleDeleteComment(e)}>Delete</button>
                            </>
                           ) : null}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostComments;
