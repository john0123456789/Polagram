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
  // console.log(postsObject)
  const posts = Object.values(postsObject);

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/posts");
  };

  const commentClick = (e) => {
    e.preventDefault();
    history.push("/comments")
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

  return (
    <>
    <div className="feed">
      <h1>Posts</h1>
      <div className="photofeed">
      {posts.map((post) =>
        (
        <div className="eachpost">
          <div key={post.id}>
          <div className="posttopbar">
          <button type="button" className="popup"><BsThreeDots size="18px" /></button>
          </div>
          <div>
            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="400" height="280"/>
          </div>
          <div className="content">
            <button type="button" className="likebutton" onClick={handleClick}><FaRegHeart size="20px" /></button>
            <button type="button" className="likebutton" onClick={commentClick}><FaRegComment size="20px" /></button>
            {/* <button type="button" id={post.id} onClick={handleDeleteClick}>Delete</button> */}
            <div>
              <li>Caption: {post.caption}</li>
            </div>
          </div>
          </div>
        </div>
        )
      )}</div>
      </div>
    </>
  );

}

export default PostsPage;
