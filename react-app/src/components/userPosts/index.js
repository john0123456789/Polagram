import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsThunk } from "../../store/posts";
import './userPosts.css'



const UserPosts = ({userId}) => {
    const dispatch = useDispatch();

    const posts = useSelector(state => {
        return Object.values(state.posts).filter(post => post.user.id === userId);
      })


    useEffect(() => {
        dispatch(getAllPostsThunk());
      }, [dispatch]);

    return (
        <>

                {posts.map((post)=>{
                    return (
                            <img className="photos" src={post.imageURL} alt={"Where Posts go"}/>

                    )
                })}
        </>
    )
}

export default UserPosts
