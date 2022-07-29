import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './User.css'
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
    <ul>
      <li>
       <img className="profilepicture"src={user.profile_pic}/>
      </li>
      <li>
        <strong>User Id</strong> {userId}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}
export default User;
