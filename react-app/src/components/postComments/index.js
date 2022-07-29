import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllComments, deleteCommentThunk } from '../../store/comments'
import { useHistory, useParams } from "react-router-dom";
import './postComment.css'

const PostComments = ({postId}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)

    const comments = useSelector(state => {
        return Object.values(state.comments).filter(comment => comment.postId === postId);
    })
    console.log("comments=>", comments);

    useEffect(() => {
        async function getImages() {
            await dispatch(thunkGetAllComments(postId))
        }
        getImages()
    }, [dispatch])

    const handleDeleteComment = (e) => {
        e.preventDefault();
        const buttonData = Number(e.target.id);
        for (const comment of comments) {
          if (comment.id === buttonData) {
            dispatch(deleteCommentThunk(comment, buttonData))
            history.push("/posts")
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
                           <b>{comment.poster}</b> {comment.content}    
                           {comment.commentersId === user.id ? (
                            <>
                           <button type="button" id={comment.id} onClick={handleEditComment}>Edit</button>
                            <button type="button" id={comment.id} onClick={handleDeleteComment}>Delete</button>
                            </>
                           ) : null}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostComments
