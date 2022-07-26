import { getAllPostsThunk, deletePostThunk } from "../../store/posts";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

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
      <h1>Posts</h1>
      {posts.map((post) =>
        (<ul key={post.id}>
          <div>
            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="350" height="250"/>
          </div>
          <div>
            <li>Caption: {post.caption}</li>
          </div>
            <button type="button" onClick={handleClick}>Like</button>
            <button type="button" id={post.id} onClick={handleDeleteClick}>Delete</button>
            <button type="button" id={post.id} onClick={handleEditClick}>Edit</button>
        </ul>)

      )}
    </>
  );
}

export default PostsPage;
