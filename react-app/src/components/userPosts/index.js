import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsThunk } from "../../store/posts";


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
            <div>
                {posts.map((post)=>{
                    return (
                        <div>
                            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="400" height="280"/>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default UserPosts
