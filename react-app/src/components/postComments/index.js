import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllComments } from '../../store/comments'
import './postComment.css'

const PostComments = ({postId}) => {
    const dispatch = useDispatch();

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

    return (
        <>
            <div>
                {comments.map((comment)=>{
                    return (
                        <div className="commenter">
                           <b>{comment.poster}</b> {comment.content}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostComments
