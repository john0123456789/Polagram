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

  const [following, setFollowing] = useState('');

  const { userId }  = useParams();

  const follower = useSelector(state => state.session.user)
  const [followerId] = useState(follower.id)
  const [followingId] = useState(userId)


  const updateFollowers = (e) => setFollowing(e.target.value)
  const followersList = document.getElementById("followersList");

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

  const showFollowers = (e) => {
    followersList.style.display = "block"
  };

  return (
      <>
    <div className="wrapper">
      <div className="topstuff">
       <img alt="profilepic" className="profilepicture" src={user.profile_pic}/>
       <a className="profuser">{user.username}</a>
      </div>
      <div className="spacem"><UserPosts className="picwide" userId={user.id}></UserPosts></div>
      </div>
    </>
  );
}
export default User;
