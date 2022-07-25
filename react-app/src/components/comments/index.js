import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllComments } from '../../store/comments'


const PostsComments = ({postId}) => {
    const dispatch = useDispatch();

    const comments = useSelector(state => {
        return Object.values(state.comments).filter(comment => comment.postId === postId);
    })

    useEffect(() => {
        async function getComments() {
            await dispatch(thunkGetAllComments(postId))
        }
        getComments();
    }, [dispatch,postId])

    return(
        <div id="PostsComments-container">
            <h1>Comments</h1>
            <div id="thisposts-comments-container">
                { comments.map(comment =>{
                    return (
                        <h3>{comment.content}</h3>
                    )
                })}
            </div>

        </div>
    )
}

export default PostsComments
