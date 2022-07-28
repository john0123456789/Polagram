import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsThunk } from "../store/posts";
import UserPosts from "../components/userPosts"

function User() {
  const dispatch = useDispatch();

  const [user, setUser] = useState({});
  const { userId }  = useParams();


  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  if (!user) {
    return null;
  }

  return (
    <>
      <div id='profile-container'>
        <img src={user.profile_pic}/>
        <h1>{user.username}'s posts:</h1>
      </div>
      <UserPosts  userId={user.id}/>
    </>
  );
}
export default User;
