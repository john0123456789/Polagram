import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './User.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsThunk } from "../store/posts";
import UserPosts from "../components/userPosts"
import { addFollowThunk, getAllFollowersThunk } from "../store/followers"
import FollowersPage from "../components/followersPage"


function User() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({});
  const { userId }  = useParams();

  const follower = useSelector(state => state.session.user)
  const [followerId] = useState(follower.id)
  const [followingId] = useState(userId)

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


  useEffect(() => {
    dispatch(getAllFollowersThunk(userId));
  }, [dispatch, userId]);

  if (!user) {
    return null;
  }


  const followClick = (e) => {
    e.preventDefault();
    const followed = {
      followerId,
      followingId,
    };
    dispatch(addFollowThunk(followed))
  };


  return (
      <>
    <ul>
      <li>
       <img alt="profilepic" className="profilepicture" src={user.profile_pic}/>
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

      <button alt="follow" type="button" onClick={followClick}>Follow</button>

      <FollowersPage/>
    </ul>
      <UserPosts userId={user.id}></UserPosts>
    </>
  );
}
export default User;
