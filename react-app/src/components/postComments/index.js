import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllComments } from '../../store/comments'


const PostComments = ({postId}) => {
    const dispatch = useDispatch();

    const comments = useSelector(state => {
        return Object.values(state.comments).filter(comment => comment.postId === postId);
    })

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
                        <div>
                        {comment.poster}<h3> {comment.content}</h3>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default PostComments
