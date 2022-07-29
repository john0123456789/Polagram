import { getAllPostsThunk, deletePostThunk } from "../../store/posts";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart,FaRegComment} from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"
import  './posts.css'
import PostComments from "../postComments";
import LikeComponent from "../LikeComponent";
import {addLikesThunk, deleteLikesThunk} from "../../store/likes"

function PostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const postsObject = useSelector((state) => state.posts);
  const post = useSelector((state) => state.posts)

  // const usersObject = useSelector((state) => state.users);
  // const users = Object.values(usersObject);
  // console.log(postsObject)

  const posts = Object.values(postsObject);
  const [users, setUsers] = useState([]);
  // console.log("HERE I AM XD", users)
  // console.log("POSTS HERE", posts)

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);


  const commentClick = (e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
    history.push(`/comments/create/${buttonData}`)
  }

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
    for (const post of posts) {
      if (post.id === buttonData) {
        dispatch(deletePostThunk(post, buttonData))
        history.push("/posts")
      }
    }
  }

  const handleEditClick = (e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
        history.push(`/posts/${buttonData}`)
      }

  const likeClick = async (e) => {
    e.preventDefault();
    dispatch(addLikesThunk(post.id))
  }

  const disLikeClick = async (e) => {
    e.preventDefault();
    dispatch(deleteLikesThunk(post.id))
  }

  return (
          <>
    <div className="feed">
      {posts.map((post) =>
        (
          <div className="eachpost">
          <div key={post.id}>
          <div className="posttopbar">
          <img src={post.user.profile_pic} width="25px" height="25px" className="profpic"/><b className="name">{post.user.username}</b> <BsThreeDots size="18px" className="popup"/>

          </div>
          <div>
            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="400" height="280"/>
          </div>

          <div className="content">
            <div className="contentbuttons">

            <FaRegHeart size="22px" id={post.id} className="likebutton" onClick={likeClick}/>
            <FaRegComment size="22px" id={post.id} className="likebutton" onClick={(e)=> commentClick(e)}/>
            </div>
            <div className="likedby">
              <LikeComponent postId={post.id} userId={users.id}/>
            </div>
            <div className="usercapt">
              <b>{post.user.username}</b> {post.caption}
            </div>

            <div className="commenter">
              <PostComments postId={post.id}/>
            </div>
          </div>
          </div>
        </div>
        )
        )}
      </div>
    </>
  );
}


export default PostsPage;
