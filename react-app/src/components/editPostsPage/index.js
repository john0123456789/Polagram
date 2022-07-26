import { updatePostThunk } from '../../store/posts'
import { useDispatch, useSelector} from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState } from "react";

function EditPostsPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const {id} = useParams();
  const user = useSelector(state => state.session.user)
  const post = useSelector(state => state.posts)
  const singlePost = post[id]

  const[userId] = useState(user.id);
  const [imageURL, setUrl] = useState(singlePost.imageURL);
  const [caption, setCaption] = useState(singlePost.caption);


  const updateUrl = (e) => setUrl(e.target.value)
  const updateCaption = (e) => setCaption(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedPost = {
        userId,
        imageURL,
        caption
      };

      dispatch(updatePostThunk(updatedPost, id));
    history.push("/posts");
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    history.push("/posts");
  };


  return (
    <form>
      <h1>Edit your POST!</h1>
      <input type="text" placeholder="Image Url" value={imageURL} onChange={updateUrl}/>
      <input type="text" placeholder="Caption" value={caption} onChange={updateCaption}/>
      <button type="submit" onClick={handleSubmit}>POST THAT POST HOMIE</button>
      <button type="button" onClick={handleCancelClick}>Cancel</button>
    </form>
  );

}

export default EditPostsPage;
