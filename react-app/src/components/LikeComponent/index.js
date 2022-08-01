import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllLikesThunk } from '../../store/likes'
import { useHistory } from "react-router-dom";
import { FaHeart, FaRegHeart,FaRegComment} from "react-icons/fa"
import {deleteLikesThunk } from "../../store/likes";


const PostLikes = ({postId, post}) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const user = useSelector(state => state.session.user)


    const likes = useSelector(state => {
        return Object.values(state.likes).filter(like => like.postId === postId);
    })
    // console.log(likes)
    useEffect(() => {
        async function getlikes() {
            await dispatch(getAllLikesThunk(postId))
        }
        getlikes()
    }, [dispatch, postId])

    const handleUnlike = (e) => {
        e.preventDefault();
        const buttonData = Number(e.target.id);
        console.log("trying to unlike")
        for (const like of likes) {
          if (like.id === buttonData) {
            dispatch(deleteLikesThunk(like, buttonData))
            history.push("/posts/")
          }
        }
      }

    return (
        <>
                        <div>
                            <div>Liked by <b>{likes.length}</b> people</div>
                        </div>

        </>
    )
}

export default PostLikes
