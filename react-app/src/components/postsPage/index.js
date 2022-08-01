import { getAllPostsThunk, deletePostThunk } from "../../store/posts";
import { getAllLikesThunk, addLikesThunk } from "../../store/likes";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart,FaRegComment} from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"
import  './posts.css'
import PostComments from "../postComments";
import LikeComponent from "../LikeComponent";
import Popup from '../popup'
import CreateCommentsPage from '../createCommentsPage'


function PostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();


  const [isShown, setIsShown] = useState(false);

  const postsObject = useSelector((state) => state.posts);
  const posts = Object.values(postsObject);
  const sortedPost = posts.sort().reverse();
  const [users, setUsers] = useState([]);

  const user = useSelector(state => state.session.user)
  const[userId] = useState(user.id);

  const handleClick = event => {

    setIsShown(current => !current);


  };

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
    dispatch(getAllPostsThunk());
    dispatch(getAllLikesThunk())
  }, [dispatch]);


  const likeClick = (e) => {
    e.preventDefault();
    // setToggleHeart(!toggleHeart)
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

  const handleDeleteClick = async(e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
    for (const post of posts) {
      if (post.id === buttonData) {

        await dispatch(deletePostThunk(post, buttonData))
        history.push("/posts/")

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

        {sortedPost.map((post) =>
        (
          <main>
          <div className="eachpost">
          <div key={post.id}>
          <div className="posttopbar">

          <img alt="profilepic" src={post.user.profile_pic} width="25px" height="25px" className="profpic"/><NavLink className="name" to={`/users/${post.user.id}`}><b>{post.user.username}</b></NavLink>
          {/* <BsThreeDots prop={post.id} size="18px" className="popupimg"/> */}

          </div>
          <div>
            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="400" height="280"/>
          </div>

          <div className="content">
            <div className="contentbuttons">

            <FaRegHeart size="22px" id={post.id} className="likebutton" onClick={(e)=>likeClick(e)}/>
            <FaRegComment size="22px" id={post.id} className="likebutton" onClick={handleClick}/>
          {post.user.id === user.id ? (
            <>
            <button type="button" className="postbuttons" id={post.id} onClick={handleEditClick}>Edit</button>
            <button type="button" className="postbuttons" id={post.id} onClick={handleDeleteClick}>Delete</button>
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
            {isShown &&
              <CreateCommentsPage value={post.id} />
            }
          </div>
          </div>

        </div>
{/*
          <div>
           <Popup value={post.id} trigger={buttonPopup} setTrigger={setButtonPopup}>
            </Popup>
          </div> */}
        </main>

        )
        )}


      </div>
    </>
  );
}


export default PostsPage;
