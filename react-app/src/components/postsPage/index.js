import { getAllPostsThunk, deletePostThunk } from "../../store/posts";
import { getAllLikesThunk, addLikesThunk, deleteLikesThunk } from "../../store/likes";
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
import EditPostsPage from '../editPostsPage'


function PostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();


  const [isShown, setIsShown] = useState(false);
  const [editPost, setEditPost] = useState(false);

  const postsObject = useSelector((state) => state.posts);
  const posts = Object.values(postsObject);
  const sortedPost = posts.sort().reverse();

  const [users, setUsers] = useState([]);

  const user = useSelector((state) => state.session.user)
  const[userId] = useState(user.id);



  const likesObject = useSelector((state) => state.likes)
  const likes = Object.values(likesObject)

  const handleClick = event => {
    setIsShown(current => !current);
  };

  const handleEditPost = event => {
    setEditPost(current => !current)
  }



  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
    dispatch(getAllPostsThunk());
    dispatch(getAllLikesThunk());
  }, [dispatch]);



  const likeClick = (e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
    const createdLike = {
      postId: buttonData,
      userId,
      totalLikes: 0
    };
    dispatch(addLikesThunk(createdLike))
    history.push("/posts/");
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
        dispatch(deletePostThunk(post, buttonData))
        history.push("/posts/")
      }
    }
  }


  const handleUnlike = (e) => {
    e.preventDefault();
    for (const like of likes) {
      if(like.userId === user.id) {
         dispatch(deleteLikesThunk(like, like.id))
         return
      }
    }
  }


  const handleEditClick = (e) => {
    e.preventDefault();
    const buttonData = Number(e.target.id);
        history.push(`/posts/${buttonData}`)
      }


      let heart = ''

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
            <div>
              <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="400" height="280"/>
            </div>

            <div className="content">

              <div className="contentbuttons" >

              {likes.map((likeLinks) => {
                if(likeLinks.userId === user.id && likeLinks.postId === post.id) {
                    heart = <FaHeart size="22px" className="likebutton" id={post.id} onClick={(e)=>handleUnlike(e)}/>
                    return

                } else if(likeLinks.userId !== user.id && likeLinks.postId !== post.id) {
                    heart = <FaRegHeart size="22px" className="likebutton" id={post.id} onClick={(e)=>likeClick(e)}/>
                    return
                }
              })}
              {heart}

              <FaRegComment size="22px" className="likebutton"  onClick={(e)=>handleClick(e)}/>
            {post.user.id === user.id ? (
              <>
              <button type="button" className="postbuttons" id={post.id} onClick={handleEditPost}>Edit</button>
              <button type="button" className="postbuttons" id={post.id} onClick={handleDeleteClick}>Delete</button>
              {editPost && <EditPostsPage postId={post.id}/> }
              </>
            ) : null}
              </div>
              <div className="likedby">
                <LikeComponent postId={post.id} userId={users.id}/>
              </div>
              <div className="usercapt">
              <NavLink className="comname" to={`/users/${post.user.id}`}><b>{post.user.username}</b></NavLink> {post.caption}
              </div>

              <div className="commenter">
                <PostComments postId={post.id}/>
              </div>

          </div>

            {isShown &&
              <CreateCommentsPage value={post.id} />
            }
          </div>


        </div>

          </div>

          </main>

          )
          )}


          )
          )}

        </div>
      </>
    );
  }

export default PostsPage;
