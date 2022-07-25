import { getAllPostsThunk, deletePostThunk } from "../../store/posts";
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";

function PostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();
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
    dispatch(deletePostThunk(postsObject, id))
    history.push("/posts")
  }



  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) =>
        (<ul key={post.id}>
          <div>
            <img className="photo" src={post.imageURL} alt={"Where Posts go"} width="300" height="300"/>
          </div>
          <div>
            <li>Caption: {post.caption}</li>
          </div>
            <button type="button" onClick={handleClick}>Like</button>
            <button value={post.id} type="button" onClick={handleDeleteClick}>Delete</button>
        </ul>)

      )}
    </>
  );

}

export default PostsPage;
