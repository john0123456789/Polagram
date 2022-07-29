import { getAllPostsThunk, deletePostThunk } from "../../store/posts";
import { getAllLikesThunk, addLikesThunk, deleteLikesThunk } from "../../store/likes";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart,FaRegComment} from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"
import  './posts.css'
import PostComments from "../postComments";
import LikeComponent from "../LikeComponent";
import Popup from '../popup'
// import {addLikesThunk, deleteLikesThunk} from "../../store/likes"


function PostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();


  const [buttonPopup, setButtonPopup] = useState(false)

  // const postsObject = useSelector((state) => state.posts);
  // const post = useSelector((state) => state.posts)



  const postsObject = useSelector((state) => state.posts);
  const posts = Object.values(postsObject);
  const [users, setUsers] = useState([]);



  const user = useSelector(state => state.session.user)
  const[userId] = useState(user.id);

  const [postId] = useState(posts.id);


  const [totalLikes, setTotalLikes] = useState("");


  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);


  useEffect(() => {
    dispatch(getAllLikesThunk());
  }, [dispatch]);


  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);


  const likeClick = (e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
    const createdLike = {
      id: buttonData,
      postId: buttonData,
      userId,
      totalLikes: 1
    };
    dispatch(addLikesThunk(createdLike))
    history.push("/likes/new/");
  };


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

  // const likesClick = async (e) => {
  //   e.preventDefault();
  //   dispatch(addLikesThunk(post.id))
  // }

  // const disLikeClick = async (e) => {
  //   e.preventDefault();
  //   dispatch(deleteLikesThunk(post.id))
  // }

  return (
          <>
    <div className="feed">

        {posts.map((post) =>
        (
          <main>
          <div className="eachpost">
          <div key={post.id}>
          <div className="posttopbar">
          <img src={post.user.profile_pic} width="25px" height="25px" className="profpic"/><NavLink className="name" to={`/users/${post.user.id}`}><b>{post.user.username}</b></NavLink>
          {/* <BsThreeDots prop={post.id} size="18px" className="popupimg" onClick={() => setButtonPopup(true)}/>
          <div>
           <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <button type="button" id={post.id} onClick={handleEditClick}>Edit</button>
            <button type="button" id={post.id} onClick={handleDeleteClick}>Delete</button>
            </Popup>
          </div> */}
          </div>
          <div>
            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="400" height="280"/>
          </div>

          <div className="content">
            <div className="contentbuttons">

            <FaRegHeart size="22px" id={post.id} className="likebutton" onClick={(e)=> likeClick(e)}/>
            <FaRegComment size="22px" id={post.id} className="likebutton" onClick={(e)=> commentClick(e)}/>
          {post.user.id === user.id ? (
            <>
            <button type="button" id={post.id} onClick={handleEditClick}>Edit</button>
            <button type="button" id={post.id} onClick={handleDeleteClick}>Delete</button>
            </>

          ) : null}


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

        </main>

        )
        )}


      </div>
    </>
  );
}


export default PostsPage;
