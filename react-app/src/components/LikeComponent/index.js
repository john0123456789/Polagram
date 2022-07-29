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
    }, [dispatch])

    return (
        <>
                {likes.map((like)=>{
                    return (
                        <div>
                            <div>Liked by <b>{likes[0].liker}</b></div>
                        </div>
                    )
                })}

        </>
    )
}

export default PostLikes
