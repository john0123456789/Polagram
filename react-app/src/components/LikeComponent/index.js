import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLikesThunk } from '../../store/likes'


const PostLikes = ({postId}) => {
    const dispatch = useDispatch();

    const likes = useSelector(state => {
        return Object.values(state.likes).filter(like => like.postId === postId);
    })

    useEffect(() => {
        async function getlikes() {
            await dispatch(getAllLikesThunk(postId))
        }
        getlikes()
    }, [dispatch, postId])

    return (
        <>
                        <div>
                            <div>Liked by <b>{likes.length}</b> people</div>
                        </div>

        </>
    )
}

export default PostLikes
