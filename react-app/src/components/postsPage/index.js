import { getAllPostsThunk } from "../../store/posts";
import { useDispatch, useSelector} from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";

function PostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const postsObject = useSelector((state) => state.posts);
  const postsArray = Object.values(postsObject);

  useEffect(() => {
    dispatch(getAllPostsThunk());
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    history.push("/");
  };


  return (

    postsArray.map((post) => {
    <ul key={post.id}>
      <div>
      <img className="photo" src={post.url} alt={"Where Posts go"} width="300" height="300"/>
      </div>
      <div>
      <li>Caption: {post.caption}</li>
      </div>
      <button type="button" onClick={handleClick}>Like</button>
    </ul>
    }
  ));
}

export default PostsPage;
