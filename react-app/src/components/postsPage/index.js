import { getAllPostsThunk, deletePostThunk } from "../../store/posts";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { FaHeart, FaRegHeart,FaRegComment} from "react-icons/fa"
import { BsThreeDots } from "react-icons/bs"
import  './posts.css'

function PostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const postsObject = useSelector((state) => state.posts);
  const posts = Object.values(postsObject);

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/likes");
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

      {posts.map((post) =>
        (
        <div className="eachpost">
          <div key={post.id}>
          <div className="posttopbar">
          <img src={post.imageURL} className="profpic"/>jack<button type="button" className="popup"><BsThreeDots size="18px" /></button>
          </div>
          <div>
            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="400" height="280"/>
          </div>

          <div className="content">
            <div className="contentbuttons">
            <button type="button" id={post.id} onClick={commentClick}>comment</button>
            <button type="button" id={post.id} className="likebutton" onClick={handleClick}><FaRegHeart size="20px" /></button>
            {/* <button type="button" id={post.id} className="likebutton" onClick={commentClick}><FaRegComment size="20px" /></button> */}
            <button type="button" id={post.id} onClick={handleEditClick}>Edit</button>
            <button type="button" id={post.id} onClick={handleDeleteClick}>Delete</button>
            </div>
            <div className="likedby">
              Liked by
            </div>
            <div>
            username: {post.caption}
            </div>
            <div className="comment">
              username:comment
            </div>
            <div className="comment">
              username:comment
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
