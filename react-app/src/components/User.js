import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './User.css'
import { useSelector, useDispatch } from 'react-redux';
import { getAllPostsThunk } from "../store/posts";
import UserPosts from "../components/userPosts"
import { addFollowThunk } from "../store/followers"


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
      <button type="button" onClick={followClick}>Follow</button>
    </ul>
  );
}
export default User;
