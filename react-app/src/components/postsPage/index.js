import { getAllPostsThunk, deletePostThunk } from "../../store/posts";
import { getAllLikesThunk, addLikesThunk, deleteLikesThunk } from "../../store/likes";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart,FaRegComment} from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"
import  './posts.css'
import PostComments from "../postComments";
import LikeComponent from "../LikeComponent";
import Popup from '../popup'


function PostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [buttonPopup, setButtonPopup] = useState(false)


  const postsObject = useSelector((state) => state.posts);
  const posts = Object.values(postsObject);
  const [users, setUsers] = useState([]);


  const user = useSelector(state => state.session.user)
  const[userId] = useState(user.id);

  const [postId] = useState(posts.id);


  const [totalLikes, setTotalLikes] = useState("");

  // const updateTotalLike = (e) => setTotalLikes(e.target.value)


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
  }, []);

  const likeClick = (e) => {
    e.preventDefault();
    console.log("WORKS")
    const buttonData = Number(e.target.id);
    const createdLike = {
      postId: buttonData,
      userId,
      totalLikes: 1
    };
    console.log(createdLike)
    console.log("WORKS")
    dispatch(addLikesThunk(createdLike))
    history.push("/likes/new");
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



  return (
          <>
    <div className="feed">
      <main>
        {posts.map((post) =>
        (

          <div className="eachpost">
          <div key={post.id}>
          <div className="posttopbar">
          <img src={post.user.profile_pic} width="25px" height="25px" className="profpic"/><b className="name">{post.user.username}</b>
          <BsThreeDots size="18px" className="popupimg" onClick={() => setButtonPopup(true)}/>

          </div>
          <div>
            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="400" height="280"/>
          </div>

          <div className="content">
            <div className="contentbuttons">
            {/* <FaRegHeart size="22px"/> */}
            <button id={post.id} className="likebutton" onClick={likeClick}>click</button>
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
          </div><Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <button type="button" id={post.id} onClick={handleEditClick}>Edit</button>
            <button type="button" id={post.id} onClick={handleDeleteClick}>Delete</button>
            </Popup>

        </div>
        )
        )}
 </main>
      </div>
    </>
  );
}


export default PostsPage;
