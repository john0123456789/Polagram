import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './User.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsThunk } from "../store/posts";
import UserPosts from "../components/userPosts"
import { addFollowThunk, deleteFollowThunk, getAllFollowersThunk } from "../store/followers"
import FollowersPage from "../components/followersPage"


function User() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [user, setUser] = useState({});
  const { userId }  = useParams();
  console.log(userId);
  const follower = useSelector(state => state.session.user)
  const [followerId] = useState(follower.id)
  const [followingId] = useState(userId)

  const followers = useSelector(state => {
    return Object.values(state.followers)
  })

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
  }, [dispatch]);

  if (!user) {
    return null;
  }


  const followClick = (e) => {
    e.preventDefault();
    console.log("FOLLOWER HERE", follower)
    const followed = {
      followerId,
      followingId,
    };
    dispatch(addFollowThunk(followed))
    history.push("/");
  };

  const handleUnfollow = (e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
    for (const follower of followers) {
      if (follower.id === buttonData) {
        dispatch(deleteFollowThunk(follower, buttonData))
        history.push("/")
      }
    }
  }


  return (
      <>
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
      <button type="button" onClick={followClick}>Follow</button>
      {/* <button id={userId} type="button" onClick={handleUnfollow}>UnFollow</button> */}
      <FollowersPage/>
    </ul>
      <UserPosts userId={user.id}></UserPosts>
    </>
  );
}
export default User;
