import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { thunkGetAllComments } from '../../store/comments'
import { useHistory } from "react-router-dom";


const PostsComments = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const comments = useSelector(state => {
        return Object.values(state.comments);
    })

    useEffect(() => {
       dispatch(thunkGetAllComments())
    }, [dispatch])

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
